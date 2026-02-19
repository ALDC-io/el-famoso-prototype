"use client";

import { aboutContent } from "@/config/about-aldc";
import { HeroSection } from "./HeroSection";
import { EclipseSection } from "./EclipseSection";
import { ZeusSection } from "./ZeusSection";
import { IntegrationGrid } from "./IntegrationGrid";
import { Testimonials } from "./Testimonials";
import { CTASection } from "./CTASection";

export function AboutALDC() {
  const { company, eclipse, zeus, integrations, testimonials, cta } = aboutContent;

  return (
    <div className="space-y-12">
      <HeroSection company={company} />
      <EclipseSection eclipse={eclipse} />
      <ZeusSection zeus={zeus} />
      <IntegrationGrid integrations={integrations} />
      <Testimonials testimonials={testimonials} />
      <CTASection cta={cta} />
    </div>
  );
}
