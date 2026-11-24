import React from 'react';

import { HOME_FAQS as FAQS } from '@/app/content/home';



export default function FaqSection() {
  return (
    <section className="faq-section" id="questions">
      <div className="section-head">
        <h2>A few good questions.</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((faq, idx) => (
          <details key={idx} defaultOpen={faq.defaultOpen ?? false}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
