import React from 'react';
import Link from 'next/link';

import JsonLd from '@/app/components/JsonLd';
import PackagesSection from '@/app/components/PackagesSection';
import { RelatedLinks, ServiceContact, ServiceFaq, ServiceHero } from '@/app/components/ServicePage';
import StudioScoper from '@/app/components/StudioScoper';
import type { Faq } from '@/app/content/home';
import { PACKAGES, STUDIO_CARE } from '@/app/content/home';
import { relatedLinks } from '@/app/content/service-links';
import { pageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  type Crumb,
  faqPageNode,
  graph,
  packageServiceNode,
  studioCareServiceNode,
} from '@/lib/schema';

const PATH = '/pricing';
const TITLE = 'Website Design Cost in Australia: Fixed Packages | MVMNT Design';
const DESCRIPTION =
  'Published pricing: Solo Specialist $4,800, Boutique Clinic $8,800, Practice Transformation from $16,500, Studio Care $395 a month (AUD).';

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PATH,
});

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: PATH },
];

/** Studio Care inclusions, split from the published STUDIO_CARE description. */
const CARE_INCLUSIONS = [
  'Managed hosting',
  'Automated backups',
  'Security monitoring',
  'Two hours per month of priority content updates',
];

const FAQS: Faq[] = [
  {
    q: 'How much does a website cost in Australia with MVMNT Design?',
    a: 'Our published packages are Solo Specialist at $4,800 AUD, Boutique Clinic at $8,800 AUD and Practice Transformation from $16,500 AUD. Brand, commerce and other digital projects outside the packages are scoped individually, starting with a studio conversation.',
    defaultOpen: true,
  },
  {
    q: 'How long does each package take?',
    a: 'Indicative delivery is 5 to 7 days for Solo Specialist, 10 to 14 days for Boutique Clinic and 3 to 4 weeks for Practice Transformation. Final scope, integrations and delivery dates are agreed with the studio.',
  },
  {
    q: 'Why is Practice Transformation priced from $16,500?',
    a: 'Practice Transformation is for multi-doctor clinics and multi-location groups. It includes individual practitioner profiles, practice management integration, procedural landing pages, multi-location content and a staff-friendly content studio, and its final scope is agreed with the studio.',
  },
  {
    q: 'Is booking integration included?',
    a: 'Solo Specialist includes consultation booking integration and Practice Transformation includes practice management integration. Integrations are scoped around your existing tools, including Cliniko, Halaxy and Stripe where appropriate, and we confirm feasibility and requirements before agreeing the project.',
  },
  {
    q: 'What does website maintenance cost?',
    a: 'Studio Care & Support is $395 AUD a month. It covers managed hosting, automated backups, security monitoring and two hours per month of priority content updates.',
  },
  {
    q: 'Do I have to write my own website copy?',
    a: 'No. Copywriting is part of every package. We develop the content with you, reflecting your approach, services and voice. Clinical information on practice websites requires your review and approval.',
  },
  {
    q: 'How are brand and Shopify projects priced?',
    a: 'Brand identity, commerce and other digital projects are not sold as fixed packages. They start with a studio conversation and receive a bespoke scope and quote.',
  },
];

const jsonLd = graph([
  ...PACKAGES.map((pkg) => packageServiceNode(pkg, PATH)),
  studioCareServiceNode(`${PATH}#studio-care`),
  faqPageNode(FAQS, PATH),
  breadcrumbNode(CRUMBS),
]);

export default function PricingPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <ServiceHero
        crumbs={CRUMBS}
        eyebrow="Studio packages · AUD"
        title={
          <>
            Website design cost
            <br />
            in Australia.
          </>
        }
        lead="Clear scope and considered investment: three fixed website packages with published prices, plus ongoing Studio Care."
      >
        <p className="small-copy">
          Every package includes copywriting, so you are not left to fill empty pages, and you work
          directly with the people designing and building your site. Final scope, integrations and
          delivery dates are agreed with the studio.
        </p>
      </ServiceHero>

      <PackagesSection />

      <section className="split service-copy" id="compare">
        <h2>
          Compare the
          <br />
          packages.
        </h2>
        <div className="price-table-wrap">
          <table className="price-table">
            <caption className="small-copy">Published package prices in Australian dollars.</caption>
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Price</th>
                <th scope="col">Indicative delivery</th>
                <th scope="col">Includes</th>
              </tr>
            </thead>
            <tbody>
              {PACKAGES.map((pkg) => (
                <tr key={pkg.id}>
                  <th scope="row">
                    {pkg.name}
                    <span className="small-copy">{pkg.desc}</span>
                  </th>
                  <td>{pkg.price} AUD</td>
                  <td>{pkg.time.replace('Indicative delivery · ', '')}</td>
                  <td>{pkg.bullets.join(' · ')}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">
                  {STUDIO_CARE.name}
                  <span className="small-copy">Ongoing partnership</span>
                </th>
                <td>{STUDIO_CARE.price}</td>
                <td>Monthly</td>
                <td>{CARE_INCLUSIONS.join(' · ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="split service-copy" id="studio-care">
        <h2>
          Website care plan:
          <br />
          $395 a month.
        </h2>
        <div>
          <p>Studio Care &amp; Support keeps your site running and up to date after launch.</p>
          <ul>
            {CARE_INCLUSIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="small-copy">
            Need your own team to make changes too? The Practice Transformation package includes a
            staff-friendly content studio, and content management is scoped to your needs.
          </p>
        </div>
      </section>

      <section className="split service-copy" id="scope">
        <h2>
          What shapes
          <br />
          the scope.
        </h2>
        <div>
          <p>The packages are built around the size of the practice or brand.</p>
          <ul>
            <li>Solo Specialist: independent practitioners and solo specialists, on a single page</li>
            <li>Boutique Clinic: an established practice that needs a multi-page editorial website and visual identity</li>
            <li>Practice Transformation: multi-doctor clinics and multi-location groups with practitioner profiles and integrations</li>
            <li>Bespoke: brand identity, commerce and digital projects, scoped in a studio conversation</li>
          </ul>
          <p className="small-copy">
            Building for a clinic? See{' '}
            <Link href="/medical-practice-website-design">medical and allied health practice websites</Link>. Selling
            online? See <Link href="/shopify-developer">Shopify development</Link>. Need the identity first? See{' '}
            <Link href="/branding-canberra">branding</Link>.
          </p>
        </div>
      </section>

      <StudioScoper />

      <ServiceFaq heading="Pricing questions." faqs={FAQS} />

      <RelatedLinks links={relatedLinks(PATH)} />

      <ServiceContact lead="Choose a package above or tell us about your project, and we’ll discuss the fit, scope and next steps." />
    </>
  );
}
