"use client";

import { useUI } from "@/lib/ui-context";
import { TraceRail } from "./TraceRail";
import { Toolbar } from "./Toolbar";
import { CommandPalette } from "./CommandPalette";
import { RawView } from "./RawView";

/** Switches between the rendered experience and the raw-text response. */
export function Portfolio({ children }: { children: React.ReactNode }) {
  const { raw } = useUI();
  return (
    <>
      <a
        href="#edge"
        className="sr-only z-[90] rounded bg-accent px-3 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Toolbar />
      <CommandPalette />
      {raw ? (
        <RawView />
      ) : (
        <>
          <TraceRail />
          <main className="lg:pl-56">{children}</main>
        </>
      )}
    </>
  );
}
