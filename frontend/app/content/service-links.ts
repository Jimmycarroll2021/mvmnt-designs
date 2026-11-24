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
];

/** Related links for a service page: every other service route, plus packages and work. */
export function relatedLinks(currentHref: string): ServiceLink[] {
  return [
    ...SERVICE_LINKS.filter((l) => l.href !== currentHref),
    {
      label: 'Studio packages',
      href: '/#pricing',
      blurb: 'Published packages from $4,800 AUD, plus Studio Care & Support at $395 AUD a month.',
    },
    {
      label: 'Selected work',
      href: '/#work',
      blurb: 'GEAR Endurance Fuel, the Hali Institute of Restorative Medicine and MVMNT Club.',
    },
  ];
}
