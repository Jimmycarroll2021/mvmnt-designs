import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import JsonLd from '@/app/components/JsonLd';
import { RelatedLinks, ServiceCards, ServiceContact, ServiceFaq, ServiceHero } from '@/app/components/ServicePage';
import type { ServiceCard } from '@/app/components/ServicePage';
import type { Faq } from '@/app/content/home';
import { PACKAGES } from '@/app/content/home';
import { relatedLinks } from '@/app/content/service-links';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbNode, type Crumb, faqPageNode, graph, packageOffer, serviceNode } from '@/lib/schema';

/*
 * Do not claim print, packaging production or a logo-only service here; none is published.
 * See NOTES-for-Jimmy.md (logo-only engagements).
 */

const PATH = '/branding-canberra';
const TITLE = 'Branding & Brand Identity Design Canberra | MVMNT Design';
const DESCRIPTION =
  'Brand identity, art direction, typography and copywriting from a Canberra and Sydney studio, for practices and ambitious brands.';

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PATH,
  image: { url: '/images/gear.jpg', width: 1200, height: 800, alt: 'GEAR Natural and Love Buzz packaging concepts' },
});

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Branding Canberra', path: PATH },
];

const BOUTIQUE = PACKAGES.find((p) => p.id === 'boutique-clinic');

const CARDS: ServiceCard[] = [
  {
    tag: '01 / Identity',
    title: 'Distinctive by design.',
    desc: 'Visual identities that give your practice or brand a clear, recognisable presence.',
    items: ['Visual identity & art direction', 'Brand guidelines & typography'],
  },
  {
    tag: '02 / Messaging',
    title: 'Considered words.',
    desc: 'Messaging that gives your practice or brand a clear voice, written with you.',
    items: ['Clinical & commercial copywriting', 'AHPRA-aware practice guides'],
  },
  {
    tag: '03 / Digital expression',
    title: 'Carried through to every screen.',
    desc: 'An identity that continues into a website and booking journey designed and built by the same studio.',
    items: ['Responsive web design', 'Content architecture'],
  },
];

const FAQS: Faq[] = [
  {
    q: 'What does your brand identity work include?',
    a: 'Our Brand & Positioning work covers visual identity and art direction, clinical and commercial copywriting, AHPRA-aware practice guides, and brand guidelines and typography. Each project is scoped to what your practice or brand needs.',
    defaultOpen: true,
  },
  {
    q: 'Can you do the brand and the website together?',
    a: 'Yes. The Boutique Clinic package ($8,800 AUD) includes visual identity and typography alongside a multi-page website, clinical copywriting, a patient assessment flow and Search Console setup. For GEAR Endurance Fuel we created a pre-launch brand and digital experience.',
  },
  {
    q: 'How much does branding cost?',
    a: 'Visual identity and typography are included in the Boutique Clinic package at $8,800 AUD. Brand projects outside the packages are scoped individually, starting with a studio conversation.',
  },
  {
    q: 'Do you work on clinic and medical practice branding?',
    a: 'Yes. Practice branding includes clinical and commercial copywriting and AHPRA-aware practice guides. Clinical information requires your review and approval, and the final content and any regulatory advice should be reviewed by the practice and its advisers.',
  },
  {
    q: 'How does a branding project start?',
    a: 'With a focused 45-minute intake conversation to understand your practice or brand, audience and goals. We lead the design and writing, with your input at agreed review points and final sign-off.',
  },
];

const jsonLd = graph([
  serviceNode({
    name: 'Branding and brand identity design, Canberra',
    serviceType: 'Brand identity design',
    description:
      'Visual identity and art direction, clinical and commercial copywriting, AHPRA-aware practice guides, and brand guidelines and typography for practices and ambitious brands.',
    path: PATH,
    areaServed: { '@type': 'City', name: 'Canberra' },
    offers: BOUTIQUE ? [packageOffer(BOUTIQUE)] : undefined,
  }),
  faqPageNode(FAQS, PATH),
  breadcrumbNode(CRUMBS),
]);

