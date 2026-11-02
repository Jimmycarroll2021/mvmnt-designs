'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  id: string;
  type: 'image' | 'specimen';
  src?: string;
  alt?: string;
  tag?: string;
  headline?: string;
  sub?: string;
  bg?: string;
}

const SLIDES: Slide[] = [
  {
    id: 'hali',
    type: 'image',
    src: '/images/hali_case_study_cover.png',
    alt: 'Hali Institute Restorative Medicine Canberra',
  },
  {
    id: 'mvmnt-specimen',
    type: 'specimen',
    tag: 'MVMNT STUDIO // CBR',
    headline: 'Simple, yet significant.',
    sub: 'Brand identities and digital flagships that accelerate growth.',
    bg: '#0a0a0a',
  },
  {
    id: 'hali-desktop',
    type: 'image',
    src: '/images/hali_case_study_hero.png',
    alt: 'Hali Institute Desktop Experience',
  },
  {
    id: 'club-specimen',
    type: 'specimen',
    tag: 'HIGH-PERFORMANCE DIGITAL',
    headline: 'Modern Next.js Engineering',
    sub: 'Sub-second speeds. Headless commerce. 99.9% edge uptime.',
    bg: '#141414',
  },
  {
    id: 'hali-mobile',
    type: 'image',
    src: '/images/hali_case_study_menu.png',
    alt: 'Mobile Clinical Experience',
  },
];

export default function HeroShowreel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative w-full overflow-hidden" data-block="hero">
      <div className="relative aspect-square md:h-[82vh] lg:h-[88vh] flex items-center justify-center selection:bg-transparent">
        <div className="container grid grid-cols-12 gap-x-4 lg:gap-x-8 items-center h-full w-full">
          <div className="col-span-full lg:col-span-8 lg:col-start-3 h-full flex items-center justify-center">
            <div className="relative w-full aspect-[1.5] max-h-[calc(100svh-140px)] overflow-hidden rounded-none">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === current;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {slide.type === 'image' && slide.src ? (
                      <div className="w-full h-full relative bg-neutral-100">
                        <Image
                          src={slide.src}
                          alt={slide.alt || 'MVMNT Project Showcase'}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                          sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full flex flex-col justify-between p-8 sm:p-12 text-white"
                        style={{ backgroundColor: slide.bg || '#0a0a0a' }}
                      >
                        <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                          {slide.tag}
                        </div>
                        <div className="space-y-4">
                          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight">
                            {slide.headline}
                          </h2>
                          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-lg">
                            {slide.sub}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                          <span>CANBERRA · SYDNEY</span>
                          <span>EST. 2026</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Minimal dot counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all duration-300 ${
                i === current ? 'w-8 bg-black' : 'w-2 bg-neutral-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
