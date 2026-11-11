import { layers, pad } from "@/lib/layers";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  title: React.ReactNode;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
};

/** Shared wrapper for every layer of the "request". */
export function LayerSection({ id, title, kicker, children, className = "" }: Props) {
  const layer = layers.find((l) => l.id === id)!;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative border-t border-line px-4 py-24 sm:px-8 md:py-32 lg:px-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
            <span
              className="rounded border px-2 py-0.5"
              style={{ borderColor: layer.color, color: layer.color }}
            >
              L{pad(layer.index)}
            </span>
            <span className="uppercase tracking-[0.2em] text-muted">{layer.name}</span>
            <span className="hidden h-px w-12 bg-line sm:block" />
            <span className="text-dim">+{layer.latency}ms</span>
            {kicker && <span className="w-full text-dim sm:w-auto">{kicker}</span>}
          </div>
          <h2
            id={`${id}-title`}
            className="mb-14 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
