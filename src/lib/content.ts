// ─── SiteContent: Why ALDC narrative for El Famoso (music merch e-commerce) ───
// Adapted from the ALDC compounding-advantage thesis. Content is voice-matched
// to El Famoso's e-commerce ops: Shopify, Amazon, ShipStation, tour merch,
// artist catalogs, fulfillment, demand spikes, channel attribution.

export interface SiteContent {
  compoundingHero: {
    eyebrow: string;
    heading: string;
    lead: string;
    leadHighlight: string;
    subtext: string;
    milestones: { label: string; desc: string; intensity: number }[];
    footer: string;
  };

  evidence: {
    heading: string;
    description: string;
    principles: { label: string; desc: string }[];
    mockQuestion: string;
    mockAnswer: string;
    mockConfidenceScore: number;
    mockRoutingLabel: string;
    sources: { ref: string; type: string; date: string }[];
    calloutPrimary: string;
    calloutSecondary: string;
  };

  beyondAI: {
    heading: string;
    description: string;
    frontierTools: { name: string; color: string }[];
    frontierLabel: string;
    aloneCapabilities: string[];
    frontierFooter: string;
    gaps: { label: string; detail: string }[];
    gapsLabel: string;
    singleModelTrapLabel: string;
    addIntelligenceLabel: string;
    stackLabel: string;
    stackDescription: string;
    aldcStack: {
      name: string;
      role: string;
      detail: string;
      color: string;
    }[];
    stackFooter: string;
    memberOutcomesLabel: string;
    memberOutcomes: string[];
    punchlinePrimary: string;
    punchlineSecondary: string;
    punchlineFooter: string;
  };

  stackSpectrum: {
    heading: string;
    description: string;
    capabilitiesLabel: string;
    capabilities: { name: string; desc: string; color: string }[];
    capabilitiesFooter: string;
    spectrumLabel: string;
    spectrumSubLabel: string;
    spectrum: {
      label: string;
      color: string;
      stages: {
        name: string;
        sub: string;
        ai: string | null;
        aiRole: string | null;
      }[];
    }[];
    feedbackLoop: string;
    feedbackLoopHighlight: string;
    callout: string;
    calloutHighlight: string;
  };

  unifiedView: {
    heading: string;
    description: string;
    silosLabel: string;
    dataSilos: { name: string; sub: string; color: string }[];
    unifiedLayerName: string;
    unifiedLayerSub: string;
    unifiedLayerDescription: string;
    viewsLabel: string;
    views: { name: string; desc: string; color: string }[];
    viewsFooter: string;
    calloutPrimary: string;
    calloutSecondary: string;
  };

  compoundingCloser: {
    eyebrow: string;
    heading: string;
    description: string;
    footer: string;
  };
}

