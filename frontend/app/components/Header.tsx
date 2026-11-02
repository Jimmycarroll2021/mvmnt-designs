'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Studio', href: '#studio' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Disciplines', href: '#disciplines' },
  { label: 'Packages', href: '#pricing' },
  { label: 'Studio Scoper', href: '#scoper' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="tag" href="#home">
          Simple, yet significant.
        </a>
        <div>
          <a className="contact" href="#contact">
            Let’s talk
          </a>
          <button
            id="menuButton"
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu <span>✳</span>
          </button>
        </div>
      </header>

      {/* Overlay Curtain Menu */}
      <div
        className={`menu ${menuOpen ? 'open' : ''}`}
        id="menu"
        aria-hidden={!menuOpen}
      >
        <div className="menu-left">
          <span className="tag">Simple, yet significant.</span>
          <div className="menu-symbol mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <small>MVMNT DESIGN · CBR / SYD</small>
        </div>

        <div className="menu-right">
          <button
            id="closeMenu"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <nav id="menuNav">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={handleLinkClick}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="linkedin" href="#contact" onClick={handleLinkClick}>
            Make your next move ↗
          </a>
        </div>
      </div>
    </>
  );
}
