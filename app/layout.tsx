import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://icoderx.vn'),
  title: 'iCoderX - Lập Trình Bot | Code Bot Theo Yêu Cầu | Viết Bot Web Tự Động | Tool MMO',
  description: 'Chuyên lập trình bot, code bot theo yêu cầu, viết bot web tự động, tool MMO auto, bot Facebook/Telegram/AI. Dịch vụ viết bot crypto, tool automation, phần mềm tự động hóa, RPA. Thuê code tool auto, bot web scraping, tool auto click. 100+ dự án thành công.',
  keywords: 'lập trình bot, code bot theo yêu cầu, viết bot web tự động, bot web auto, bot thao tác web, viết bot Facebook, viết bot Telegram, viết bot AI, dịch vụ viết bot, thuê viết bot, thuê người code bot, thuê code tool auto, code tool MMO, tool spam, tool tự động hóa, tool auto click, tool auto scroll, tool auto web, tool fill form tự động, phần mềm auto, phần mềm tự động hóa, phần mềm thao tác web, tool MMO auto, tool kiếm tiền online, dịch vụ viết tool MMO, viết tool auto game, bot auto đăng ký tài khoản, bot đăng nhập website, bot tự động crawl dữ liệu, bot web scraping, tool automation trình duyệt, automation web bằng Puppeteer, automation web bằng Selenium, tool auto captcha, code auto đăng bài Facebook, tool auto comment YouTube, tool tương tác TikTok, tool tăng lượt like Facebook, bot seeding TikTok, code bot Instagram, dịch vụ lập trình theo yêu cầu, code phần mềm theo yêu cầu, phần mềm tùy chỉnh, phần mềm automation theo ngành, RPA robotic process automation, lập trình bot thao tác chuột, lập trình auto click chuột, tool auto thao tác chuột và bàn phím, auto thao tác nhiều tab trình duyệt, tool đa luồng, tool chạy nền, tool giả lập Android, viết bot tự động hóa quy trình doanh nghiệp, bot AI tùy chỉnh GPT, tích hợp API automation, tool lấy dữ liệu sản phẩm Shopee, tool kiểm tra đơn hàng tự động, tool auto báo cáo, lập trình bot AI học sinh, tool chấm điểm tự động, công cụ tự động hóa giáo dục, bot Telegram xử lý yêu cầu khách hàng, bot chăm sóc khách hàng tự động, tool hỗ trợ làm việc nhóm, tool đồng bộ dữ liệu, tool crawl dữ liệu đối thủ, tool báo cáo giá thị trường, bot giao dịch crypto tự động, crypto trading bot, dịch vụ viết bot crypto, dịch vụ lập trình bot MMO, bot auto đăng ký tài khoản email, tool tạo tài khoản hàng loạt, bot tự động hoàn thành captcha, tool auto submit form, dịch vụ tạo tool automation theo yêu cầu, giải pháp tự động hóa phần mềm, thiết kế hệ thống bot chuyên dụng, tool giám sát hệ thống, viết bot AI với ChatGPT hoặc GPT-4, lập trình phần mềm hỗ trợ MMO, tool auto SEO, phần mềm auto marketing Facebook TikTok',
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
    title: 'iCoderX - Lập Trình Bot | Code Bot Theo Yêu Cầu | Viết Bot Web Tự Động | Tool MMO',
    description: 'Chuyên lập trình bot, code bot theo yêu cầu, viết bot web tự động, tool MMO auto, bot Facebook/Telegram/AI. Dịch vụ viết bot crypto, tool automation, phần mềm tự động hóa, RPA. Thuê code tool auto, bot web scraping.',
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
    title: 'iCoderX - Lập Trình Bot | Code Bot Theo Yêu Cầu | Viết Bot Web Tự Động | Tool MMO',
    description: 'Chuyên lập trình bot, code bot theo yêu cầu, viết bot web tự động, tool MMO auto, bot Facebook/Telegram/AI. Dịch vụ viết bot crypto, tool automation, phần mềm tự động hóa.',
    images: ['/og-image.jpg'],
    creator: '@iCoderXvn',
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
              "description": "Chuyên lập trình bot, code bot theo yêu cầu, viết bot web tự động, tool MMO auto, dịch vụ viết bot Facebook/Telegram/AI, tool automation, phần mềm tự động hóa chuyên nghiệp",
              "url": "https://icoderx.vn",
              "logo": "https://icoderx.vn/favicon.ico",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-877-484-888",
                "contactType": "customer service",
                "email": "admin@icoderx.vn"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "VN",
                "addressLocality": "Ha Noi Capital",
                "postalCode": "100000",
                "streetAddress": "Dai Thanh"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.0285",
                "longitude": "105.8542"
              },
              "hasMap": "https://g.co/kgs/ws8H3hW",
              "sameAs": [
                "https://t.me/iCoderXvn",
                "https://youtube.com/@iCoderXvn",
                "https://facebook.com/iCoderXvn",
                "https://twitter.com/iCoderXvn"
              ],
              "offers": {
                "@type": "Offer",
                "category": "Software Development",
                "description": "Lập trình bot, code bot theo yêu cầu, viết bot web tự động, tool MMO auto, bot Facebook/Telegram/AI, dịch vụ viết bot crypto, tool automation, phần mềm tự động hóa, RPA, bot web scraping, tool auto click, phần mềm thao tác web, automation web bằng Puppeteer/Selenium"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
