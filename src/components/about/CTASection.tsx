"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface CTASectionProps {
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}

export function CTASection({ cta }: CTASectionProps) {
  return (
    <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center">
      <h2 className="text-2xl font-bold mb-3">{cta.heading}</h2>
      <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">{cta.description}</p>
      <Button
        size="lg"
        onClick={() => window.open(cta.buttonUrl, "_blank")}
        className="gap-2"
      >
        {cta.buttonText}
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
}
