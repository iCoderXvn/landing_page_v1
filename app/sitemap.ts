import { MetadataRoute } from 'next'
import { postOperations } from '@/lib/database'

// Force dynamic rendering to ensure sitemap is always fresh
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Post {
  id: number
  title: string
  content: string
  slug: string | null
  isPublished: boolean
  createdAt: Date
  updatedAt?: Date | null
  topicId?: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://icoderx.vn'
  
  // Get all published posts for dynamic blog URLs
  const publishedPosts = postOperations.getAll().filter((post: any) => post.isPublished)
  
  // Static pages - Optimized for Google Site Links
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Main navigation pages - High priority for Site Links
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Services overview page - High priority for Site Links
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Legal pages - Important for trust signals
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Service pages - Important for Site Links
    {
      url: `${baseUrl}/services/trading-bots`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/mmo-automation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/chat-bot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/custom-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
  
  // Dynamic blog post pages - Use slug if available, fallback to ID
  const blogPosts: MetadataRoute.Sitemap = publishedPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug || post.id}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...blogPosts]
}
