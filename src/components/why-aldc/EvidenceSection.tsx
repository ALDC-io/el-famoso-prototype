import { SITE_CONTENT } from "@/lib/content";

function ConfidenceBadge({ score }: { score: number }) {
  const color =
    score >= 90 ? "#10b981" : score >= 80 ? "#f59e0b" : "#ef4444";
  const label = score >= 90 ? "High" : score >= 80 ? "Moderate" : "Low";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{ backgroundColor: `${color}15`, color }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label} confidence &mdash; {score}%
    </span>
  );
}

export default function EvidenceSection() {
  const ev = SITE_CONTENT.evidence;

  return (
    <section id="evidence" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {ev.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
        {ev.description}
      </p>

      {/* Principles row */}
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
        {ev.principles.map((p) => (
          <div
            key={p.label}
            className="rounded-lg border border-primary/15 bg-primary/[0.03] px-3 py-2.5 text-center"
          >
            <p className="text-xs font-semibold text-primary">{p.label}</p>
            <p className="mt-0.5 text-[10px] text-foreground/65">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Single mock interaction */}
      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
        {/* Question */}
        <div className="border-b border-slate-200/70 bg-slate-50 px-5 py-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
              Q
            </span>
            <p className="text-sm font-medium text-foreground/70">
              {ev.mockQuestion}
            </p>
          </div>
        </div>

        {/* Answer */}
        <div className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <ConfidenceBadge score={ev.mockConfidenceScore} />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-500">
              <svg width="10" height="10" viewBox="0 0 16 16" className="shrink-0">
                <path
                  d="M8 1l2.5 5H15l-4 3.5 1.5 5.5L8 12l-4.5 3 1.5-5.5L1 6h4.5z"
                  fill="currentColor"
                />
              </svg>
              {ev.mockRoutingLabel}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            {ev.mockAnswer}
          </p>

          {/* Sources */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ev.sources.map((s) => (
              <span
                key={s.ref}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200/70 bg-slate-50 px-2 py-1 text-[10px] text-foreground/65"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 14 14"
                  className="shrink-0 text-primary/50"
                >
                  <path
                    d="M2 1h7l3 3v8a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
                {s.ref}
                <span className="text-foreground/70">{s.date}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Callout */}
      <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
        <p className="text-foreground/80">
          {ev.calloutPrimary}
        </p>
        <p className="mt-2 text-primary">
          {ev.calloutSecondary}
        </p>
      </div>
    </section>
  );
}
