import React from 'react';

const FAQS = [
  {
    q: 'How much time will I need to commit?',
    a: 'We start with a focused 45-minute intake conversation to understand your practice, audience and goals. We lead the design and writing process, with your input at agreed review points and final sign-off.',
    defaultOpen: true,
  },
  {
    q: 'Do I have to write my own website copy?',
    a: 'Clinical and commercial copywriting is part of the studio offering. We develop the content with you, reflecting your approach, services and voice. Clinical information requires your review and approval.',
    defaultOpen: false,
  },
  {
    q: 'How do you approach medical advertising requirements?',
    a: 'The studio offers AHPRA-aware copywriting and practice guides. We build clinical review into the process; the final content and any regulatory advice should be reviewed by the practice and its advisers.',
    defaultOpen: false,
  },
  {
    q: 'Can you connect our booking software?',
    a: 'Booking and practice-system integrations are scoped around your existing tools, including Cliniko, Halaxy and Stripe where appropriate. We confirm feasibility and requirements before agreeing the project.',
    defaultOpen: false,
  },
  {
    q: 'Can our team update the site after launch?',
    a: 'Content management is scoped to your needs. The practice transformation package includes a staff-friendly content studio. Ongoing Studio Care is also available for content updates and infrastructure support.',
    defaultOpen: false,
  },
];

export default function FaqSection() {
  return (
    <section className="faq-section" id="questions">
      <div className="section-head">
        <h2>A few good questions.</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((faq, idx) => (
          <details key={idx} defaultOpen={faq.defaultOpen}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
