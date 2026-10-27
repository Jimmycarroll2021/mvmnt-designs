'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="w-8 h-8 rounded bg-black flex items-center justify-center text-white font-mono text-sm font-bold tracking-tighter">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-gray-950 font-mono">
              MVMNT STUDIO
            </span>
            <span className="text-[10px] tracking-widest uppercase text-gray-500 font-mono hidden sm:inline">
              Bespoke Websites for Practices & Specialists
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-gray-600">
          <Link href="#scoper" className="hover:text-black transition">
            Strategy Guide
          </Link>
          <Link href="#casestudy" className="hover:text-black transition">
            Client Story
          </Link>
          <Link href="#pricing" className="hover:text-black transition">
            Packages
          </Link>
          <Link href="#philosophy" className="hover:text-black transition">
            Why Us
          </Link>
          <Link href="#faq" className="hover:text-black transition">
            FAQ
          </Link>
        </nav>

        {/* CTA + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <Link
            href="#booking"
            onClick={closeMenu}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black text-white text-xs font-mono tracking-wider uppercase hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          >
            Request Call
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-gray-200 text-gray-700 hover:text-black hover:border-black transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4 text-sm font-mono tracking-wider uppercase text-gray-800">
            <Link
              href="#scoper"
              onClick={closeMenu}
              className="py-2 border-b border-gray-100 hover:text-black transition flex items-center justify-between"
            >
              <span>Strategy Guide</span>
              <span className="text-gray-400 text-xs">→</span>
            </Link>
            <Link
              href="#casestudy"
              onClick={closeMenu}
              className="py-2 border-b border-gray-100 hover:text-black transition flex items-center justify-between"
            >
              <span>Client Story (Hali)</span>
              <span className="text-gray-400 text-xs">→</span>
            </Link>
            <Link
              href="#pricing"
              onClick={closeMenu}
              className="py-2 border-b border-gray-100 hover:text-black transition flex items-center justify-between"
            >
              <span>Packages & Pricing</span>
              <span className="text-gray-400 text-xs">→</span>
            </Link>
            <Link
              href="#philosophy"
              onClick={closeMenu}
              className="py-2 border-b border-gray-100 hover:text-black transition flex items-center justify-between"
            >
              <span>Why MVMNT Studio</span>
              <span className="text-gray-400 text-xs">→</span>
            </Link>
            <Link
              href="#faq"
              onClick={closeMenu}
              className="py-2 border-b border-gray-100 hover:text-black transition flex items-center justify-between"
            >
              <span>FAQ</span>
              <span className="text-gray-400 text-xs">→</span>
            </Link>
            <Link
              href="#booking"
              onClick={closeMenu}
              className="mt-2 py-3 text-center rounded-lg bg-black text-white text-xs font-mono uppercase font-semibold"
            >
              Request 15-Min Strategy Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
