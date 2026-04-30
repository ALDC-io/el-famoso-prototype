import { SITE_CONTENT } from "@/lib/content";

export default function CompoundingCloser() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center">
      <div className="rounded-2xl border-2 border-primary/30 bg-primary/[0.04] p-8 sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
          {SITE_CONTENT.compoundingCloser.eyebrow}
        </p>
        <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          {SITE_CONTENT.compoundingCloser.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-foreground/60 leading-relaxed">
          {SITE_CONTENT.compoundingCloser.description}
        </p>
        <div className="mx-auto mt-6 h-px w-24 bg-primary/20" />
        <p className="mt-6 text-sm text-foreground/40">
          {SITE_CONTENT.compoundingCloser.footer}
        </p>
      </div>
    </section>
  );
}
