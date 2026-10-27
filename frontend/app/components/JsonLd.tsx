export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://mvmnt-designs.vercel.app/#website',
        url: 'https://mvmnt-designs.vercel.app',
        name: 'MVMNT Studio',
        description:
          'Bespoke digital architecture, clinical copywriting refinement, and fast-loading mobile infrastructure for Australian medical practices, doctors, private specialists, and boutique cosmetic clinics.',
        publisher: {
          '@id': 'https://mvmnt-designs.vercel.app/#organization',
        },
        inLanguage: 'en-AU',
      },
      {
        '@type': ['ProfessionalService', 'Organization'],
        '@id': 'https://mvmnt-designs.vercel.app/#organization',
        name: 'MVMNT Studio',
        alternateName: ['MVMNT Designs', 'MVMNT Medical Web Design'],
        url: 'https://mvmnt-designs.vercel.app',
        logo: 'https://mvmnt-designs.vercel.app/images/hali_case_study_cover.png',
        image: 'https://mvmnt-designs.vercel.app/images/hali_case_study_cover.png',
        description:
          'Premier boutique web engineering studio specialising in bespoke, high-converting digital platforms, clinical copywriting, and seamless patient booking integrations for Australian medical practices, surgeons, private specialists, and aesthetic clinics.',
        priceRange: '$4,800 - $16,500 AUD',
        currenciesAccepted: 'AUD',
        paymentAccepted: 'Credit Card, Direct Debit, Electronic Funds Transfer, Stripe',
        founder: {
          '@type': 'Person',
          name: 'Jimmy Carroll',
          jobTitle: 'Founder & Lead Digital Architect',
        },
        areaServed: [
          {
            '@type': 'Country',
            name: 'Australia',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'New South Wales',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Victoria',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Queensland',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Western Australia',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'South Australia',
          },
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AU',
        },
        knowsAbout: [
          'Medical Website Design',
          'AHPRA Advertising Compliance',
          'TGA Therapeutic Advertising Code',
          'Clinical Copywriting Refinement',
          'Specialist Doctor Brand Identity',
          'Practice Management Software Integration',
          'Cliniko Booking Integration',
          'Halaxy Booking Integration',
          'HotDoc Integration',
          'High-Performance Healthcare Web Architecture',
          'Healthcare Search Engine Optimisation',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Medical & Private Practice Web Architecture Packages',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': 'https://mvmnt-designs.vercel.app/#service-solo-specialist',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': 'https://mvmnt-designs.vercel.app/#service-boutique-clinic',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': 'https://mvmnt-designs.vercel.app/#service-full-transformation',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': 'https://mvmnt-designs.vercel.app/#service-studio-care',
              },
            },
          ],
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://mvmnt-designs.vercel.app/#service-solo-specialist',
        name: '01. Solo Specialist Launch',
        serviceType: 'Single-Page Medical Practice Website Design & Clinical Copywriting',
        provider: {
          '@id': 'https://mvmnt-designs.vercel.app/#organization',
        },
        description:
          'Bespoke single-page luxury website, clear clinical copywriting positioning practitioner authority, and direct consultation booking integration with practice calendar. Rapid 5-7 business day turnaround.',
        offers: {
          '@type': 'Offer',
          price: '4800',
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Australia',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://mvmnt-designs.vercel.app/#service-boutique-clinic',
        name: '02. Boutique Clinic Studio Build',
        serviceType: 'Multi-Page Medical Practice Platform & Visual Identity',
        provider: {
          '@id': 'https://mvmnt-designs.vercel.app/#organization',
        },
        description:
          'Flagship comprehensive multi-page editorial website for all clinic services and treatments, full clinical copywriting answering patient concerns, bespoke typography and visual branding, interactive patient triage/qualification flow, and local Google Search setup. Turnkey 10-14 business day delivery.',
        offers: {
          '@type': 'Offer',
          price: '8800',
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Australia',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://mvmnt-designs.vercel.app/#service-full-transformation',
        name: '03. Full Practice Transformation',
        serviceType: 'Multi-Practitioner Medical Platform & Practice Management Integration',
        provider: {
          '@id': 'https://mvmnt-designs.vercel.app/#organization',
        },
        description:
          'Enterprise multi-practitioner clinical architecture with individual specialist bios, direct practice management software synchronization (Cliniko, Halaxy, Best Practice, Stripe), dedicated referral and marketing landing pages, multi-location search optimisation, and headless content studio.',
        offers: {
          '@type': 'Offer',
          price: '16500',
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Australia',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://mvmnt-designs.vercel.app/#service-studio-care',
        name: 'Studio Care & Peace of Mind',
        serviceType: 'Ongoing Medical Website Maintenance, Edge Hosting & Security Support',
        provider: {
          '@id': 'https://mvmnt-designs.vercel.app/#organization',
        },
        description:
          'Complete hands-off protection for practice websites including ultra-fast edge hosting, regular automated backups, continuous security oversight, and 2 hours per month of priority doctor, text, or treatment updates.',
        offers: {
          '@type': 'Offer',
          price: '395',
          priceCurrency: 'AUD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '395',
            priceCurrency: 'AUD',
            unitText: 'MONTH',
          },
          availability: 'https://schema.org/InStock',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Australia',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://mvmnt-designs.vercel.app/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much does a custom medical clinic website cost in Australia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A custom medical website in Australia costs between $4,800 and $16,500 AUD at MVMNT Studio. Our Solo Specialist package is $4,800 AUD, our flagship multi-page Boutique Clinic package is $8,800 AUD, and multi-doctor or multi-location platforms start from $16,500 AUD with transparent, fixed pricing.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you ensure medical websites comply with AHPRA and TGA advertising regulations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We adhere strictly to Section 133 of the Health Practitioner Regulation National Law and TGA Therapeutic Advertising Codes. We eliminate prohibited clinical testimonials, avoid misleading claims or guaranteed therapeutic outcomes, and ensure accurate specialist titles and Schedule 4 medication compliance across all copy and page layouts.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take to launch a medical practice website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MVMNT Studio launches solo medical specialist websites in 5 to 7 business days, while complete multi-page boutique clinic builds take 10 to 14 business days. Unlike legacy healthcare agencies that require 3 to 6 months of committee meetings, our streamlined sprint model eliminates downtime.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do doctors have to write their own website content and clinical copy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. MVMNT Studio provides full clinical copywriting refinement included with every package. We conduct a focused clinical interview to extract your treatment philosophy and draft patient-centred, reassuring copy that communicates clinical prestige without requiring hours of practitioner writing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can our website integrate directly with Cliniko, Halaxy, and HotDoc?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We engineer seamless integrations with leading Australian practice management software (PMS) including Cliniko, Halaxy, HotDoc, HealthEngine, and Best Practice, enabling real-time appointment scheduling, deposit collection via Stripe, and reduced front-desk administrative load.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why should a medical clinic choose modern web architecture over legacy WordPress?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Modern web architecture delivers instantaneous mobile page load times, superior patient responsiveness, and robust security with zero database vulnerabilities. Traditional WordPress sites suffer from plugin bloat, sluggish loading times, high mobile bounce rates, and frequent maintenance headaches.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
