import { SITE_CONTENT } from "@/lib/content";

export default function CompoundingHero() {
  const hero = SITE_CONTENT.compoundingHero;

  return (
    <section className="mx-auto max-w-4xl px-4 pt-8 pb-12 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        {hero.eyebrow}
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {hero.heading}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70 leading-relaxed">
        {hero.lead}{" "}
        <span className="font-semibold text-primary">
          {hero.leadHighlight}
        </span>
        .
      </p>
      <p className="mx-auto mt-3 max-w-xl text-base text-foreground/50 leading-relaxed">
        {hero.subtext}
      </p>

      {/* Value acceleration timeline */}
      <div className="mx-auto mt-12 flex max-w-2xl items-end justify-center gap-6 sm:gap-10">
        {hero.milestones.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-2">
            <div
              className="w-3 rounded-full bg-primary transition-all"
              style={{
                height: `${Math.max(m.intensity * 0.8, 16)}px`,
                opacity: 0.3 + m.intensity * 0.007,
              }}
            />
            <p className="text-sm font-bold text-primary">{m.label}</p>
            <p className="max-w-[10rem] text-xs text-foreground/40">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-md text-xs text-foreground/30">
        {hero.footer}
      </p>
    </section>
  );
}
