"use client";

import Image from "next/image";
import { profile } from "@/content/content";
import { useUI } from "@/lib/ui-context";
import { LayerSection } from "../LayerSection";
import { Reveal } from "../Reveal";

export function EdgeAbout() {
  const { years } = useUI();
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const headers: [string, string][] = [
    ["x-cache", "MISS (fetching the real person)"],
    ["age", `${years}y in production`],
    ["x-served-by", profile.location],
    ["x-timezone", profile.timezone],
    ["cache-control", "no-store, always-learning"],
  ];

  return (
    <LayerSection
      id="edge"
      kicker="// cache MISS → forwarding to origin"
      title={
        <>
          You can&apos;t cache a person. <span className="text-muted">Here&apos;s the uncached version.</span>
        </>
      }
    >
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal>
          <figure className="overflow-hidden rounded-xl border border-line bg-elev">
            <div className="relative aspect-[4/5] overflow-hidden bg-elev-2">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes={profile.photoFocus ? "(min-width: 768px) 80vw, 200vw" : "(min-width: 768px) 40vw, 100vw"}
                  priority={false}
                  className="object-cover grayscale transition duration-700 hover:grayscale-0"
                  style={
                    profile.photoFocus
                      ? {
                          objectPosition: `${profile.photoFocus.x}% ${profile.photoFocus.y}%`,
                          transform: `scale(${profile.photoFocus.zoom})`,
                          transformOrigin: `${profile.photoFocus.x}% ${profile.photoFocus.y}%`,
                        }
                      : undefined
                  }
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <div className="grid-bg absolute inset-0 [mask-image:none]" aria-hidden />
                  <span
                    className="relative text-[8rem] font-semibold tracking-tighter"
                    style={{ color: "var(--l1)" }}
                  >
                    {initials}
                  </span>
                </div>
              )}
              <span className="absolute left-3 top-3 rounded bg-bg/80 px-2 py-1 font-mono text-[10px] text-muted backdrop-blur">
                /assets{profile.photo ?? `/${profile.shortName.toLowerCase()}.jpg`}
              </span>
            </div>
            <figcaption className="border-t border-line p-4 font-mono text-[11px] leading-6">
              {headers.map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="shrink-0" style={{ color: "var(--l1)" }}>
                    {k}:
                  </span>
                  <span className="truncate text-muted">{v}</span>
                </div>
              ))}
            </figcaption>
          </figure>
        </Reveal>

        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-6 text-lg leading-relaxed text-muted sm:text-xl">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-fg" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
              {[[`${years}+`, "years shipping"], ...profile.stats.map((s) => [s.value, s.label])].map(([n, label]) => (
                <div key={label} className="p-4 sm:p-6">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{n}</dd>
                  <dd className="mt-1 font-mono text-[11px] text-dim">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </LayerSection>
  );
}
