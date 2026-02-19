import type {
  KPIMetric,
  RevenueData,
  FunnelStep,
  TrafficSource,
  StateData,
  EmailCampaign,
  Campaign,
  DashboardData,
} from "@/types/dashboard";
import { config } from "@/config/prospect";

function generateSparkline(base: number, variance: number, trend: number): number[] {
  const data: number[] = [];
  let current = base - trend * 15;
  for (let i = 0; i < 30; i++) {
    current += trend + (Math.random() - 0.5) * variance;
    data.push(Math.max(0, Math.round(current)));
  }
  return data;
}

const kpis: KPIMetric[] = config.dashboard.kpis.map((kpi) => ({
  ...kpi,
  sparklineData: generateSparkline(kpi.value * 0.9, kpi.value * 0.05, kpi.value * 0.003),
}));

function generateRevenueData(): RevenueData[] {
  const categories = config.dashboard.revenueCategories;
  const data: RevenueData[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.65 : 1.0;
    const trendFactor = 1 + (29 - i) * 0.005;

    const entry: RevenueData = {
      date: date.toISOString().split("T")[0],
    };

    let total = 0;
    categories.forEach((cat, idx) => {
      const base = [850, 420, 280][idx] || 300;
      const variance = base * 0.3;
      const val = Math.round((base + Math.random() * variance) * weekendFactor * trendFactor);
      entry[cat.key] = val;
      total += val;
    });
    entry.total = total;
    data.push(entry);
  }
  return data;
}

const revenueData = generateRevenueData();

function generateFunnelSteps(): FunnelStep[] {
  const raw = config.dashboard.funnelSteps;
  return raw.map((step, i) => ({
    name: step.name,
    visitors: step.visitors,
    dropoffRate: i === 0 ? 0 : Math.round((1 - step.visitors / raw[i - 1].visitors) * 1000) / 10,
    conversionRate: Math.round((step.visitors / raw[0].visitors) * 1000) / 10,
  }));
}

const funnelSteps = generateFunnelSteps();

const trafficSources: TrafficSource[] = [
  { id: "src-001", channel: "Organic Search", sessions: 18500, conversions: 2400, conversionRate: 13.0, revenue: 48000, momChange: 14.3 },
  { id: "src-002", channel: "Paid Search", sessions: 11500, conversions: 1265, conversionRate: 11.0, revenue: 25300, momChange: 6.2 },
  { id: "src-003", channel: "Email", sessions: 8500, conversions: 1488, conversionRate: 17.5, revenue: 29760, momChange: 22.8 },
  { id: "src-004", channel: "Direct", sessions: 6700, conversions: 938, conversionRate: 14.0, revenue: 18760, momChange: 3.1 },
  { id: "src-005", channel: "Social", sessions: 3900, conversions: 351, conversionRate: 9.0, revenue: 7020, momChange: -4.7 },
  { id: "src-006", channel: "Referral", sessions: 2050, conversions: 375, conversionRate: 18.3, revenue: 7500, momChange: 31.4 },
];

const topStates: StateData[] = [
  { state: "California", sessions: 7750, conversions: 1008, conversionRate: 13.0, revenue: 20160 },
  { state: "Texas", sessions: 5250, conversions: 683, conversionRate: 13.0, revenue: 13660 },
  { state: "Florida", sessions: 4600, conversions: 644, conversionRate: 14.0, revenue: 12880 },
  { state: "New York", sessions: 3990, conversions: 479, conversionRate: 12.0, revenue: 9580 },
  { state: "Illinois", sessions: 2570, conversions: 334, conversionRate: 13.0, revenue: 6680 },
  { state: "Pennsylvania", sessions: 2240, conversions: 289, conversionRate: 12.9, revenue: 5780 },
  { state: "Ohio", sessions: 2080, conversions: 270, conversionRate: 13.0, revenue: 5400 },
  { state: "Georgia", sessions: 1860, conversions: 251, conversionRate: 13.5, revenue: 5020 },
  { state: "North Carolina", sessions: 1690, conversions: 221, conversionRate: 13.1, revenue: 4420 },
  { state: "Michigan", sessions: 1590, conversions: 197, conversionRate: 12.4, revenue: 3940 },
];

const emailCampaigns: EmailCampaign[] = [
  { id: "email-001", name: "Welcome Series", sentDate: "2026-02-15", recipients: 1200, openRate: 58.4, clickRate: 16.2, conversions: 86, revenue: 7400, status: "sent" },
  { id: "email-002", name: "Abandoned Cart", sentDate: "2026-02-14", recipients: 800, openRate: 45.6, clickRate: 21.3, conversions: 52, revenue: 4480, status: "sent" },
  { id: "email-003", name: "Monthly Newsletter", sentDate: "2026-02-10", recipients: 4200, openRate: 32.1, clickRate: 7.8, conversions: 118, revenue: 5180, status: "sent" },
  { id: "email-004", name: "Re-engagement", sentDate: "2026-02-08", recipients: 1800, openRate: 26.4, clickRate: 5.1, conversions: 28, revenue: 2410, status: "sent" },
  { id: "email-005", name: "Spring Campaign", sentDate: "2026-02-20", recipients: 3500, openRate: 0, clickRate: 0, conversions: 0, revenue: 0, status: "scheduled" },
  { id: "email-006", name: "Product Launch", sentDate: "2026-02-01", recipients: 4200, openRate: 38.2, clickRate: 12.4, conversions: 156, revenue: 8640, status: "sent" },
];

const campaigns: Campaign[] = [
  { id: "camp-001", name: "Google Ads — Branded", channel: "Paid Search", spend: 2800, revenue: 12600, roi: 350, status: "active", startDate: "2026-01-01", endDate: "2026-03-31" },
  { id: "camp-002", name: "Facebook — Prospecting", channel: "Social", spend: 2100, revenue: 5400, roi: 157, status: "active", startDate: "2026-01-15", endDate: "2026-03-15" },
  { id: "camp-003", name: "Instagram Stories", channel: "Social", spend: 1500, revenue: 3400, roi: 127, status: "active", startDate: "2026-02-01", endDate: "2026-04-30" },
  { id: "camp-004", name: "Google Ads — Non-Brand", channel: "Paid Search", spend: 4200, revenue: 8600, roi: 105, status: "active", startDate: "2026-01-01", endDate: "2026-03-31" },
  { id: "camp-005", name: "Email Automation", channel: "Email", spend: 420, revenue: 7400, roi: 1662, status: "active", startDate: "2026-01-01", endDate: "2026-12-31" },
  { id: "camp-006", name: "Referral Program", channel: "Referral", spend: 1000, revenue: 4800, roi: 380, status: "active", startDate: "2026-01-01", endDate: "2026-06-30" },
];

export const mockDashboardData: DashboardData = {
  kpis,
  revenueData,
  funnelSteps,
  trafficSources,
  topStates,
  emailCampaigns,
  campaigns,
};
