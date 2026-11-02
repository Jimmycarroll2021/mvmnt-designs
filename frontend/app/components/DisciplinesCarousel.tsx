'use client';

import React, { useRef } from 'react';

const DISCIPLINES = [
  {
    tag: '01 / Brand & Positioning',
    title: 'Distinctive by design.',
    desc: 'Visual identities and considered messaging that give your practice or brand a clear voice.',
    items: [
      'Visual identity & art direction',
      'Clinical & commercial copywriting',
      'AHPRA-aware practice guides',
      'Brand guidelines & typography',
    ],
  },
  {
    tag: '02 / Digital Flagships',
    title: 'Built around your audience.',
    desc: 'Bespoke web platforms that bring clarity, character and responsive interaction to every screen.',
    items: [
      'Next.js development',
      'Responsive web design',
      'Performance optimisation',
      'Content architecture',
    ],
  },
  {
    tag: '03 / Clinic & Booking Systems',
    title: 'A clearer path to booking.',
    desc: 'Connected patient journeys that help people understand your services and take the next step.',
    items: [
      'Practice software integrations',
      'Practitioner directories',
      'Patient intake workflows',
      'Ongoing care & support',
    ],
  },
];

export default function DisciplinesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector('.card') as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 28 : 340;
      trackRef.current.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="stories" id="disciplines">
      <div className="section-head">
        <h2>Our disciplines</h2>
        <div>
          <a href="#contact">Start a conversation</a>
          <button
            type="button"
            className="arrow"
            onClick={() => handleScroll(-1)}
            aria-label="Previous discipline"
          >
            ←
          </button>
          <button
            type="button"
            className="arrow"
            onClick={() => handleScroll(1)}
            aria-label="Next discipline"
          >
            →
          </button>
        </div>
      </div>

      <div className="track" id="cases" ref={trackRef}>
        {DISCIPLINES.map((item, idx) => (
          <a key={idx} className="card" href="#contact">
            <div className="eyebrow">{item.tag}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <ul>
              {item.items.map((bullet, bIdx) => (
                <li key={bIdx}>{bullet}</li>
              ))}
            </ul>
            <div className="link">
              Let’s discuss your project <span>↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
