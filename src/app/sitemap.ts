import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

if (!SITE_URL) {
  throw new Error('NEXT_PUBLIC_DOMAIN_URL is not defined')
}

const routes = [
  {
    path: '/',
    changeFrequency: 'daily',
    priority: 1
  }
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency,
    priority
  }))
}
