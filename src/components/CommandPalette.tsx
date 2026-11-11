"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/content";
import { layers, pad } from "@/lib/layers";
import { useUI } from "@/lib/ui-context";

type Command = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, toggleTheme, raw, setRaw } = useUI();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      ...layers.map((l) => ({
        id: `go-${l.id}`,
        label: `Go to ${l.label}`,
        hint: `L${pad(l.index)} ${l.name}`,
        run: () => {
          if (raw) setRaw(false);
          setTimeout(() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }), raw ? 50 : 0);
        },
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setToast("Email copied to clipboard"),
            () => setToast(profile.email),
          );
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "resume.pdf",
        run: () => window.open(profile.resumeUrl, "_blank"),
      },
      { id: "theme", label: "Toggle theme", hint: "prod ⇄ staging", run: toggleTheme },
      { id: "raw", label: raw ? "Exit raw mode" : "View raw response", hint: "text/plain", run: () => setRaw(!raw) },
      ...profile.links
        .filter((l) => l.href.startsWith("http"))
        .map((l) => ({ id: `link-${l.label}`, label: `Open ${l.label}`, hint: "external", run: () => window.open(l.href, "_blank") })),
    ],
    [raw, setRaw, toggleTheme],
  );

  const filtered = commands.filter((c) => (c.label + c.hint).toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (paletteOpen) {
      setQuery(""); // eslint-disable-line react-hooks/set-state-in-effect
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [paletteOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const close = () => setPaletteOpen(false);
  const run = (c?: Command) => {
    if (!c) return;
    close();
    c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") run(filtered[index]);
  };

  return (
    <>
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-elev shadow-2xl"
              initial={{ y: -12, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -12, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-2 border-b border-line px-4 font-mono text-sm">
                <span className="text-accent">❯</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  placeholder="Type a command…"
                  aria-label="Search commands"
                  className="w-full bg-transparent py-4 outline-none placeholder:text-dim focus-visible:outline-none"
                />
                <kbd className="rounded border border-line px-1.5 text-[10px] text-dim">esc</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
                {filtered.map((c, i) => (
                  <li key={c.id} role="option" aria-selected={i === index}>
                    <button
                      type="button"
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => run(c)}
                      className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm ${
                        i === index ? "bg-accent-soft text-fg" : "text-muted"
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="truncate font-mono text-[11px] text-dim">{c.hint}</span>
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center font-mono text-xs text-dim">404: command not found</li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-line-strong bg-elev px-4 py-2 font-mono text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span className="text-ok">✓</span> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
