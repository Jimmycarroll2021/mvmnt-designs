'use client';

import React from 'react';

import { PACKAGES, STUDIO_CARE } from '@/app/content/home';



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
          <p>{STUDIO_CARE.price}</p>
          <p className="small-copy">
            {STUDIO_CARE.desc}
          </p>
          <a
            className="button"
            href="#contact"
            onClick={() => handleSelect(STUDIO_CARE.enquiryLabel)}
          >
            <span>+</span> Enquire about studio care
          </a>
        </div>
      </div>
    </section>
  );
}
