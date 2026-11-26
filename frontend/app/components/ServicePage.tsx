import React from 'react';
import Link from 'next/link';

import BookingForm from '@/app/components/BookingForm';
import type { Faq } from '@/app/content/home';
import type { ServiceLink } from '@/app/content/service-links';
import type { Crumb } from '@/lib/schema';

/** Visible breadcrumb trail; the same crumbs feed the BreadcrumbList JSON-LD. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) =>
          i === crumbs.length - 1 ? (
            <li key={c.path} aria-current="page">
              {c.name}
            </li>
          ) : (
            <li key={c.path}>
              <Link href={c.path}>{c.name}</Link>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

type HeroProps = {
  crumbs: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  children?: React.ReactNode;
};

/** Page opener: the page's single H1, a lead paragraph and supporting copy. */
export function ServiceHero({ crumbs, eyebrow, title, lead, children }: HeroProps) {
  return (
    <section className="intro split page-hero">
      <div>
        <Breadcrumbs crumbs={crumbs} />
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
      </div>
      <div>
        <p>{lead}</p>
        {children}
        <a className="button" href="#contact">
          <span>+</span> Request a strategy call
        </a>
      </div>
    </section>
  );
}

export type ServiceCard = { tag: string; title: string; desc: string; items: string[] };

/** Static card grid in the disciplines card style. */
export function ServiceCards({ id, heading, eyebrow, cards }: { id: string; heading: string; eyebrow?: string; cards: ServiceCard[] }) {
  return (
    <section className="stories" id={id}>
      <div className="section-head">
        <h2>{heading}</h2>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      </div>
      <div className="service-grid">
        {cards.map((card) => (
          <article key={card.tag} className="card">
            <div className="eyebrow">{card.tag}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <ul>
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Visible FAQ. Markup matches FaqSection so the route test can compare it with the FAQPage JSON-LD. */
export function ServiceFaq({ heading, faqs }: { heading: string; faqs: Faq[] }) {
  return (
    <section className="faq-section" id="questions">
      <div className="section-head">
        <h2>{heading}</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.q} open={faq.defaultOpen ?? false}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedLinks({ links }: { links: ServiceLink[] }) {
  return (
    <section className="split related-links" id="related">
      <h2>
        More from
        <br />
        the studio.
      </h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              {l.label} <span aria-hidden="true">↗</span>
            </Link>
            <p className="small-copy">{l.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Contact block with the enquiry form; package buttons link to #contact. */
export function ServiceContact({ lead }: { lead: string }) {
  return (
    <section className="contact-section split" id="contact">
      <div>
        <div className="eyebrow">Make your next move</div>
        <h2>
          Let’s build something
          <br />
          that feels like you.
        </h2>
      </div>
      <div>
        <p>Request a 15-minute strategy call with Jimmy.</p>
        <p className="small-copy">{lead}</p>
        <BookingForm />
      </div>
    </section>
  );
}
