import type { Metadata } from 'next'
import './globals.css'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { generateMetadata, generateStructuredData } from '@/lib/metadata'

// Force dynamic rendering so metadata updates with database changes
export const dynamic = 'force-dynamic'

// Generate metadata dynamically from database settings
export const metadata: Metadata = generateMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = generateStructuredData()
  const baseUrl = structuredData.url || 'https://icoderx.vn'

  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={baseUrl} />
        <link rel="alternate" hrefLang="vi" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0072ff" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Enhanced Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'iCoderX',
              alternateName: 'iCoderX Automation',
              url: baseUrl,
              logo: `${baseUrl}/favicon.ico`,
              description: 'Chuyên gia tự động hóa hàng đầu - Bot Trading, MMO Automation, Chat Bot và phần mềm tùy chỉnh',
              foundingDate: '2018',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+84',
                contactType: 'customer service',
                email: 'admin@icoderx.vn',
                availableLanguage: ['Vietnamese', 'English'],
                areaServed: 'VN',
              },
              sameAs: [
                'https://t.me/iCoderXvn',
                'https://youtube.com/@iCoderX_vn',
                'https://facebook.com/iCoderXvn',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'VN',
                addressLocality: 'Ho Chi Minh City',
              },
            })
          }}
        />
        
        {/* Website Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'iCoderX - Automation Solutions',
              alternateName: 'iCoderX',
              url: baseUrl,
              description: 'Giải pháp tự động hóa chuyên nghiệp: Bot Trading, MMO Automation, Chat Bot, Phần mềm tùy chỉnh',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: 'iCoderX',
                logo: {
                  '@type': 'ImageObject',
                  url: `${baseUrl}/favicon.ico`,
                },
              },
            })
          }}
        />
      </head>
      <body>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  )
}
