'use client';

import React, { useState, useEffect, useRef } from 'react';

const CAPTIONS = ['ambitious brands.', 'private practices.', 'meaningful connections.'];
const COLOURS = ['#7495b1', '#e0c7a3', '#b5d3b1'];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % CAPTIONS.length);
        setIsChanging(false);
      }, 420);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (wordmarkRef.current) {
          const blurVal = Math.min(9, y / 65);
          const translateVal = y * 0.12;
          wordmarkRef.current.style.filter = `blur(${blurVal}px)`;
          wordmarkRef.current.style.transform = `translateY(${translateVal}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="hero"
      style={{ '--hero-colour': COLOURS[index] } as React.CSSProperties}
    >
      <div className="grain" />
      <div className="headline">
        <h1>Bespoke design for</h1>
        <div className={`caption ${isChanging ? 'changing' : ''}`} aria-live="polite">
          {CAPTIONS[index]}
        </div>
      </div>
      <div className="wordmark" ref={wordmarkRef}>
        MVMNT DESIGN
        <span className="mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <span className="scroll-hint">Canberra &amp; Sydney · Australia ↓</span>
    </section>
  );
}
