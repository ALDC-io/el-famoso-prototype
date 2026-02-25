import { useState, useEffect } from "react";
import type { DashboardData } from "@/types/dashboard";
import { mockDashboardData } from "@/lib/mock-data";
import { loadMetrics, loadFunnel } from "@/lib/data-loader";
import { isEclipseConfigured } from "@/lib/eclipse-api";

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isEclipseConfigured()) {
        // No Eclipse API — use mock data with short delay for UX
        const timer = setTimeout(() => {
          if (!cancelled) {
            setData(mockDashboardData);
            setLoading(false);
          }
        }, 600);
        return () => clearTimeout(timer);
      }

      try {
        const [metrics, funnel] = await Promise.all([loadMetrics(), loadFunnel()]);
        if (cancelled) return;

        // Merge Eclipse data with mock for fields not yet served by API
        setData({
          ...mockDashboardData,
          kpis: metrics.map((m) => ({
            ...m,
            sparklineData: Array.from({ length: 30 }, (_, i) => m.value * (0.85 + i * 0.005 + Math.random() * 0.05)),
          })),
          funnelSteps: funnel.map((f) => ({
            name: f.name,
            visitors: f.visitors,
            dropoffRate: f.dropoffRate,
            conversionRate: f.conversionRate,
          })),
        });
      } catch {
        // Fallback to mock on any error
        if (!cancelled) setData(mockDashboardData);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}
