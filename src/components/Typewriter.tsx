"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Types out a list of lines one character at a time. Calls onDone when finished. */
export function useTypewriter(lines: string[], speed = 22, startDelay = 300) {
  const reduce = useReducedMotion();
  const total = lines.reduce((n, l) => n + l.length, 0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < total) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [total, speed, startDelay, reduce]);

  const shown = reduce ? total : count;
  const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.length, 0));
  const out = lines.map((line, i) => line.slice(0, Math.max(0, Math.min(line.length, shown - starts[i]))));
  return { lines: out, done: shown >= total };
}
