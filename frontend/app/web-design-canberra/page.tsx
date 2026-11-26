import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import JsonLd from '@/app/components/JsonLd';
import PackagesSection from '@/app/components/PackagesSection';
import { RelatedLinks, ServiceCards, ServiceContact, ServiceFaq, ServiceHero } from '@/app/components/ServicePage';
import type { ServiceCard } from '@/app/components/ServicePage';
import type { Faq } from '@/app/content/home';
import { PACKAGES } from '@/app/content/home';
import { relatedLinks } from '@/app/content/service-links';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbNode, type Crumb, faqPageNode, graph, packageOffer, serviceNode } from '@/lib/schema';

const PATH = '/web-design-canberra';
const TITLE = 'Web Design Canberra | MVMNT Design';
const DESCRIPTION =
  'Canberra web design studio for private practices and ambitious brands. Bespoke websites, copywriting and booking journeys from $4,800 AUD.';

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PATH,
  image: { url: '/images/mvmnt-desktop.png', width: 1000, height: 600, alt: 'MVMNT Club website on desktop' },
});

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Web design Canberra', path: PATH },
];

const CARDS: ServiceCard[] = [
  {
    tag: '01 / Digital Flagships',
    title: 'Websites built around your audience.',
    desc: 'Bespoke web platforms that bring clarity, character and responsive interaction to every screen.',
    items: ['Next.js development', 'Responsive web design', 'Performance optimisation', 'Content architecture'],
  },
  {
    tag: '02 / Brand & Positioning',
    title: 'A clear voice before the first page.',
    desc: 'Visual identities and considered messaging that give your practice or brand a clear voice.',
    items: [
      'Visual identity & art direction',
      'Clinical & commercial copywriting',
      'AHPRA-aware practice guides',
      'Brand guidelines & typography',
    ],
  },
  {
    tag: '03 / Clinic & Booking Systems',
    title: 'A clearer path to booking.',
    desc: 'Connected journeys that help people understand your services and take the next step.',
    items: [
      'Practice software integrations',
      'Practitioner directories',
      'Patient intake workflows',
      'Ongoing care & support',
    ],
  },
];

const FAQS: Faq[] = [
  {
    q: 'Are you a Canberra web design studio?',
    a: 'Yes. MVMNT Design is a brand and web design studio working across Canberra and Sydney. Our Canberra work includes the website for the Hali Institute of Restorative Medicine, a specialist practice in Canberra.',
    defaultOpen: true,
  },
  {
    q: 'How much does a website cost?',
    a: 'Our published packages are Solo Specialist at $4,800 AUD, Boutique Clinic at $8,800 AUD and Practice Transformation from $16,500 AUD. Brand, commerce and other digital projects outside the packages are scoped individually, starting with a studio conversation.',
  },
  {
    q: 'How long does a website take to build?',
    a: 'Indicative delivery is 5 to 7 days for Solo Specialist, 10 to 14 days for Boutique Clinic and 3 to 4 weeks for Practice Transformation.',
  },
  {
    q: 'Can you build an online store?',
    a: 'Commerce projects are scoped individually. Our work includes MVMNT Club, a headless commerce platform for Australian cycling clubs that combines kit visualisation with Shopify fulfilment workflows.',
  },
];

const jsonLd = graph([
  serviceNode({
    name: 'Web design, Canberra',
    serviceType: 'Web design',
    description:
      'Bespoke websites, copywriting and booking journeys for private practices and ambitious brands, from a Canberra and Sydney studio.',
    path: PATH,
    areaServed: { '@type': 'City', name: 'Canberra' },
    offers: PACKAGES.map(packageOffer),
  }),
  faqPageNode(FAQS, PATH),
  breadcrumbNode(CRUMBS),
]);

export default function WebDesignCanberraPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <ServiceHero
        crumbs={CRUMBS}
        eyebrow="Canberra & Sydney · Web design"
        title={
          <>
            Web design
            <br />
            Canberra.
          </>
        }
        lead="Bespoke websites, copywriting and booking journeys for private practices and ambitious brands."
      >
        <p className="small-copy">
          MVMNT Design is a brand and web design studio working across Canberra and Sydney. You work
          directly with the people designing and building your site, and we bring strategy, writing
          and modern engineering together from the first conversation to the final details.
        </p>
      </ServiceHero>

      <ServiceCards
        id="disciplines"
        heading="What we design and build"
        eyebrow="Three disciplines"
        cards={CARDS}
      />

      <section className="split service-copy" id="process">
        <h2>
          A focused studio.
          <br />
          A clear process.
        </h2>
        <div>
          <p>Direct access to the creative and technical people doing the work.</p>
          <ul>
            <li>A focused 45-minute intake conversation about your business, audience and goals</li>
            <li>Structure, writing, visual direction and the technical build, led by the studio</li>
            <li>Your review at agreed milestones</li>
            <li>Your final sign-off before launch</li>
          </ul>
          <p className="small-copy">
            Copywriting is part of the studio offering, so you are not left to fill empty pages.
            Booking and practice-system integrations are scoped around your existing tools,
            including Cliniko, Halaxy and Stripe where appropriate, and we confirm feasibility before
            agreeing the project. Building for a clinic?{' '}
            <Link href="/medical-practice-website-design">See our medical practice websites</Link>.
          </p>
        </div>
      </section>

      <PackagesSection />

      <section className="priority split" id="canberra-work">
        <div>
          <div className="eyebrow">Canberra work · Brand &amp; Digital</div>
          <h2>
            Hali Institute of
            <br />
            Restorative Medicine
          </h2>
          <p>A website and digital experience for a specialist practice in Canberra.</p>
          <p className="small-copy">
            For a specialist practice in Canberra, editorial typography, tranquil tones and clear
            clinical hierarchy create a calm introduction to the consulting rooms. Direct patient
            intake and a mobile-first booking journey bring clarity to the next step.
          </p>
          <a className="button" href="#contact">
            <span>+</span> Enquire about a website
          </a>
        </div>
        <figure>
          <Image
            src="/images/hali_case_study_cover.png"
            alt="Hali Institute website design presentation"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
          />
        </figure>
      </section>

      <section className="split service-copy" id="further-work">
        <h2>
          Brands and
          <br />
          commerce, too.
        </h2>
        <div>
          <p>Not every project is a practice website.</p>
          <p className="small-copy">
            For GEAR Endurance Fuel we created a pre-launch brand and digital experience for Natural
            and Love Buzz, with distinctive typography, clear product comparison and an editorial
            journal. For MVMNT Club we built a custom apparel engine that brings cycling kit, sizing
            and club orders into one connected experience, on web and mobile, with Shopify fulfilment
            workflows behind it. Brand, commerce and digital projects like these are scoped
            individually, starting with a studio conversation.
          </p>
          <p className="small-copy">
            Need the identity first? See <Link href="/branding-canberra">branding in Canberra</Link>.
          </p>
        </div>
      </section>

      <ServiceFaq heading="Web design questions." faqs={FAQS} />

      <RelatedLinks links={relatedLinks(PATH)} />

      <ServiceContact lead="Tell us about your practice or brand, what you want to change and where you want to go. We’ll discuss the fit, scope and next steps." />
    </>
  );
}
