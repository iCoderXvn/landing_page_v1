import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://icoderx.vn'),
  title: 'iCoderX - Giải Pháp Tự Động Hóa Bot & Phần Mềm Chuyên Nghiệp',
  description: 'Chuyên gia tự động hóa hàng đầu. Xây dựng bot giao dịch crypto, bot MMO, bot Telegram/Discord và phần mềm tùy chỉnh. 100+ dự án thành công, hỗ trợ 24/7.',
  keywords: 'bot automation, crypto trading bot, MMO bot, telegram bot, discord bot, web scraping, automation software, vietnam automation',
  authors: [{ name: 'iCoderX Team' }],
  creator: 'iCoderX',
  publisher: 'iCoderX',
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
    url: 'https://icoderx.vn',
    title: 'iCoderX - Giải Pháp Tự Động Hóa Bot & Phần Mềm Chuyên Nghiệp',
    description: 'Chuyên gia tự động hóa hàng đầu. Xây dựng bot giao dịch crypto, bot MMO, bot Telegram/Discord và phần mềm tùy chỉnh. 100+ dự án thành công, hỗ trợ 24/7.',
    siteName: 'iCoderX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'iCoderX - Automation Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iCoderX - Giải Pháp Tự Động Hóa Bot & Phần Mềm Chuyên Nghiệp',
    description: 'Chuyên gia tự động hóa hàng đầu. Xây dựng bot giao dịch crypto, bot MMO, bot Telegram/Discord và phần mềm tùy chỉnh.',
    images: ['/og-image.jpg'],
    creator: '@iCoderX_Official',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://icoderx.vn',
    languages: {
      'vi-VN': 'https://icoderx.vn',
      'en-US': 'https://icoderx.vn/en',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://icoderx.vn" />
        <link rel="alternate" hrefLang="vi" href="https://icoderx.vn" />
        <link rel="alternate" hrefLang="en" href="https://icoderx.vn/en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0072ff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "iCoderX",
              "description": "Chuyên gia tự động hóa bot và phần mềm chuyên nghiệp",
              "url": "https://icoderx.vn",
              "logo": "https://icoderx.vn/favicon.ico",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-xxx-xxx-xxx",
                "contactType": "customer service",
                "email": "hello@icoderx.vn"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "VN",
                "addressLocality": "Ho Chi Minh City"
              },
              "sameAs": [
                "https://t.me/iCoderX_Official",
                "https://youtube.com/icoderx",
                "https://facebook.com/icoderx",
                "https://twitter.com/iCoderX_Official"
              ],
              "offers": {
                "@type": "Offer",
                "category": "Software Development",
                "description": "Bot automation services including crypto trading bots, MMO bots, and custom software solutions"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
