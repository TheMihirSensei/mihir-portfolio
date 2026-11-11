"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/content/content";
import { useTypewriter } from "../Typewriter";

const request = [
  `GET / HTTP/1.1`,
  `Host: ${profile.domain}`,
  `Accept: talent/full-stack; q=1.0`,
  `User-Agent: You (curious recruiter or fellow dev)`,
  `X-Looking-For: someone who ships end to end`,
];

export function ClientHero() {
  const { lines, done } = useTypewriter(request, 18);
  const reduce = useReducedMotion();
  const firstName = profile.name.split(" ")[0];
  const rest = profile.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="client"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-8 lg:px-16"
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* the request being composed */}
        <div className="mb-12 max-w-xl overflow-hidden rounded-lg border border-line bg-elev/80 font-mono text-[12px] leading-relaxed shadow-2xl shadow-black/20 backdrop-blur sm:text-[13px]">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2 text-dim">
            <span className="size-2.5 rounded-full bg-err/70" />
            <span className="size-2.5 rounded-full bg-warn/70" />
            <span className="size-2.5 rounded-full bg-ok/70" />
            <span className="ml-2 truncate">request.http</span>
            <span className="ml-auto text-[11px]">L00 · client</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words px-4 py-3" aria-label={request.join("\n")}>
            {lines.map((l, i) => {
              if (!l && i > 0) return null;
              const isLast = i === lines.findLastIndex((x) => x.length > 0);
              const [k, ...v] = l.split(": ");
              return (
                <div key={i} className={isLast && !done ? "caret" : ""}>
                  {i === 0 ? (
                    <>
                      <span className="text-accent">{l.slice(0, 3)}</span>
                      <span>{l.slice(3)}</span>
                    </>
                  ) : v.length ? (
                    <>
                      <span className="text-muted">{k}:</span> <span>{v.join(": ")}</span>
                    </>
                  ) : (
                    <span className="text-muted">{l}</span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>

        <motion.p
          className="mb-4 font-mono text-sm text-muted"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {profile.role} · {profile.location}
        </motion.p>

        <h1 className="text-[clamp(3.2rem,11vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
          <motion.span
            className="block"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {firstName}
          </motion.span>
          <motion.span
            className="block text-transparent [-webkit-text-stroke:1.5px_var(--fg)]"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {rest}
            <span className="text-accent [-webkit-text-stroke:0]">.</span>
          </motion.span>
        </h1>

        <motion.div
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{profile.pitch}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#edge"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              send request
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 font-mono text-sm transition-colors hover:border-fg"
            >
              <Download className="size-4" /> resume
            </a>
          </div>
        </motion.div>

        {profile.available && (
          <div className="mt-12 inline-flex items-center gap-2 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            {profile.availabilityNote}
          </div>
        )}
      </div>
    </section>
  );
}
