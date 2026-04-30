import { SITE_CONTENT } from "@/lib/content";

export default function UnifiedViewSection() {
  const content = SITE_CONTENT.unifiedView;

  return (
    <section id="unified" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
        {content.description}
      </p>

      {/* Three-tier visual: Silos → Unified → Views */}
      <div className="mt-12">
        {/* Tier 1: Data Silos */}
        <div>
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-foreground/60">
            {content.silosLabel}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {content.dataSilos.map((silo) => (
              <div
                key={silo.name}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-center"
              >
                <p className="text-xs font-medium text-foreground/60">
                  {silo.name}
                </p>
                <p className="mt-0.5 text-[10px] text-foreground/60">
                  {silo.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Converge arrow */}
        <div className="flex justify-center py-4">
          <div className="flex flex-col items-center gap-1">
            <svg width="120" height="28" viewBox="0 0 120 28" className="text-primary/30">
              <path d="M10 0 L60 22" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M40 0 L60 22" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M80 0 L60 22" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M110 0 L60 22" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="60" cy="24" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Tier 2: Unified Layer */}
        <div className="rounded-xl border-2 border-primary/30 bg-primary/[0.04] p-5">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                <svg width="16" height="16" viewBox="0 0 16 16" className="text-primary">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-primary">
                  {content.unifiedLayerName}
                </p>
                <p className="text-[10px] text-foreground/65">
                  {content.unifiedLayerSub}
                </p>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-3 max-w-lg text-center text-xs text-foreground/65">
            {content.unifiedLayerDescription}
          </p>
        </div>

        {/* Fan-out arrow */}
        <div className="flex justify-center py-4">
          <div className="flex flex-col items-center gap-1">
            <svg width="120" height="28" viewBox="0 0 120 28" className="text-primary/30">
              <circle cx="60" cy="4" r="3" fill="currentColor" />
              <path d="M60 6 L10 28" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M60 6 L40 28" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M60 6 L60 28" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M60 6 L80 28" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M60 6 L110 28" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        {/* Tier 3: Purpose-built views */}
        <div>
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-foreground/60">
            {content.viewsLabel}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {content.views.map((view) => (
              <div
                key={view.name}
                className="rounded-lg border p-3"
                style={{
                  borderColor: `${view.color}20`,
                  backgroundColor: `${view.color}05`,
                }}
              >
                <p
                  className="text-xs font-semibold"
                  style={{ color: view.color }}
                >
                  {view.name}
                </p>
                <p className="mt-1 text-[11px] text-foreground/65">
                  {view.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center">
            <span className="rounded-full border border-dashed border-foreground/15 px-4 py-1.5 text-[11px] text-foreground/60">
              {content.viewsFooter}
            </span>
          </div>
        </div>
      </div>

      {/* Callout */}
      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
        <p className="text-foreground/80">
          {content.calloutPrimary}
        </p>
        <p className="mt-1 text-primary">
          {content.calloutSecondary}
        </p>
      </div>
    </section>
  );
}
