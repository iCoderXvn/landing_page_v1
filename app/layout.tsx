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

  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={structuredData.url} />
        <link rel="alternate" hrefLang="vi" href={structuredData.url} />
        <link rel="alternate" hrefLang="en" href={`${structuredData.url}/en`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0072ff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
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
