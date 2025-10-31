import Head from 'next/head'
import { getSiteSettings } from '@/lib/settings'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  structuredData?: object
  noindex?: boolean
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/og-image.png',
  ogType = 'website',
  structuredData,
  noindex = false
}: SEOHeadProps) {
  const settings = getSiteSettings()
  
  const finalTitle = title || settings.siteTitle
  const finalDescription = description || settings.defaultMetaDescription
  const finalKeywords = keywords || settings.defaultKeywords
  const finalCanonicalUrl = canonicalUrl || settings.siteUrl
  
  return (
    <>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={settings.siteName} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={`${settings.siteUrl}${ogImage}`} />
      <meta property="og:site_name" content={settings.siteName} />
      <meta property="og:locale" content="vi_VN" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalCanonicalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={`${settings.siteUrl}${ogImage}`} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0072ff" />
      <meta name="msapplication-TileColor" content="#0072ff" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </>
  )
}