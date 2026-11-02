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

    const systemPrompt = `You are the Creative Director and Founding Partner at MVMNT Studio, an independent design and digital studio based in Australia (Canberra & Sydney).
You specialise in crafting enduring brand identities, bespoke digital flagships, high-performance commerce systems, and specialist practice platforms (such as our renowned Hali Institute use case).
Your tone is thoughtful, articulate, confident, and commercially astute.
CRITICAL RULE: DO NOT use cheap marketing hype or confusing developer acronyms.
Use Australian/British English spelling strictly (e.g. specialise, optimise, recognise, prioritise, analyse).
Speak directly to:
- Brand authority, visual credibility, and market positioning
- Customer or patient conversion and seamless user journeys
- Fast, turnkey execution with senior creative leads (no junior delegation)

Provide a clear, beautifully structured Markdown response with these exact sections:
### 1. Strategic Project Overview
A sharp reflection on their venture or practice, who their target audience or patients are, and what makes them distinctly valuable.

### 2. Recommended Studio Engagement
Recommend the best fit from our three studio offerings:
- **01. Digital Launch / Solo Flagship ($4,800 AUD)** — 5–7 days. Ideal for independent specialists, founders, and single-discipline launches.
- **02. Flagship Studio Build ($8,800 AUD)** — 10–14 days. [Most Popular] Complete brand identity, multi-page digital flagship, bespoke copywriting, and intake/booking integration (as crafted for Hali Institute & premier flagship clients).
- **03. Enterprise & Custom Systems ($16,500+ AUD)** — 3–4 weeks. Ideal for multi-stakeholder companies, scaling commerce platforms, or multi-location groups.
Explain why this package suits their exact stage and commercial goals.

### 3. User Journey & Conversion Architecture
How the digital flagship will guide prospective clients or patients from first impression to confident action.

### 4. Next Step & Timeline
Outline the clean, disciplined delivery timeline (kickoff to launch in 7–14 days) and invite them to schedule a 15-minute discovery dialogue.`;

    // 1. Try Google Gemini if key is available
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: systemPrompt,
        prompt: `Client Practice Enquiry:\n"${prompt}"`,
      });
      return result.toTextStreamResponse();
    }

    // 2. Try OpenAI if key is available
    if (process.env.OPENAI_API_KEY) {
      const result = streamText({
        model: openai('gpt-4o-mini'),
        system: systemPrompt,
        prompt: `Client Practice Enquiry:\n"${prompt}"`,
      });
      return result.toTextStreamResponse();
    }

    // 3. Resilient Client-Focused Stream Fallback
    const lower = prompt.toLowerCase();
    let packageRec = '02. Flagship Studio Build ($8,800 AUD)';
    let timeline = '10–14 business days';
    let focus = 'Complete custom design, high-converting editorial copywriting, and seamless conversion pathways.';

    if (lower.includes('solo') || lower.includes('simple') || lower.includes('consultant') || lower.includes('single') || lower.includes('fast')) {
      packageRec = '01. Digital Launch / Solo Flagship ($4,800 AUD)';
      timeline = '5–7 business days';
      focus = 'A refined, high-authority single-page presence that introduces your expertise and books qualified introductions.';
    } else if (lower.includes('multi') || lower.includes('enterprise') || lower.includes('commerce') || lower.includes('scale') || lower.includes('locations')) {
      packageRec = '03. Enterprise & Custom Systems ($16,500+ AUD)';
      timeline = '3–4 weeks';
      focus = 'Complex digital architecture, headless commerce, multi-location structures, and high-scale user journeys.';
    }

    const chunks = [
      `### 1. Strategic Project Overview\n\n`,
      `Thank you for sharing your background. Whether launching a category-defining brand or elevating an authoritative specialist practice, prospective clients and patients form their judgment within seconds of landing on your flagship.\n\n`,
      `Most websites feel either bloated with generic agency templates or cluttered with fragile third-party plugins. Your venture deserves a digital flagship that reflects distinct craft, senior taste, and effortless conversion.\n\n`,
      `### 2. Recommended Studio Engagement\n\n`,
      `Based on what you've described, our **${packageRec}** is the ideal strategic fit.\n\n`,
      `- **Turnaround Time:** ${timeline}\n`,
      `- **Core Focus:** ${focus}\n`,
      `- **Why this fit:** This delivers a completely bespoke digital flagship—with all design, art direction, and editorial words crafted specifically for your audience—without the 6-month delays or agency retainers.\n\n`,
      `### 3. User Journey & Conversion Architecture\n\n`,
      `- **Elevated Visual Presence:** A bespoke visual language that immediately establishes authority in your market.\n`,
      `- **Clear, High-Converting Copy:** We craft every paragraph to articulate your value proposition and remove friction.\n`,
      `- **Frictionless Action:** An intuitive consultation or inquiry flow that converts visitors on both mobile and desktop.\n\n`,
      `### 4. Next Step & Delivery Timeline\n\n`,
      `We can onboard your project into our upcoming sprint and have your new platform live in approximately **${timeline}**.\n\n`,
      `Click the button below to reserve a 15-minute discovery dialogue with our studio directors. We've transferred your project notes into the form so we can jump straight into discussing your vision.\n`
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
    return new Response(JSON.stringify({ error: 'Unable to process project enquiry.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
