import type {MetadataRoute} from 'next'

import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'
import {absoluteUrl} from '@/lib/site'

/**
 * Static routes that exist in the app router. Add each planned page here when it ships
 (/dental-website-design only if it is built); never list a route that does not render.
 */
const STATIC_ROUTES: {path: string; priority: number; changeFrequency: 'weekly' | 'monthly'}[] = [
  {path: '/', priority: 1, changeFrequency: 'weekly'},
  {path: '/web-design-canberra', priority: 0.9, changeFrequency: 'monthly'},
  {path: '/medical-practice-website-design', priority: 0.9, changeFrequency: 'monthly'},
  {path: '/branding-canberra', priority: 0.9, changeFrequency: 'monthly'},
  {path: '/shopify-developer', priority: 0.9, changeFrequency: 'monthly'},
  {path: '/pricing', priority: 0.9, changeFrequency: 'monthly'},
  {path: '/work', priority: 0.8, changeFrequency: 'monthly'},
  {path: '/privacy', priority: 0.3, changeFrequency: 'monthly'},
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    priority: r.priority,
    changeFrequency: r.changeFrequency,
  }))
  const seen = new Set(STATIC_ROUTES.map((r) => r.path))

  // A Sanity outage must still return the static list.
  try {
    const {data} = await sanityFetch({query: sitemapData, perspective: 'published', stega: false})
    for (const p of data ?? []) {
      if (!p?.slug) continue
      const path = p._type === 'post' ? `/posts/${p.slug}` : p._type === 'page' ? `/${p.slug}` : null
      if (!path || seen.has(path)) continue
      seen.add(path)
      entries.push({
        url: absoluteUrl(path),
        lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
        priority: p._type === 'page' ? 0.8 : 0.6,
        changeFrequency: p._type === 'page' ? 'monthly' : 'yearly',
      })
    }
  } catch (e) {
    console.warn('sitemap: Sanity fetch failed, returning static routes only', e)
  }

  return entries
}
