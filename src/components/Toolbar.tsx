"use client";

import { Command, FileText, Moon, Sun } from "lucide-react";
import { useUI } from "@/lib/ui-context";

export function Toolbar() {
  const { raw, setRaw, theme, toggleTheme, setPaletteOpen } = useUI();
  const btn =
    "inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-bg/70 px-3 font-mono text-[11px] text-muted backdrop-blur-md transition-colors hover:border-fg hover:text-fg";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 sm:right-6 lg:bottom-auto lg:top-6">
      <button type="button" className={btn} onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
        <Command className="size-3.5" />
        <span className="hidden sm:inline">K</span>
      </button>
      <button
        type="button"
        className={`${btn} ${raw ? "border-accent text-accent" : ""}`}
        onClick={() => setRaw(!raw)}
        aria-pressed={raw}
        title="View the page as a raw HTTP response"
      >
        <FileText className="size-3.5" />
        <span className="hidden sm:inline">{raw ? "rendered" : "raw"}</span>
      </button>
      <button
        type="button"
        className={btn}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={theme === "dark" ? "prod (dark) → staging (light)" : "staging (light) → prod (dark)"}
      >
        {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        <span className="hidden sm:inline">{theme === "dark" ? "prod" : "staging"}</span>
      </button>
    </div>
  );
}
