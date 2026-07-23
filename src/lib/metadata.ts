import type { Metadata } from 'next'

const SITE_NAME = 'FeeRadar'
const SITE_URL = process.env.DOMAIN_URL
const DEFAULT_DESCRIPTION = 'Track blockchain fees and crypto card fee rates with FeeRadar'
const DEFAULT_OG_IMAGE = '/og-image.png'
const DEFAULT_LOCALE = 'en_US'

if (!SITE_URL) {
  throw new Error('DOMAIN_URL is not defined')
}

interface BuildMetadataParams {
  title?: string
  description?: string
  path?: string
  image?: string
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },

  description: DEFAULT_DESCRIPTION,

  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630
      }
    ],
    locale: DEFAULT_LOCALE,
    type: 'website'
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE]
  }
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE
}: BuildMetadataParams = {}): Metadata {
  const url = new URL(path, SITE_URL).toString()

  const socialTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

  return {
    ...(title ? { title } : {}),

    description,

    alternates: {
      canonical: url
    },

    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630
        }
      ],
      locale: DEFAULT_LOCALE,
      type: 'website'
    },

    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image]
    }
  }
}
