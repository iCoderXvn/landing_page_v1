/**
 * WebPage Schema Generator for SEO
 * Generates structured data for individual pages to help Google understand page hierarchy
 */

export interface WebPageSchemaProps {
  title: string
  description: string
  url: string
  breadcrumbs?: Array<{ name: string; url: string }>
  datePublished?: string
  dateModified?: string
  author?: string
  image?: string
}

export function generateWebPageSchema({
  title,
  description,
  url,
  breadcrumbs = [],
  datePublished,
  dateModified,
  author = 'iCoderX',
  image,
}: WebPageSchemaProps) {
  const baseUrl = 'https://icoderx.vn'
  
  // Add homepage to breadcrumbs if not already present
  const allBreadcrumbs = breadcrumbs[0]?.url !== baseUrl
    ? [{ name: 'Trang Chủ', url: baseUrl }, ...breadcrumbs]
    : breadcrumbs

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'iCoderX',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.ico`,
      },
    },
    inLanguage: 'vi-VN',
  }

  // Add breadcrumb list if available
  if (allBreadcrumbs.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: allBreadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    }
  }

  // Add dates if available
  if (datePublished) {
    schema.datePublished = datePublished
  }
  if (dateModified) {
    schema.dateModified = dateModified
  }

  // Add author if specified
  if (author) {
    schema.author = {
      '@type': 'Organization',
      name: author,
    }
  }

  // Add image if available
  if (image) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: image,
    }
  }

  return schema
}