export const SITE_CONTENT: SiteContent = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CompoundingHero
  // ═══════════════════════════════════════════════════════════════════════════
  compoundingHero: {
    eyebrow: "Why ALDC",
    heading: "The Compounding Advantage",
    lead: "Enterprise Intelligence gives El Famoso the ability of",
    leadHighlight: "Compounding Advantage",
    subtext:
      "The system gets smarter with every order, every drop, every tour. Patterns from last month's Shopify spike sharpen this month's Amazon forecast — and the institutional knowledge you build can’t be shortcut by any competitor showing up later.",
    milestones: [
      {
        label: "Day 1",
        desc: "Connect Shopify, Amazon, ShipStation. Intelligence begins immediately.",
        intensity: 20,
      },
      {
        label: "Day 90",
        desc: "Demand patterns emerge. Tour spikes pre-position. Channel margins clarify.",
        intensity: 55,
      },
      {
        label: "Year 1",
        desc: "Cross-catalog playbooks competitors can’t replicate.",
        intensity: 100,
      },
    ],
    footer: "Every section below is evidence of how this advantage compounds.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EvidenceSection
  // ═══════════════════════════════════════════════════════════════════════════
  evidence: {
    heading: "Audit-Ready Answers, On Demand",
    description:
      "Operations needs answers fast — across every channel, catalog, and fulfillment lane. Not summaries. Evidence that holds up from a label call to a board review.",
    principles: [
      { label: "Attributed", desc: "Every number cites its source system" },
      { label: "Confidence-rated", desc: "Trustworthy vs. directional" },
      { label: "Legible", desc: "Glance or deep-dive" },
      { label: "Always on", desc: "No analyst bottleneck" },
    ],
    mockQuestion:
      "How did the Tour merch drop last weekend perform across Shopify and Amazon, and where did we under-stock?",
    mockAnswer:
      "The drop generated 4,820 orders in the first 48 hours — 3.6x your rolling baseline. Shopify DTC carried 71% of volume at a 58% margin; Amazon FBA took 24% at 31% margin after fees. Two SKUs sold out within 9 hours: the limited XL hoodie (Shopify) and the signed vinyl variant (Amazon). Pre-orders captured the demand, but ShipStation throughput dropped 18% on Sunday — worth pre-staging warehouse labor next time.",
    mockConfidenceScore: 92,
    mockRoutingLabel:
      "Routed to Anthropic — cross-channel reasoning",
    sources: [
      {
        ref: "Shopify orders · last 7 days",
        type: "DTC channel",
        date: "Apr 28",
      },
      {
        ref: "Amazon Seller Central · FBA",
        type: "Marketplace",
        date: "Apr 28",
      },
      {
        ref: "ShipStation throughput log",
        type: "Fulfillment",
        date: "Apr 27",
      },
    ],
    calloutPrimary:
      "Every answer is traceable. Every number ties back to source system. And every confidence score rises as the system ingests more of El Famoso’s history.",
    calloutSecondary:
      "The answers you get in month twelve are categorically better than month one — because the playbook has been compounding since day one.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BeyondAISection
  // ═══════════════════════════════════════════════════════════════════════════
  beyondAI: {
    heading: "The Intelligence Multiplier",
    description:
      "ChatGPT, Gemini, Claude, Copilot — your team should keep using them. ALDC doesn’t replace them. We add a purpose-built intelligence layer underneath so the AI tools your team already uses can finally answer questions about El Famoso’s operations — not just the public internet.",
    frontierTools: [
      { name: "Gemini", color: "#4285F4" },
      { name: "ChatGPT", color: "#10a37f" },
      { name: "Copilot", color: "#7B61FF" },
      { name: "Claude", color: "#d97706" },
    ],
    frontierLabel: "What frontier AI does well today",
    aloneCapabilities: [
      "Summarize public articles and cite open sources",
      "Answer general questions about e-commerce trends and logistics",
      "Draft product copy, marketing emails, and customer responses",
      "Remember prior conversations and browse the web for updates",
    ],
    frontierFooter:
      "These capabilities are real and improving fast. The question isn’t whether they work — it’s what they can’t reach.",
    singleModelTrapLabel: "The Single-Model Trap",
    gapsLabel: "What no single AI model can do alone",
    gaps: [
      {
        label: "One model for every task",
        detail:
          "Using a single AI for classification, extraction, embedding, and reasoning is like using one tool for every job in the warehouse. Each task has a model that does it best — standalone tools give you one.",
      },
      {
        label: "No specialized pipeline",
        detail:
          "90% of the work happens before anyone asks a question — ingesting orders, normalizing SKUs across channels, mapping fulfillment events, building cross-channel attribution. No frontier AI does this on its own.",
      },
      {
        label: "No organizational knowledge",
        detail:
          "They remember conversations — but not your catalog history, your label relationships, your tour playbooks, or your fulfillment learnings. There’s no persistent intelligence layer that compounds across El Famoso’s team.",
      },
      {
        label: "No cross-channel reasoning",
        detail:
          "They analyze one source at a time. Connecting Shopify orders to Amazon performance to ShipStation throughput to artist tour dates requires different models for different tasks — extraction, embedding, synthesis — working together.",
      },
    ],
    addIntelligenceLabel: "Add AI-Native Intelligence",
    stackLabel: "Eclipse + Zeus Memory + Zeus Chat",
    stackDescription:
      "An AI-native Enterprise Intelligence system where the right model handles each task — Haiku for fast extraction, Voyage AI for embeddings, Sonnet for synthesis, and a multi-model router for chat. Structured commerce data, unstructured catalog notes, and query-level learning — continuously improving across every channel.",
    aldcStack: [
      {
        name: "Eclipse",
        role: "Structured Intelligence",
        detail:
          "Out-of-the-box connectors to Shopify, Amazon, eBay, BigCommerce, ShipStation, and Faire. Haiku classifies and routes incoming orders; SKUs, customers, and shipments are extracted and normalized automatically — no integration project required. In industry terms, this is your semantic layer — it defines what your data means.",
        color: "#3b82f6",
      },
      {
        name: "Zeus Memory",
        role: "Context Layer for AI",
        detail:
          "Ingests artist briefs, tour calendars, label notes, vendor agreements, and operations meeting transcripts. Voyage AI and Gemini generate precision embeddings for text and audio. Sonnet synthesizes catalog playbooks and validates cross-references. This is your context layer — it remembers how El Famoso runs the business, and compounds with every interaction.",
        color: "#0d9488",
      },
      {
        name: "Zeus Chat",
        role: "Answer Engine",
        detail:
          "Conversational interface powered by an intelligent model router that adapts as models evolve. Routes each task to the best frontier AI — Anthropic for reasoning, Gemini for multimodal, OpenAI for generation, Voyage AI for search. Always the right model for the right question.",
        color: "#8b5cf6",
      },
    ],
    stackFooter:
      "Connected to your team’s preferred tools through open integration protocols. Your team keeps what they already use — the intelligence layer works behind it.",
    memberOutcomesLabel:
      "What El Famoso can do with this that it cannot do without it",
    memberOutcomes: [
      "Forecast tour-driven demand spikes 30 days out using historical drop patterns and announcement signals",
      "Compare net margin per SKU across Shopify DTC, Amazon FBA, eBay, and Faire — after fees, returns, and fulfillment cost",
      "Pre-position warehouse labor and inventory for album drops based on artist following, tour cadence, and channel mix",
      "Build cumulative catalog playbooks that compound with every drop, every tour, every artist onboarding",
    ],
    punchlinePrimary:
      "The AI models are the same ones every retailer has access to.",
    punchlineSecondary:
      "The difference is that every order, every drop, every customer interaction makes the next decision faster, more accurate, and more profitable.",
    punchlineFooter:
      "That advantage compounds — and it starts the day you begin.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // StackSpectrumSection
  // ═══════════════════════════════════════════════════════════════════════════
  stackSpectrum: {
    heading: "The Right AI for Every Task",
    description:
      "No single AI model is best at everything. The system automatically picks the right model for each job — fast classification for incoming orders, deep reasoning for cross-channel margin analysis, precision search for catalog history — so El Famoso always gets the best available answer.",
    capabilitiesLabel: "Specialized AI for Every Task",
    capabilities: [
      {
        name: "Fast Classification",
        desc: "Sorts and routes thousands of orders and SKUs automatically",
        color: "#d97706",
      },
      {
        name: "Deep Reasoning",
        desc: "Cross-channel margin analysis and demand forecasting",
        color: "#d97706",
      },
      {
        name: "Audio & Multimodal",
        desc: "Processes vendor calls, label briefs, and product imagery",
        color: "#4285F4",
      },
      {
        name: "Precision Search",
        desc: "Finds the right SKU history, the right drop pattern, the right customer cohort",
        color: "#0d9488",
      },
    ],
    capabilitiesFooter:
      "The system adapts as AI models improve — always routing to the best fit for each task",
    spectrumLabel: "How the Intelligence Layer Works",
    spectrumSubLabel:
      "From raw commerce data to actionable intelligence — continuously and automatically",
    spectrum: [
      {
        label: "Ingest",
        color: "#3b82f6",
        stages: [
          {
            name: "Connect Your Sources",
            sub: "Shopify, Amazon, eBay, BigCommerce, Faire, ShipStation, label spreadsheets, tour calendars",
            ai: "Haiku",
            aiRole: "Sorts and routes incoming records",
          },
          {
            name: "Secure & Private",
            sub: "Modern encryption, your data stays yours — never shared across organizations",
            ai: null,
            aiRole: null,
          },
          {
            name: "Clean & Organize",
            sub: "Normalizes SKUs across channels, deduplicates customers, resolves shipment events",
            ai: "Haiku",
            aiRole: "Identifies key details on intake",
          },
        ],
      },
      {
        label: "Analyze",
        color: "#0d9488",
        stages: [
          {
            name: "Store Securely",
            sub: "Cloud-resident storage with full audit trail",
            ai: null,
            aiRole: null,
          },
          {
            name: "Search Intelligently",
            sub: "Finds relevant orders, SKUs, and notes across every channel simultaneously",
            ai: "Voyage + Gemini",
            aiRole: "Powers text and audio search",
          },
          {
            name: "Discover Patterns",
            sub: "Identifies demand spikes, channel attribution, and customer cohort signals automatically",
            ai: "Haiku + Sonnet",
            aiRole: "Finds patterns and synthesizes insights",
          },
        ],
      },
      {
        label: "Govern",
        color: "#8b5cf6",
        stages: [
          {
            name: "Stay Current",
            sub: "Retires stale catalog entries and prioritizes active drops and tours",
            ai: "AI-assisted",
            aiRole: "Evaluates what’s still relevant",
          },
          {
            name: "Validate Accuracy",
            sub: "Cross-references findings across Shopify, Amazon, and ShipStation to ensure consistency",
            ai: "Sonnet",
            aiRole: "Checks consistency across sources",
          },
        ],
      },
      {
        label: "Deliver",
        color: "#d97706",
        stages: [
          {
            name: "Dashboards & Reports",
            sub: "Purpose-built views for fulfillment, profitability, label reviews, and tour planning",
            ai: "Sonnet",
            aiRole: "Writes narrative summaries",
          },
          {
            name: "Ask & Learn",
            sub: "Conversational interface that answers questions with cited evidence — and improves with every interaction",
            ai: "Multi-model",
            aiRole: "Best model for each question",
          },
        ],
      },
    ],
    feedbackLoop:
      "Every question asked feeds back into the system —",
    feedbackLoopHighlight: "making the next answer better",
    callout:
      "The AI models powering this system are available to anyone. What isn’t available is the intelligence built on",
    calloutHighlight:
      "El Famoso’s data, your team’s questions, and your operational history",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UnifiedViewSection
  // ═══════════════════════════════════════════════════════════════════════════
  unifiedView: {
    heading: "One Operational View. Unlimited Perspectives.",
    description:
      "What if your Shopify store, Amazon Seller Central, eBay listings, ShipStation log, label briefs, and tour calendars could all talk to each other? ALDC ingests all of it into a single, holistic operational layer — then generates as many purpose-built views as the business requires.",
    silosLabel: "Data in Silos Today",
    dataSilos: [
      { name: "Shopify DTC", sub: "Orders, customers, products", color: "#3b82f6" },
      { name: "Amazon Seller Central", sub: "FBA + FBM, fees, returns", color: "#3b82f6" },
      { name: "eBay & Faire", sub: "Listings, marketplace fees", color: "#3b82f6" },
      { name: "ShipStation", sub: "Carriers, throughput, SLAs", color: "#3b82f6" },
      { name: "Label & Artist Briefs", sub: "Drop calendars, royalties", color: "#0d9488" },
      { name: "Tour Calendars", sub: "Dates, venues, demand windows", color: "#0d9488" },
      { name: "Ops Meeting Notes", sub: "Vendor calls, retros, decisions", color: "#0d9488" },
      { name: "Catalog History", sub: "Past drops, sell-through, sizing", color: "#0d9488" },
    ],
    unifiedLayerName: "Unified Operational Intelligence",
    unifiedLayerSub: "Structured + Unstructured + Query Learning",
    unifiedLayerDescription:
      "Every data source normalized into a single knowledge layer. Fully cross-referenced, continuously updated, semantically searchable. One source of truth for every drop, every channel, every artist.",
    viewsLabel: "Purpose-Built Views — Create as Many as You Need",
    views: [
      {
        name: "Channel Profitability Dashboard",
        desc: "Net margin per SKU across Shopify, Amazon, eBay, Faire — after fees and returns",
        color: "#d97706",
      },
      {
        name: "Tour Demand Playbook",
        desc: "Pre-positioned inventory and labor based on tour dates and historical spikes",
        color: "#d97706",
      },
      {
        name: "Fulfillment SLA Monitor",
        desc: "Throughput, exceptions, and carrier performance against the 48-hour window",
        color: "#d97706",
      },
      {
        name: "Artist & Label Brief",
        desc: "Per-artist sell-through, top SKUs, sizing curves, and royalty exposure",
        color: "#d97706",
      },
      {
        name: "Catalog Drop Workbench",
        desc: "Pre-launch sizing, pricing, and channel-mix simulation for upcoming drops",
        color: "#8b5cf6",
      },
      {
        name: "Customer Cohort Explorer",
        desc: "DTC vs. marketplace LTV, repeat-buyer signals, and reactivation windows",
        color: "#8b5cf6",
      },
    ],
    viewsFooter: "+ Any new view, any time, from the same unified data",
    calloutPrimary:
      "The data is ingested once — and the intelligence layer compounds from that moment forward.",
    calloutSecondary:
      "Every new drop enriches every existing view. Every new question is answered with the full weight of everything that came before it.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CompoundingCloser
  // ═══════════════════════════════════════════════════════════════════════════
  compoundingCloser: {
    eyebrow: "Unmatched Capability",
    heading: "Run merch operations no competitor can replicate.",
    description:
      "Enterprise Intelligence isn’t a product you install. It’s a capability that compounds from the moment you start — turning El Famoso’s commerce data into an asset that grows more valuable with every order, every drop, every tour.",
    footer: "The operators that begin first compound the furthest.",
  },
} as const;
