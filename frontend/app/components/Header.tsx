'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cbrTime, setCbrTime] = useState<string>('--:--:--');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Australia/Sydney',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setCbrTime(formatter.format(new Date()));
      } catch {
        setCbrTime('00:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'h-16 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            : 'h-20 bg-white/80 backdrop-blur-sm border-b border-neutral-200/40'
        }`}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Logo & Region */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="w-7 h-7 rounded bg-black flex items-center justify-center text-white font-mono text-xs font-bold tracking-tighter group-hover:bg-[#f0ff50] group-hover:text-black transition-colors duration-200">
              M
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold tracking-tight text-neutral-950 font-sans uppercase">
                MVMNT
              </span>
              <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-mono hidden sm:inline">
                STUDIO · CBR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-wider uppercase text-neutral-600">
            <Link
              href="#work"
              className="hover:text-black transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="text-neutral-300">01</span>
              <span>Recent Work</span>
            </Link>
            <Link
              href="#disciplines"
              className="hover:text-black transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="text-neutral-300">02</span>
              <span>Disciplines</span>
            </Link>
            <Link
              href="#scoper"
              className="hover:text-black transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="text-neutral-300">03</span>
              <span>Studio Scoper</span>
            </Link>
            <Link
              href="#pricing"
              className="hover:text-black transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="text-neutral-300">04</span>
              <span>Packages</span>
            </Link>
            <Link
              href="#philosophy"
              className="hover:text-black transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="text-neutral-300">05</span>
              <span>Philosophy</span>
            </Link>
          </nav>

          {/* Clock & Action Button */}
          <div className="flex items-center gap-4">
            {/* Live Canberra Time Ticker */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/60 font-mono text-[10px] uppercase tracking-wider text-neutral-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CBR {cbrTime}</span>
            </div>

            <Link
              href="#booking"
              onClick={closeMenu}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black text-white text-[11px] font-mono tracking-wider uppercase hover:bg-[#f0ff50] hover:text-black transition-all duration-200 shadow-sm"
            >
              Start Project →
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-neutral-800 hover:text-black hover:bg-neutral-100 transition"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Swell-style full-bleed overlay) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-xl text-white pt-24 px-6 pb-12 flex flex-col justify-between transition-all duration-300 animate-in fade-in"
        >
          <div className="space-y-6 pt-4">
            <div className="font-mono text-[11px] tracking-widest text-[#f0ff50] uppercase">
              MVMNT STUDIO // NAVIGATION
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                href="#work"
                onClick={closeMenu}
                className="text-3xl font-medium tracking-tight hover:text-[#f0ff50] transition-colors"
              >
                Recent Work
              </Link>
              <Link
                href="#disciplines"
                onClick={closeMenu}
                className="text-3xl font-medium tracking-tight hover:text-[#f0ff50] transition-colors"
              >
                Disciplines
              </Link>
              <Link
                href="#scoper"
                onClick={closeMenu}
                className="text-3xl font-medium tracking-tight hover:text-[#f0ff50] transition-colors"
              >
                Studio Scoper
              </Link>
              <Link
                href="#pricing"
                onClick={closeMenu}
                className="text-3xl font-medium tracking-tight hover:text-[#f0ff50] transition-colors"
              >
                Packages & Rates
              </Link>
              <Link
                href="#philosophy"
                onClick={closeMenu}
                className="text-3xl font-medium tracking-tight hover:text-[#f0ff50] transition-colors"
              >
                Studio Philosophy
              </Link>
              <Link
                href="#faq"
                onClick={closeMenu}
                className="text-3xl font-medium tracking-tight hover:text-[#f0ff50] transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          <div className="pt-8 border-t border-neutral-800 space-y-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center justify-between text-[#f0ff50]">
              <span>CANBERRA TIME</span>
              <span className="tabular-nums">{cbrTime}</span>
            </div>
            <div className="text-neutral-300">
              Canberra, ACT · Partnering Australia-Wide
            </div>
            <Link
              href="#booking"
              onClick={closeMenu}
              className="w-full block text-center py-3.5 rounded-full bg-[#f0ff50] text-black font-semibold uppercase text-xs hover:bg-white transition-colors"
            >
              Request a 15-Minute Strategy Call →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
