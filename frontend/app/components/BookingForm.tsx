'use client';

import React, { useState, useEffect } from 'react';

const PACKAGES = [
  { value: 'Not sure yet (Help me choose on our call)', label: 'Not sure yet (Help me choose on our call)' },
  { value: '01. Solo Specialist Launch ($4,800 AUD)', label: '01. Solo Specialist Launch — $4,800 AUD (5–7 Days)' },
  { value: '02. Boutique Clinic Studio Build ($8,800 AUD)', label: '02. Boutique Clinic Studio Build — $8,800 AUD (10–14 Days)' },
  { value: '03. Complete Practice Transformation ($16,500+ AUD)', label: '03. Complete Practice Transformation — $16,500+ AUD (3–4 Weeks)' },
  { value: 'Studio Care & Peace of Mind ($395/mo)', label: 'Studio Care & Support — $395 AUD / month' },
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    packageTier: 'Not sure yet (Help me choose on our call)',
    scopeNotes: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [receipt, setReceipt] = useState<string>('');

  // Listen for package selection events from pricing cards or Studio Scoper
  useEffect(() => {
    const handlePackageSelect = (e: CustomEvent) => {
      if (e.detail) {
        setFormData((prev) => ({
          ...prev,
          packageTier: e.detail.packageTier || prev.packageTier,
          scopeNotes: e.detail.scopeNotes !== undefined ? e.detail.scopeNotes : prev.scopeNotes,
        }));
      }
    };

    window.addEventListener('mvmnt_select_package' as any, handlePackageSelect);
    return () => {
      window.removeEventListener('mvmnt_select_package' as any, handlePackageSelect);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setStatus('success');
      setReceipt(data.receiptId || 'MVMNT-CONFIRMED');
      setFeedback(data.message || 'Thank you. We have received your inquiry. We will review your practice and email you a direct scheduling link within 24 business hours.');
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.message || 'An unexpected error occurred. Please reach out directly.');
    }
  };

  return (
    <div id="booking" className="rounded-2xl border border-gray-200 bg-white p-6 md:p-12 shadow-sm">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-widest font-mono text-gray-500 font-semibold">
          Direct Studio Conversation
        </span>
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
          Request a 15-Minute Strategy Call with Jimmy
        </h3>
        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
          Let’s discuss your practice, the patients you want to attract, and how we can elevate your online presence. No pushy sales follow-ups—just an honest assessment of what will move the needle for your business.
        </p>

        {/* Clear What Happens Next Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100 text-left">
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="text-[10px] font-mono uppercase text-gray-500 font-semibold">Step 1 · 24h</div>
            <div className="text-xs font-medium text-gray-900 mt-0.5">Clinical Review</div>
            <div className="text-[11px] text-gray-600 mt-1">We inspect your current site and specialty.</div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="text-[10px] font-mono uppercase text-gray-500 font-semibold">Step 2 · Direct Link</div>
            <div className="text-xs font-medium text-gray-900 mt-0.5">Calendar Booking</div>
            <div className="text-[11px] text-gray-600 mt-1">Pick a 15-min call slot that fits your rooms.</div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="text-[10px] font-mono uppercase text-gray-500 font-semibold">Step 3 · Fixed Quote</div>
            <div className="text-xs font-medium text-gray-900 mt-0.5">Transparent Scope</div>
            <div className="text-[11px] text-gray-600 mt-1">Written proposal with predictable costs.</div>
          </div>
        </div>
      </div>

      {status === 'success' ? (
        <div className="mt-8 p-8 rounded-xl bg-gray-50 border border-gray-200 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Strategy Call Request Received</h4>
          <p className="text-sm text-gray-700 max-w-md mx-auto mb-4">{feedback}</p>
          <div className="inline-block px-4 py-2 bg-white rounded border border-gray-200 font-mono text-xs text-gray-800">
            Inquiry Reference: <span className="font-semibold text-black">{receipt}</span>
          </div>
          <p className="text-xs text-gray-500 mt-4 max-w-sm mx-auto">
            Check your inbox for a confirmation. We will follow up with our direct calendar scheduling link.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  website: '',
                  packageTier: 'Not sure yet (Help me choose on our call)',
                  scopeNotes: '',
                  honeypot: '',
                });
              }}
              className="text-xs text-gray-500 hover:text-black font-mono underline"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Honeypot field for anti-spam */}
          <input
            type="text"
            name="website_secondary"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs uppercase font-mono tracking-wider text-gray-600 mb-2">
                Your Full Name *
              </label>
              <input
                id="name"
                required
                type="text"
                placeholder="Dr. Julian Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs uppercase font-mono tracking-wider text-gray-600 mb-2">
                Practice or Work Email *
              </label>
              <input
                id="email"
                required
                type="email"
                placeholder="julian@vanceclinic.com.au"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="website" className="block text-xs uppercase font-mono tracking-wider text-gray-600 mb-2">
                Current Website (Optional)
              </label>
              <input
                id="website"
                type="text"
                placeholder="https://vanceclinic.com.au"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>

            <div>
              <label htmlFor="packageTier" className="block text-xs uppercase font-mono tracking-wider text-gray-600 mb-2">
                Package You Are Interested In *
              </label>
              <select
                id="packageTier"
                value={formData.packageTier}
                onChange={(e) => setFormData({ ...formData, packageTier: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition bg-white"
              >
                {PACKAGES.map((pkg) => (
                  <option key={pkg.value} value={pkg.value}>
                    {pkg.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="scopeNotes" className="block text-xs uppercase font-mono tracking-wider text-gray-600 mb-2">
              Tell Us a Little About Your Practice & Goals
            </label>
            <textarea
              id="scopeNotes"
              rows={4}
              placeholder="Tell us about the treatments or services you offer, what's currently holding your website back, and when you would love to launch..."
              value={formData.scopeNotes}
              onChange={(e) => setFormData({ ...formData, scopeNotes: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
          </div>

          {status === 'error' && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
              {feedback}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-600 font-sans">
              Strict confidentiality assured. No high-pressure sales calls, ever.
            </span>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition"
            >
              {status === 'loading' ? 'Sending Request...' : 'Request 15-Minute Strategy Call →'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
