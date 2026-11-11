"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { projects, type Project } from "@/content/content";
import { LayerSection } from "../LayerSection";
import { Reveal } from "../Reveal";

const filters = [
  { id: "ALL", label: "all" },
  { id: "FULL", label: "full-stack" },
  { id: "FE", label: "frontend" },
  { id: "BE", label: "backend" },
] as const;

const methodColor: Record<Project["method"], string> = {
  GET: "var(--l1)",
  POST: "var(--ok)",
  PUT: "var(--l4)",
  PATCH: "var(--l2)",
};

const statusText: Record<number, string> = {
  200: "OK · shipped",
  201: "Created",
  202: "Accepted · in progress",
  418: "I'm a teapot · side quest",
};

export function ApiProjects() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("ALL");
  const [open, setOpen] = useState<string | null>(projects[0]?.slug ?? null);
  const list = projects.filter((p) => filter === "ALL" || p.kind === filter);

  return (
    <LayerSection
      id="gateway"
      kicker="// routing to /projects"
      title={
        <>
          Every project is an endpoint. <span className="text-muted">Go on, call one.</span>
        </>
      }
    >
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="mr-2 text-dim">?kind=</span>
          {filters.filter((f) => f.id === "ALL" || projects.some((p) => p.kind === f.id)).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-full border px-3 py-1.5 transition-colors ${
                filter === f.id
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line-strong text-muted hover:border-fg hover:text-fg"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto hidden text-dim sm:inline">
            {list.length} route{list.length === 1 ? "" : "s"}
          </span>
        </div>
      </Reveal>

      <ul className="overflow-hidden rounded-xl border border-line bg-elev">
        {list.map((p, i) => {
          const isOpen = open === p.slug;
          return (
            <li key={p.slug} className={i > 0 ? "border-t border-line" : ""}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : p.slug)}
                aria-expanded={isOpen}
                aria-controls={`proj-${p.slug}`}
                className="group flex w-full items-center gap-3 px-4 py-5 text-left transition-colors hover:bg-elev-2 sm:gap-6 sm:px-6"
              >
                <span
                  className="w-14 shrink-0 font-mono text-xs font-semibold"
                  style={{ color: methodColor[p.method] }}
                >
                  {p.method}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-sm text-muted">
                    /projects/<span className="text-fg">{p.slug}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm text-dim sm:text-base">{p.tagline}</span>
                </span>
                <span className="hidden max-w-48 truncate font-mono text-xs text-dim md:inline">{p.org}</span>
                <span
                  className={`hidden rounded px-2 py-0.5 font-mono text-xs sm:inline ${
                    p.status < 300 && p.status !== 202 ? "bg-ok/10 text-ok" : "bg-warn/10 text-warn"
                  }`}
                >
                  {p.status}
                </span>
                <ChevronRight
                  className={`size-4 shrink-0 text-dim transition-transform ${isOpen ? "rotate-90 text-fg" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`proj-${p.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ProjectPanel p={p} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="px-6 py-10 font-mono text-sm text-dim">404: no routes match this filter.</li>
        )}
      </ul>
    </LayerSection>
  );
}

function ProjectPanel({ p }: { p: Project }) {
  return (
    <div className="grid gap-8 border-t border-dashed border-line px-4 pb-8 pt-6 sm:px-6 lg:grid-cols-2">
      <div>
        <h3 className="text-3xl font-semibold tracking-tight">{p.name}</h3>
        <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-5 space-y-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm">
              <span style={{ color: "var(--l3)" }}>▸</span>
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-accent-ink"
            >
              live <ArrowUpRight className="size-3.5" />
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 font-mono text-xs hover:border-fg"
            >
              source <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="min-w-0 rounded-lg border border-line bg-bg font-mono text-[12px] leading-6">
        <div className="flex justify-between border-b border-line px-4 py-2 text-dim">
          <span>
            <span className={p.status === 202 ? "text-warn" : "text-ok"}>{p.status}</span>{" "}
            {statusText[p.status] ?? ""}
          </span>
          <span>application/json</span>
        </div>
        <pre className="overflow-x-auto px-4 py-3">
          <Json
            value={{
              name: p.name,
              built_at: p.org,
              kind: p.kind,
              stack: p.stack,
              links: { live: p.live ?? null, repo: p.repo ?? null },
            }}
          />
        </pre>
      </div>
    </div>
  );
}

/** Tiny syntax-highlighted JSON printer. */
function Json({ value, indent = 0 }: { value: unknown; indent?: number }) {
  const pad = "  ".repeat(indent);
  const inner = "  ".repeat(indent + 1);
  if (value === null) return <span className="text-dim">null</span>;
  if (typeof value === "string") return <span className="text-accent">&quot;{value}&quot;</span>;
  if (typeof value === "number") return <span style={{ color: "var(--l4)" }}>{value}</span>;
  if (Array.isArray(value)) {
    return (
      <>
        [
        {value.map((v, i) => (
          <span key={i}>
            {"\n" + inner}
            <Json value={v} indent={indent + 1} />
            {i < value.length - 1 ? "," : ""}
          </span>
        ))}
        {"\n" + pad}]
      </>
    );
  }
  const entries = Object.entries(value as Record<string, unknown>);
  return (
    <>
      {"{"}
      {entries.map(([k, v], i) => (
        <span key={k}>
          {"\n" + inner}
          <span style={{ color: "var(--l1)" }}>&quot;{k}&quot;</span>: <Json value={v} indent={indent + 1} />
          {i < entries.length - 1 ? "," : ""}
        </span>
      ))}
      {"\n" + pad + "}"}
    </>
  );
}
