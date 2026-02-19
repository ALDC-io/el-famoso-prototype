"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface EclipseSectionProps {
  eclipse: {
    name: string;
    tagline: string;
    description: string;
    features: Array<{ title: string; description: string }>;
  };
}

export function EclipseSection({ eclipse }: EclipseSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">{eclipse.name}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{eclipse.tagline}</p>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl">{eclipse.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eclipse.features.map((feature) => (
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
