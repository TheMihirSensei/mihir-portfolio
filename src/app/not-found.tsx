import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative max-w-lg font-mono">
        <p className="text-sm text-err">HTTP/1.1 404 Not Found</p>
        <h1 className="mt-4 font-sans text-6xl font-semibold tracking-tight sm:text-7xl">
          This route isn&apos;t deployed yet.
        </h1>
        <pre className="mt-8 overflow-x-auto rounded-lg border border-line bg-elev p-4 text-xs leading-6 text-muted">
{`{
  "error": "NOT_FOUND",
  "hint": "maybe it's still in a feature branch",
  "suggestion": "GET /"
}`}
        </pre>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink"
        >
          ← GET /
        </Link>
      </div>
    </main>
  );
}