export default function BrandingCanberraPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <ServiceHero
        crumbs={CRUMBS}
        eyebrow="Canberra & Sydney · Brand & Positioning"
        title={
          <>
            Branding &amp; brand
            <br />
            identity, Canberra.
          </>
        }
        lead="Visual identities and considered messaging that give your practice or brand a clear voice."
      >
        <p className="small-copy">
          MVMNT Design is a brand and web design studio working across Canberra and Sydney. We build
          distinctive brand identities for private practices and ambitious brands, and carry them
          through into the website and booking journey. You work directly with the people doing the
          work.
        </p>
      </ServiceHero>

      <ServiceCards id="brand" heading="Brand & Positioning" eyebrow="What the work covers" cards={CARDS} />

      <section className="project-gallery" id="gear">
        <div className="section-head">
          <h2>Fuel the long way.</h2>
          <span className="eyebrow">Selected work · GEAR Endurance Fuel</span>
        </div>
        <div className="split gear-case">
          <div>
            <div className="eyebrow">Pre-launch brand &amp; digital experience</div>
            <p>A bold digital presence for an endurance brand built around simplicity.</p>
            <p className="small-copy">
              GEAR brings Natural and Love Buzz into a focused pre-launch experience. Distinctive
              typography, clear product comparison and an editorial journal give the brand room to
              explain its approach.
            </p>
            <p className="small-copy">Brand storytelling · Product discovery · Interactive recipe exploration</p>
            <a className="button" href="https://fuelwithgear.com/" target="_blank" rel="noopener noreferrer">
              <span>↗</span> Explore GEAR
            </a>
          </div>
          <figure>
            <Image
              src="/images/gear.jpg"
              alt="GEAR Natural and Love Buzz packaging concepts"
              width={1200}
              height={800}
              priority
              className="w-full h-auto object-contain"
            />
            <figcaption>GEAR / Pre-launch brand &amp; digital experience</figcaption>
          </figure>
        </div>
      </section>

      <section className="split service-copy" id="practice-branding">
        <h2>
          Clinic and
          <br />
          practice branding.
        </h2>
        <div>
          <p>Calm, clear identities for practices.</p>
          <p className="small-copy">
            For the Hali Institute of Restorative Medicine, a specialist practice in Canberra,
            editorial typography, tranquil tones and clear clinical hierarchy create a calm
            introduction to the consulting rooms. Practice branding brings together visual identity,
            typography and messaging with AHPRA-aware copywriting and practice guides; the final
            content and any regulatory advice should be reviewed by the practice and its advisers.
          </p>
          <p className="small-copy">
            See how identity carries into the site in{' '}
            <Link href="/medical-practice-website-design">medical and allied health practice websites</Link>.
          </p>
        </div>
      </section>

      <section className="split service-copy" id="scope">
        <h2>
          Scope and
          <br />
          investment.
        </h2>
        <div>
          <p>Identity as part of a package, or scoped on its own.</p>
          <ul>
            <li>
              Boutique Clinic, {BOUTIQUE?.price ?? '$8,800'} AUD: visual identity and typography with a
              multi-page website and clinical copywriting
            </li>
            <li>Bespoke scope for brand, commerce and digital projects, starting with a studio conversation</li>
            <li>A focused 45-minute intake conversation, review at agreed milestones, and final sign-off</li>
          </ul>
          <p className="small-copy">
            Planning the website at the same time? See{' '}
            <Link href="/web-design-canberra">web design in Canberra</Link> or try the{' '}
            <Link href="/#scoper">Studio Scoper</Link>.
          </p>
        </div>
      </section>

      <ServiceFaq heading="Branding questions." faqs={FAQS} />

      <RelatedLinks links={relatedLinks(PATH)} />

      <ServiceContact lead="Tell us about your practice or brand, what you want to change and where you want to go. We’ll discuss the fit, scope and next steps." />
    </>
  );
}
