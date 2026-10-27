/**
 * MVMNT Studio — Vercel Serverless Function: AI Project Scoper
 * Endpoint: POST /api/scope
 *
 * Implements real-time streaming project diagnosis using the Vercel AI SDK.
 * Supports:
 *   - Google Gemini via @ai-sdk/google (GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY)
 *   - OpenAI via @ai-sdk/openai (OPENAI_API_KEY)
 *   - Resilient Deterministic Streaming Fallback: Realistic, domain-tailored
 *     technical diagnosis streamed in real-time chunks for unconfigured/offline dev.
 */

const SYSTEM_PROMPT = `You are the Senior Technical Director at MVMNT Studio, an independent, artisanal digital architecture studio based in Melbourne and Sydney, Australia.
You design and hand-craft bespoke, sub-second edge platforms for healthcare practices, clinical specialists, boutique firms, and ambitious founders.
You firmly reject agency bloat, 4-month timelines, 40-plugin WordPress installations, and sluggish Elementor templates.

When diagnosing a client's inquiry, provide a direct, intelligent, and honest technical assessment:
1. ### Technical & Commercial Diagnosis
   Analyze what is broken, inefficient, or missing in their current approach or proposed project.
2. ### Recommended Architecture & Package
   Recommend the optimal tier from MVMNT Studio's productized offerings:
   - **01. Sprint Launch — $4,800 AUD** (5–7 business days turnaround: solo specialists, single practitioners, launching high-trust landing platforms).
   - **02. Studio Build — $8,800 AUD [Recommended Standard]** (10–14 business days: multi-practitioner practices, clinical intake, Cliniko/Halaxy EHR integration, custom calculators).
   - **03. Custom Architecture — $16,500+ AUD** (3–4 weeks: multi-location practices, enterprise patient workflows, bespoke web apps).
   - Optional: **Studio Care & Performance — $395 AUD / month** (ongoing Core Web Vitals monitoring, sub-second SLAs, 24h content pushes).
3. ### Hand-Crafted Engineering Strategy
   Detail the technical stack: semantic HTML5, zero-framework CSS3, edge serverless API routes on Vercel CDN, zero render-blocking scripts, and guaranteed sub-150ms TTFB.
4. ### Visual & Brand Direction
   Suggest an understated, high-trust editorial aesthetic (clean Swiss typography, generous whitespace, clinical confidence without sterile coldness).
5. ### Realistic Turnaround & Next Step
   Provide clear timeline commitments and invite them to lock in a 15-minute Discovery Sprint call.

Tone: Authentic, intelligent, understated, confident, craftsman-focused. No cheesy corporate marketing buzzwords or artificial hype. Speak as an experienced studio partner.`;

/**
 * Generates tailored fallback markdown based on the client's input prompt.
 */
