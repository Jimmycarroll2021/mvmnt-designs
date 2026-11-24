import type { Metadata } from 'next';

import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_LOCALE, SITE_NAME } from '@/lib/site';

type PageMetaInput = {
  /** Page title without the brand suffix; the root template appends " | MVMNT Design". */
  title: string;
  description: string;
  /** Route path, e.g. "/pricing". Used for the self-canonical and og:url. */
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  /** Set true when the title already contains the brand and must bypass the template. */
  absoluteTitle?: boolean;
};

/** Per-page metadata with a self-canonical and matching Open Graph / Twitter cards. */
export function pageMetadata({ title, description, path, image, absoluteTitle }: PageMetaInput): Metadata {
  const img = image ?? { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME };
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'website',
      images: [img],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [img.url],
    },
  };
}
