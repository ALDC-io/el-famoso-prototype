# Prospect Prototype Template

Reusable template for ALDC prospect dashboard microsites. Demonstrates Eclipse and Zeus capabilities with customizable KPIs, charts, and AI chat.

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Customization

1. Edit `src/config/prospect.ts` — company name, colors, KPIs, Zeus Q&A
2. Update HSL values in `src/app/globals.css`
3. Replace `public/prospect-logo.svg`
4. Run `npm run build` to verify

## Pages

- **Dashboard** — KPI cards, revenue charts, funnel, traffic, email campaigns
- **About ALDC** — Company overview, Eclipse, Zeus, integrations, testimonials
- **Data Flow** — Athena iframe visualization with node detail panel

## Stack

Next.js 16 | React 19 | TypeScript | Tailwind CSS 3.4 | Recharts | Lucide

---

Powered by [ALDC](https://analyticlabs.io) — Analytic Labs Data Company