function getDeterministicScope(promptText = '') {
  const p = promptText.toLowerCase();

  if (p.includes('medical') || p.includes('practice') || p.includes('clinic') || p.includes('health') || p.includes('psych') || p.includes('booking') || p.includes('solo')) {
    return `### 1. Technical & Clinical Diagnosis
Your practice requires an intimate, high-trust digital environment rather than a generic medical directory template. Most healthcare websites lose prospective patients due to three friction points: slow mobile page loads (> 3.5s), confusing navigation structures, and high-friction booking embeds that redirect to detached third-party portals. For a specialized clinical practice, building instant credibility and emotional safety in the first 2 seconds is paramount.

### 2. Recommended Package: **02. Studio Build — $8,800 AUD**
- **Turnaround:** 10–14 Business Days
- **Suitability:** Complete bespoke practice platform with deep clinical intake workflows.
- **Includes:**
  - Bespoke editorial design system (desktop, tablet, mobile)
  - Native booking integration with **Cliniko**, **Halaxy**, or **Calendly**
  - Confidential intake forms with honeypot security & zero sensitive health data leak
  - Sub-150ms edge hosting setup on Vercel Global Edge
  - Optional ongoing infrastructure care: **$395 AUD / month**

### 3. Engineering & Architectural Strategy
- **Zero-Bloat Front End:** Hand-crafted semantic HTML5 and scoped modern CSS. Zero heavy JavaScript frameworks or render-blocking stylesheets.
- **Edge Deployment:** Static assets compiled directly to edge cache nodes across Australia and globally, ensuring guaranteed 100/100 Core Web Vitals.
- **Privacy First:** Strict compliance with the Australian Privacy Act 1988 and healthcare data handling guidelines.

### 4. Visual & Brand Direction
- **Typography:** Refined neo-grotesque typography paired with warm monospace accents for clinical metadata (similar to our work on the Hali Institute platform).
- **Palette:** Calming stone, warm linen, deep obsidian ink, and muted sage or terracotta accents that convey warmth, dignity, and clinical excellence.

### 5. Delivery Timeline & Immediate Action
We can schedule your sprint to kick off this month. Delivery takes **10–14 business days** from asset handoff to DNS deployment.
Click **"Book Discovery Call with this Scope →"** below to lock in your sprint slot.`;
  }

  if (p.includes('wordpress') || p.includes('slow') || p.includes('replace') || p.includes('plugin') || p.includes('speed') || p.includes('elementor')) {
    return `### 1. Technical & Commercial Diagnosis
Running a modern business on a bloated WordPress / Elementor stack carries significant hidden liabilities: 30+ plugins requiring perpetual updates, severe security attack vectors, and a 3.8-second Largest Contentful Paint (LCP) that quietly cuts your organic search rankings and ad conversion rates in half. You are paying ongoing agency maintenance retainers simply to keep an obsolete PHP monolith from breaking.

### 2. Recommended Package: **02. Studio Build — $8,800 AUD** (or **01. Sprint Launch — $4,800 AUD**)
- **Turnaround:** 7–14 Business Days
- **Suitability:** Complete decommissioning of your WordPress legacy codebase into an ultra-fast, modern edge architecture.
- **Includes:**
  - Content migration and URL canonical redirection mapping to preserve 100% of existing SEO equity
  - Native custom forms directly connected to your CRM or email provider via edge serverless functions
  - 100/100 Lighthouse performance across mobile and desktop
  - Zero ongoing plugin vulnerabilities or database maintenance

### 3. Engineering & Architectural Strategy
- **Decoupled Edge Stack:** We replace MySQL database queries with compiled, static edge pages deployed across Vercel’s global CDN.
- **Performance:** Sub-100ms Time to First Byte (TTFB). Your pages render instantaneously on 4G/5G mobile devices.
- **Security:** Static markup with hardened HTTP headers (\`nosniff\`, \`DENY\` frame options, CSP). Zero PHP execution.

### 4. Visual & Brand Direction
We preserve your brand essence while stripping away the template clunkiness: modern typographic hierarchy, micro-interactions with hardware-accelerated CSS, and crisp high-density imagery with zero layout shift.

### 5. Delivery Timeline & Next Step
We can migrate and rebuild your entire web platform in **10–14 business days**.
Click **"Book Discovery Call with this Scope →"** below to review your legacy site and reserve a production sprint.`;
  }

  if (p.includes('high-ticket') || p.includes('launch') || p.includes('firm') || p.includes('founder') || p.includes('consult') || p.includes('architecture')) {
    return `### 1. Technical & Strategic Diagnosis
For high-ticket services and premium boutique studios, your website is not an online brochure—it is your primary commercial qualification filter. High-value clients decide whether you are worth $10k–$50k+ within their first 10 seconds on your site. If the typography feels off-the-shelf or the experience lags, they assume your service delivery will match.

### 2. Recommended Package: **02. Studio Build ($8,800 AUD)** or **03. Custom Architecture ($16,500+ AUD)**
- **Turnaround:** 10–21 Business Days
- **Suitability:** Designed for high-conviction positioning, case study storytelling, and qualified lead triage.
- **Includes:**
  - High-impact editorial storytelling layouts and custom interactive calculators/intake
  - Tiered lead filtering that separates qualified buyers from tire-kickers
  - Priority engineering SLA with bespoke serverless API integrations
  - Studio Performance & Care retainer: **$395 AUD / month**

### 3. Engineering & Architectural Strategy
- **Bespoke Craftsmanship:** Crafted without heavy third-party themes or bloated JavaScript bundles. Instantaneous page transitions and buttery 60fps animations.
- **Conversion Velocity:** Single-session qualification funnels that guide prospects seamlessly toward booking a strategy call.

### 4. Visual & Brand Direction
- High-contrast, Swiss-inspired typographic discipline.
- Deep, intentional negative space with subtle tactile borders.
- Proof-first layout: immediate visual validation of your previous client outcomes and case studies.

### 5. Immediate Next Step
We accept only two custom studio builds per month to maintain obsessive craft standards.
Click **"Book Discovery Call with this Scope →"** below to discuss your launch timeline and review project deliverables.`;
  }

  // Bespoke General Diagnosis
  return `### 1. Technical & Commercial Diagnosis
Based on your project outline: "${promptText.trim().slice(0, 120)}...", your digital presence requires a bespoke, high-velocity engineering approach. Generic agency templates and off-the-shelf site builders compromise your brand's authority, slow down mobile visitors, and trap you in high-maintenance technical debt.

### 2. Recommended Studio Package
- **Primary Recommendation:** **02. Studio Build — $8,800 AUD** (10–14 Business Days)
- **Alternative (Faster Scope):** **01. Sprint Launch — $4,800 AUD** (5–7 Business Days)
- **Enterprise / Complex:** **03. Custom Architecture — $16,500+ AUD** (3–4 Weeks)
- **Ongoing Support:** **Studio Care & Performance Retainer — $395 AUD / month**

### 3. Hand-Crafted Engineering Highlights
- **Sub-150ms TTFB:** Globally distributed edge execution via Vercel Edge Network.
- **Clean Semantic Code:** Zero React/Vue bloat; pure HTML5, modern CSS3 custom properties, and modular Vanilla ES6.
- **Pristine Core Web Vitals:** 100/100 score across Performance, Accessibility, Best Practices, and Technical SEO.
- **Custom Integrations:** Serverless form intake with honeypot security, CRM/email forwarding, and booking synchronization.

### 4. Visual Craft & Experience
A tailored, editorial design language that treats typography, spacing, and micro-interactions with obsessive care. No template artifacts or generic corporate stock graphics.

### 5. Turnaround & Next Step
We can begin discovery and wireframing within 48 hours of confirmation.
Click **"Book Discovery Call with this Scope →"** below to schedule a 15-minute alignment call with our Technical Director.`;
}

