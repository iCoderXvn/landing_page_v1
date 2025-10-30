import { Metadata } from 'next'
import { getSiteSettings } from './settings'

/**
 * Generate dynamic metadata from database settings
 */
export function generateMetadata(): Metadata {
  const settings = getSiteSettings()

  return {
    metadataBase: new URL(settings.siteUrl || 'https://icoderx.vn'),
    title: settings.siteTitle || settings.siteName || 'iCoderX',
    description: settings.defaultMetaDescription || settings.siteDescription,
    keywords: settings.defaultKeywords,
    authors: [{ name: `${settings.siteName} Team` }],
    creator: settings.siteName,
    publisher: settings.siteName,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: '16x16', type: 'image/png' },
        { url: '/favicon.ico', sizes: '48x48', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
      other: [
        {
          rel: 'icon',
          url: '/favicon.ico',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: settings.siteUrl,
      title: settings.siteName,
      description: settings.defaultMetaDescription || settings.siteDescription,
      siteName: settings.siteName,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${settings.siteName} - Automation Solutions`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.siteName,
      description: settings.defaultMetaDescription || settings.siteDescription,
      images: ['/og-image.png'],
      creator: settings.twitterUrl ? `@${settings.twitterUrl.split('/').pop()}` : '@iCoderXvn',
    },
    verification: {
      google: settings.googleSearchConsole || '',
    },
    alternates: {
      canonical: settings.siteUrl,
      languages: {
        'vi-VN': settings.siteUrl,
        'en-US': `${settings.siteUrl}/en`,
      },
    },
  }
}

/**
 * Generate structured data (JSON-LD) from settings
 */
export function generateStructuredData() {
  const settings = getSiteSettings()
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings.siteName,
    "description": settings.defaultMetaDescription || settings.siteDescription,
    "url": settings.siteUrl,
    "logo": `${settings.siteUrl}/favicon.ico`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": settings.contactEmail
    },
    "sameAs": [
      settings.telegramUrl,
      settings.youtubeUrl,
      settings.facebookUrl,
      settings.twitterUrl,
      settings.githubUrl,
      settings.linkedinUrl
    ].filter(url => url && url.trim() !== ''),
  }
}
