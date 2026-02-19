export interface KPIMetric {
  label: string;
  value: number;
  formattedValue: string;
  change: number;
  sparklineData: number[];
  icon: string;
}

export interface RevenueData {
  date: string;
  [key: string]: string | number; // dynamic category keys
}

export interface FunnelStep {
  name: string;
  visitors: number;
  dropoffRate: number;
  conversionRate: number;
}

export interface TrafficSource {
  id: string;
  channel: string;
  sessions: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  momChange: number;
}

export interface StateData {
  state: string;
  sessions: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
}

export interface EmailCampaign {
  id: string;
  name: string;
  sentDate: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  conversions: number;
  revenue: number;
  status: "sent" | "scheduled" | "draft";
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  spend: number;
  revenue: number;
  roi: number;
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate: string;
}

export interface DashboardData {
  kpis: KPIMetric[];
  revenueData: RevenueData[];
  funnelSteps: FunnelStep[];
  trafficSources: TrafficSource[];
  topStates: StateData[];
  emailCampaigns: EmailCampaign[];
  campaigns: Campaign[];
}
