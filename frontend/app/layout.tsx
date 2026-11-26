import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Toaster } from 'sonner';

import DraftModeToast from '@/app/components/DraftModeToast';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import JsonLd from '@/app/components/JsonLd';
import * as demo from '@/sanity/lib/demo';
import { SanityLive } from '@/sanity/lib/live';
import { handleError } from '@/app/client-utils';
import { HOME_DESCRIPTION, HOME_TITLE } from '@/app/content/home';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_SIZE,
  GA4_ID,
  isIndexable,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

/**
 * Sitewide metadata defaults. Pages set their own self-canonical, title, description
 * and Open Graph via pageMetadata() (lib/metadata.ts); the root layout must never set
 * alternates.canonical, or every page that forgets to override it canonicalises to /.
 */
export async function generateMetadata(): Promise<Metadata> {
  const indexable = isIndexable();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_NAME}`,
      default: HOME_TITLE,
    },
    description: HOME_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: 'Jimmy Carroll' }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, ...DEFAULT_OG_IMAGE_SIZE, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : { index: false, follow: false },
    verification: {
      // Belongs to the current Search Console property (vercel.app host). Replace at domain cutover.
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
        <section className="min-h-screen">
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          {isDraftMode && <SanityLive onError={handleError} />}
          <Header />
          <main id="home">{children}</main>
          <Footer />
        </section>
        <SpeedInsights />
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA4_ID)});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
