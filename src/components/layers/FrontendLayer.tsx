"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { frontendTree, type FrontendSkill } from "@/content/content";
import { LayerSection } from "../LayerSection";
import { Reveal } from "../Reveal";

type Flat = { node: FrontendSkill; depth: number; path: string; closing?: boolean };

function flatten(node: FrontendSkill, depth = 0, path = node.name): Flat[] {
  if (!node.children?.length) return [{ node, depth, path }];
  return [
    { node, depth, path },
    ...node.children.flatMap((c) => flatten(c, depth + 1, `${path}.${c.name}`)),
    { node, depth, path, closing: true },
  ];
}

export function FrontendLayer() {
  const rows = flatten(frontendTree);
  const [selected, setSelected] = useState<string>(frontendTree.name);
  const selectedRow = rows.find((r) => r.path === selected && !r.closing) ?? rows[0];
  const color = "var(--l2)";

  return (
    <LayerSection
      id="frontend"
      kicker="// rendering the component tree"
      title={
        <>
          Interfaces are a tree. <span className="text-muted">This is mine. Click any node.</span>
        </>
      }
    >
      <Reveal>
        <div className="grid overflow-hidden rounded-xl border border-line bg-elev md:grid-cols-2">
          {/* source */}
          <div className="border-b border-line md:border-b-0 md:border-r">
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] text-dim">
              <span>skills.tsx</span>
              <span>tsx · {rows.filter((r) => !r.closing).length} components</span>
            </div>
            <ol className="py-3 font-mono text-[13px] leading-7">
              {rows.map((r, i) => {
                const hasKids = !!r.node.children?.length;
                const isSel = !r.closing && r.path === selected;
                const tag = r.closing ? (
                  <>
                    <span className="text-dim">&lt;/</span>
                    <span style={{ color }}>{r.node.name}</span>
                    <span className="text-dim">&gt;</span>
                  </>
                ) : (
                  <>
                    <span className="text-dim">&lt;</span>
                    <span style={{ color }}>{r.node.name}</span>
                    {r.depth === 0 && (
                      <span className="text-muted">
                        {" "}
                        role=<span className="text-accent">&quot;full-stack&quot;</span>
                      </span>
                    )}
                    <span className="text-dim">{hasKids ? ">" : " />"}</span>
                  </>
                );
                return (
                  <li key={i} className="flex">
                    <span className="w-10 shrink-0 select-none pr-3 text-right text-dim/60">{i + 1}</span>
                    {r.closing ? (
                      <span className="px-2" style={{ paddingLeft: `${r.depth * 1.25 + 0.5}rem` }}>
                        {tag}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelected(r.path)}
                        onMouseEnter={() => setSelected(r.path)}
                        aria-pressed={isSel}
                        className={`w-full rounded-sm px-2 text-left transition-colors ${
                          isSel ? "bg-accent-soft" : "hover:bg-elev-2"
                        }`}
                        style={{ paddingLeft: `${r.depth * 1.25 + 0.5}rem` }}
                      >
                        {tag}
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* preview */}
          <div className="relative flex min-h-80 flex-col">
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] text-dim">
              <span>preview</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-ok" /> rendered
              </span>
            </div>
            <div className="grid-bg pointer-events-none absolute inset-0 top-9 [mask-image:none] opacity-30" aria-hidden />
            <div className="relative flex flex-1 items-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRow.path}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.25 }}
                  aria-live="polite"
                >
                  <div className="mb-3 font-mono text-[11px] text-dim">{selectedRow.path.split(".").join(" › ")}</div>
                  <div className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color }}>
                    {selectedRow.node.name}
                  </div>
                  <p className="mt-4 max-w-sm text-lg text-muted">{selectedRow.node.detail}</p>
                  {selectedRow.node.children && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedRow.node.children.map((c) => (
                        <span
                          key={c.name}
                          className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-muted"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </LayerSection>
  );
}
