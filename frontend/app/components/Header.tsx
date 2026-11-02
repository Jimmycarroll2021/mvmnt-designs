'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none mix-blend-difference text-white">
        <div className="container flex justify-between items-center h-16 lg:h-20">
          {/* Logo with Swell-style hover slide */}
          <div className="relative overflow-hidden pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm leading-none pointer-events-none">♥</span>
              <Link href="/" className="group block relative overflow-hidden" onClick={closeMenu}>
                <span className="block relative group-hover:-translate-y-[120%] transition-transform duration-500 font-sans font-medium text-base tracking-tight uppercase">
                  Mvmnt
                </span>
                <span className="absolute left-0 top-0 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 font-sans font-medium text-base tracking-tight uppercase">
                  Mvmnt
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Links (Pure Minimalist, like Swell) */}
          <nav className="hidden lg:block pointer-events-auto">
            <ul className="flex items-center gap-x-10 text-sm font-sans tracking-normal">
              <li>
                <Link href="#work" className="hover:opacity-60 transition-opacity">
                  Work
                </Link>
              </li>
              <li>
                <Link href="#disciplines" className="hover:opacity-60 transition-opacity">
                  Brand
                </Link>
              </li>
              <li>
                <Link href="#disciplines" className="hover:opacity-60 transition-opacity">
                  Digital
                </Link>
              </li>
              <li>
                <Link href="#studio" className="hover:opacity-60 transition-opacity">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:opacity-60 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle (Pure Swell text toggle) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="block relative overflow-hidden lg:hidden pointer-events-auto text-sm font-sans uppercase tracking-wider"
            aria-label="Toggle navigation drawer"
          >
            <span
              className={`block transition-transform duration-500 ${
                menuOpen ? 'translate-y-[120%]' : 'translate-y-0'
              }`}
            >
              Menu
            </span>
            <span
              className={`absolute left-0 top-0 transition-transform duration-500 ${
                menuOpen ? 'translate-y-0' : '-translate-y-[120%]'
              }`}
            >
              Close
            </span>
          </button>
        </div>
      </header>

      {/* Swell-Style Full Screen Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black text-neutral-400 z-40 overflow-y-auto lg:hidden pt-24 px-6 pb-12 flex flex-col justify-between animate-in fade-in duration-300">
          <nav className="space-y-6 pt-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              NAVIGATION
            </div>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="#work"
                  onClick={closeMenu}
                  className="block text-4xl sm:text-5xl font-normal text-white hover:text-neutral-400 transition-colors"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="#disciplines"
                  onClick={closeMenu}
                  className="block text-4xl sm:text-5xl font-normal text-white hover:text-neutral-400 transition-colors"
                >
                  Brand
                </Link>
              </li>
              <li>
                <Link
                  href="#disciplines"
                  onClick={closeMenu}
                  className="block text-4xl sm:text-5xl font-normal text-white hover:text-neutral-400 transition-colors"
                >
                  Digital
                </Link>
              </li>
              <li>
                <Link
                  href="#studio"
                  onClick={closeMenu}
                  className="block text-4xl sm:text-5xl font-normal text-white hover:text-neutral-400 transition-colors"
                >
                  Studio
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="block text-4xl sm:text-5xl font-normal text-white hover:text-neutral-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="pt-12 border-t border-neutral-900 space-y-4 font-mono text-xs">
            <div className="text-white">hello@mvmnt-designs.vercel.app</div>
            <div className="text-neutral-500">Canberra, ACT · Australia</div>
          </div>
        </div>
      )}
    </>
  );
}
