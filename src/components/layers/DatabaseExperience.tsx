"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { education, experience } from "@/content/content";
import { LayerSection } from "../LayerSection";
import { Reveal } from "../Reveal";

const color = "var(--l5)";

const fmt = (ym: string | null) => {
  if (!ym) return "present";
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

function Query({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-line px-4 py-3 font-mono text-[12px] sm:text-[13px]">
      <span className="text-dim">mihir=# </span>
      {children}
    </div>
  );
}

const kw = (s: string) => <span style={{ color }}>{s}</span>;

export function DatabaseExperience() {
  const [open, setOpen] = useState<number | null>(experience[0]?.id ?? null);

  return (
    <LayerSection
      id="database"
      kicker="// querying persistent storage"
      title={
        <>
          The persistent stuff. <span className="text-muted">Where I&apos;ve been, stored durably.</span>
        </>
      }
    >
      <Reveal>
        <div className="overflow-hidden rounded-xl border border-line bg-elev">
          <Query>
            {kw("SELECT")} company, role, period, stack {kw("FROM")} experience {kw("ORDER BY")} start{" "}
            {kw("DESC")};
          </Query>

          {/* desktop table */}
          <table className="hidden w-full text-left md:table">
            <thead className="font-mono text-[11px] uppercase tracking-wider text-dim">
              <tr className="border-b border-line">
                <th className="px-4 py-2 font-normal">id</th>
                <th className="px-4 py-2 font-normal">company</th>
                <th className="px-4 py-2 font-normal">role</th>
                <th className="px-4 py-2 font-normal">period</th>
                <th className="px-4 py-2 font-normal">stack</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((e, i) => {
                const isOpen = open === e.id;
                return (
                  <Fragment key={e.id}>
                    <motion.tr
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 }}
                      onClick={() => setOpen(isOpen ? null : e.id)}
                      className={`cursor-pointer border-b border-line transition-colors ${
                        isOpen ? "bg-elev-2" : "hover:bg-elev-2"
                      }`}
                    >
                      <td className="px-4 py-4 font-mono text-xs text-dim">{e.id}</td>
                      <td className="px-4 py-4 text-lg font-medium">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          className="text-left"
                          onClick={(ev) => {
                            ev.stopPropagation();
                            setOpen(isOpen ? null : e.id);
                          }}
                        >
                          {e.company}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-muted">{e.role}</td>
                      <td className="px-4 py-4 font-mono text-xs text-muted">
                        {fmt(e.start)} → <span className={e.end ? "" : "text-ok"}>{fmt(e.end)}</span>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-dim">{e.stack.join(", ")}</td>
                    </motion.tr>
                    {isOpen && (
                      <tr className="border-b border-line bg-elev-2">
                        <td />
                        <td colSpan={4} className="px-4 pb-6">
                          <Details e={e} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>

          {/* mobile records */}
          <ul className="md:hidden">
            {experience.map((e) => {
              const isOpen = open === e.id;
              return (
                <li key={e.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : e.id)}
                    className="w-full px-4 py-4 text-left"
                  >
                    <div className="font-mono text-[11px] text-dim">
                      -[ RECORD {e.id} ]- · {fmt(e.start)} → {fmt(e.end)}
                    </div>
                    <div className="mt-1 text-lg font-medium">{e.company}</div>
                    <div className="text-sm text-muted">{e.role}</div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden px-4"
                      >
                        <div className="pb-5">
                          <Details e={e} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="px-4 py-2 font-mono text-[11px] text-dim">({experience.length} rows)</div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-elev">
          <Query>
            {kw("SELECT")} * {kw("FROM")} education;
          </Query>
          <ul className={`grid ${education.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {education.map((ed, i) => (
              <li
                key={ed.id}
                className={`p-5 ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${i > 0 ? "border-t border-line sm:border-t-0" : ""}`}
              >
                <div className="font-mono text-[11px] text-dim">{ed.year}</div>
                <div className="mt-1 text-lg font-medium">{ed.degree}</div>
                <div className="text-muted">{ed.institution}</div>
                {ed.note && <div className="mt-2 text-sm text-dim">{ed.note}</div>}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </LayerSection>
  );
}

function Details({ e }: { e: (typeof experience)[number] }) {
  return (
    <div className="space-y-3">
      <p className="text-muted">
        {e.summary} <span className="font-mono text-xs text-dim">· {e.location}</span>
      </p>
      <ul className="space-y-1.5">
        {e.achievements.map((a) => (
          <li key={a} className="flex gap-3 text-sm">
            <span style={{ color }}>+</span>
            {a}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 pt-1 md:hidden">
        {e.stack.map((s) => (
          <span key={s} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
