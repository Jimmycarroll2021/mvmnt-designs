'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string[];
}

const FAQS: FaqItem[] = [
  {
    q: 'How much time will this take away from my patient schedule?',
    a: [
      'Virtually none. We recognise that your clinical diary is dedicated to patient care, surgical lists, and multidisciplinary meetings. Your total direct commitment is strictly limited to a single 45-minute clinical intake conversation with our studio director.',
      'During this focused dialogue, we capture your diagnostic approach, referral criteria, procedural nuances, and practice tone. From that point forward, our team handles everything: architectural wireframing, bespoke editorial copywriting, visual art direction, and technical systems integration. You are presented with a refined, staging-ready platform for final clinical sign-off, without having to attend endless committee meetings or manage digital minutiae.',
    ],
  },
  {
    q: 'Do I have to write my own clinical copy?',
    a: [
      'No. The single greatest frustration specialists experience with traditional marketing agencies is being handed a blank document and told to write their own procedural pages. At MVMNT Studio, you will never be asked to write a single paragraph.',
      'Our editorial copywriters specialise exclusively in medical and health communication. We conduct independent literature reviews on your subspecialities, review your existing referral collateral, and synthesise your exact diagnostic philosophy into clear, patient-centred language. We articulate complex clinical pathways in a manner that calms patient apprehension, establishes immediate authority, and earns the respect of referring general practitioners. You retain full editorial approval, but the heavy lifting is entirely ours.',
    ],
  },
  {
    q: 'How does this comply with AHPRA medical advertising rules?',
    a: [
      'Every line of copy and visual element we produce is engineered strictly within the statutory boundaries of the Health Practitioner Regulation National Law (Section 133), the AHPRA Guidelines for Advertising Regulated Health Services, and the Therapeutic Goods Advertising Code.',
      'We never publish prohibited patient testimonials regarding clinical outcomes, never make misleading claims of guaranteed results, and never advertise scheduled prescription medications or restricted therapeutic substances by brand name. Furthermore, we ensure your accredited medical titles and post-nominal qualifications (e.g. FRACS, FRANZCP, FACD) are represented with complete regulatory integrity.',
    ],
  },
  {
    q: 'How does this compare to $20k+ traditional agencies or $2k cheap WordPress templates?',
    a: [
      'We occupy a deliberate middle ground of uncompromising quality and surgical efficiency.',
      'Budget $2,000 WordPress templates rely on recycled layouts, 30+ unstable plugins, and generic stock photography. They load sluggishly on mobile devices, suffer frequent database crashes, and force your reception staff to write the clinical copy.',
      'Conversely, $20,000 to $35,000 traditional agencies burden you with heavy account management overhead, layers of junior staff, and drawn-out 4-to-6-month timelines.',
      'MVMNT Studio ($4,800 to $16,500 AUD) pairs you directly with senior design and editorial directors. By building on clean, modern architecture rather than fragile plugin monoliths, we launch a bespoke, fast-loading digital platform in 7 to 14 business days at a fixed, predictable investment.',
    ],
  },
  {
    q: 'Can my staff update the site after launch?',
    a: [
      'Yes, effortlessly and without any risk of breaking your typography or mobile layouts.',
      'For practices preferring direct internal control, we provide a secure, intuitive content studio (powered by Sanity CMS). Your practice manager can update consulting hours, add associate doctors, amend room locations, or publish clinical announcements within protected, structured fields.',
      'Alternatively, most of our specialist practices utilise our Studio Care Retainer ($395 AUD / month). With this service, your reception staff simply email our dedicated studio desk whenever fees, schedules, or team profiles change. We test and publish the update within 24 business hours, giving you total peace of mind.',
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
            PRACTICE GOVERNANCE & METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mt-1">
            Frequently Addressed Questions.
          </h2>
        </div>
        <div className="text-xs font-mono text-gray-500">
          Direct Answers for Discerning Practice Leaders
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
