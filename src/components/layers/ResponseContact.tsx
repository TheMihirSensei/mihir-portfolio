"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { profile } from "@/content/content";
import { contactSchema } from "@/lib/contact-schema";
import { useUI } from "@/lib/ui-context";
import { LayerSection } from "../LayerSection";
import { Reveal } from "../Reveal";

type Fields = { name: string; email: string; message: string; company: string };
type Result =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; status: number; body: Record<string, unknown>; ms: number };

const empty: Fields = { name: "", email: "", message: "", company: "" };

export function ResponseContact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const check = contactSchema.safeParse(fields);
    if (!check.success) {
      const fe: Partial<Record<keyof Fields, string>> = {};
      for (const issue of check.error.issues) {
        const k = issue.path[0] as keyof Fields;
        fe[k] ??= issue.message;
      }
      setErrors(fe);
      setResult({ kind: "done", status: 422, body: { error: "Unprocessable Entity", fields: fe }, ms: 0 });
      return;
    }
    setResult({ kind: "sending" });
    const t0 = performance.now();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const body = await res.json();
      setResult({ kind: "done", status: res.status, body, ms: Math.round(performance.now() - t0) });
      if (res.ok) setFields(empty);
    } catch {
      setResult({
        kind: "done",
        status: 503,
        body: { error: "Network error. Email me directly instead.", email: profile.email },
        ms: Math.round(performance.now() - t0),
      });
    }
  }

  const { year, years } = useUI();

  return (
    <LayerSection
      id="response"
      kicker="// building the response"
      title={
        <>
          <span className="text-ok">200 OK.</span> You found me.{" "}
          <span className="text-muted">Now send something back.</span>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Reveal>
          <form
            onSubmit={submit}
            noValidate
            className="relative overflow-hidden rounded-xl border border-line bg-elev font-mono text-[13px]"
          >
            <div className="border-b border-line px-4 py-3">
              <span className="font-semibold text-ok">POST</span> /api/contact{" "}
              <span className="text-dim">HTTP/1.1</span>
              <div className="text-dim">Content-Type: application/json</div>
            </div>
            <div className="space-y-1 px-4 py-4">
              <div className="text-dim">{"{"}</div>
              <Field label="name" error={errors.name}>
                <input
                  value={fields.name}
                  onChange={set("name")}
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  className="w-full bg-transparent text-accent outline-none focus-visible:outline-none placeholder:text-dim/60"
                />
              </Field>
              <Field label="email" error={errors.email}>
                <input
                  type="email"
                  value={fields.email}
                  onChange={set("email")}
                  autoComplete="email"
                  placeholder="ada@example.com"
                  className="w-full bg-transparent text-accent outline-none focus-visible:outline-none placeholder:text-dim/60"
                />
              </Field>
              <Field label="message" error={errors.message} multiline>
                <textarea
                  value={fields.message}
                  onChange={set("message")}
                  rows={5}
                  placeholder="Hey Mihir, we're building something and…"
                  className="w-full resize-y bg-transparent leading-6 text-accent outline-none focus-visible:outline-none placeholder:text-dim/60"
                />
              </Field>
              {/* honeypot */}
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={fields.company}
                onChange={set("company")}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="text-dim">{"}"}</div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
              <span className="hidden text-[11px] text-dim sm:inline">validated with zod · server &amp; client</span>
              <button
                type="submit"
                disabled={result.kind === "sending"}
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {result.kind === "sending" ? "sending…" : "send"} <Send className="size-4" />
              </button>
            </div>
          </form>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="min-h-44 overflow-hidden rounded-xl border border-line bg-bg font-mono text-[12px]">
              <div className="border-b border-line px-4 py-2 text-dim">response</div>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={result.kind === "done" ? `${result.status}-${result.ms}` : result.kind}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-x-auto whitespace-pre-wrap break-words px-4 py-3 leading-6"
                  aria-live="polite"
                >
                  {result.kind === "idle" && <span className="text-dim">{"// awaiting request…"}</span>}
                  {result.kind === "sending" && <span className="caret text-warn">pending</span>}
                  {result.kind === "done" && (
                    <>
                      <span className={result.status < 300 ? "text-ok" : "text-err"}>
                        HTTP/1.1 {result.status} {result.status < 300 ? "Created" : result.status === 422 ? "Unprocessable Entity" : "Error"}
                      </span>
                      {result.ms > 0 && <span className="text-dim">{`\nx-response-time: ${result.ms}ms`}</span>}
                      {"\n\n"}
                      <span className="text-muted">{JSON.stringify(result.body, null, 2)}</span>
                    </>
                  )}
                </motion.pre>
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-xl border border-line bg-elev p-4 font-mono text-[12px]">
              <div className="mb-2 text-dim">Link headers:</div>
              <ul className="space-y-1">
                {profile.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group inline-flex items-center text-muted transition-colors hover:text-fg"
                    >
                      &lt;<span className="text-accent group-hover:underline">{l.label}</span>&gt;; rel=&quot;{l.rel}&quot;
                      <ArrowUpRight className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="mt-24 flex flex-col gap-3 border-t border-line pt-8 font-mono text-[11px] text-dim sm:flex-row sm:justify-between">
        <span>
          © {year} {profile.name} · built with Next.js, Tailwind & too much coffee
        </span>
        <span>
          total request time: <span className="text-fg">{years} years</span> and counting · press{" "}
          <kbd className="rounded border border-line px-1">⌘K</kbd>
        </span>
      </footer>
    </LayerSection>
  );
}

function Field({
  label,
  error,
  multiline,
  children,
}: {
  label: string;
  error?: string;
  multiline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block pl-4 ${multiline ? "" : ""}`}>
      <span className={`flex gap-2 ${multiline ? "flex-col sm:flex-row" : "items-center"}`}>
        <span className="shrink-0" style={{ color: "var(--l1)" }}>
          &quot;{label}&quot;:
        </span>
        <span className="flex min-w-0 flex-1 rounded border border-transparent px-1 transition-colors focus-within:border-line-strong hover:border-line">
          {children}
        </span>
      </span>
      {error && <span className="block pb-1 pl-1 text-[11px] text-err">{`// ${error}`}</span>}
    </label>
  );
}
