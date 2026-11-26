/**
 * schema.org builders. Every value here must also be visible on the site or published
 * on the owner's sites; never add claims that only exist in structured data.
 */
import { type Faq, type Package, STUDIO_CARE } from '@/app/content/home';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';

type JsonLdNode = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const AREA_SERVED = [
  { '@type': 'City', name: 'Canberra' },
  { '@type': 'City', name: 'Sydney' },
  { '@type': 'Country', name: 'Australia' },
];

export function organizationNode(): JsonLdNode {
  return {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': ORG_ID,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    image: absoluteUrl('/images/hali_case_study_cover.png'),
    description:
      'Brand and web design studio building distinctive brand identities, high-trust websites and effortless booking journeys for private practices and ambitious brands. Canberra & Sydney.',
    slogan: 'Simple, yet significant.',
    founder: { '@type': 'Person', name: 'Jimmy Carroll' },
    areaServed: AREA_SERVED,
    currenciesAccepted: 'AUD',
  };
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: SITE_NAME,
    inLanguage: 'en-AU',
    publisher: { '@id': ORG_ID },
  };
}

export function packageServiceNode(pkg: Package, pagePath = '/'): JsonLdNode {
  const priceSpecification = pkg.priceIsMinimum
    ? { '@type': 'PriceSpecification', minPrice: pkg.priceValue, priceCurrency: 'AUD' }
    : undefined;
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-${pkg.id}`,
    name: pkg.name,
    description: `${pkg.desc} Includes: ${pkg.bullets.join(', ')}.`,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
    url: absoluteUrl(pagePath),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      ...(priceSpecification ? { priceSpecification } : { price: pkg.priceValue }),
    },
  };
}

export function studioCareServiceNode(pagePath = '/'): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-${STUDIO_CARE.id}`,
    name: STUDIO_CARE.name,
    description: STUDIO_CARE.desc,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
    url: absoluteUrl(pagePath),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: STUDIO_CARE.priceValue,
        priceCurrency: 'AUD',
        unitCode: 'MON',
      },
    },
  };
}

/** schema.org Offer for a published package price ("+" tiers become a minimum price). */
export function packageOffer(pkg: Package): JsonLdNode {
  return {
    '@type': 'Offer',
    name: pkg.name,
    priceCurrency: 'AUD',
    ...(pkg.priceIsMinimum
      ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: pkg.priceValue, priceCurrency: 'AUD' } }
      : { price: pkg.priceValue }),
  };
}

type ServiceNodeInput = {
  name: string;
  serviceType: string;
  description: string;
  /** Route path of the service page. */
  path: string;
  areaServed: JsonLdNode | JsonLdNode[];
  offers?: JsonLdNode[];
};

/** Per-page Service node; every field must match the visible page copy. */
export function serviceNode({ name, serviceType, description, path, areaServed, offers }: ServiceNodeInput): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    provider: { '@id': ORG_ID },
    areaServed,
    url: absoluteUrl(path),
    ...(offers && offers.length ? { offers } : {}),
  };
}

export function faqPageNode(faqs: Faq[], pagePath: string): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(pagePath)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(crumbs: Crumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function graph(nodes: JsonLdNode[]): JsonLdNode {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
