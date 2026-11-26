import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import JsonLd from '@/app/components/JsonLd';
import { RelatedLinks, ServiceCards, ServiceContact, ServiceFaq, ServiceHero } from '@/app/components/ServicePage';
import type { ServiceCard } from '@/app/components/ServicePage';
import type { Faq } from '@/app/content/home';
import { relatedLinks } from '@/app/content/service-links';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbNode, type Crumb, faqPageNode, graph, serviceNode } from '@/lib/schema';

const PATH = '/shopify-developer';
const TITLE = 'Shopify Developer Australia | MVMNT Design';
const DESCRIPTION =
  'Shopify store starters, bespoke theme development and purpose-built apps and automation for orders, inventory and fulfilment. Canberra and Sydney.';

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PATH,
  image: { url: '/images/mvmnt-desktop.png', width: 1000, height: 600, alt: 'MVMNT Club website on desktop' },
});

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Shopify developer', path: PATH },
];

// Copy ported from the "Custom Shopify Architecture" section of mvmntdesign.com.
const CARDS: ServiceCard[] = [
  {
    tag: '01 / Store starters',
    title: 'Shopify store starters.',
    desc: 'A straightforward way to launch, with theme setup, product collections and the essentials for your first sales.',
    items: ['Theme setup', 'Product collections', 'The essentials for your first sales'],
  },
  {
    tag: '02 / Theme development',
    title: 'Custom design & theme development.',
    desc: 'From targeted edits and layout refinements to complete bespoke storefronts, built around your brand and how your customers shop.',
    items: ['Targeted edits', 'Layout refinements', 'Complete bespoke storefronts'],
  },
  {
    tag: '03 / Apps & automation',
    title: 'Purpose-built apps & automation.',
    desc: 'Connect orders, inventory and fulfilment, streamline repetitive tasks and consolidate overlapping features to reduce reliance on multiple third-party apps.',
    items: [
      'Orders, inventory & fulfilment',
      'Streamlined repetitive tasks',
      'Fewer overlapping third-party apps',
    ],
  },
];

const FAQS: Faq[] = [
  {
    q: 'What Shopify development do you offer?',
    a: 'We build custom Shopify apps, bespoke themes and automated workflows. That covers Shopify store starters, custom design and theme development, and purpose-built apps and automation for orders, inventory and fulfilment.',
    defaultOpen: true,
  },
  {
    q: 'Can you help me launch a new Shopify store?',
    a: 'Yes. A Shopify store starter is a straightforward way to launch, with theme setup, product collections and the essentials for your first sales.',
  },
  {
    q: 'Can you work on our existing Shopify theme?',
    a: 'Yes. Theme work ranges from targeted edits and layout refinements to complete bespoke storefronts, built around your brand and how your customers shop.',
  },
  {
    q: 'Do you build custom Shopify apps?',
    a: 'Yes. Purpose-built apps and automation connect orders, inventory and fulfilment, streamline repetitive tasks and consolidate overlapping features to reduce reliance on multiple third-party apps.',
  },
  {
    q: 'Have you built headless commerce with Shopify?',
    a: 'MVMNT Club is a headless commerce platform for Australian cycling clubs, combining kit visualisation and Shopify fulfilment workflows. It brings custom cycling kit, sizing and club orders into one connected experience on web and mobile.',
  },
  {
    q: 'How much does Shopify development cost?',
    a: 'Shopify and other commerce projects are scoped individually, so there is no Shopify package. They start with a studio conversation, and final scope, integrations and delivery dates are agreed with the studio.',
  },
  {
    q: 'Where are you based?',
    a: 'MVMNT Design is a brand and web design studio working across Canberra and Sydney, Australia. You work directly with the people designing and building your store.',
  },
];

const jsonLd = graph([
  serviceNode({
    name: 'Shopify development, Australia',
    serviceType: 'Shopify development',
    description:
      'Custom Shopify apps, bespoke themes and automated workflows: Shopify store starters, custom design and theme development, and purpose-built apps and automation for orders, inventory and fulfilment.',
    path: PATH,
    areaServed: { '@type': 'Country', name: 'Australia' },
  }),
  faqPageNode(FAQS, PATH),
  breadcrumbNode(CRUMBS),
]);

export default function ShopifyDeveloperPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <ServiceHero
        crumbs={CRUMBS}
        eyebrow="Custom Shopify Architecture · Canberra & Sydney"
        title={
          <>
            Shopify developer,
            <br />
            Australia.
          </>
        }
        lead="We build custom Shopify apps, bespoke themes and automated workflows."
      >
        <p className="small-copy">
          MVMNT Design is a brand and web design studio working across Canberra and Sydney. When you
          hire us for Shopify work, you work directly with the people designing and building your
          store, and strategy, writing and engineering are done together.
        </p>
      </ServiceHero>

      <ServiceCards
        id="shopify-services"
        heading="Engineered for pipelines."
        eyebrow="Three ways we work on Shopify"
        cards={CARDS}
      />

      <section className="priority split" id="mvmnt-club">
        <div>
          <div className="eyebrow">Commerce work · Web &amp; Mobile</div>
          <h2>
            MVMNT Club
            <br />
            Custom Apparel Engine
          </h2>
          <p>
            Bringing custom cycling kit, sizing and club orders into one connected digital
            experience.
          </p>
          <p className="small-copy">
            A headless commerce platform for Australian cycling clubs, combining kit visualisation
            and Shopify fulfilment workflows, designed for desktop and mobile screens.
          </p>
          <a className="button" href="https://mvmnt.club" target="_blank" rel="noopener noreferrer">
            <span>↗</span> Explore MVMNT Club
          </a>
        </div>
        <figure>
          <Image
            src="/images/mvmnt-desktop.png"
            alt="MVMNT Club website on desktop"
            width={1000}
            height={600}
            className="w-full h-auto object-contain"
          />
        </figure>
      </section>

      <section className="split service-copy" id="process">
        <h2>
          How a Shopify
          <br />
          project starts.
        </h2>
        <div>
          <p>Commerce projects start with a studio conversation.</p>
          <ul>
            <li>A focused 45-minute intake conversation about your business, customers and goals</li>
            <li>A bespoke scope and quote, because Shopify work is not sold as a package</li>
            <li>Design, writing and the technical build, led by the studio</li>
            <li>Your review at agreed milestones and your final sign-off before launch</li>
          </ul>
          <p className="small-copy">
            Final scope, integrations and delivery dates are agreed with the studio. If you are
            launching a new brand alongside the store, the identity work is scoped with it: see{' '}
            <Link href="/branding-canberra">branding</Link>. For GEAR Endurance Fuel we created a
            pre-launch brand and digital experience with distinctive typography, clear product
            comparison and an editorial journal.
          </p>
          <p className="small-copy">
            Need a website rather than a store? Our published{' '}
            <Link href="/pricing">website packages and pricing</Link> start at $4,800 AUD, and{' '}
            <Link href="/web-design-canberra">web design in Canberra</Link> covers how we build them.
          </p>
        </div>
      </section>

      <ServiceFaq heading="Shopify questions." faqs={FAQS} />

      <RelatedLinks links={relatedLinks(PATH)} />

      <ServiceContact lead="Tell us about your store, the processes you want to simplify and where you want to go. We’ll discuss the fit, scope and next steps." />
    </>
  );
}
