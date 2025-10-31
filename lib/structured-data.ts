// Service-specific structured data optimized for Vietnamese SEO
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "iCoderX - Giải Pháp Tự Động Hóa",
  "alternateName": ["iCoderX Automation", "Dịch Vụ Tự Động Hóa iCoderX"],
  "description": "Chuyên gia tự động hóa hàng đầu Việt Nam - Phát triển bot giao dịch crypto, tự động hóa MMO, chatbot AI và phần mềm tùy chỉnh chuyên nghiệp",
  "inLanguage": "vi-VN",
  "provider": {
    "@type": "Organization",
    "name": "iCoderX",
    "url": "https://icoderx.vn"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Vietnam",
      "alternateName": "Việt Nam"
    },
    {
      "@type": "Country", 
      "name": "Global"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Dịch Vụ Tự Động Hóa",
    "inLanguage": "vi-VN",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bot Giao Dịch Crypto",
          "alternateName": ["Trading Bot", "Bot Bitcoin", "Bot Cryptocurrency"],
          "description": "Phát triển bot giao dịch tiền điện tử với AI, thuật toán tự động, quản lý rủi ro và tối ưu hóa lợi nhuận 24/7",
          "url": "https://icoderx.vn/services/trading-bots",
          "keywords": ["bot giao dịch", "trading bot", "bot bitcoin", "bot crypto", "tự động hóa trading"],
          "inLanguage": "vi-VN"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Tự Động Hóa Game MMO",
          "alternateName": ["Bot Game", "MMO Bot", "Auto Game"],
          "description": "Bot tự động hóa game MMO, farming tài nguyên, level character, quest tự động và quản lý multi-account chuyên nghiệp",
          "url": "https://icoderx.vn/services/mmo-automation",
          "keywords": ["bot game", "tự động hóa game", "MMO automation", "bot farming", "auto game"],
          "inLanguage": "vi-VN"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Phát Triển Chatbot AI",
          "alternateName": ["Bot Chat", "Telegram Bot", "Discord Bot", "Facebook Bot"],
          "description": "Chatbot AI thông minh cho Telegram, Discord, Facebook Messenger và website. Tự động hóa customer service 24/7 với NLP",
          "url": "https://icoderx.vn/services/chat-bot",
          "keywords": ["chatbot", "bot telegram", "bot discord", "bot facebook", "AI chatbot", "customer service bot"],
          "inLanguage": "vi-VN"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Phần Mềm Tùy Chỉnh",
          "alternateName": ["Custom Software", "Lập Trình Theo Yêu Cầu", "Phát Triển Ứng Dụng"],
          "description": "Phát triển phần mềm tùy chỉnh, ứng dụng web, mobile app, desktop software và tích hợp API theo yêu cầu khách hàng",
          "url": "https://icoderx.vn/services/custom-software",
          "keywords": ["phần mềm tùy chỉnh", "lập trình theo yêu cầu", "custom software", "phát triển ứng dụng"],
          "inLanguage": "vi-VN"
        }
      }
    ]
  },
  "serviceType": "Dịch Vụ Công Nghệ Thông Tin",
  "category": "Tự Động Hóa & Phát Triển Phần Mềm"
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "iCoderX",
  "alternateName": ["iCoderX Việt Nam", "iCoderX Automation", "Công Ty iCoderX"],
  "url": "https://icoderx.vn",
  "logo": "https://icoderx.vn/favicon.ico",
  "description": "Công ty chuyên gia tự động hóa hàng đầu Việt Nam - Phát triển bot, tự động hóa quy trình và giải pháp công nghệ cho doanh nghiệp",
  "slogan": "Tự Động Hóa Mọi Thứ - Mở Rộng Nhanh Hơn",
  "foundingDate": "2019",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "VN",
      "addressLocality": "Hà Nội",
      "addressRegion": "Hà Nội"
    }
  },
  "founders": [
    {
      "@type": "Person",
      "name": "iCoderX Team",
      "jobTitle": "Founder & CEO"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+84",
      "contactType": "customer service",
      "contactOption": "TollFree",
      "email": "admin@icoderx.vn",
      "availableLanguage": ["Vietnamese", "English"],
      "areaServed": "VN",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "22:00",
        "validFrom": "2019-01-01",
        "validThrough": "2030-12-31"
      }
    },
    {
      "@type": "ContactPoint",
      "contactType": "technical support",
      "url": "https://t.me/iCoderXvn",
      "availableLanguage": ["Vietnamese", "English"],
      "areaServed": "VN"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "116 Đ. Tả Thanh Oai, Tả Thanh Oai",
    "addressLocality": "Thanh Trì",
    "addressRegion": "Hà Nội", 
    "postalCode": "100000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "21.0285",
    "longitude": "105.8542"
  },
  "sameAs": [
    "https://t.me/iCoderXvn",
    "https://youtube.com/@iCoderX_vn", 
    "https://facebook.com/iCoderXvn",
    "https://twitter.com/iCoderXvn"
  ],
  "knowsAbout": [
    "Phát Triển Bot",
    "Tự Động Hóa Bot Giao Dịch Cryptocurrency", 
    "Tự Động Hóa Game MMO",
    "Phát Triển Bot Discord",
    "Phát Triển Bot Telegram",
    "Web Scraping",
    "Tự Động Hóa Quy Trình",
    "Phát Triển Phần Mềm Tùy Chỉnh",
    "Chatbot AI",
    "Trading Bot",
    "MMO Automation",
    "Custom Software Development"
  ],
  "expertise": [
    "Bot Development",
    "Automation Solutions", 
    "Cryptocurrency Trading",
    "Game Automation",
    "AI Chatbots",
    "Software Development"
  ],
  "industry": "Công Nghệ Thông Tin",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 5,
    "maxValue": 20
  },
  "award": [
    "Top Automation Service Provider Vietnam",
    "Leading Bot Development Company"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "iCoderX - Giải Pháp Tự Động Hóa Việt Nam",
  "alternateName": ["iCoderX", "iCoderX Automation", "Dịch Vụ Bot Việt Nam"],
  "url": "https://icoderx.vn",
  "description": "Chuyên gia tự động hóa hàng đầu Việt Nam - Bot giao dịch crypto, tự động hóa MMO, chatbot AI và phần mềm tùy chỉnh chuyên nghiệp",
  "inLanguage": "vi-VN",
  "audience": {
    "@type": "Audience",
    "audienceType": "Doanh nghiệp và cá nhân cần giải pháp tự động hóa",
    "geographicArea": {
      "@type": "Country",
      "name": "Vietnam"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "iCoderX",
    "logo": {
      "@type": "ImageObject",
      "url": "https://icoderx.vn/favicon.ico"
    }
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://icoderx.vn/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    {
      "@type": "ContactAction",
      "target": "https://icoderx.vn/contact"
    }
  ],
  "mainEntity": {
    "@type": "ItemList",
    "name": "Dịch Vụ Chính",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Bot Giao Dịch Crypto",
          "url": "https://icoderx.vn/services/trading-bots"
        }
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Tự Động Hóa MMO",
          "url": "https://icoderx.vn/services/mmo-automation"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Chatbot AI",
          "url": "https://icoderx.vn/services/chat-bot"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service", 
          "name": "Phần Mềm Tùy Chỉnh",
          "url": "https://icoderx.vn/services/custom-software"
        }
      }
    ]
  },
  "keywords": [
    "bot giao dịch", "trading bot", "bot crypto", "bot bitcoin",
    "tự động hóa game", "bot game", "MMO automation",
    "chatbot", "bot telegram", "bot discord", "bot facebook",
    "phần mềm tùy chỉnh", "lập trình theo yêu cầu",
    "tự động hóa", "automation", "iCoderX", "Việt Nam"
  ]
}

