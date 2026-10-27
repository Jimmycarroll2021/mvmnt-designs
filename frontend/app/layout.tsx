import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { draftMode } from 'next/headers';
import { toPlainText } from 'next-sanity';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Toaster } from 'sonner';

import DraftModeToast from '@/app/components/DraftModeToast';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import JsonLd from '@/app/components/JsonLd';
import * as demo from '@/sanity/lib/demo';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { handleError } from '@/app/client-utils';

/**
 * Generate metadata for the page.
 * Enhanced for Australian search engines and local clinical intent.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  const defaultTitle = 'MVMNT STUDIO | Boutique Medical & Practice Web Design Australia';
  const defaultDesc =
    'Bespoke digital design, clinical copywriting, and patient booking platforms for medical practices, private specialists, and boutique clinics across Australia.';

  const title = settings?.title || defaultTitle;
  const description = settings?.description ? toPlainText(settings.description) : defaultDesc;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  const images = ogImage
    ? [ogImage]
    : [
        {
          url: '/images/hali_case_study_cover.png',
          width: 1200,
          height: 630,
          alt: 'MVMNT Studio — Medical & Practice Web Design Australia',
        },
      ];

  return {
    metadataBase: new URL('https://mvmnt-designs.vercel.app'),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    keywords: [
      'medical website design australia',
      'clinic website design',
      'private practice website design',
      'doctor website design australia',
      'medical specialist branding',
      'cosmetic clinic web design',
      'healthcare web design australia',
      'ahpra compliant medical web design',
      'patient booking website integration',
      'boutique clinic digital design',
    ],
    authors: [{ name: 'MVMNT Studio' }],
    creator: 'MVMNT Studio',
    publisher: 'MVMNT Studio',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: 'https://mvmnt-designs.vercel.app',
    },
    openGraph: {
      title,
      description,
      url: 'https://mvmnt-designs.vercel.app',
      siteName: 'MVMNT Studio',
      locale: 'en_AU',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hali_case_study_cover.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: '8lrCgZDiITHc_HBdQmzBrc-JKwjHJk_2N6B7hNJeJJU',
    },
  };
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en-AU" className={`${inter.variable} ${ibmPlexMono.variable} bg-white text-black`}>
      <head>
        <JsonLd />
      </head>
      <body>
        <section className="min-h-screen pt-24">
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          {isDraftMode && <SanityLive onError={handleError} />}
          <Header />
          <main>{children}</main>
          <Footer />
        </section>
        <SpeedInsights />
      </body>
    </html>
  );
}
