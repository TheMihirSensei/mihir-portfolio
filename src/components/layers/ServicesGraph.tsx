"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { serviceEdges, services } from "@/content/content";
import { LayerSection } from "../LayerSection";
import { Reveal } from "../Reveal";

const color = "var(--l4)";

export function ServicesGraph() {
  const [selected, setSelected] = useState(services[0].id);
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(services.map((s) => [s.id, s]));
  const current = byId[selected];

  return (
    <LayerSection
      id="services"
      kicker="// fan-out to internal services"
      title={
        <>
          Behind every button is a system. <span className="text-muted">These are the ones I build.</span>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-elev sm:aspect-[4/3]">
            <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:none] opacity-30" aria-hidden />
            <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {serviceEdges.map(([a, b]) => {
                const A = byId[a];
                const B = byId[b];
                const hot = a === selected || b === selected;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    vectorEffect="non-scaling-stroke"
                    className={hot ? "flow-line" : ""}
                    stroke={hot ? color : "var(--line-strong)"}
                    strokeWidth={hot ? 1.5 : 1}
                  />
                );
              })}
            </svg>

            {/* packets travelling along edges */}
            {!reduce &&
              serviceEdges.map(([a, b], i) => {
                const A = byId[a];
                const B = byId[b];
                return (
                  <motion.span
                    key={`p-${a}-${b}`}
                    aria-hidden
                    className="absolute -ml-[3px] -mt-[3px] size-1.5 rounded-full"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    initial={{ left: `${A.x}%`, top: `${A.y}%`, opacity: 0 }}
                    animate={{
                      left: [`${A.x}%`, `${B.x}%`],
                      top: [`${A.y}%`, `${B.y}%`],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ duration: 2.4, delay: i * 0.45, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                  />
                );
              })}

            {services.map((s) => {
              const isSel = s.id === selected;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelected(s.id)}
                  onMouseEnter={() => setSelected(s.id)}
                  aria-pressed={isSel}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-all sm:px-3 sm:py-2 sm:text-xs ${
                    isSel ? "scale-110 text-accent-ink" : "bg-bg text-fg hover:border-fg"
                  }`}
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    background: isSel ? color : undefined,
                    borderColor: isSel ? color : "var(--line-strong)",
                    boxShadow: isSel ? `0 0 30px -4px ${color}` : undefined,
                  }}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-xl border border-line bg-elev">
            <div className="flex items-center justify-between border-b border-line px-5 py-2 font-mono text-[11px] text-dim">
              <span>svc/{current.id}</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-ok" /> healthy
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="flex-1 p-6"
                aria-live="polite"
              >
                <h3 className="text-3xl font-semibold tracking-tight" style={{ color }}>
                  {current.name}
                </h3>
                <p className="mt-2 text-muted">{current.note}</p>
                <ul className="mt-8 space-y-5">
                  {current.tools.map((t) => (
                    <li key={t.name}>
                      <div className="mb-2 flex justify-between font-mono text-xs">
                        <span>{t.name}</span>
                        <span className="text-dim">{["", "learning", "familiar", "solid", "strong", "expert"][t.level]}</span>
                      </div>
                      <div className="flex gap-1" aria-label={`${t.level} out of 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="h-1.5 flex-1 rounded-full"
                            style={{ background: i < t.level ? color : "var(--line)" }}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </LayerSection>
  );
}
