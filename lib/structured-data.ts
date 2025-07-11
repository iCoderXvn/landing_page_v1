// Service-specific structured data for better SEO
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "iCoderX Automation Solutions",
  "description": "Professional bot development and automation services including crypto trading bots, MMO automation, and custom software solutions",
  "provider": {
    "@type": "Organization",
    "name": "iCoderX",
    "url": "https://icoderx.vn"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Global"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Automation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Crypto Trading Bot Development",
          "description": "AI-powered cryptocurrency trading bots with algorithmic strategies"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "MMO Game Automation",
          "description": "Character automation and resource farming bots for MMORPG games"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Discord & Telegram Bots",
          "description": "Community management and messaging automation bots"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Software Development", 
          "description": "Tailored automation software and web scraping solutions"
        }
      }
    ]
  }
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "iCoderX",
  "alternateName": "iCoderX Automation",
  "url": "https://icoderx.vn",
  "logo": "https://icoderx.vn/favicon.ico",
  "description": "Leading automation experts specializing in bot development, crypto trading automation, and custom software solutions",
  "foundingDate": "2020",
  "founders": [
    {
      "@type": "Person",
      "name": "iCoderX Team"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+84-xxx-xxx-xxx",
      "contactType": "customer service",
      "email": "hello@icoderx.vn",
      "availableLanguage": ["Vietnamese", "English"]
    }
  ],
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
  "knowsAbout": [
    "Bot Development",
    "Cryptocurrency Trading Automation", 
    "MMO Game Automation",
    "Discord Bot Development",
    "Telegram Bot Development",
    "Web Scraping",
    "Process Automation",
    "Custom Software Development"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "iCoderX - Automation Solutions",
  "alternateName": "iCoderX",
  "url": "https://icoderx.vn",
  "description": "Professional automation services including bot development, crypto trading bots, MMO automation, and custom software solutions",
  "publisher": {
    "@type": "Organization",
    "name": "iCoderX"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://icoderx.vn/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
