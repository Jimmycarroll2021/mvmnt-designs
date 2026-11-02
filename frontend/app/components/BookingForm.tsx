'use client';

import React, { useState, useEffect } from 'react';

const PACKAGES = [
  { value: 'Not sure yet (Help me choose on our call)', label: 'Not sure yet (Help me choose on our call)' },
  { value: '01. Digital Launch / Solo Specialist ($4,800 AUD)', label: '01. Solo Specialist — $4,800 AUD (5–7 Days)' },
  { value: '02. Flagship Studio Build ($8,800 AUD)', label: '02. Boutique Clinic — $8,800 AUD (10–14 Days)' },
  { value: '03. Enterprise & Custom Systems ($16,500+ AUD)', label: '03. Practice Transformation — $16,500+ AUD (3–4 Weeks)' },
  { value: 'Studio Care & Support ($395/mo)', label: 'Studio Care & Support — $395 AUD / month' },
  { value: 'Brand / Custom Digital Project (Bespoke Scope)', label: 'Brand / Custom Digital Project (Bespoke Scope)' },
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

  useEffect(() => {
    const handlePackageSelect = (e: any) => {
      if (e.detail) {
        setFormData((prev) => ({
          ...prev,
          packageTier: e.detail.packageTier || prev.packageTier,
          scopeNotes: e.detail.scopeNotes !== undefined ? e.detail.scopeNotes : prev.scopeNotes,
        }));
      }
    };

    window.addEventListener('mvmnt_select_package', handlePackageSelect);
    return () => {
      window.removeEventListener('mvmnt_select_package', handlePackageSelect);
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
      setFeedback(
        data.message ||
          'Thank you. We have received your inquiry. We will review your practice and email you a direct scheduling link within 24 business hours.'
      );
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.message || 'An unexpected error occurred. Please reach out directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-8 p-6 bg-white/90 backdrop-blur rounded border border-[#a6b5a4] space-y-3">
        <div className="eyebrow text-green-900 font-bold">Request Received · {receipt}</div>
        <p className="text-sm font-medium text-black m-0 leading-relaxed">{feedback}</p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFeedback('');
          }}
          className="button text-xs mt-3"
        >
          <span>+</span> Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block eyebrow mb-1.5 text-xs text-[#202827]">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Dr. Jane Smith or Director"
            className="w-full p-3 bg-white/95 border border-[#bac5bd] rounded text-sm text-[#181919] focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="email" className="block eyebrow mb-1.5 text-xs text-[#202827]">
            Work / Practice Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@practice.com.au"
            className="w-full p-3 bg-white/95 border border-[#bac5bd] rounded text-sm text-[#181919] focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="website" className="block eyebrow mb-1.5 text-xs text-[#202827]">
            Current Website / Handle
          </label>
          <input
            id="website"
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="currentdomain.com.au or New"
            className="w-full p-3 bg-white/95 border border-[#bac5bd] rounded text-sm text-[#181919] focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="packageTier" className="block eyebrow mb-1.5 text-xs text-[#202827]">
            Starting Scope / Package
          </label>
          <select
            id="packageTier"
            value={formData.packageTier}
            onChange={(e) => setFormData({ ...formData, packageTier: e.target.value })}
            className="w-full p-3 bg-white/95 border border-[#bac5bd] rounded text-sm text-[#181919] focus:outline-none focus:ring-1 focus:ring-black"
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
        <label htmlFor="scopeNotes" className="block eyebrow mb-1.5 text-xs text-[#202827]">
          What are you looking to change or achieve?
        </label>
        <textarea
          id="scopeNotes"
          rows={3}
          value={formData.scopeNotes}
          onChange={(e) => setFormData({ ...formData, scopeNotes: e.target.value })}
          placeholder="Tell us about your practice or brand, your goals, and timeline..."
          className="w-full p-3 bg-white/95 border border-[#bac5bd] rounded text-sm text-[#181919] focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {status === 'error' && (
        <div className="p-3 bg-red-100 text-red-900 text-xs rounded border border-red-200">
          {feedback}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="button w-full sm:w-auto text-xs py-3 px-6 cursor-pointer"
        >
          <span>↗</span> {status === 'loading' ? 'Sending Request...' : 'Request 15-Minute Strategy Call'}
        </button>
        <div className="contact-note">Direct review by Jimmy within 24 business hours</div>
      </div>
    </form>
  );
}
