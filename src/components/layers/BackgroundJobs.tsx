"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import { hobbies, learning, sideQuests, type SideQuest } from "@/content/content";
import { LayerSection } from "../LayerSection";
import { Reveal } from "../Reveal";

export function BackgroundJobs() {
  return (
    <LayerSection
      id="jobs"
      kicker="// async workers · not on the critical path"
      title={
        <>
          When the shift ends, these keep running. <span className="text-muted">Life off the clock.</span>
        </>
      }
    >
      <Reveal>
        <Prompt cmd="jobs --side-quests" />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {sideQuests.map((q, i) => (
          <Reveal key={q.slug} delay={i * 0.08} className="h-full">
            <QuestCard q={q} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <Prompt cmd="tail -f learning.log" />
          <LearningLog />
        </Reveal>
        <Reveal delay={0.08}>
          <Prompt cmd="crontab -l" />
          <Crontab />
        </Reveal>
      </div>
    </LayerSection>
  );
}

function Prompt({ cmd }: { cmd: string }) {
  return (
    <div className="mb-4 font-mono text-xs text-dim">
      <span style={{ color: "var(--l7)" }}>$</span> {cmd}
    </div>
  );
}

function QuestCard({ q }: { q: SideQuest }) {
  const live = q.status === 200;
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-elev p-5 transition-colors hover:border-line-strong sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <span className={`rounded px-2 py-0.5 ${live ? "bg-ok/10 text-ok" : "bg-warn/10 text-warn"}`}>
          {live && (
            <span className="relative mr-1.5 inline-flex size-1.5 align-middle">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
            </span>
          )}
          {q.status}
        </span>
        <span className="text-dim">{q.statusNote}</span>
      </div>

      <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xl font-semibold tracking-tight">
        {q.name}
        {q.favorite && (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-normal tracking-normal" style={{ color: "var(--l3)" }}>
            <Heart className="size-3 fill-current" aria-hidden /> dear to me
          </span>
        )}
      </h3>
      <p className="mt-1 text-sm" style={{ color: "var(--l7)" }}>
        {q.tagline}
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{q.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {q.tags.map((t) => (
          <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-dim">
            #{t}
          </span>
        ))}
        {q.live && (
          <a
            href={q.live}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] transition-colors hover:border-fg"
          >
            {q.liveLabel ?? "visit"} <ArrowUpRight className="size-3" />
          </a>
        )}
      </div>
    </article>
  );
}

function LearningLog() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-xl border border-line bg-bg font-mono text-[12px] leading-6 sm:text-[13px]">
      <div className="flex justify-between border-b border-line px-4 py-2 text-dim">
        <span>currently compiling</span>
        <span className="text-warn">watching…</span>
      </div>
      <ul className="space-y-4 px-4 py-4">
        {learning.map((l, i) => (
          <li key={l.topic}>
            <div className="flex flex-wrap gap-x-3">
              <span style={{ color: "var(--l7)" }}>▸ {l.topic}</span>
              <span className="text-muted">{l.detail}</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-elev-2" aria-hidden>
              {reduce ? (
                <div className="h-full w-1/2 rounded-full" style={{ background: "var(--l7)" }} />
              ) : (
                <motion.div
                  className="h-full w-1/3 rounded-full"
                  style={{ background: "var(--l7)" }}
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                />
              )}
            </div>
          </li>
        ))}
        <li className="text-dim">
          <span className="text-ok">✓</span> no errors, still learning
          {!reduce && (
            <motion.span
              className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-fg"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              aria-hidden
            />
          )}
        </li>
      </ul>
    </div>
  );
}

function Crontab() {
  return (
    <div className="rounded-xl border border-line bg-bg font-mono text-[12px] leading-6 sm:text-[13px]">
      <div className="flex justify-between border-b border-line px-4 py-2 text-dim">
        <span>hobbies</span>
        <span>{hobbies.length} jobs scheduled</span>
      </div>
      <ul className="divide-y divide-dashed divide-line px-4">
        {hobbies.map((h) => (
          <li key={h.command} className="flex flex-wrap gap-x-4 gap-y-0.5 py-3">
            <span className="w-40 shrink-0" style={{ color: "var(--l7)" }}>
              {h.schedule}
            </span>
            <span className="text-fg">{h.command}</span>
            {h.comment && <span className="w-full text-dim sm:w-auto"># {h.comment}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
