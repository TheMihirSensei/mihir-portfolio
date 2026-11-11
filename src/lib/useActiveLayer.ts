"use client";

import { useEffect, useState } from "react";
import { layers } from "./layers";

/** Returns the index of the layer section currently around the middle of the viewport. */
export function useActiveLayer() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = layers
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = layers.findIndex((l) => l.id === entry.target.id);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