/**
 * Streams text to the Node.js ServerResponse in small readable chunks.
 */
async function streamFallbackResponse(res, text) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-transform');

  // Split text into small word/sentence chunks to create a natural typing stream
  const words = text.split(/(\s+)/);
  let buffer = '';

  for (let i = 0; i < words.length; i++) {
    buffer += words[i];
    // Flush roughly every 3-5 words or on line breaks
    if (words[i].includes('\n') || i % 4 === 0 || i === words.length - 1) {
      res.write(buffer);
      buffer = '';
      await new Promise(r => setTimeout(r, 18));
    }
  }

  res.end();
}

module.exports = async function handler(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  const userPrompt = (body && body.prompt) ? String(body.prompt).trim() : '';
  const cleanPrompt = userPrompt || 'Bespoke practice platform with automated booking and sub-second performance.';

  const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  // Attempt live Vercel AI SDK streaming if an API key is available
  if (googleKey || openaiKey) {
    try {
      const { streamText } = await import('ai');
      let model;

      if (googleKey) {
        const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
        const google = createGoogleGenerativeAI({ apiKey: googleKey });
        model = google('gemini-1.5-flash');
      } else {
        const { createOpenAI } = await import('@ai-sdk/openai');
        const openai = createOpenAI({ apiKey: openaiKey });
        model = openai('gpt-4o-mini');
      }

      const result = streamText({
        model,
        system: SYSTEM_PROMPT,
        prompt: cleanPrompt,
        maxTokens: 1200,
        temperature: 0.7
      });

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      return result.pipeTextStreamToResponse(res);
    } catch (aiErr) {
      console.warn('[AI SCOPE] Live AI SDK invocation failed, falling back to deterministic stream:', aiErr.message || aiErr);
      // Fall through to deterministic streaming fallback below
    }
  }

  // Deterministic streaming fallback (guaranteed resilience in dev / unconfigured environments)
  const fallbackText = getDeterministicScope(cleanPrompt);
  return streamFallbackResponse(res, fallbackText);
};
