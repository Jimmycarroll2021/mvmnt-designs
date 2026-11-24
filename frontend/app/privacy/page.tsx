import React from 'react';
import Link from 'next/link';

import JsonLd from '@/app/components/JsonLd';
import { Breadcrumbs } from '@/app/components/ServicePage';
import { pageMetadata } from '@/lib/metadata';
import { absoluteUrl, GA4_ID } from '@/lib/site';
import { breadcrumbNode, type Crumb, graph, ORG_ID, WEBSITE_ID } from '@/lib/schema';

/*
 * This page must describe what the code actually does:
 *   - BookingForm.tsx collects name, email, current website/handle, package and notes.
 *   - app/api/booking/route.ts validates the enquiry and records it in the server logs only.
 *   - app/api/scope/route.ts sends Studio Scoper text to Google or OpenAI when a key is set.
 *   - layout.tsx loads Vercel Speed Insights; GA4 loads only when NEXT_PUBLIC_GA4_ID is set.
 * Update it whenever any of those change. Legal entity, ABN and a contact email are not
 * published, so none appears here (TODO for Jimmy in NOTES-for-Jimmy.md).
 */

const PATH = '/privacy';
const TITLE = 'Privacy Policy | MVMNT Design';
const DESCRIPTION =
  'How MVMNT Design handles the details you share through the enquiry form and Studio Scoper, and the analytics this site uses.';
const LAST_UPDATED = '25 November 2026';

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PATH,
});

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Privacy policy', path: PATH },
];

const jsonLd = graph([
  {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(PATH)}#page`,
    url: absoluteUrl(PATH),
    name: 'Privacy policy',
    description: DESCRIPTION,
    inLanguage: 'en-AU',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
  },
  breadcrumbNode(CRUMBS),
]);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="intro split page-hero">
        <div>
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="eyebrow">Last updated {LAST_UPDATED}</div>
          <h1>Privacy policy.</h1>
        </div>
        <div>
          <p>How we handle the details you share with us through this website.</p>
          <p className="small-copy">
            This policy covers this website, operated by MVMNT Design, a brand and web design studio
            working across Canberra and Sydney, Australia. It explains what information the site
            collects, why, and who else processes it.
          </p>
        </div>
      </section>

      <section className="split service-copy" id="enquiries">
        <h2>
          Enquiry
          <br />
          form.
        </h2>
        <div>
          <p>What you send when you request a strategy call.</p>
          <ul>
            <li>Your name and work or practice email address (required)</li>
            <li>Your current website or handle (optional)</li>
            <li>The package or scope you select</li>
            <li>Any notes you add about your practice or brand, goals and timeline</li>
          </ul>
          <p className="small-copy">
            We use these details to review your enquiry and contact you about it. When you submit the
            form, the enquiry is checked for a name and a valid email address and recorded in the
            application logs of our hosting provider, Vercel, where it is reviewed. The form also
            contains a hidden field used only to filter automated spam.
          </p>
        </div>
      </section>

      <section className="split service-copy" id="studio-scoper">
        <h2>
          Studio
          <br />
          Scoper.
        </h2>
        <div>
          <p>The text you type to generate a project outline.</p>
          <p className="small-copy">
            When you use the <Link href="/#scoper">Studio Scoper</Link>, the description you enter is
            sent to a third-party AI model provider (Google or OpenAI) to generate the outline shown
            on screen. If no provider is available, a pre-written outline is shown instead. Please do
            not enter patient information or other sensitive personal information. If you choose to
            continue to the enquiry form, your project notes are copied into the form, and are only
            sent to us if you submit it.
          </p>
        </div>
      </section>

      <section className="split service-copy" id="analytics">
        <h2>
          Analytics and
          <br />
          hosting.
        </h2>
        <div>
          <p>How the site measures itself.</p>
          <ul>
            <li>
              This site is hosted by Vercel. Like most hosting providers, Vercel processes technical
              request information, such as IP addresses, to deliver pages.
            </li>
            <li>
              Vercel Speed Insights measures how quickly pages load and respond for visitors, so we
              can keep the site fast.
            </li>
            {GA4_ID ? (
              <li>
                Google Analytics 4 measures how visitors use the site, such as pages viewed. It uses
                cookies set by Google. You can opt out with Google’s browser add-on or by blocking
                cookies in your browser.
              </li>
            ) : null}
          </ul>
        </div>
      </section>

      <section className="split service-copy" id="your-choices">
        <h2>
          Access and
          <br />
          questions.
        </h2>
        <div>
          <p>Ask us about your information.</p>
          <p className="small-copy">
            To ask what information we hold about you, to correct it, or to ask us to delete it, send
            a request through the <Link href="/#contact">enquiry form</Link> and mention privacy in
            your notes. We will update this policy if the way the site handles information changes;
            the date above shows when it last changed.
          </p>
        </div>
      </section>
    </>
  );
}
