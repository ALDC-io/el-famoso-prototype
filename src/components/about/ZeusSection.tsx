"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface ZeusSectionProps {
  zeus: {
    name: string;
    tagline: string;
    description: string;
    features: Array<{ title: string; description: string }>;
  };
}

export function ZeusSection({ zeus }: ZeusSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Brain className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-bold">{zeus.name}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{zeus.tagline}</p>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl">{zeus.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zeus.features.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
