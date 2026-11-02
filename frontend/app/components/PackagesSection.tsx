'use client';

import React from 'react';

const PACKAGES = [
  {
    tier: '01 / Solo Specialist',
    price: '$4,800',
    time: 'Indicative delivery · 5–7 days',
    desc: 'For independent practitioners and solo specialists.',
    bullets: [
      'Bespoke single-page website',
      'Clinical copywriting',
      'Consultation booking integration',
      'Mobile-first design',
    ],
    fullTier: '01. Digital Launch / Solo Specialist ($4,800 AUD)',
  },
  {
    tier: '02 / Boutique Clinic',
    price: '$8,800',
    time: 'Indicative delivery · 10–14 days',
    desc: 'A complete editorial website for an established practice.',
    bullets: [
      'Multi-page website & service content',
      'Clinical copywriting',
      'Visual identity & typography',
      'Patient assessment flow',
      'Search Console setup',
    ],
    fullTier: '02. Flagship Studio Build ($8,800 AUD)',
  },
  {
    tier: '03 / Practice Transformation',
    price: '$16,500+',
    time: 'Indicative delivery · 3–4 weeks',
    desc: 'For multi-doctor clinics and multi-location groups.',
    bullets: [
      'Individual practitioner profiles',
      'Practice management integration',
      'Procedural landing pages',
      'Multi-location content',
      'Staff-friendly content studio',
    ],
    fullTier: '03. Enterprise & Custom Systems ($16,500+ AUD)',
  },
];

export default function PackagesSection() {
  const handleSelect = (tier: string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('mvmnt_select_package', {
        detail: { packageTier: tier },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section className="packages" id="pricing">
      <div className="section-head">
        <h2>
          Clear scope.
          <br />
          Considered investment.
        </h2>
        <span className="eyebrow">Studio packages · AUD</span>
      </div>

      <div className="package-grid" id="packages">
        {PACKAGES.map((pkg, idx) => (
          <article key={idx} className="package">
            <div className="eyebrow">{pkg.tier}</div>
            <h3>
              {pkg.price}
              <small> AUD</small>
            </h3>
            <div className="time">{pkg.time}</div>
            <p>{pkg.desc}</p>
            <ul>
              {pkg.bullets.map((b, bIdx) => (
                <li key={bIdx}>{b}</li>
              ))}
            </ul>
            <a
              className="button"
              href="#contact"
              onClick={() => handleSelect(pkg.fullTier)}
            >
              <span>+</span> Enquire about this package
            </a>
          </article>
        ))}
      </div>

      <div className="care">
        <div>
          <span className="eyebrow">Ongoing partnership</span>
          <h3>Studio Care &amp; Support</h3>
        </div>
        <div>
          <p>$395 AUD / month</p>
          <p className="small-copy">
            Managed hosting, automated backups, security monitoring and two hours per month of priority content updates.
          </p>
          <a
            className="button"
            href="#contact"
            onClick={() => handleSelect('Studio Care & Support ($395/mo)')}
          >
            <span>+</span> Enquire about studio care
          </a>
        </div>
      </div>
    </section>
  );
}
