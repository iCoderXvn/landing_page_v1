import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbSchema({ items, className = '' }: BreadcrumbSchemaProps) {
  // Add homepage as first item if not already present
  const allItems: BreadcrumbItem[] = items[0]?.href !== '/' 
    ? [{ name: 'Trang Chủ', href: '/' }, ...items]
    : items

  // Generate structured data for Google
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': allItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://icoderx.vn${item.href}`
    }))
  }

  return (
    <>
      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`container mx-auto px-4 md:px-6 py-4 ${className}`}
      >
        <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1
            
            return (
              <li
                key={item.href}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {!isLast ? (
                  <>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                    <meta itemProp="position" content={String(index + 1)} />
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-600" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span
                      className="text-blue-400 font-medium"
                      itemProp="name"
                      aria-current="page"
                    >
                      {item.name}
                    </span>
                    <meta itemProp="position" content={String(index + 1)} />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
