import { SITE_CONTENT } from "@/lib/content";

export default function StackSpectrumSection() {
  const content = SITE_CONTENT.stackSpectrum;

  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
        {content.description}
      </p>

      {/* AI Capabilities */}
      <div className="mt-10 flex justify-center">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] px-6 py-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/70">
            {content.capabilitiesLabel}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
            {content.capabilities.map((cap) => (
              <div key={cap.name} className="flex flex-col items-center">
                <span
                  className="rounded-full border px-2.5 py-1 text-[11px] font-bold"
                  style={{
                    borderColor: `${cap.color}35`,
                    backgroundColor: `${cap.color}10`,
                    color: cap.color,
                  }}
                >
                  {cap.name}
                </span>
                <span className="mt-1 max-w-[9rem] text-[9px] text-foreground/60">
                  {cap.desc}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[10px] text-foreground/60">
            {content.capabilitiesFooter}
          </p>
        </div>
      </div>

      {/* Arrows */}
      <div className="flex justify-center py-2">
        <svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          className="text-amber-500/30"
        >
          <path
            d="M60 0v8 M60 8L20 20 M60 8L40 20 M60 8v12 M60 8L80 20 M60 8L100 20"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* How It Works */}
      <div className="rounded-xl border-2 border-primary/25 bg-primary/[0.02] p-4 sm:p-5">
        <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-primary">
          {content.spectrumLabel}
        </p>
        <p className="mt-1 text-center text-[11px] text-foreground/60">
          {content.spectrumSubLabel}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {content.spectrum.map((group) => (
            <div key={group.label}>
              <p
                className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest"
                style={{ color: group.color }}
              >
                {group.label}
              </p>
              <div className="space-y-1.5">
                {group.stages.map((stage) => (
                  <div
                    key={stage.name}
                    className="rounded-lg border px-3 py-2"
                    style={{
                      borderColor: `${group.color}18`,
                      backgroundColor: `${group.color}06`,
                    }}
                  >
                    <p
                      className="text-xs font-semibold"
                      style={{ color: group.color }}
                    >
                      {stage.name}
                    </p>
                    <p className="text-[10px] text-foreground/60">
                      {stage.sub}
                    </p>
                    {stage.ai && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold text-amber-500">
                          {stage.ai}
                        </span>
                        <span className="text-[9px] text-foreground/60">
                          {stage.aiRole}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feedback loop */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <svg width="16" height="12" viewBox="0 0 16 12" className="text-primary/40">
            <path
              d="M14 6H4m0 0l3-3M4 6l3 3"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] text-foreground/60">
            {content.feedbackLoop}{" "}
            <span className="font-medium text-primary/70">
              {content.feedbackLoopHighlight}
            </span>
          </span>
        </div>
      </div>

      {/* Punchline */}
      <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
        <p className="text-sm text-foreground/70">
          {content.callout}{" "}
          <span className="font-semibold text-primary">
            {content.calloutHighlight}
          </span>
          .
        </p>
      </div>
    </section>
  );
}
