import { config } from "@/config/prospect";
import CompoundingHero from "@/components/why-aldc/CompoundingHero";
import SectionDivider from "@/components/why-aldc/SectionDivider";
import BeyondAISection from "@/components/why-aldc/BeyondAISection";
import StackSpectrumSection from "@/components/why-aldc/StackSpectrumSection";
import UnifiedViewSection from "@/components/why-aldc/UnifiedViewSection";
import EvidenceSection from "@/components/why-aldc/EvidenceSection";
import CompoundingCloser from "@/components/why-aldc/CompoundingCloser";

export const metadata = {
  title: `Why ALDC — ${config.name}`,
  description: `How ALDC's Enterprise Intelligence compounds for ${config.name}.`,
};

export default function WhyALDCPage() {
  return (
    <div>
      <CompoundingHero />
      <SectionDivider />
      <BeyondAISection />
      <SectionDivider />
      <StackSpectrumSection />
      <SectionDivider />
      <UnifiedViewSection />
      <SectionDivider />
      <EvidenceSection />
      <SectionDivider />
      <CompoundingCloser />
    </div>
  );
}
