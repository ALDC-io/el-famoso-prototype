"use client";

import { Card } from "@/components/ui/card";

const categoryColors: Record<string, string> = {
  Commerce: "bg-emerald-100 text-emerald-700",
  Payments: "bg-blue-100 text-blue-700",
  Analytics: "bg-amber-100 text-amber-700",
  Advertising: "bg-purple-100 text-purple-700",
  CRM: "bg-pink-100 text-pink-700",
  Email: "bg-orange-100 text-orange-700",
  Programmatic: "bg-cyan-100 text-cyan-700",
  ERP: "bg-slate-100 text-slate-700",
};

interface IntegrationGridProps {
  integrations: Array<{ name: string; category: string }>;
}

export function IntegrationGrid({ integrations }: IntegrationGridProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Integrations</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Eclipse connects to 16+ data sources out of the box. New integrations added regularly.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {integrations.map((integration) => (
          <Card key={integration.name} className="p-4 flex items-center justify-between">
            <span className="text-sm font-medium">{integration.name}</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[integration.category] || "bg-gray-100 text-gray-700"}`}>
              {integration.category}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
