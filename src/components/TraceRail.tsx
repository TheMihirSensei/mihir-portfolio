"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { layers, pad } from "@/lib/layers";
import { useActiveLayer } from "@/lib/useActiveLayer";

export function TraceRail() {
  const active = useActiveLayer();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const progress = reduce ? scrollYProgress : smooth;
  const top = useTransform(progress, [0, 1], ["0%", "100%"]);
  const current = layers[active];
  const done = active === layers.length - 1;

  return (
    <>
      {/* Desktop: vertical tracing waterfall */}
      <aside
        aria-label="Request trace"
        className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col justify-center border-r border-line bg-bg/70 px-6 backdrop-blur-md lg:flex"
      >
        <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
          trace&nbsp;·&nbsp;<span className="text-muted">req_7f3a</span>
        </div>

        <div className="relative">
          {/* rail */}
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-line" />
          <motion.div
            className="absolute left-[5px] top-1 w-px origin-top bg-accent"
            style={{ height: top }}
          />
          {/* packet */}
          {!reduce && (
            <motion.div
              className="absolute left-[1px] z-10 -mt-1 size-[9px] rounded-full bg-accent shadow-[0_0_14px_4px_var(--accent-soft)]"
              style={{ top }}
              aria-hidden
            />
          )}

          <ol className="relative space-y-7">
            {layers.map((l) => {
              const reached = l.index <= active;
              const isActive = l.index === active;
              return (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="group flex items-start gap-4">
                    <span
                      className="mt-1 size-[11px] shrink-0 rounded-full border-2 transition-colors"
                      style={{
                        borderColor: reached ? l.color : "var(--line-strong)",
                        background: isActive ? l.color : "var(--bg)",
                      }}
                    />
                    <span className="flex flex-col leading-tight">
                      <span
                        className={`font-mono text-[11px] transition-colors ${
                          isActive ? "text-fg" : "text-dim group-hover:text-muted"
                        }`}
                      >
                        {pad(l.index)} {l.name}
                      </span>
                      <span
                        className={`text-sm transition-colors ${
                          isActive ? "text-fg" : "text-dim group-hover:text-muted"
                        }`}
                      >
                        {l.label}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-dim">
          <div>
            elapsed <span className="text-fg tabular-nums">{pad(current.latency, 3)}ms</span>
          </div>
          <div>
            status{" "}
            <span className={done ? "text-ok" : "text-warn"}>{done ? "200 OK" : "pending…"}</span>
          </div>
        </div>
      </aside>

      {/* Mobile / tablet: slim top bar */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between px-4 py-2 font-mono text-[11px]">
          <span className="text-muted">
            <span style={{ color: current.color }}>●</span> {pad(current.index)} {current.name}
          </span>
          <span className="text-dim tabular-nums">
            {pad(current.latency, 3)}ms ·{" "}
            <span className={done ? "text-ok" : "text-warn"}>{done ? "200" : "…"}</span>
          </span>
        </div>
        <motion.div className="h-px origin-left bg-accent" style={{ scaleX: progress }} />
      </div>
    </>
  );
}
