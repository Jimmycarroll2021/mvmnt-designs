import type {MetadataRoute} from 'next'

import {isIndexable, SITE_URL} from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Preview and local deployments must never be crawled.
  if (!isIndexable()) {
    return {rules: {userAgent: '*', disallow: '/'}}
  }
  return {
    rules: {userAgent: '*', allow: '/', disallow: ['/api/', '/studio/']},
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
