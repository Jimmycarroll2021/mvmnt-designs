import { streamText, simulateReadableStream } from 'ai';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Please share a brief description of your practice or goals.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are the Creative Director and Founding Partner at MVMNT Studio, a boutique digital studio based in Melbourne & Sydney, Australia.
You specialize in designing elevated, high-converting websites for medical practices, private specialists, clinics, and premium service firms.
Your tone is warm, thoughtful, reassuring, and commercially sharp.
CRITICAL RULE: DO NOT use technical jargon, speed metrics, server terms, acronyms, or engineering talk (NO "TTFB", "milliseconds", "edge nodes", "Vercel SDK", "WCAG", "CSS", "serverless", "APIs", or "plugins").
Speak entirely about:
- Patient and client psychology (how visitors perceive authority, trust, and quality of care)
- Clear positioning (standing out from generic competitors)
- Human outcomes (higher consultation bookings, attracting ideal clients, saving practice staff time)
- Seamless patient experience from reading to booking.

Provide a clear, beautifully structured Markdown response with these exact sections:
### 1. Practice & Client Overview
A thoughtful reflection on their practice model, who their ideal patients or clients are, and what emotional reassurance they need before reaching out.

### 2. Recommended Studio Package
Recommend the best fit from our three studio offerings:
- **01. Solo Specialist Launch ($4,800 AUD)** — 5–7 days. Ideal for independent consultants and solo practitioners establishing their private authority.
- **02. Boutique Clinic Studio Build ($8,800 AUD)** — 10–14 days. [Most Popular] The complete transformation we crafted for Dr. Jayne at Hali Institute. Full multi-page presence, patient-centered copywriting, and intake flow.
- **03. Complete Practice Transformation ($16,500+ AUD)** — 3–4 weeks. Ideal for multi-practitioner clinics, multiple locations, or practices scaling with advertising.
Explain why this package suits their exact stage and goals.

### 3. Patient Experience & Booking Strategy
How the website will guide prospective patients: addressing common hesitations, explaining treatments in welcoming plain English, and making consultation booking completely effortless.

### 4. Next Step & Timeline
Reassure them on how simple the process is (no endless meetings, everything handled for them), and invite them to schedule a friendly 15-minute discovery call to discuss their launch date.`;

    // 1. Try Google Gemini if key is available
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: systemPrompt,
        prompt: `Client Practice Inquiry:\n"${prompt}"`,
      });
      return result.toTextStreamResponse();
    }

    // 2. Try OpenAI if key is available
    if (process.env.OPENAI_API_KEY) {
      const result = streamText({
        model: openai('gpt-4o-mini'),
        system: systemPrompt,
        prompt: `Client Practice Inquiry:\n"${prompt}"`,
      });
      return result.toTextStreamResponse();
    }

    // 3. Resilient Warm Client-Focused Stream Fallback
    const lower = prompt.toLowerCase();
    let packageRec = '02. Boutique Clinic Studio Build ($8,800 AUD)';
    let timeline = '10–14 business days';
    let focus = 'Complete custom design, compassionate patient copywriting, and seamless consultation booking.';

    if (lower.includes('solo') || lower.includes('simple') || lower.includes('consultant') || lower.includes('single') || lower.includes('fast')) {
      packageRec = '01. Solo Specialist Launch ($4,800 AUD)';
      timeline = '5–7 business days';
      focus = 'A refined, high-trust single-page presence that introduces your expertise and books intro calls.';
    } else if (lower.includes('multi') || lower.includes('practice') || lower.includes('doctors') || lower.includes('locations') || lower.includes('ads')) {
      packageRec = '03. Complete Practice Transformation ($16,500+ AUD)';
      timeline = '3–4 weeks';
      focus = 'Multi-service clinical architecture, team profiles, location pages, and patient acquisition funnels.';
    }

    const chunks = [
      `### 1. Practice & Client Overview\n\n`,
      `Thank you for sharing your practice background. When patients or clients are looking for a trusted specialist—especially for private consultations—they make their decision within seconds of landing on your page.\n\n`,
      `Most practice websites feel either sterile and clinical, or like generic corporate templates. Your practice deserves an online presence that reflects the warmth, discretion, and prestige of your real-world care, giving prospective patients total confidence to book.\n\n`,
      `### 2. Recommended Studio Package\n\n`,
      `Based on what you've described, our **${packageRec}** is the ideal fit.\n\n`,
      `- **Turnaround Time:** ${timeline}\n`,
      `- **Core Focus:** ${focus}\n`,
      `- **Why this fit:** This gives you a completely tailored digital home—with all the design, layout, and words crafted specifically for your practice—without the months of waiting or bloated agency retainers.\n\n`,
      `### 3. Patient Experience & Booking Strategy\n\n`,
      `- **Elevated Brand Presence:** A bespoke visual design that immediately positions you as the leading practitioner in your specialty.\n`,
      `- **Compassionate, Clear Words:** We craft every paragraph to answer patient concerns, demystify treatments, and remove the anxiety of reaching out.\n`,
      `- **Frictionless Booking:** An intuitive appointment inquiry flow that makes booking simple on both mobile and desktop.\n\n`,
      `### 4. Next Step & Delivery Timeline\n\n`,
      `We can onboard your practice into our upcoming sprint and have your new site live in approximately **${timeline}**.\n\n`,
      `Click the button below to reserve a relaxed 15-minute discovery call with our team. We've transferred your practice notes into the form so we can jump straight into discussing your vision.\n`
    ];

    const stream = simulateReadableStream({
      chunks,
      initialDelayInMs: 120,
      chunkDelayInMs: 70,
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });

  } catch (error: any) {
    console.error('Error in /api/scope:', error);
    return new Response(JSON.stringify({ error: 'Unable to process project diagnostic.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
