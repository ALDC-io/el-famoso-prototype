import type { ProspectConfig } from "@/types/prospect";

export const config: ProspectConfig = {
  // ============================================================
  // PROSPECT IDENTITY
  // ============================================================
  name: "El Famoso",
  tagline: "Commerce Intelligence for Music Merchandising",
  domain: "el-famoso.analyticlabs.io",
  logoPath: "/prospect-logo.svg",

  colors: {
    primary: "0 0% 10%",
    accent: "38 100% 50%",
    primaryHex: "#1A1A1A",
    accentHex: "#FF9500",
    chartColors: ["#1A1A1A", "#FF9500", "#E53E3E", "#8B5CF6", "#10B981"],
  },

  // ============================================================
  // DASHBOARD — E-commerce merch operations KPIs
  // ============================================================
  dashboard: {
    kpis: [
      { label: "Monthly Orders", value: 18400, formattedValue: "18.4K", change: 14.2, icon: "shopping-cart" },
      { label: "Avg Fulfillment Time", value: 1.8, formattedValue: "1.8 days", change: -0.3, icon: "clock" },
      { label: "Active Catalogs", value: 52, formattedValue: "52", change: 4.0, icon: "disc" },
      { label: "Avg Order Value", value: 47, formattedValue: "$47", change: 6.8, icon: "trending-up" },
    ],
    revenueCategories: [
      { key: "artistMerch", label: "Artist Merch", color: "#1A1A1A" },
      { key: "tourMerch", label: "Tour Merch", color: "#FF9500" },
      { key: "limitedEditions", label: "Limited Editions", color: "#E53E3E" },
      { key: "brandCollabs", label: "Brand Collabs", color: "#8B5CF6" },
    ],
    funnelSteps: [
      { name: "Store Visitors", visitors: 285000 },
      { name: "Product Views", visitors: 94000 },
      { name: "Add to Cart", visitors: 38000 },
      { name: "Checkout", visitors: 22000 },
      { name: "Purchase", visitors: 18400 },
    ],
    trafficChannels: ["Organic Search", "Social Media", "Artist Links", "Email", "Direct", "Paid Ads"],
  },

  // ============================================================
  // DATA FLOW — El Famoso's e-commerce operations stack
  // ============================================================
  dataFlow: {
    athenaUrl: "",
    graphName: "El Famoso Commerce Data Flow",
    businessApps: ["Shopify", "ShipStation", "Amazon", "eBay", "BigCommerce", "Faire"],
  },

  // ============================================================
  // ZEUS CHAT — Q&A responses for El Famoso operations
  // ============================================================
  zeus: {
    responses: [
      {
        keywords: ["who", "what is", "about", "aldc", "company"],
        question: "What is ALDC?",
        answer: "ALDC (Analytic Labs Data Company) is a data analytics company founded in 2019 in Vancouver, Canada. We specialize in marketing intelligence and data integration through our Eclipse and Zeus platforms — helping companies like El Famoso unify their commerce data.",
      },
      {
        keywords: ["el famoso", "about el famoso", "what does el famoso do"],
        question: "What does El Famoso do?",
        answer: "El Famoso is a full-service e-commerce operations company based in Austin, Texas. Since 2016, they've been supporting labels, artists, estates, bands, and brands with merchandising, fulfillment, customer service, marketing, and store management across multiple sales channels.",
      },
      {
        keywords: ["eclipse", "platform", "tool"],
        question: "What is Eclipse?",
        answer: "Eclipse is ALDC's marketing intelligence platform. For El Famoso, it connects data from Shopify, Amazon, eBay, ShipStation, and other channels into a single unified view — replacing manual spreadsheet reconciliation with real-time analytics.",
      },
      {
        keywords: ["zeus", "memory", "ai"],
        question: "What is Zeus?",
        answer: "Zeus Memory is the context layer for AI. It stores and connects insights across El Famoso's entire commerce ecosystem — artist catalog performance, fulfillment patterns, channel attribution — building institutional memory that gets smarter over time.",
      },
      {
        keywords: ["revenue", "sales", "money", "income", "merch"],
        question: "How is merch revenue trending?",
        answer: "Monthly merch revenue is strong with 18.4K orders processed, up 14.2% month-over-month. Artist Merch remains the top category at ~45% of volume, followed by Tour Merch at ~30%. Limited Editions drive the highest average order value at $72.",
      },
      {
        keywords: ["fulfillment", "shipping", "delivery", "speed", "warehouse"],
        question: "What's the fulfillment speed?",
        answer: "Average fulfillment time is 1.8 days, an improvement of 0.3 days from last month. El Famoso's Austin warehouse maintains a 48-hour fulfillment window even during album drop spikes. ShipStation integration enables real-time carrier rate optimization.",
      },
      {
        keywords: ["catalog", "artist", "top", "seller", "best"],
        question: "Which artist catalogs are top sellers?",
        answer: "Across 52 active catalogs, the top performers drive roughly 60% of total volume. Tour merch catalogs see 3-5x spikes around announcement dates. Limited edition drops (vinyl, signed items) have the highest margin at ~65% vs standard merch at ~40%.",
      },
      {
        keywords: ["tour", "spike", "album", "drop", "event", "demand"],
        question: "How do tour dates affect orders?",
        answer: "Tour announcements and album drops create 3-5x order volume spikes within 24-48 hours. El Famoso's demand forecasting uses historical spike patterns to pre-position inventory. The biggest challenge is limited edition sizing — pre-orders help but sell-through prediction is still manual.",
      },
      {
        keywords: ["channel", "shopify", "amazon", "ebay", "marketplace"],
        question: "How are sales channels performing?",
        answer: "Shopify DTC stores drive 55% of revenue with the highest margins. Amazon is 25% of volume but with compressed margins due to fees. eBay and Faire account for the remaining 20%. Cross-channel attribution shows DTC customers have 2.3x higher LTV than marketplace buyers.",
      },
      {
        keywords: ["conversion", "convert", "funnel", "rate"],
        question: "What's the conversion rate?",
        answer: "Overall store-to-purchase conversion is 6.5%, well above e-commerce benchmarks. The biggest drop-off is product view to add-to-cart (60% loss). Tour merch pages convert at 11.2% during active tour windows vs 3.8% baseline — timing-aware merchandising is a major lever.",
      },
      {
        keywords: ["help", "can you", "what can"],
        question: "What can you help with?",
        answer: "I can answer questions about El Famoso's commerce operations — merch revenue, fulfillment metrics, catalog performance, channel attribution, tour demand spikes, and how ALDC's Eclipse platform unifies it all. Try asking about revenue, fulfillment, or top catalogs.",
      },
      {
        keywords: ["demo", "trial", "start", "pricing", "cost"],
        question: "How do I get started?",
        answer: "Visit the About ALDC page for details on Eclipse and Zeus, or book a demo at cal.com/eclipse-analyticlabs. We'll walk through how unified commerce intelligence can help El Famoso eliminate blind spots across channels and optimize fulfillment operations.",
      },
    ],
    starterChips: [
      "How is merch revenue trending?",
      "What's the fulfillment speed?",
      "Which catalogs are top sellers?",
      "How do tour dates affect orders?",
    ],
    fallbackMessage: "I don't have specific data on that yet. Try asking about merch revenue, fulfillment, catalogs, channels, tour demand spikes, or ALDC's platforms.",
  },

  // ============================================================
  // BUSINESS CONTEXT
  // ============================================================
  business: {
    type: "E-commerce Operations",
    industry: "Music & Entertainment Merchandise",
    revenueRange: "$5M - $20M",
    monthlyVisitors: 285000,
  },
};
