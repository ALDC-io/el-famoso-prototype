/**
 * DataLoader — tries Eclipse API first, falls back to mock data.
 *
 * Controlled by NEXT_PUBLIC_ECLIPSE_API_URL. When the env var is not set
 * or the API is unreachable, mock data from prospect.ts config is used.
 */

import { config } from "@/config/prospect";
import { mockDashboardData } from "@/lib/mock-data";
import {
  isEclipseConfigured,
  fetchMetrics,
  fetchFunnel,
  fetchTrends,
  fetchSources,
  fetchWarehouse,
  fetchProfitabilitySummary,
  fetchSourceHealth,
  type EclipseMetric,
  type EclipseFunnelStep,
  type EclipseTrendPoint,
  type EclipseSource,
  type WarehouseData,
  type ProfitabilitySummaryData,
  type SourceHealthData,
} from "@/lib/eclipse-api";

export async function loadMetrics(): Promise<EclipseMetric[]> {
  if (isEclipseConfigured()) {
    try {
      return await fetchMetrics();
    } catch (err) {
      console.warn("[DataLoader] Eclipse metrics unavailable, using mock data:", err);
    }
  }
  return config.dashboard.kpis.map((kpi) => ({
    label: kpi.label,
    value: kpi.value,
    formattedValue: kpi.formattedValue,
    change: kpi.change,
    icon: kpi.icon,
  }));
}

export async function loadFunnel(): Promise<EclipseFunnelStep[]> {
  if (isEclipseConfigured()) {
    try {
      return await fetchFunnel();
    } catch (err) {
      console.warn("[DataLoader] Eclipse funnel unavailable, using mock data:", err);
    }
  }
  return mockDashboardData.funnelSteps.map((step) => ({
    name: step.name,
    visitors: step.visitors,
    dropoffRate: step.dropoffRate,
    conversionRate: step.conversionRate,
  }));
}

export async function loadTrends(months = 12): Promise<EclipseTrendPoint[]> {
  if (isEclipseConfigured()) {
    try {
      return await fetchTrends(months);
    } catch (err) {
      console.warn("[DataLoader] Eclipse trends unavailable, using mock data:", err);
    }
  }
  // Generate monthly trend points from revenue data
  const data = mockDashboardData.revenueData;
  const step = Math.max(1, Math.floor(data.length / months));
  return data
    .filter((_, i) => i % step === 0)
    .slice(0, months)
    .map((d) => ({
      date: d.date as string,
      value: (d.total as number) || 0,
    }));
}

export async function loadSources(): Promise<EclipseSource[]> {
  if (isEclipseConfigured()) {
    try {
      return await fetchSources();
    } catch (err) {
      console.warn("[DataLoader] Eclipse sources unavailable, using mock data:", err);
    }
  }
  return config.dataFlow.businessApps.map((name) => ({
    name,
    connectorType: name.toLowerCase().replace(/\s+/g, "_"),
    status: "connected",
  }));
}

export async function loadWarehouse(months = 12): Promise<WarehouseData> {
  if (isEclipseConfigured()) {
    try {
      return await fetchWarehouse(months);
    } catch (err) {
      console.warn("[DataLoader] Eclipse warehouse unavailable, using mock data:", err);
    }
  }
  // Mock warehouse data from config
  const cats = config.dashboard.revenueCategories;
  return {
    revenue: cats.map((c) => ({
      label: c.label,
      value: Math.round(Math.random() * 100000 + 50000),
      formattedValue: "",
    })),
    expenses: [
      { label: "Operations", value: 45000, formattedValue: "$45K" },
      { label: "Marketing", value: 22000, formattedValue: "$22K" },
      { label: "Admin", value: 12000, formattedValue: "$12K" },
    ],
    utilization: [
      { label: "Team Lead", value: 142, formattedValue: "142h" },
      { label: "Developer 1", value: 136, formattedValue: "136h" },
      { label: "Developer 2", value: 128, formattedValue: "128h" },
    ],
    trends: Array.from({ length: months }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const rev = 80000 + Math.random() * 40000;
      const exp = rev * 0.6;
      return {
        period: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
        revenue: Math.round(rev),
        expenses: Math.round(exp),
        net: Math.round(rev - exp),
      };
    }),
    demo: true,
  };
}

export async function loadProfitabilitySummary(months = 12): Promise<ProfitabilitySummaryData> {
  if (isEclipseConfigured()) {
    try {
      return await fetchProfitabilitySummary(months);
    } catch (err) {
      console.warn("[DataLoader] Eclipse profitability unavailable, using mock data:", err);
    }
  }
  return {
    waterfall: [
      { label: "Revenue", value: 285000, formattedValue: "$285K", isTotal: false, isNegative: false },
      { label: "Labour", value: -142000, formattedValue: "-$142K", isTotal: false, isNegative: true },
      { label: "Gross Profit", value: 143000, formattedValue: "$143K", isTotal: true, isNegative: false },
      { label: "Overhead", value: -52000, formattedValue: "-$52K", isTotal: false, isNegative: true },
      { label: "Net Profit", value: 91000, formattedValue: "$91K", isTotal: true, isNegative: false },
    ],
    marginTrend: Array.from({ length: months }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const rev = 240000 + Math.random() * 60000;
      const exp = rev * (0.5 + Math.random() * 0.15);
      return {
        period: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
        revenue: Math.round(rev),
        expense: Math.round(exp),
        grossProfit: Math.round(rev - exp),
        margin: Math.round((rev - exp) / rev * 1000) / 10,
      };
    }),
    summary: { revenue: 285000, expense: 194000, grossProfit: 91000, margin: 31.9 },
    demo: true,
  };
}

export async function loadSourceHealth(): Promise<SourceHealthData> {
  if (isEclipseConfigured()) {
    try {
      return await fetchSourceHealth();
    } catch (err) {
      console.warn("[DataLoader] Eclipse source health unavailable, using mock data:", err);
    }
  }
  const apps = config.dataFlow.businessApps;
  const sources = apps.map((name) => ({
    name,
    connectorType: name.toLowerCase().replace(/\s+/g, "_"),
    status: "connected" as const,
    lastSync: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    records: Math.round(Math.random() * 50000 + 5000),
    freshness: "fresh" as const,
  }));
  return {
    sources,
    totalRecords: sources.reduce((s, x) => s + x.records, 0),
    healthScore: 95.0,
    demo: true,
  };
}
