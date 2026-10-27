'use client';

import React, { useState, useRef } from 'react';

const SUGGESTED_PROMPTS = [
  {
    label: 'Boutique Cosmetic / Medical Clinic',
    text: 'We run an established private clinic in Australia. We want a warm, luxury web presence that reflects the quality of our care and makes it effortless for new patients to book private consultations.'
  },
  {
    label: 'Independent Specialist / Consultant',
    text: 'I am a solo medical specialist launching my private rooms. I need a refined, highly credible website that puts prospective patients at ease and allows them to schedule their initial appointment.'
  },
  {
    label: 'Growing Multi-Doctor Practice',
    text: 'We are expanding our practice with several doctors. We need clear treatment guides, practitioner profiles, and an organised booking system for our patients.'
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
      setOutput(`### Project Overview\n\nWe would love to discuss your practice in detail. Please select a package below or book a quick discovery call so we can tailor the right approach for your goals.`);
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
    <div id="scoper" className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs uppercase tracking-widest font-mono text-gray-500 font-semibold">
              Instant Practice Strategy Guide
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
            Find the Right Fit for Your Practice
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Tell us about your practice and your ideal clients. We will outline the optimal website structure, timeline, and exact package.
          </p>
        </div>
        <div className="flex items-center">
          <span className="px-3.5 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded-full border border-gray-200">
            15-Minute Strategy Sprint
          </span>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="promptInput" className="block text-xs uppercase tracking-wider font-mono text-gray-500 mb-2">
          Click an example scenario or describe your practice:
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {SUGGESTED_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(item.text);
                handleScope(item.text);
              }}
              disabled={isStreaming}
              className="text-left p-4 rounded-xl border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-xs text-gray-700 transition duration-200 hover:-translate-y-0.5 disabled:opacity-50"
            >
              <span className="font-semibold block text-gray-900 mb-1 text-sm">{item.label}</span>
              <span className="line-clamp-2 text-gray-500 leading-relaxed">{item.text}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            id="promptInput"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. We are an established boutique practice looking to attract more private patients. We want our website to feel like a high-end private sanctuary. We want prospective patients to understand our treatment plans and easily book consultations..."
            className="w-full rounded-xl border border-gray-300 p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            disabled={isStreaming}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <span className="text-xs text-gray-500 font-mono">
            Get an instant recommendation tailored to your practice
          </span>
          <button
            type="button"
            onClick={() => handleScope()}
            disabled={!prompt.trim() || isStreaming}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-sm"
          >
            {isStreaming ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Crafting Your Practice Strategy...
              </>
            ) : (
              <>
                Get Instant Practice Recommendation
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
              Your Practice Strategy Summary
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyScope}
                className="text-xs px-3.5 py-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-600 font-mono transition"
              >
                {copied ? 'Copied' : 'Copy Summary'}
              </button>
              <button
                type="button"
                onClick={handleTransferToBooking}
                className="text-xs px-4 py-1.5 rounded bg-black text-white hover:bg-gray-800 font-mono transition-all duration-200 hover:-translate-y-0.5"
              >
                Transfer to Booking Form ↓
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-sans text-sm leading-relaxed whitespace-pre-wrap selection:bg-gray-300">
            {output}
            {isStreaming && <span className="inline-block w-2 h-4 bg-black animate-pulse ml-1"></span>}
          </div>
        </div>
      )}
    </div>
  );
}
