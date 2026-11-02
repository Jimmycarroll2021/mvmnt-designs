'use client';

import React, { useState } from 'react';

interface Recommendation {
  title: string;
  meta: string;
  description: string;
  packageTier: string;
}

const RECOMMENDATIONS: Record<string, Recommendation> = {
  solo: {
    title: 'Solo Specialist',
    meta: '$4,800 AUD · 5–7 days',
    description: 'A focused single-page website, copywriting and consultation booking flow.',
    packageTier: '01. Digital Launch / Solo Specialist ($4,800 AUD)',
  },
  boutique: {
    title: 'Boutique Clinic',
    meta: '$8,800 AUD · 10–14 days',
    description: 'A multi-page editorial website with visual identity and patient journeys.',
    packageTier: '02. Flagship Studio Build ($8,800 AUD)',
  },
  group: {
    title: 'Practice Transformation',
    meta: '$16,500+ AUD · 3–4 weeks',
    description: 'Practitioner profiles, locations, service pages and scoped practice integrations.',
    packageTier: '03. Enterprise & Custom Systems ($16,500+ AUD)',
  },
  brand: {
    title: 'Let’s scope it together',
    meta: 'Bespoke scope & quote',
    description: 'Brand identity, commerce and digital projects start with a studio conversation.',
    packageTier: 'Brand / Custom Digital Project (Bespoke Scope)',
  },
};

export default function StudioScoper() {
  const [selected, setSelected] = useState<string>('');

  const rec = selected ? RECOMMENDATIONS[selected] : null;

  const handleSelectPackage = (tier: string, notes: string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('mvmnt_select_package', {
        detail: {
          packageTier: tier,
          scopeNotes: `Selected from Studio Scoper: ${notes}`,
        },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section className="split scoper" id="scoper">
      <div>
        <div className="eyebrow">Studio Scoper</div>
        <h2>
          A useful starting point
          <br />
          for your next move.
        </h2>
        <p className="small-copy">
          Choose the shape of your project to explore a starting package. Final scope, integrations
          and delivery dates are agreed with the studio.
        </p>
      </div>

      <div>
        <label htmlFor="projectType">What are you building?</label>
        <select
          id="projectType"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select your project</option>
          <option value="solo">Independent specialist / solo practice</option>
          <option value="boutique">Boutique clinic / established practice</option>
          <option value="group">Multi-doctor / multi-location practice</option>
          <option value="brand">Brand or non-clinical digital project</option>
        </select>

        <div id="recommendation" aria-live="polite">
          {rec ? (
            <div>
              <h3>{rec.title}</h3>
              <div className="eyebrow">{rec.meta}</div>
              <p>{rec.description}</p>
              <a
                className="button"
                href="#contact"
                onClick={() => handleSelectPackage(rec.packageTier, rec.description)}
              >
                <span>+</span> Discuss this direction
              </a>
            </div>
          ) : (
            'Select a project type to see your starting point.'
          )}
        </div>
      </div>
    </section>
  );
}
