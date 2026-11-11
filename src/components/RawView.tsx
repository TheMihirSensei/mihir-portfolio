"use client";

import { useUI } from "@/lib/ui-context";
import {
  education,
  experience,
  frontendTree,
  hobbies,
  learning,
  profile,
  projects,
  services,
  sideQuests,
  type FrontendSkill,
} from "@/content/content";

const flat = (n: FrontendSkill): string[] => [n.name, ...(n.children ?? []).flatMap(flat)];

/** The entire portfolio as a plain-text HTTP response. Recruiter-friendly and screen-reader friendly. */
export function RawView() {
  const { years } = useUI();
  const text = [
    "HTTP/1.1 200 OK",
    "Content-Type: text/plain; charset=utf-8",
    `X-Powered-By: ${profile.name}`,
    `X-Experience: ${years}+ years`,
    "",
    `# ${profile.name}, ${profile.role}`,
    `${profile.location} · ${profile.timezone}${profile.available ? ` · ${profile.availabilityNote}` : ""}`,
    "",
    profile.pitch,
    "",
    "## About",
    ...profile.bio.flatMap((p) => [p, ""]),
    "## Frontend",
    flat(frontendTree).slice(1).join(", "),
    "",
    "## Backend & Infra",
    ...services.map((s) => `- ${s.name}: ${s.tools.map((t) => t.name).join(", ")}`),
    "",
    "## Projects",
    ...projects.flatMap((p) => [
      `- ${p.name} (${p.org}): ${p.tagline}`,
      `  ${p.description}`,
      `  stack: ${p.stack.join(", ")}`,
      ...(p.live ? [`  live: ${p.live}`] : []),
      ...(p.repo ? [`  repo: ${p.repo}`] : []),
      "",
    ]),
    "## Experience",
    ...experience.flatMap((e) => [
      `- ${e.role} @ ${e.company} (${e.start} → ${e.end ?? "present"}, ${e.location})`,
      ...e.achievements.map((a) => `  * ${a}`),
      "",
    ]),
    "## Education & Certifications",
    ...education.map((e) => `- ${e.degree}, ${e.institution} (${e.year})`),
    "",
    "## Side projects",
    ...sideQuests.flatMap((q) => [
      `- ${q.name} (${q.statusNote}): ${q.tagline}`,
      `  ${q.description}`,
      ...(q.live ? [`  link: ${q.live}`] : []),
      "",
    ]),
    "## Currently learning",
    ...learning.map((l) => `- ${l.topic}: ${l.detail}`),
    "",
    "## Hobbies",
    ...hobbies.map((h) => `- ${h.command}${h.comment ? ` (${h.comment})` : ""}`),
    "",
    "## Contact",
    `email: ${profile.email}`,
    ...profile.links.filter((l) => l.href.startsWith("http")).map((l) => `${l.label.toLowerCase()}: ${l.href}`),
    `resume: ${profile.resumeUrl}`,
  ].join("\n");

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-24 sm:px-8">
      <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-fg">{text}</pre>
    </main>
  );
}
