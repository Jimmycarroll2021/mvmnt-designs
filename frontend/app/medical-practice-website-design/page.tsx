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

/*
 * AHPRA guard for this page: no testimonials, no patient-outcome statements, no "best" or
 * "leading", no comparisons with other agencies, no clinical claims on behalf of client
 * practices, and never "AHPRA compliant". Use only the published "AHPRA-aware" wording.
 */

const PATH = '/medical-practice-website-design';
const TITLE = 'Medical & Allied Health Practice Website Design | MVMNT Design';
const DESCRIPTION =
  'Websites for medical specialists, clinics and allied health practices: clinical copywriting, patient intake and booking integrations (Cliniko, Halaxy, Stripe). Fixed packages from $4,800 AUD.';

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PATH,
  image: { url: '/images/hali_case_study_cover.png', width: 1200, height: 800, alt: 'Hali Institute website design presentation' },
});

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Medical practice website design', path: PATH },
];

const WHO: ServiceCard[] = [
  {
    tag: '01 / Solo Specialist · $4,800 AUD',
    title: 'Independent practitioners and solo specialists.',
    desc: 'A bespoke single-page website with an indicative delivery of 5 to 7 days.',
    items: ['Bespoke single-page website', 'Clinical copywriting', 'Consultation booking integration', 'Mobile-first design'],
  },
  {
    tag: '02 / Boutique Clinic · $8,800 AUD',
    title: 'Established practices.',
    desc: 'A complete editorial website with an indicative delivery of 10 to 14 days.',
    items: [
      'Multi-page website & service content',
      'Clinical copywriting',
      'Visual identity & typography',
      'Patient assessment flow',
      'Search Console setup',
    ],
  },
  {
    tag: '03 / Practice Transformation · $16,500+ AUD',
    title: 'Multi-doctor clinics and multi-location groups.',
    desc: 'A practice-wide website with an indicative delivery of 3 to 4 weeks.',
    items: [
      'Individual practitioner profiles',
      'Practice management integration',
      'Procedural landing pages',
      'Multi-location content',
      'Staff-friendly content studio',
    ],
  },
];

const FAQS: Faq[] = [
  {
    q: 'Who are your practice websites for?',
    a: 'Private practices of different sizes: independent practitioners and solo specialists, established practices, and multi-doctor clinics and multi-location groups. Each maps to one of our three published packages.',
    defaultOpen: true,
  },
  {
    q: 'How do you approach medical advertising requirements?',
    a: 'The studio offers AHPRA-aware copywriting and practice guides. We build clinical review into the process; the final content and any regulatory advice should be reviewed by the practice and its advisers.',
  },
  {
    q: 'Do I have to write my own website copy?',
    a: 'Clinical and commercial copywriting is part of the studio offering. We develop the content with you, reflecting your approach, services and voice. Clinical information requires your review and approval.',
  },
  {
    q: 'Can you connect our booking software?',
    a: 'Booking and practice-system integrations are scoped around your existing tools, including Cliniko, Halaxy and Stripe where appropriate. We confirm feasibility and requirements before agreeing the project.',
  },
  {
    q: 'How much time will I need to commit?',
    a: 'We start with a focused 45-minute intake conversation to understand your practice, audience and goals. We lead the design and writing process, with your input at agreed review points and final sign-off.',
  },
  {
    q: 'Can our team update the site after launch?',
    a: 'Content management is scoped to your needs. The Practice Transformation package includes a staff-friendly content studio. Ongoing Studio Care & Support is also available at $395 AUD a month for content updates and infrastructure support.',
  },
];

const jsonLd = graph([
  serviceNode({
    name: 'Medical and allied health practice website design',
    serviceType: 'Medical practice website design',
    description:
      'Websites for private practices with clinical copywriting, patient intake and booking integrations scoped around existing tools such as Cliniko, Halaxy and Stripe.',
    path: PATH,
    areaServed: { '@type': 'Country', name: 'Australia' },
    offers: PACKAGES.map(packageOffer),
  }),
  faqPageNode(FAQS, PATH),
  breadcrumbNode(CRUMBS),
]);

export default function MedicalPracticeWebsiteDesignPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <ServiceHero
        crumbs={CRUMBS}
        eyebrow="Clinic & practice websites · Australia"
        title={
          <>
            Medical &amp; allied health
            <br />
            practice website design.
          </>
        }
        lead="High-trust websites and effortless booking journeys for private practices."
      >
        <p className="small-copy">
          From independent practitioners to multi-location groups, we design the website, write the
          clinical and commercial copy with you, and connect the path from first visit to booked
          consultation. You work directly with the people designing and building your site.
        </p>
      </ServiceHero>

      <ServiceCards id="who" heading="Built for your practice" eyebrow="Three practice packages" cards={WHO} />

      <section className="split service-copy" id="copywriting">
        <h2>
          Clinical copy,
          <br />
          written with you.
        </h2>
        <div>
          <p>Copywriting is part of the studio offering, not something left to you.</p>
          <p className="small-copy">
            We develop the content with you, reflecting your approach, services and voice. Clinical
            information requires your review and approval, and you give final sign-off before launch.
          </p>
          <ul>
            <li>Clinical and commercial copywriting</li>
            <li>AHPRA-aware copywriting and practice guides</li>
            <li>Clinical review built into the process</li>
            <li>Final content and any regulatory advice reviewed by the practice and its advisers</li>
          </ul>
        </div>
      </section>

      <section className="split service-copy" id="integrations">
        <h2>
          Booking and
          <br />
          practice systems.
        </h2>
        <div>
          <p>A clearer path to booking.</p>
          <p className="small-copy">
            Booking and practice-system integrations are scoped around your existing tools,
            including Cliniko, Halaxy and Stripe where appropriate. We confirm feasibility and
            requirements before agreeing the project, so the scope reflects the systems you already
            run.
          </p>
          <ul>
            <li>Consultation booking integration (Solo Specialist)</li>
            <li>Patient assessment flow (Boutique Clinic)</li>
            <li>Practice management integration (Practice Transformation)</li>
            <li>Practitioner directories and individual practitioner profiles</li>
            <li>Patient intake workflows</li>
            <li>Procedural landing pages and multi-location content</li>
          </ul>
        </div>
      </section>

      <PackagesSection />

      <section className="priority split" id="hali">
        <div>
          <div className="eyebrow">Selected work · Brand &amp; Digital</div>
          <h2>
            Hali Institute of
            <br />
            Restorative Medicine
          </h2>
          <p>A digital experience that reflects the care behind the practice.</p>
          <p className="small-copy">
            For a specialist practice in Canberra, editorial typography, tranquil tones and clear
            clinical hierarchy create a calm introduction to the consulting rooms. Direct patient
            intake and a mobile-first booking journey bring clarity to the next step.
          </p>
          <a className="button" href="#contact">
            <span>+</span> Enquire about clinic flagships
          </a>
        </div>
        <figure>
          <Image
            src="/images/hali_case_study_cover.png"
            alt="Hali Institute website design presentation"
            width={1200}
            height={800}
            priority
            className="w-full h-auto object-contain"
          />
        </figure>
      </section>

      <section className="split service-copy" id="after-launch">
        <h2>
          After
          <br />
          launch.
        </h2>
        <div>
          <p>Ongoing care for the practice website.</p>
          <p className="small-copy">
            Studio Care &amp; Support is $395 AUD a month and covers managed hosting, automated
            backups, security monitoring and two hours a month of priority content updates. The
            Practice Transformation package also includes a staff-friendly content studio for your
            team.
          </p>
          <p className="small-copy">
            Based in Canberra? See <Link href="/web-design-canberra">web design in Canberra</Link>.
            Starting with your identity? See <Link href="/branding-canberra">practice branding</Link>.
          </p>
        </div>
      </section>

      <ServiceFaq heading="Practice website questions." faqs={FAQS} />

      <RelatedLinks links={relatedLinks(PATH)} />

      <ServiceContact lead="Tell us about your practice, what you want to change and where you want to go. We’ll discuss the fit, scope and next steps." />
    </>
  );
}
