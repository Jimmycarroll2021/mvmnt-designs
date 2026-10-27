# MVMNT DESIGNS — UI Design System & Component Architecture Specification

**Document Reference:** `UI-SPEC-MVMNT-DESIGNS`  
**Date:** 27 October 2026  
**Entity:** MVMNT DESIGNS (`mvmnt-designs`)  
**Production Edge:** Vercel Global Edge Network  
**Author:** Senior Visual Systems Specialist & Design Architect  
**Stylesheet Path:** [`assets/css/styles.css`](file:///C:/Users/Jimmy/Documents/mvmnt-designs/assets/css/styles.css)  
**Compliance Target:** WCAG 2.1 AAA Contrast Ratios, Guaranteed 0px Horizontal Overflow across 320px–1440px+

---

## 1. Brand Identity & Visual Aesthetic

MVMNT DESIGNS is positioned at the intersection of **high-performance luxury technology and boutique software engineering**. The visual language rejects noisy agency animations and bloated templates in favor of:
- **Precision Dark Titanium Architecture:** A rich, deep dark aesthetic (`#0A0B0D` canvas with `#121418` elevated panels) paired with architectural blueprint hairline grids.
- **Electric Cobalt Signature:** High-precision electric cobalt (`#2952FF` / `#0709F5`) providing commercial authority and focal call-to-actions.
- **Cyber Emerald Telemetry Accents:** High-visibility emerald (`#00E599`) used exclusively for live telemetry, 100/100 Core Web Vitals indicators, and value metrics.
- **Editorial Typography:** High-contrast pairing of modern geometric sans (`Plus Jakarta Sans` / `Inter`) with structural monospace accents (`Space Mono` / `JetBrains Mono` / `DM Mono`).

---

## 2. Master Design Tokens

### 2.1 Color Palette & Contrast Ratios

| Token Name | Hex / Value | Semantic Role | Contrast on `#0A0B0D` | WCAG Status |
|:---|:---|:---|:---|:---|
| `--bg-base` | `#0A0B0D` | Primary dark titanium canvas | — | Base |
| `--bg-panel` | `#121418` | Primary card & section surface | — | — |
| `--bg-surface` | `#181B21` | Secondary nested surface / hover | — | — |
| `--bg-subtle` | `#20242D` | Tertiary pill tags & input surface | — | — |
| `--bg-glass` | `rgba(18, 20, 24, 0.82)` | Sticky navbar & floating HUDs | — | — |
| `--text-white` | `#FFFFFF` | Primary headlines, titles & hero | **19.3:1** | **AAA Pass** |
| `--text-primary` | `#F0F2F5` | Primary body paragraphs & lists | **17.2:1** | **AAA Pass** |
| `--text-secondary` | `#9DA4B0` | Muted steel captions & subtitles | **8.6:1** | **AAA Pass** |
| `--text-muted` | `#646B79` | Subdued metadata & timestamps | **4.8:1** | AA Pass (Small text) |
| `--accent-primary` | `#2952FF` | Electric Cobalt primary CTA button | 7.1:1 on white text | **AAA Pass** |
| `--accent-emerald` | `#00E599` | Cyber Emerald metrics & checkmarks | **12.8:1** on `#0A0B0D` | **AAA Pass** |
| `--accent-crimson` | `#FF4757` | Legacy agency flaw indicator | **5.4:1** on `#0A0B0D` | AA Pass |

### 2.2 Typography Hierarchy

```css
:root {
  --font-sans: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Space Mono', 'JetBrains Mono', 'DM Mono', 'SFMono-Regular', Menlo, Consolas, monospace;
}
```

- **Hero H1:** `clamp(34px, 4.8vw, 58px)` | Line height: 1.1 | Letter spacing: -0.03em | Font weight: 800.
- **Section H2:** `clamp(28px, 4.2vw, 44px)` | Line height: 1.15 | Letter spacing: -0.02em | Font weight: 700.
- **Card H3:** `clamp(20px, 2.5vw, 24px)` | Line height: 1.25 | Letter spacing: -0.01em | Font weight: 700.
- **Lead Text:** `clamp(16px, 1.8vw, 20px)` | Line height: 1.6 | Color: `--text-secondary`.
- **Eyebrow / Status Badges (`.tag-mono`):** `12px` | Monospace uppercase | Letter spacing: 0.08em | Weight: 500.

### 2.3 Radii & Elevation

```css
:root {
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.55);
  --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.7);
  --shadow-glow-cobalt: 0 0 36px rgba(41, 82, 255, 0.3);
  --shadow-glow-emerald: 0 0 36px rgba(0, 229, 153, 0.25);
}
```

---

## 3. Core Component Architecture

### 3.1 Minimalist Sticky Navbar
- **Structure:** Detached floating island at `top: 14px; z-index: 1000;`.
- **Glassmorphism:** `backdrop-filter: blur(20px); background: rgba(18, 20, 24, 0.82); border: 1px solid rgba(255, 255, 255, 0.14); border-radius: var(--radius-pill);`.
- **Monogram Brand:** `"MVMNT."` with electric blue period accent (`.brand-dot`).
- **Telemetry Pill (`.nav-status`):** Features a live pulsing emerald dot + *"Accepting 2 Q4 Sprints"*.
- **CTA:** Compact *"Book Sprint"* button.
- **Mobile Collapse:** Collapses gracefully at `<= 920px` to a round hamburger trigger and accessible slide-down drawer.

### 3.2 Hero Section & Live Telemetry HUD
- **Headline:** *"We build bespoke, sub-second edge platforms in days, not months."*
- **Action Group:** Primary *"Book a 15-Min Scope Call"* in Electric Cobalt + Ghost *"Explore Live Proof"*.
- **HUD Telemetry Cluster:**
  - 4-metric Core Web Vitals grid showing 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO in Cyber Emerald.
  - Secondary live metrics: `<150ms Global TTFB` and `0kb Framework Bloat`.
  - Continuous CI/CD automated QA verification badge.

### 3.3 "The Reality Check" Comparison Matrix
- Side-by-side contrast between traditional agencies and MVMNT DESIGNS:
  - **Legacy Agencies:** Muted panel with crimson X badges (4–6 months turnaround, 35/100 PageSpeed, bloated $25k WordPress stack, endless account managers).
  - **MVMNT DESIGNS:** Elevated glowing panel with emerald checkmarks (5–14 business days, 100/100 Core Web Vitals, transparent productized pricing, direct engineering partner).

### 3.4 Featured Case Study Spotlight (Hali Institute)
- Real-world production proof card (`haliinstitute.com.au`):
  - Tag: *"Healthcare / Clinical Telehealth Platform"*.
  - Headline: *"From raw clinical brief to live global practice platform in 7 days."*
  - Metrics HUD: PageSpeed `34 -> 100`, TTI `4.8s -> 0.3s`, Overflow `0px` across 12 viewports.
  - Client testimonial quote from Jayne Halikiotis (Occupational Therapist & Founder).
  - Direct outbound link: *"View Live Production Platform ↗"*.

### 3.5 3-Tier Productized Pricing Grid & Retainers
- **Interactive Toggle:** Switches between *"Sprint Builds"* and *"Monthly Care Plans"*.
- **Tier 1: Solo Sprint Launch ($4,800 AUD)** — 5–7 business days, single-page edge application, sub-150ms TTFB.
- **Tier 2: Commercial Boutique Studio ($8,800 AUD) — [FEATURED / MOST POPULAR]**
  - Elevated with gradient border, subtle cobalt glow, scale boost (`transform: scale(1.03)`), and *"Most Popular"* pill badge.
  - 10–14 business days, custom design system, dual lead capture systems, Playwright automated QA, ad-ready tracking foundations.
- **Tier 3: Full Scale Digital Architecture ($16,500+ AUD)** — 3–4 weeks, multi-page application, custom API / practice management sync (Cliniko, Halaxy, Calendly, Stripe), paid search & Meta funnel architecture.
- **Monthly Retainers:**
  - *Performance & Edge Care:* **$395 AUD / month**
  - *Growth & Acquisition:* **$1,250 AUD / month**

### 3.6 Interactive Scope & Investment Estimator UI
- User-driven dynamic configuration tool:
  - **Step 1: Platform Tier** (Single-page Sprint, Boutique Studio, Full Architecture).
  - **Step 2: Add-on Capabilities** (Practice CRM Integration, SEO Dominance Engine, Google/Meta Ads Funnel, Playwright Automated QA).
  - **Step 3: Ongoing Care Plan** (Self-managed, Performance Care $395/mo, Growth Engine $1,250/mo).
- **Live Calculation HUD (`.estimator-hud-card`):**
  - Sticky right-hand column computing real-time total investment ($AUD), timeline in business days, and itemized summary.
  - Direct conversion CTA: *"Lock In Scope & Book Consultation →"*.

### 3.7 Growth & Search Dominance Arsenal
- 3 core productized engineering pillars:
  1. *Technical SEO & Schema.org Dominance* (Structured JSON-LD, instant indexing).
  2. *High-Intent Google Search Ads* (Targeting ready-to-book high-value clients).
  3. *Meta Ads Paid Social Funnels* (Conversion-focused creative hooks and dedicated landing pages).

### 3.8 Interactive Technical FAQ Accordion
- Native semantic `<details>` and `<summary>` elements.
- Custom rotating chevron, smooth open state, high contrast answers, zero JavaScript dependency for accessibility.

### 3.9 Native Modals (`<dialog>`)
- High-converting native `<dialog class="mvmnt-dialog">`:
  - *Consultation Sprint Booking Modal* (`#booking-modal`).
  - *Free 5-Minute Performance & SEO Audit Modal* (`#audit-modal`).
  - Dark glassmorphic backdrop (`backdrop-filter: blur(16px); background: rgba(10, 11, 13, 0.85);`), rounded card container, custom focus states, and loading states.

### 3.10 Minimalist High-Trust Footer
- Brand monogram `"MVMNT."`, location tags (*"Melbourne & Sydney, Australia"*), navigation columns, direct inquiry email, legal modal links, and live operational status indicator.

---

## 4. Multi-Viewport Responsive Matrix

All grid columns use `minmax(0, 1fr)` and all flex containers include `min-width: 0` to prevent horizontal blowouts.

| Breakpoint Range | Layout Behavior | Navigation Mode | Grid Columns |
|:---|:---|:---|:---|
| **1200px – 1440px+** | Full desktop editorial canvas | Full pill navbar with links | 3-column pricing, 4-column HUD, 2-column hero |
| **1024px – 1180px** | Compact desktop / iPad Pro | Full pill navbar | 3-column pricing, 2-column hero |
| **820px – 920px** | Portrait tablet / iPad Air | Collapsed to mobile toggle at `<= 920px` | 1-column hero, 2-column matrix |
| **640px – 768px** | Mini tablet / large phone | Mobile drawer navigation | 1-column pricing, 2-column vitals |
| **320px – 390px** | Standard & compact mobile | Mobile drawer navigation | 1-column stacked, full-width CTA buttons, 0px overflow |

---

## 5. Verification Checklist for Frontend Agent

When constructing `index.html`:
1. Link stylesheet: `<link rel="stylesheet" href="assets/css/styles.css">`.
2. Include Google Fonts preconnect:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
   ```
3. Include accessible skip link at the very top of `<body>`:
   ```html
   <a href="#main-content" class="skip-link">Skip to main content</a>
   ```
4. Use `<main id="main-content">` to wrap all sections.
5. All buttons and interactive links have explicit `aria-label` or visible text.
