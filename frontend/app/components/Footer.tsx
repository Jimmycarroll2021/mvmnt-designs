import React from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Studio', href: '#studio' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Disciplines', href: '#disciplines' },
  { label: 'Packages', href: '#pricing' },
  { label: 'Studio Scoper', href: '#scoper' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <a className="linkedin" href="#contact">
            MVMNT DESIGN · Canberra &amp; Sydney
          </a>
          <p className="footer-description">
            Brand identities. Digital flagships.
            <br />
            Simple, yet significant.
          </p>
        </div>
        <p>
          We acknowledge Aboriginal and Torres Strait Islander peoples as the traditional custodians
          of country throughout Australia. We pay our respects to their Elders past, present and
          emerging.
        </p>
      </div>

      <nav id="footerNav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="footer-wordmark">
        MVMNT DESIGN
        <span aria-hidden="true">✳</span>
      </div>

      <div className="legal">
        <span>© 2026 MVMNT DESIGN</span>
        <span>Brand · Digital · Clinic Platforms</span>
      </div>
    </footer>
  );
}
