import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
}

export default nextConfig
