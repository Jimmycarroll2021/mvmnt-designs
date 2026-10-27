import { streamText, simulateReadableStream } from 'ai';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Please provide a project description or URL to scope.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are the Senior Technical Director & Design Partner at MVMNT Studio, a high-performance digital architecture and web engineering studio based in Melbourne & Sydney, Australia.
You are directly scoping a new project inquiry with an ambitious founder or practice owner.
Speak with quiet, authoritative confidence, warmth, and complete honesty. NO corporate fluff, NO fake buzzwords (no "synergistic", "unleash", "revolutionary").

Analyze their inquiry and provide a clear, structured Markdown response with these exact sections:
### 1. Architectural Diagnosis
Direct assessment of their project, user experience priorities, and why conventional agency templates fail for this specific challenge.

### 2. Recommended MVMNT Studio Package
Choose the exact best fit from our productized offerings:
- **01. Sprint Launch ($4,800 AUD)** — 5–7 business days. Best for solo practitioners, independent specialists, and consultants needing a high-converting, sub-second single-page presence.
- **02. Studio Build ($8,800 AUD)** — 10–14 business days. [Most Popular] Best for established clinics, allied health practices, and boutique service firms needing brand identity, clinical copywriting, and multi-step intake flows.
- **03. Custom Architecture ($16,500+ AUD)** — 3–4 weeks. Best for multi-location practices, complex integrations (Cliniko, Stripe, Halaxy), and paid traffic conversion funnels.
Explain specifically why this tier matches their timeline and business model.

### 3. Engineering & Growth Strategy
Key technical elements: edge performance (sub-150ms TTFB), conversion-focused copy architecture, WCAG AAA accessibility, and Google Search Console indexation.

### 4. Turnaround & Next Step
Explicit delivery timeline and an invitation to lock in a 15-minute discovery call to finalize their sprint schedule.`;

    // 1. Try Google Gemini if key is available
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: systemPrompt,
        prompt: `Client Project Inquiry:\n"${prompt}"`,
      });
      return result.toTextStreamResponse();
    }

    // 2. Try OpenAI if key is available
    if (process.env.OPENAI_API_KEY) {
      const result = streamText({
        model: openai('gpt-4o-mini'),
        system: systemPrompt,
        prompt: `Client Project Inquiry:\n"${prompt}"`,
      });
      return result.toTextStreamResponse();
    }

    // 3. Resilient Smart Stream Fallback (Simulated Vercel AI SDK stream for unkeyed/dev environments)
    const lower = prompt.toLowerCase();
    let packageRec = '02. Studio Build ($8,800 AUD)';
    let timeline = '10–14 business days';
    let focus = 'Full brand identity, high-trust copywriting, and structured patient booking flows.';

    if (lower.includes('solo') || lower.includes('simple') || lower.includes('consultant') || lower.includes('single') || lower.includes('fast')) {
      packageRec = '01. Sprint Launch ($4,800 AUD)';
      timeline = '5–7 business days';
      focus = 'Bespoke edge single-page platform with zero bloat and streamlined discovery booking.';
    } else if (lower.includes('multi') || lower.includes('integration') || lower.includes('app') || lower.includes('portal') || lower.includes('custom') || lower.includes('ads')) {
      packageRec = '03. Custom Architecture ($16,500+ AUD)';
      timeline = '3–4 weeks';
      focus = 'Multi-page architecture with direct practice management/EHR integration and paid acquisition funnels.';
    }

    const chunks = [
      `### 1. Architectural Diagnosis\n\n`,
      `Thank you for sharing your project brief. Looking at what you've described—*"${prompt.slice(0, 120)}${prompt.length > 120 ? '...' : ''}"*—your primary operational risk is the common agency trap: spending four to six months in committee meetings only to end up with a sluggish, plugin-heavy template.\n\n`,
      `For your use case, trust is earned in milliseconds. You need a platform that feels weightless, respects patient/client privacy, and guides high-value visitors directly toward booking without cognitive friction.\n\n`,
      `### 2. Recommended MVMNT Studio Package\n\n`,
      `We recommend **${packageRec}**.\n\n`,
      `- **Turnaround:** ${timeline}\n`,
      `- **Core Focus:** ${focus}\n`,
      `- **Why this fit:** This tier gives you a bespoke, hand-crafted digital foundation without bloated recurring software overhead, engineered specifically for high conversion rates.\n\n`,
      `### 3. Engineering & Growth Strategy\n\n`,
      `- **Sub-Second Edge Infrastructure:** Hosted on global edge nodes with sub-150ms TTFB, ensuring instant mobile page loads across Australia and globally.\n`,
      `- **Editorial Information Architecture:** Deconstructing your core services into clear, high-trust client pathways (similar to our recent clinical transformation for Hali Institute).\n`,
      `- **Search & Conversion Foundations:** Pre-configured with Schema.org structured data, WCAG AAA contrast compliance, and Google Search Console indexation.\n\n`,
      `### 4. Turnaround & Immediate Next Step\n\n`,
      `We can onboard your project into our current production sprint. Delivery will take approximately **${timeline}** from kickoff.\n\n`,
      `Click the button below to reserve your 15-minute technical discovery call with our team. We've pre-filled your scope details so we can jump straight into architectural planning.\n`
    ];

    const stream = simulateReadableStream({
      chunks,
      initialDelayInMs: 150,
      chunkDelayInMs: 80,
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });

  } catch (err: any) {
    console.error('Error in /api/scope:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to generate scope.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
