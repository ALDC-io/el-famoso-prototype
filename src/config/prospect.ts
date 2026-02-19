import type { ProspectConfig } from "@/types/prospect";

export const config: ProspectConfig = {
  // ============================================================
  // PROSPECT IDENTITY — Update these for each new prospect
  // ============================================================
  name: "Prospect Name",
  tagline: "Marketing Intelligence",
  domain: "prospect.analyticlabs.io",
  logoPath: "/prospect-logo.svg",

  colors: {
    primary: "227 100% 55%",
    accent: "191 100% 50%",
    primaryHex: "#1B4DFF",
    accentHex: "#00D4FF",
    chartColors: ["#1B4DFF", "#00D4FF", "#8B5CF6", "#10B981", "#F59E0B"],
  },

  // ============================================================
  // DASHBOARD — Customize KPIs, charts, and funnel for industry
  // ============================================================
  dashboard: {
    kpis: [
      { label: "Monthly Revenue", value: 125000, formattedValue: "$125K", change: 12.4, icon: "dollar-sign" },
      { label: "Conversion Rate", value: 3.8, formattedValue: "3.8%", change: 0.6, icon: "target" },
      { label: "Active Customers", value: 4200, formattedValue: "4,200", change: 8.2, icon: "users" },
      { label: "Avg Order Value", value: 86, formattedValue: "$86", change: 5.1, icon: "trending-up" },
    ],
    revenueCategories: [
      { key: "productA", label: "Product A", color: "#1B4DFF" },
      { key: "productB", label: "Product B", color: "#00D4FF" },
      { key: "productC", label: "Product C", color: "#8B5CF6" },
    ],
    funnelSteps: [
      { name: "Website Visitors", visitors: 50000 },
      { name: "Product Views", visitors: 18000 },
      { name: "Add to Cart", visitors: 6500 },
      { name: "Checkout", visitors: 3200 },
      { name: "Purchase", visitors: 1900 },
    ],
    trafficChannels: ["Organic Search", "Paid Search", "Email", "Direct", "Social", "Referral"],
  },

  // ============================================================
  // DATA FLOW — Athena visualization config
  // ============================================================
  dataFlow: {
    athenaUrl: "", // Set to Athena graph URL when available
    graphName: "Data Flow Architecture",
    businessApps: ["Shopify", "Google Analytics", "Meta Ads", "Klaviyo"],
  },

  // ============================================================
  // ZEUS CHAT — Q&A responses for prospect context
  // ============================================================
  zeus: {
    responses: [
      {
        keywords: ["who", "what is", "about", "aldc", "company"],
        question: "What is ALDC?",
        answer: "ALDC (Analytic Labs Data Company) is a data analytics company founded in 2019 in Vancouver, Canada. We specialize in marketing intelligence and data integration through our Eclipse and Zeus platforms.",
      },
      {
        keywords: ["eclipse", "platform", "tool"],
        question: "What is Eclipse?",
        answer: "Eclipse is ALDC's marketing intelligence platform. It connects all your marketing data sources, normalizes the data, and provides unified analytics across channels. Think of it as a single pane of glass for your marketing performance.",
      },
      {
        keywords: ["zeus", "memory", "ai"],
        question: "What is Zeus?",
        answer: "Zeus Memory is ALDC's AI knowledge engine. It stores and connects insights across your entire marketing ecosystem, building an institutional memory that gets smarter over time. I'm powered by Zeus right now.",
      },
      {
        keywords: ["revenue", "sales", "money", "income"],
        question: "How is revenue performing?",
        answer: "Monthly revenue is trending at $125K with a 12.4% month-over-month increase. The strongest growth is in Product A, which accounts for roughly 45% of total revenue. Check the dashboard for the full 30-day breakdown.",
      },
      {
        keywords: ["conversion", "convert", "funnel", "rate"],
        question: "What's the conversion rate?",
        answer: "Overall site-to-purchase conversion is 3.8%, up 0.6% from last month. The biggest drop-off is between product views and add-to-cart — about 64% of viewers don't add to cart. This is where optimization will have the biggest impact.",
      },
      {
        keywords: ["traffic", "visitors", "sessions", "organic"],
        question: "Where does traffic come from?",
        answer: "Organic search drives the largest volume at about 37% of total sessions, followed by paid search at 23%. Email has the highest conversion rate at 17.5%. Referral traffic is small but growing fastest at +31% MoM.",
      },
      {
        keywords: ["email", "campaign", "newsletter", "open rate"],
        question: "How are email campaigns performing?",
        answer: "Email is your highest-ROI channel. The welcome series has a 62% open rate and drives significant revenue. Average open rate across all campaigns is around 38%, well above the industry benchmark of 21%.",
      },
      {
        keywords: ["roi", "spend", "budget", "campaign", "ads"],
        question: "What's the best performing campaign?",
        answer: "Email automation delivers the highest ROI at 1,654% — $480 spend generating $8,420 in revenue. Branded search is next at 363% ROI. Non-branded search has the lowest ROI at 104% and may need optimization.",
      },
      {
        keywords: ["help", "can you", "what can"],
        question: "What can you help with?",
        answer: "I can answer questions about your marketing performance, revenue trends, traffic sources, email campaigns, and conversion funnel. Try asking about revenue, traffic, campaigns, or conversion rates.",
      },
      {
        keywords: ["integrate", "connect", "data source", "api"],
        question: "What integrations are available?",
        answer: "Eclipse integrates with 16+ platforms including Shopify, Google Analytics, Meta Ads, Google Ads, Klaviyo, Stripe, HubSpot, Bing Ads, LinkedIn Ads, and more. Data flows are automated and updated daily.",
      },
      {
        keywords: ["demo", "trial", "start", "pricing", "cost"],
        question: "How do I get started?",
        answer: "Visit the About ALDC page for more details, or book a demo at cal.com/eclipse-analyticlabs. We'll walk you through how Eclipse and Zeus can transform your marketing intelligence.",
      },
      {
        keywords: ["competitor", "compare", "vs", "alternative"],
        question: "How does ALDC compare?",
        answer: "We focus on unified marketing intelligence rather than point solutions. Eclipse connects all your data sources into one platform, and Zeus builds institutional memory from your data. Most clients see actionable insights within the first week.",
      },
    ],
    starterChips: [
      "How is revenue performing?",
      "What's the conversion rate?",
      "What is Eclipse?",
      "How do I get started?",
    ],
    fallbackMessage: "I don't have specific data on that yet. Try asking about revenue, traffic, campaigns, conversion rates, or ALDC's platforms.",
  },

  // ============================================================
  // BUSINESS CONTEXT
  // ============================================================
  business: {
    type: "E-commerce",
    industry: "Retail",
    revenueRange: "$1M - $5M",
    monthlyVisitors: 50000,
  },
};
