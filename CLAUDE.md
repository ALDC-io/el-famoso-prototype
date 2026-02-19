# Prospect Prototype Template

Reusable template for building ALDC prospect dashboard microsites. Clone, customize, deploy in <2 hours.

## Tech Stack
- **Next.js 16.1.6** (App Router, Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS 3.4** with HSL color variables
- **Recharts** for data visualization
- **Lucide React** for icons
- **Poppins + Inter** fonts

## Architecture
- **3 pages**: Dashboard (`/dashboard`), About ALDC (`/about`), Data Flow (`/data-flow`)
- **Left sidebar** (256px, dark `#0a0a1a`) with mobile hamburger overlay
- **Zeus Chat FAB** on all pages (typewriter effect, KITT waveform, keyword matcher)
- **Athena iframe** for data flow visualization with postMessage node detail panel
- **All data is mock** — no API keys required

## Single-File Customization

All prospect-specific config lives in `src/config/prospect.ts`:
- Company name, tagline, domain, logo
- Brand colors (HSL for Tailwind + hex for Recharts)
- Dashboard KPIs, revenue categories, funnel steps
- Zeus Q&A responses and starter chips
- Athena data flow URL

Plus update 6-8 HSL values in `src/app/globals.css` and replace `public/prospect-logo.svg`.

## Systematic 6-Step Workflow

When building a new prospect prototype from this template:

### Step 1: Research
Ask for the company website, then research their business type, products, audience, and competitive landscape.

### Step 2: Design Dashboards
Based on the business type, determine relevant KPIs, chart categories, funnel steps, and traffic channels. Choose metrics that will resonate with the prospect's role.

### Step 3: Gather Context
Ask the user for additional context: known business applications (for Athena data flow), specific marketing challenges, and any integrations they use.

### Step 4: Suggest Subdomain
Propose `<name>.analyticlabs.io` and get approval.

### Step 5: Show Plan
Present the plan for approval: brand colors, KPIs, dashboard layout, Zeus Q&A topics, and any custom sections.

### Step 6: Build & Deploy
```bash
# Clone template
git clone git@github.com:ALDC-io/prospect-prototype-template.git /home/aldc/repos/<name>/
cd /home/aldc/repos/<name>/

# Customize
# 1. Edit src/config/prospect.ts (name, colors, KPIs, Zeus Q&A)
# 2. Update globals.css HSL variables to match brand
# 3. Replace public/prospect-logo.svg with prospect's logo

# Build & verify
npm install && npm run build

# Create GitHub repo
gh repo create ALDC-io/<name>-prototype --private --source . --push

# Deploy to Vercel
mv .git /tmp/<name>-git-temp
npx vercel --prod --force --scope aldc --token "$VERCEL_TOKEN"
mv /tmp/<name>-git-temp .git

# Cloudflare DNS (analyticlabs.io zone)
# A record: <name> → 76.76.21.21 (proxied)
```

## Key Files

| File | Purpose |
|------|---------|
| `src/config/prospect.ts` | ALL prospect customization (single file) |
| `src/config/about-aldc.ts` | Static ALDC content (never changes) |
| `src/app/globals.css` | HSL color variables (6-8 values to swap) |
| `public/prospect-logo.svg` | Prospect logo (replace per prospect) |
| `src/lib/mock-data.ts` | Dashboard data generators (reads from config) |
| `src/lib/zeus-responses.ts` | Chat Q&A matcher (reads from config) |

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Verify production build
```

## Color System

Colors use HSL format in CSS variables, referenced by Tailwind classes:
```css
--primary: 227 100% 55%;     /* brand primary — CHANGE PER PROSPECT */
--accent: 191 100% 50%;      /* brand accent — CHANGE PER PROSPECT */
--sidebar-accent: 227 100% 55%;  /* matches primary */
```

For Recharts, use hex equivalents in `prospect.ts`:
```typescript
colors: {
  primaryHex: "#1B4DFF",
  accentHex: "#00D4FF",
  chartColors: ["#1B4DFF", "#00D4FF", "#8B5CF6", "#10B981", "#F59E0B"],
}
```

## Deployment Notes
- **Vercel**: Use `--scope aldc`. Move `.git` out during deploy (avoids parent git trap)
- **Cloudflare DNS**: A record to `76.76.21.21`, zone `549f9a25ac1912f7aecf6fecb22e8fa3`
- **Logo fetch**: Use `User-Agent: Mozilla/5.0` header when downloading prospect logos
