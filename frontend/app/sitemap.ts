import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'
import {headers} from 'next/headers'

/**
 * This file creates a sitemap (sitemap.xml) for the application.
 * Fully compatible with Google Search Console and Bing Webmaster Tools.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  })
  const headersList = await headers()
  const sitemap: MetadataRoute.Sitemap = []
  const host = headersList.get('host') || 'mvmnt-designs.vercel.app'
  const domain = host.startsWith('http') ? host : `https://${host}`

  sitemap.push({
    url: domain,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'weekly',
  })

  if (allPostsAndPages != null && allPostsAndPages.data && allPostsAndPages.data.length != 0) {
    for (const p of allPostsAndPages.data) {
      switch (p._type) {
        case 'page':
          sitemap.push({
            url: `${domain}/${p.slug}`,
            lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
            priority: 0.8,
            changeFrequency: 'monthly',
          })
          break
        case 'post':
          sitemap.push({
            url: `${domain}/posts/${p.slug}`,
            lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
            priority: 0.6,
            changeFrequency: 'never',
          })
          break
      }
    }
  }

  return sitemap
}
