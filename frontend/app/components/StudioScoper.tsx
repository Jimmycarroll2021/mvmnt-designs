'use client';

import React, { useState, useRef } from 'react';

const SUGGESTED_PROMPTS = [
  {
    label: 'Cosmetic Dermatology Clinic',
    text: 'We are an established cosmetic dermatology clinic in Melbourne with 3 doctors. Our current WordPress site is slow and bloated. We need bespoke branding, sub-second edge performance, and seamless patient consultation bookings.'
  },
  {
    label: 'Solo Consultant / Specialist',
    text: 'I am a solo clinical psychologist launching my private consultancy. I need a clean, authoritative single-page presence that looks high-end, loads instantly on mobile, and lets clients schedule introductory calls.'
  },
  {
    label: 'Multi-Location Allied Health Practice',
    text: 'We run a 2-location physiotherapy and sports medicine practice. We need custom booking integration with Cliniko/Halaxy, localized search SEO, and paid ad acquisition landing funnels.'
  }
];

export default function StudioScoper() {
  const [prompt, setPrompt] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleScope = async (textToScope?: string) => {
    const query = textToScope || prompt;
    if (!query.trim() || isStreaming) return;

    setIsStreaming(true);
    setOutput('');

    try {
      const response = await fetch('/api/scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No readable response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setOutput(accumulated);
      }
    } catch (err: any) {
      setOutput(`### Diagnostic Notice\n\nUnable to stream diagnostic directly: ${err.message}. Please select a package below or schedule a direct architectural discovery call.`);
    } finally {
      setIsStreaming(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const handleCopyScope = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransferToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      const notesField = document.getElementById('scopeNotes') as HTMLTextAreaElement;
      if (notesField && output) {
        notesField.value = output.slice(0, 800) + '...';
      }
    }
  };

  return (
    <div id="scoper" className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-mono text-gray-500 font-semibold">
              Vercel AI SDK Real-Time Scoper
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
            Studio Project Diagnostic & Scoper
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Provide your practice model, goals, or current URL. Our edge model diagnoses the scope and identifies the exact package.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded-full border border-gray-200">
            Node.js / Edge Runtime
          </span>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="promptInput" className="block text-xs uppercase tracking-wider font-mono text-gray-500 mb-2">
          Select a sample brief or type your own requirements:
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          {SUGGESTED_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(item.text);
                handleScope(item.text);
              }}
              disabled={isStreaming}
              className="text-left p-3 rounded-lg border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-xs text-gray-700 transition duration-150 disabled:opacity-50"
            >
              <span className="font-semibold block text-gray-900 mb-1">{item.label}</span>
              <span className="line-clamp-2 text-gray-500">{item.text}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            id="promptInput"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. We are a boutique fertility clinic in Sydney. We need an editorial rebrand, patient self-assessment questionnaires, and 100% WCAG AAA accessibility. We want to launch in under 3 weeks."
            className="w-full rounded-xl border border-gray-300 p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            disabled={isStreaming}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <span className="text-xs text-gray-500 font-mono">
            Direct streaming inference via Vercel AI SDK
          </span>
          <button
            type="button"
            onClick={() => handleScope()}
            disabled={!prompt.trim() || isStreaming}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition flex items-center justify-center gap-2"
          >
            {isStreaming ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Streaming Architectural Scope...
              </>
            ) : (
              <>
                Diagnose Project Scope
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {(output || isStreaming) && (
        <div ref={resultRef} className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Architectural Diagnostic Output
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyScope}
                className="text-xs px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 text-gray-600 font-mono transition"
              >
                {copied ? 'Copied' : 'Copy Scope'}
              </button>
              <button
                type="button"
                onClick={handleTransferToBooking}
                className="text-xs px-3 py-1 rounded bg-black text-white hover:bg-gray-800 font-mono transition"
              >
                Transfer to Booking ↓
              </button>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-mono text-xs leading-relaxed whitespace-pre-wrap selection:bg-gray-300">
            {output}
            {isStreaming && <span className="inline-block w-2 h-4 bg-black animate-pulse ml-1"></span>}
          </div>
        </div>
      )}
    </div>
  );
}
