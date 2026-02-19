export interface ProspectColors {
  primary: string;        // HSL for Tailwind, e.g. "227 100% 55%"
  accent: string;         // HSL for Tailwind
  primaryHex: string;     // Hex for Recharts, e.g. "#1B4DFF"
  accentHex: string;
  chartColors: string[];  // 3-5 hex colors for charts
}

export interface ZeusQA {
  keywords: string[];
  question: string;
  answer: string;
}

export interface ProspectConfig {
  name: string;
  tagline: string;
  domain: string;
  logoPath: string;
  colors: ProspectColors;
  dashboard: {
    kpis: Array<{
      label: string;
      value: number;
      formattedValue: string;
      change: number;
      icon: string;
    }>;
    revenueCategories: Array<{
      key: string;
      label: string;
      color: string;
    }>;
    funnelSteps: Array<{
      name: string;
      visitors: number;
    }>;
    trafficChannels: string[];
  };
  dataFlow: {
    athenaUrl: string;
    graphName: string;
    businessApps: string[];
  };
  zeus: {
    responses: ZeusQA[];
    starterChips: string[];
    fallbackMessage: string;
  };
  business: {
    type: string;
    industry: string;
    revenueRange: string;
    monthlyVisitors: number;
  };
}
