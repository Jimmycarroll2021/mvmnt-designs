'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string[];
}

const FAQS: FaqItem[] = [
  {
    q: 'How much time is required from our team during the engagement?',
    a: [
      'Virtually none. We recognise that founders, business leaders, and medical specialists have intense schedules. Your total direct commitment is strictly limited to a single 45-minute discovery and intake conversation with our studio directors.',
      'During this focused dialogue, we capture your commercial positioning, aesthetic preferences, service offerings, and brand tone. From that point forward, our senior team handles everything: architectural wireframing, bespoke editorial copywriting, visual art direction, and modern edge engineering. You receive a refined, staging-ready platform for final sign-off, without endless committee meetings or administrative drag.',
    ],
  },
  {
    q: 'Do we have to write our own website copy?',
    a: [
      'No. The single greatest frustration clients experience with traditional agencies is being handed a blank questionnaire and told to write their own pages. At MVMNT Studio, you will never be asked to write a single paragraph.',
      'Our senior editorial copywriters craft every line of text to articulate your value proposition, build deep credibility, and persuade discerning visitors. For our specialist medical and clinical engagements (such as our Hali Institute use case), all copy is strictly researched, patient-centred, and engineered within AHPRA medical advertising guidelines. You retain full editorial sign-off, but the heavy lifting is entirely ours.',
    ],
  },
  {
    q: 'How does MVMNT compare to $20k+ traditional agencies or $2k cheap template freelancers?',
    a: [
      'We occupy a deliberate sweet spot of uncompromising design craft, modern technology, and surgical efficiency.',
      'Budget $2,000 WordPress freelancers rely on recycled templates, 30+ fragile plugins, and generic stock imagery that drag page speed down and break regularly.',
      'Conversely, $20,000 to $35,000 legacy agencies burden you with heavy account management layers, junior delegates, and prolonged 4-to-6-month timelines.',
      'MVMNT Studio ($4,800 to $16,500 AUD) pairs you directly with senior creative and technical partners. By building on modern Next.js edge architecture rather than bloated templates, we deploy a bespoke, sub-second digital flagship in 7 to 14 business days at a fixed, transparent investment.',
    ],
  },
  {
    q: 'What technology stack do you build on?',
    a: [
      'We engineer on modern edge architecture: Next.js with Turbopack, Sanity Headless CMS, and managed global infrastructure with 99.9% uptime.',
      'For e-commerce and sports platforms (like MVMNT Club), we integrate high-performance Shopify Admin GraphQL pipelines. For specialist practices, we provide seamless zero-redirect booking integrations with Cliniko, Halaxy, and modern calendar software.',
      'This eliminates vulnerable WordPress plugins, database crashes, and slow mobile loading.',
    ],
  },
  {
    q: 'Can our internal team update content after launch?',
    a: [
      'Yes, effortlessly and without any risk of breaking typography or mobile layouts.',
      'For teams preferring internal control, we deliver an intuitive, clean content studio (powered by Sanity CMS). Your staff can update news, team bios, fees, schedules, and service guides in seconds.',
      'Alternatively, most clients utilise our Studio Care Retainer ($395 AUD / month). With this service, your team simply emails our studio whenever changes are needed, and we test and publish within 24 business hours.',
    ],
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="container max-w-5xl space-y-8">
      <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
            STUDIO STANDARDS & METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mt-1">
            Frequently Addressed Questions.
          </h2>
        </div>
        <div className="text-xs font-mono text-gray-500">
          Direct Answers for Founders, Specialists & Practice Leaders
        </div>
      </div>

      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-6 transition-colors">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between text-left text-base sm:text-lg font-semibold text-gray-950 hover:text-gray-700 transition"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 text-xs font-mono">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="mt-4 pr-12 text-sm text-gray-600 leading-relaxed font-sans space-y-3">
                  {faq.a.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