/**
 * Generate Breadcrumb structured data for service pages (Vietnamese optimized)
 */
export function generateBreadcrumbStructuredData(items: Array<{name: string, href: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": "vi-VN",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": {
        "@type": "WebPage",
        "@id": `https://icoderx.vn${item.href}`,
        "url": `https://icoderx.vn${item.href}`,
        "name": item.name
      }
    }))
  }
}

/**
 * Generate FAQ structured data for service pages (Vietnamese optimized)
 */
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "vi-VN",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "text": faq.question,
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "inLanguage": "vi-VN"
      },
      "position": index + 1
    }))
  }
}

/**
 * Generate Service structured data for individual service pages (Vietnamese optimized)
 */
export function generateServicePageStructuredData(service: {
  name: string,
  description: string,
  url: string,
  features: string[],
  category: string,
  vietnameseKeywords?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "category": service.category,
    "inLanguage": "vi-VN",
    "serviceType": "Dịch Vụ Công Nghệ Thông Tin",
    "provider": {
      "@type": "Organization",
      "name": "iCoderX",
      "url": "https://icoderx.vn",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "VN",
        "addressLocality": "Hà Nội"
      }
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Vietnam",
        "alternateName": "Việt Nam"
      },
      {
        "@type": "Country",
        "name": "Global"
      }
    ],
    "hasOfferCatalog": {
      "@type": "ItemList",
      "name": "Tính Năng Dịch Vụ",
      "inLanguage": "vi-VN",
      "itemListElement": service.features.map((feature, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": feature
      }))
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "VND",
      "price": "Liên hệ để báo giá",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "VND",
        "price": "Liên hệ để báo giá"
      },
      "description": "Giá cả linh hoạt theo yêu cầu dự án"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Doanh nghiệp và cá nhân",
      "geographicArea": {
        "@type": "Country",
        "name": "Vietnam"
      }
    },
    "keywords": service.vietnameseKeywords || [],
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "Khách hàng iCoderX"
      },
      "reviewBody": "Dịch vụ chuyên nghiệp, chất lượng cao và hỗ trợ tốt"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "100",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

/**
 * Generate LocalBusiness structured data for Vietnamese SEO
 */
export function generateLocalBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "iCoderX",
    "alternateName": "Công Ty iCoderX",
    "description": "Công ty chuyên gia tự động hóa hàng đầu Việt Nam - Phát triển bot, tự động hóa quy trình và giải pháp công nghệ",
    "image": "https://icoderx.vn/favicon.ico",
    "telephone": "+84",
    "email": "admin@icoderx.vn",
    "url": "https://icoderx.vn",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "116 Đ. Tả Thanh Oai, Tả Thanh Oai",
      "addressLocality": "Thanh Trì",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.0285",
      "longitude": "105.8542"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "22:00"
    },
    "priceRange": "$$",
    "currenciesAccepted": "VND",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "100"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Khách hàng"
        },
        "reviewBody": "Dịch vụ tuyệt vời, bot giao dịch hoạt động hiệu quả"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dịch Vụ iCoderX",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Bot Giao Dịch",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bot Giao Dịch Crypto"
              }
            }
          ]
        }
      ]
    }
  }
}
