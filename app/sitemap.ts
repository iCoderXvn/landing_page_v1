import { MetadataRoute } from 'next'
import { postOperations } from '@/lib/database'

interface Post {
  id: number
  title: string
  content: string
  isPublished: boolean
  createdAt: Date
  updatedAt?: Date
  topicId?: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://icoderx.vn'
  
  // Get all published posts for dynamic blog URLs
  const publishedPosts: Post[] = postOperations.getAll().filter((post: Post) => post.isPublished)
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
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
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]
  
  // Dynamic blog post pages
  const blogPosts: MetadataRoute.Sitemap = publishedPosts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...blogPosts]
}
