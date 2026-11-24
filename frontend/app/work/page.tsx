import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import JsonLd from '@/app/components/JsonLd';
import { RelatedLinks, ServiceContact, ServiceHero } from '@/app/components/ServicePage';
import { relatedLinks } from '@/app/content/service-links';
import { pageMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbNode, type Crumb, graph, ORG_ID, WEBSITE_ID } from '@/lib/schema';

/*
 * One portfolio page rather than three case-study pages: each case has only two or three
 * published sentences. Use published descriptions only; no results, metrics or testimonials.
 * Hali Institute has no outbound link until Jimmy confirms (NOTES-for-Jimmy.md).
 */

const PATH = '/work';
const TITLE = 'Selected Work: Brand, Web & Shopify | MVMNT Design';
const DESCRIPTION =
  'Selected work: GEAR Endurance Fuel, Hali Institute of Restorative Medicine and MVMNT Club.';

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PATH,
  image: { url: '/images/mvmnt-desktop.png', width: 1000, height: 600, alt: 'MVMNT Club website on desktop' },
});

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Selected work', path: PATH },
];

/** Case summaries shared by the visible copy and the CreativeWork JSON-LD. */
const CASES = [
  {
    id: 'gear',
    name: 'GEAR Endurance Fuel',
    summary:
      'Pre-launch brand and digital experience for Natural and Love Buzz, with distinctive typography, clear product comparison, an editorial journal and interactive recipe exploration.',
    image: '/images/gear.jpg',
    url: 'https://fuelwithgear.com/',
  },
  {
    id: 'hali',
    name: 'Hali Institute of Restorative Medicine',
    summary:
      'Website for a specialist practice in Canberra: editorial typography, tranquil tones and clear clinical hierarchy, with direct patient intake and a mobile-first booking journey.',
    image: '/images/hali_case_study_cover.png',
    url: undefined,
  },
  {
    id: 'mvmnt-club',
    name: 'MVMNT Club Custom Apparel Engine',
    summary:
      'A headless commerce platform for Australian cycling clubs, combining kit visualisation and Shopify fulfilment workflows across web and mobile.',
    image: '/images/mvmnt-desktop.png',
    url: 'https://mvmnt.club/',
  },
];

const jsonLd = graph([
  {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(PATH)}#page`,
    url: absoluteUrl(PATH),
    name: 'Selected work',
    description: DESCRIPTION,
    inLanguage: 'en-AU',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CASES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          '@id': `${absoluteUrl(PATH)}#${c.id}`,
          name: c.name,
          description: c.summary,
          image: absoluteUrl(c.image),
          creator: { '@id': ORG_ID },
          ...(c.url ? { sameAs: c.url } : {}),
        },
      })),
    },
  },
  breadcrumbNode(CRUMBS),
]);

export default function WorkPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <ServiceHero
        crumbs={CRUMBS}
        eyebrow="Selected work · Brand, Web & Shopify"
        title={
          <>
            Selected work.
            <br />
            Calm. Clear. Considered.
          </>
        }
        lead="Brand identities, digital flagships and commerce systems from MVMNT Design, a studio working across Canberra and Sydney."
      >
        <p className="small-copy">
          Three projects: a pre-launch endurance fuel brand, a specialist practice in Canberra and a
          custom apparel platform for Australian cycling clubs. In each, strategy, writing and
          engineering were done together, by the people who design and build the work.
        </p>
      </ServiceHero>

      <section className="project-gallery" id="gear">
        <div className="section-head">
          <h2>Fuel the long way.</h2>
          <span className="eyebrow">01 / GEAR · Endurance Fuel</span>
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
            <p className="small-copy">
              Related: <Link href="/branding-canberra">branding and brand identity design</Link>.
            </p>
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

      <section className="priority split" id="hali">
        <div>
          <div className="eyebrow">02 / Specialist practice · Canberra</div>
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
          <p className="small-copy">
            Related: <Link href="/medical-practice-website-design">medical and allied health practice websites</Link>{' '}
            and <Link href="/web-design-canberra">web design in Canberra</Link>.
          </p>
          <Link className="button" href="/medical-practice-website-design">
            <span>+</span> Enquire about clinic flagships
          </Link>
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

      <section className="project-gallery" id="mvmnt-club">
        <div className="section-head">
          <h2>Designed for every screen.</h2>
          <span className="eyebrow">03 / MVMNT Club · Web &amp; Mobile</span>
        </div>
        <div className="gallery-grid club-screens">
          <figure>
            <Image
              src="/images/mvmnt-desktop.png"
              alt="MVMNT Club website on desktop"
              width={1000}
              height={600}
              className="w-full h-auto object-contain"
            />
            <figcaption>01 / Desktop experience</figcaption>
          </figure>
          <figure>
            <Image
              src="/images/mvmnt-mobile.png"
              alt="MVMNT Club website on a mobile screen"
              width={500}
              height={700}
              className="w-full h-auto object-contain"
            />
            <figcaption>02 / Mobile experience</figcaption>
          </figure>
        </div>
      </section>

      <section className="split apparel" id="apparel-engine">
        <h2>
          MVMNT Club
          <br />
          Custom Apparel Engine
        </h2>
        <div>
          <p>Bringing custom cycling kit, sizing and club orders into one connected digital experience.</p>
          <p className="small-copy">
            A headless commerce platform for Australian cycling clubs, combining kit visualisation
            and Shopify fulfilment workflows.
          </p>
          <p className="small-copy">
            Related: <Link href="/shopify-developer">Shopify development: themes, apps and automation</Link>.
          </p>
          <a className="button" href="https://mvmnt.club/" target="_blank" rel="noopener noreferrer">
            <span>↗</span> Explore MVMNT Club
          </a>
        </div>
      </section>

      <section className="split service-copy" id="approach">
        <h2>
          How the
          <br />
          work is made.
        </h2>
        <div>
          <p>Every project starts with a conversation.</p>
          <ul>
            <li>A focused 45-minute intake conversation about your practice or brand, audience and goals</li>
            <li>Structure, writing, visual direction and technical build, done together</li>
            <li>Your review at agreed milestones, and final sign-off before launch</li>
          </ul>
          <p className="small-copy">
            See published packages and inclusions on <Link href="/pricing">pricing</Link>, or start a
            scope with the <Link href="/#scoper">Studio Scoper</Link>.
          </p>
        </div>
      </section>

      <RelatedLinks links={relatedLinks(PATH)} />

      <ServiceContact lead="Tell us about your practice or brand, what you want to change and where you want to go. We’ll discuss the fit, scope and next steps." />
    </>
  );
}
