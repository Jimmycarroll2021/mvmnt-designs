'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ShowreelSlide {
  id: string;
  src: string;
  alt: string;
  caption: string;
  discipline: string;
}

const SHOWREEL_SLIDES: ShowreelSlide[] = [
  {
    id: 'hali-cover',
    src: '/images/hali_case_study_cover.png',
    alt: 'Hali Institute of Restorative Medicine Canberra',
    caption: 'Hali Institute · Restorative Medicine Consulting Rooms',
    discipline: 'Brand Identity & Editorial Web Architecture',
  },
  {
    id: 'hali-desktop',
    src: '/images/hali_case_study_hero.png',
    alt: 'Desktop Experience Preview',
    caption: 'Clinical Service Directories & Procedure Guides',
    discipline: 'High-Trust Clinical Copywriting & Layout',
  },
  {
    id: 'hali-menu',
    src: '/images/hali_case_study_menu.png',
    alt: 'Mobile Experience Preview',
    caption: 'Frictionless Mobile Patient Booking Journeys',
    discipline: 'Modern Edge Engineering · Sub-Second Speed',
  },
];

export default function HeroShowreel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SHOWREEL_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full space-y-4 select-none">
      {/* Visual Frame (Swell-style aspect ratio with hairline border) */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden border border-black bg-neutral-100">
        {SHOWREEL_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          );
        })}

        {/* Live Slide Indicator Badge */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-md text-[#f0ff50] font-mono text-[10px] uppercase tracking-widest">
          {current + 1} / {SHOWREEL_SLIDES.length}
        </div>
      </div>

      {/* Caption & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500 pt-1">
        <div className="flex items-center gap-3">
          <span className="text-black font-semibold uppercase">
            {SHOWREEL_SLIDES[current].caption}
          </span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-500">
            {SHOWREEL_SLIDES[current].discipline}
          </span>
        </div>

        {/* Minimal Progress Lines */}
        <div className="flex items-center gap-2">
          {SHOWREEL_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-0.5 transition-all duration-300 ${
                i === current ? 'w-8 bg-black' : 'w-3 bg-neutral-300 hover:bg-neutral-500'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
