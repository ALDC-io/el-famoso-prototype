"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { FunnelStep } from "@/types/dashboard";
import { config } from "@/config/prospect";
import { formatNumber, formatPercentage } from "@/lib/utils";

interface FunnelChartProps {
  steps: FunnelStep[];
}

export function FunnelChart({ steps }: FunnelChartProps) {
  const colors = config.colors.chartColors;
  const maxVisitors = steps[0]?.visitors || 1;
  const overallConversion = steps[steps.length - 1]?.conversionRate || 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Conversion Funnel</CardTitle>
            <p className="text-sm text-muted-foreground">
              Full-funnel performance with drop-off analysis
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{formatPercentage(overallConversion)}</p>
            <p className="text-xs text-muted-foreground">Overall conversion</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, i) => {
            const widthPct = Math.max((step.visitors / maxVisitors) * 100, 8);
            const prevStep = i > 0 ? steps[i - 1] : null;
            const dropped = prevStep ? prevStep.visitors - step.visitors : 0;

            return (
              <div key={step.name}>
                {i > 0 && (
                  <div className="flex items-center gap-2 mb-1.5 ml-2">
                    <svg width="12" height="16" viewBox="0 0 12 16" className="text-red-400">
                      <path d="M6 0 L6 12 L2 8 M6 12 L10 8" stroke="currentColor" fill="none" strokeWidth="1.5" />
                    </svg>
                    <span className="text-xs text-red-500 font-medium">
                      -{formatNumber(dropped)} dropped ({formatPercentage(step.dropoffRate)})
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-36 shrink-0">
                    <p className="text-sm font-medium truncate">{step.name}</p>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: colors[i % colors.length],
                          opacity: 0.85 + (i === 0 ? 0.15 : 0),
                        }}
                      >
                        {widthPct > 20 && (
                          <span className="text-white text-xs font-semibold">
                            {formatNumber(step.visitors)}
                          </span>
                        )}
                      </div>
                    </div>
                    {widthPct <= 20 && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                        {formatNumber(step.visitors)}
                      </span>
                    )}
                  </div>
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-sm font-semibold" style={{ color: colors[i % colors.length] }}>
                      {formatPercentage(step.conversionRate)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-border/50 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold">{formatNumber(steps[0]?.visitors || 0)}</p>
            <p className="text-xs text-muted-foreground">Total Visitors</p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary">{formatNumber(steps[steps.length - 1]?.visitors || 0)}</p>
            <p className="text-xs text-muted-foreground">Conversions</p>
          </div>
          <div>
            <p className="text-lg font-bold">{formatNumber(steps[0]?.visitors - steps[steps.length - 1]?.visitors)}</p>
            <p className="text-xs text-muted-foreground">Total Drop-off</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
