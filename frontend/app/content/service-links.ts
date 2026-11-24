/**
 * Service routes that exist in the app router. Footer "Services" and the related-links
 * blocks on service pages read from here. Add each new service route when it ships; never
 * list a route that does not render.
 */
export type ServiceLink = { label: string; href: string; blurb: string };

export const SERVICE_LINKS: ServiceLink[] = [
  {
    label: 'Web design Canberra',
    href: '/web-design-canberra',
    blurb: 'Bespoke websites, copywriting and booking journeys from a Canberra and Sydney studio.',
  },
  {
    label: 'Medical & allied health websites',
    href: '/medical-practice-website-design',
    blurb: 'Practice websites with clinical copywriting, patient intake and booking integrations.',
  },
  {
    label: 'Branding Canberra',
    href: '/branding-canberra',
    blurb: 'Visual identity, art direction, typography and copywriting for practices and brands.',
  },
  {
    label: 'Shopify development',
    href: '/shopify-developer',
    blurb: 'Shopify store starters, bespoke theme development and purpose-built apps and automation.',
  },
];

/** Pricing and care links shared by the related-links blocks and the footer. */
export const PRICING_LINKS: ServiceLink[] = [
  {
    label: 'Pricing',
    href: '/pricing',
    blurb: 'Published packages from $4,800 AUD, with indicative delivery times and inclusions.',
  },
  {
    label: 'Website care plan',
    href: '/pricing#studio-care',
    blurb: 'Studio Care & Support at $395 AUD a month: hosting, backups, security monitoring and content updates.',
  },
];

/** Related links for a service page: every other service route, plus pricing, care and work. */
export function relatedLinks(currentHref: string): ServiceLink[] {
  return [
    ...SERVICE_LINKS,
    ...PRICING_LINKS,
    {
      label: 'Selected work',
      href: '/work',
      blurb: 'GEAR Endurance Fuel, the Hali Institute of Restorative Medicine and MVMNT Club.',
    },
  ].filter((l) => l.href.split('#')[0] !== currentHref);
}
