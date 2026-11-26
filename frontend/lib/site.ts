/**
 * Single source of truth for the public site URL and brand string.
 * Set NEXT_PUBLIC_SITE_URL (for example https://mvmntdesign.com) at domain cutover;
 * canonical, Open Graph, sitemap, robots and JSON-LD URLs all derive from it.
 */
const DEFAULT_SITE_URL = 'https://mvmnt-designs.vercel.app';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

export const SITE_NAME = 'MVMNT Design';

export const SITE_LOCALE = 'en_AU';

export const DEFAULT_OG_IMAGE = '/images/hali_case_study_cover.png';

/** Pixel size of DEFAULT_OG_IMAGE as stored in public/images; keep in step with the file. */
export const DEFAULT_OG_IMAGE_SIZE = { width: 1440, height: 960 };

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';

/** Absolute URL for a site path, e.g. absoluteUrl('/pricing'). */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return normalised === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalised}`;
}

/** Only the production deployment may be indexed; previews and local builds are noindex. */
export function isIndexable(): boolean {
  return process.env.VERCEL_ENV === 'production';
}
