/**
 * Homepage copy shared by the visible sections and the JSON-LD, so structured data
 * can never drift from what a visitor actually reads.
 */

export const HOME_TITLE = 'MVMNT Design | Brand & Web Design Studio, Canberra & Sydney';

export const HOME_DESCRIPTION =
  'Bespoke brand identities, digital flagships and booking journeys for private practices and ambitious brands. Canberra and Sydney.';

export type Faq = { q: string; a: string; defaultOpen?: boolean };

export const HOME_FAQS: Faq[] = [
  {
    q: 'How much time will I need to commit?',
    a: 'We start with a focused 45-minute intake conversation to understand your practice, audience and goals. We lead the design and writing process, with your input at agreed review points and final sign-off.',
    defaultOpen: true,
  },
  {
    q: 'Do I have to write my own website copy?',
    a: 'Clinical and commercial copywriting is part of the studio offering. We develop the content with you, reflecting your approach, services and voice. Clinical information requires your review and approval.',
  },
  {
    q: 'How do you approach medical advertising requirements?',
    a: 'The studio offers AHPRA-aware copywriting and practice guides. We build clinical review into the process; the final content and any regulatory advice should be reviewed by the practice and its advisers.',
  },
  {
    q: 'Can you connect our booking software?',
    a: 'Booking and practice-system integrations are scoped around your existing tools, including Cliniko, Halaxy and Stripe where appropriate. We confirm feasibility and requirements before agreeing the project.',
  },
  {
    q: 'Can our team update the site after launch?',
    a: 'Content management is scoped to your needs. The practice transformation package includes a staff-friendly content studio. Ongoing Studio Care is also available for content updates and infrastructure support.',
  },
];

export type Package = {
  id: string;
  tier: string;
  name: string;
  price: string;
  /** Numeric AUD price for schema.org; for "from" prices this is the minimum. */
  priceValue: number;
  priceIsMinimum?: boolean;
  time: string;
  desc: string;
  bullets: string[];
  fullTier: string;
};

export const PACKAGES: Package[] = [
  {
    id: 'solo-specialist',
    tier: '01 / Solo Specialist',
    name: 'Solo Specialist',
    price: '$4,800',
    priceValue: 4800,
    time: 'Indicative delivery · 5–7 days',
    desc: 'For independent practitioners and solo specialists.',
    bullets: [
      'Bespoke single-page website',
      'Clinical copywriting',
      'Consultation booking integration',
      'Mobile-first design',
    ],
    fullTier: '01. Digital Launch / Solo Specialist ($4,800 AUD)',
  },
  {
    id: 'boutique-clinic',
    tier: '02 / Boutique Clinic',
    name: 'Boutique Clinic',
    price: '$8,800',
    priceValue: 8800,
    time: 'Indicative delivery · 10–14 days',
    desc: 'A complete editorial website for an established practice.',
    bullets: [
      'Multi-page website & service content',
      'Clinical copywriting',
      'Visual identity & typography',
      'Patient assessment flow',
      'Search Console setup',
    ],
    fullTier: '02. Flagship Studio Build ($8,800 AUD)',
  },
  {
    id: 'practice-transformation',
    tier: '03 / Practice Transformation',
    name: 'Practice Transformation',
    price: '$16,500+',
    priceValue: 16500,
    priceIsMinimum: true,
    time: 'Indicative delivery · 3–4 weeks',
    desc: 'For multi-doctor clinics and multi-location groups.',
    bullets: [
      'Individual practitioner profiles',
      'Practice management integration',
      'Procedural landing pages',
      'Multi-location content',
      'Staff-friendly content studio',
    ],
    fullTier: '03. Enterprise & Custom Systems ($16,500+ AUD)',
  },
];

export const STUDIO_CARE = {
  id: 'studio-care',
  name: 'Studio Care & Support',
  price: '$395 AUD / month',
  priceValue: 395,
  desc: 'Managed hosting, automated backups, security monitoring and two hours per month of priority content updates.',
  enquiryLabel: 'Studio Care & Support ($395/mo)',
};
