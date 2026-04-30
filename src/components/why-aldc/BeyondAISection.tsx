import { SITE_CONTENT } from "@/lib/content";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className || "shrink-0 text-primary"}
    >
      <path
        d="M3 8.5l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function BeyondAISection() {
  const content = SITE_CONTENT.beyondAI;

  return (
    <section id="beyond-ai" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
        {content.description}
      </p>

      {/* Step 1: What frontier AI gives you */}
      <div className="mt-14">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {content.frontierTools.map((tool) => (
              <span
                key={tool.name}
                className="rounded-full border px-3.5 py-1.5 text-xs font-bold"
                style={{
                  borderColor: `${tool.color}30`,
                  backgroundColor: `${tool.color}08`,
                  color: tool.color,
                }}
              >
                {tool.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-foreground/40">
            {content.frontierLabel}
          </p>
          <div className="mx-auto mt-4 grid max-w-3xl gap-2 sm:grid-cols-2">
            {content.aloneCapabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-start gap-2 rounded-lg bg-white/5 px-3 py-2"
              >
                <span className="mt-0.5">
                  <CheckIcon className="shrink-0 text-foreground/30" />
                </span>
                <p className="text-sm text-foreground/50">{cap}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-foreground/40">
            {content.frontierFooter}
          </p>
        </div>
      </div>

      {/* Step 2: The single-model trap */}
      <div className="mt-2">
        <div className="flex justify-center py-3">
          <div className="flex flex-col items-center gap-1">
            <svg width="2" height="20" className="text-foreground/10">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-red-400">
              {content.singleModelTrapLabel}
            </span>
            <svg width="2" height="20" className="text-foreground/10">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>

        <div className="rounded-xl border border-red-500/15 bg-red-500/[0.03] p-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-red-400/70">
            {content.gapsLabel}
          </p>
          <div className="mx-auto mt-4 max-w-3xl space-y-3">
            {content.gaps.map((gap) => (
              <div
                key={gap.label}
                className="rounded-lg border border-red-500/10 bg-red-500/[0.03] px-4 py-3"
              >
                <p className="text-sm font-medium text-foreground/70">
                  {gap.label}
                </p>
                <p className="mt-1 text-sm text-foreground/40">{gap.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: The multiplier — ALDC stack */}
      <div className="mt-2">
        <div className="flex justify-center py-3">
          <div className="flex flex-col items-center gap-1">
            <svg width="2" height="20" className="text-foreground/10">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              {content.addIntelligenceLabel}
            </span>
            <svg width="2" height="20" className="text-foreground/10">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-primary">
            {content.stackLabel}
          </p>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-foreground/50">
            {content.stackDescription}
          </p>

          <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
            {content.aldcStack.map((layer) => (
              <div
                key={layer.name}
                className="rounded-xl border p-5"
                style={{
                  borderColor: `${layer.color}25`,
                  backgroundColor: `${layer.color}06`,
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: layer.color }}
                >
                  {layer.name}
                </p>
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: `${layer.color}99` }}
                >
                  {layer.role}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-foreground/50">
                  {layer.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-md text-center text-xs text-foreground/35">
            {content.stackFooter}
          </p>
        </div>
      </div>

      {/* Step 4: The multiplied outcome */}
      <div className="mt-2">
        <div className="flex justify-center py-3">
          <div className="flex flex-col items-center gap-1">
            <svg width="2" height="20" className="text-foreground/10">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            <span className="text-2xl font-bold text-primary">=</span>
            <svg width="2" height="12" className="text-foreground/10">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-primary/30 bg-primary/[0.04]">
          <div className="border-b border-primary/15 bg-primary/[0.05] px-6 py-4">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-primary">
              {content.memberOutcomesLabel}
            </p>
          </div>
          <div className="p-6">
            <div className="mx-auto max-w-3xl space-y-3">
              {content.memberOutcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <span className="mt-1">
                    <CheckIcon />
                  </span>
                  <p className="text-sm text-foreground/70">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Punchline */}
      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="text-lg font-semibold text-foreground/80">
          {content.punchlinePrimary}
        </p>
        <p className="mt-2 text-lg text-primary">
          {content.punchlineSecondary}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/50">
          {content.punchlineFooter}
        </p>
      </div>
    </section>
  );
}
