import {defineLive} from 'next-sanity/live'
import {client} from '@/sanity/lib/client'
import {token} from '@/sanity/lib/token'

/**
 * Use defineLive to enable automatic revalidation and refreshing of your fetched content
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#1-configure-definelive
 */

const live = defineLive({
  client,
  // Required for showing draft content when the Sanity Presentation Tool is used, or to enable the Vercel Toolbar Edit Mode
  serverToken: token,
  // Required for stand-alone live previews, the token is only shared to the browser if it's a valid Next.js Draft Mode session
  browserToken: token,
})

export const SanityLive = live.SanityLive

export const sanityFetch: typeof live.sanityFetch = async (args: any) => {
  try {
    return await live.sanityFetch(args)
  } catch (error) {
    console.warn(
      `[Sanity] graceful fallback during build/offline for query: ${typeof args?.query === 'string' ? args.query.slice(0, 40).trim() : 'unknown'}`
    )
    return {data: null, sourceMap: null, tags: []} as any
  }
}
