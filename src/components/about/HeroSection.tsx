"use client";

interface HeroSectionProps {
  company: {
    name: string;
    fullName: string;
    tagline: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
  };
}

export function HeroSection({ company }: HeroSectionProps) {
  return (
    <div className="rounded-2xl bg-[#0a0a1a] text-white p-8 md:p-12">
      <div className="flex items-center gap-3 mb-6">
        <img src="/aldc-icon.svg" alt="ALDC" className="h-10 w-10" />
        <div>
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <p className="text-sm text-white/60">{company.fullName}</p>
        </div>
      </div>

      <p className="text-3xl md:text-4xl font-bold mb-4">{company.tagline}</p>
      <p className="text-lg text-white/70 max-w-2xl mb-8">{company.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {company.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
