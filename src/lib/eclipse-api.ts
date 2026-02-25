/**
 * Eclipse API client — fetches live data from eclipse_exp endpoints.
 *
 * Controlled by NEXT_PUBLIC_ECLIPSE_API_URL env var.
 * Falls back gracefully when the API is unavailable.
 */

const API_URL = process.env.NEXT_PUBLIC_ECLIPSE_API_URL || "";
const API_KEY = process.env.NEXT_PUBLIC_ECLIPSE_API_KEY || "";

export interface EclipseMetric {
  label: string;
  value: number;
  formattedValue: string;
  change: number;
  icon: string;
}

export interface EclipseFunnelStep {
  name: string;
  visitors: number;
  dropoffRate: number;
  conversionRate: number;
}

export interface EclipseTrendPoint {
  date: string;
  value: number;
  label?: string;
}

export interface EclipseSource {
  name: string;
  connectorType: string;
  status: string;
  lastSync?: string;
  records?: number;
}

function headers(): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (API_KEY) {
    h["X-API-Key"] = API_KEY;
  }
  return h;
}

export function isEclipseConfigured(): boolean {
  return Boolean(API_URL);
}

export async function fetchMetrics(demo = false): Promise<EclipseMetric[]> {
  const url = `${API_URL}/api/v1/prospect-data/metrics${demo ? "?demo=true" : ""}`;
  const res = await fetch(url, { headers: headers(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Eclipse API error: ${res.status}`);
  const data = await res.json();
  return data.metrics;
}

export async function fetchFunnel(demo = false): Promise<EclipseFunnelStep[]> {
  const url = `${API_URL}/api/v1/prospect-data/funnel${demo ? "?demo=true" : ""}`;
  const res = await fetch(url, { headers: headers(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Eclipse API error: ${res.status}`);
  const data = await res.json();
  return data.funnel;
}

export async function fetchTrends(months = 12, demo = false): Promise<EclipseTrendPoint[]> {
  const params = new URLSearchParams({ months: String(months) });
  if (demo) params.set("demo", "true");
  const url = `${API_URL}/api/v1/prospect-data/trends?${params}`;
  const res = await fetch(url, { headers: headers(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Eclipse API error: ${res.status}`);
  const data = await res.json();
  return data.trends;
}

export async function fetchSources(demo = false): Promise<EclipseSource[]> {
  const url = `${API_URL}/api/v1/prospect-data/sources${demo ? "?demo=true" : ""}`;
  const res = await fetch(url, { headers: headers(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Eclipse API error: ${res.status}`);
  const data = await res.json();
  return data.sources;
}

// ---------------------------------------------------------------------------
// Warehouse (gold layer explorer)
// ---------------------------------------------------------------------------

export interface WarehouseSlice {
  label: string;
  value: number;
  formattedValue: string;
}

export interface WarehouseTrend {
  period: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface WarehouseData {
  revenue: WarehouseSlice[];
  expenses: WarehouseSlice[];
  utilization: WarehouseSlice[];
  trends: WarehouseTrend[];
  demo: boolean;
}

export async function fetchWarehouse(months = 12, demo = false): Promise<WarehouseData> {
  const params = new URLSearchParams({ months: String(months) });
  if (demo) params.set("demo", "true");
  const url = `${API_URL}/api/v1/prospect-data/warehouse?${params}`;
  const res = await fetch(url, { headers: headers(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Eclipse API error: ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Profitability summary
// ---------------------------------------------------------------------------

export interface WaterfallItem {
  label: string;
  value: number;
  formattedValue: string;
  isTotal: boolean;
  isNegative: boolean;
}

export interface MarginPoint {
  period: string;
  revenue: number;
  expense: number;
  grossProfit: number;
  margin: number;
}

export interface ProfitabilitySummaryData {
  waterfall: WaterfallItem[];
  marginTrend: MarginPoint[];
  summary: { revenue: number; expense: number; grossProfit: number; margin: number };
  demo: boolean;
}

export async function fetchProfitabilitySummary(months = 12, demo = false): Promise<ProfitabilitySummaryData> {
  const params = new URLSearchParams({ months: String(months) });
  if (demo) params.set("demo", "true");
  const url = `${API_URL}/api/v1/prospect-data/profitability-summary?${params}`;
  const res = await fetch(url, { headers: headers(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Eclipse API error: ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Source health
// ---------------------------------------------------------------------------

export interface SourceHealthItem {
  name: string;
  connectorType: string;
  status: string;
  lastSync?: string;
  records: number;
  freshness: string;
}

export interface SourceHealthData {
  sources: SourceHealthItem[];
  totalRecords: number;
  healthScore: number;
  demo: boolean;
}

export async function fetchSourceHealth(demo = false): Promise<SourceHealthData> {
  const url = `${API_URL}/api/v1/prospect-data/source-health${demo ? "?demo=true" : ""}`;
  const res = await fetch(url, { headers: headers(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Eclipse API error: ${res.status}`);
  return res.json();
}
