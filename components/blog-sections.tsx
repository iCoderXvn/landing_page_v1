"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Post {
  id: number
  title: string
  content: string
  slug: string
  viewCount: number
  createdAt: string
  topic?: {
    id: number
    name: string
  }
}

interface BlogSectionsProps {
  className?: string
}

export function BlogSections({ className }: BlogSectionsProps) {
  const [newestPosts, setNewestPosts] = useState<Post[]>([])
  const [mostVisitedPosts, setMostVisitedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        
        // Fetch newest posts (handle API returning { posts } or an array)
        const newestResponse = await fetch(`/api/blog?category=newest&limit=6&_t=${Date.now()}`)
        if (newestResponse.ok) {
          const newestData = await newestResponse.json()
          if (Array.isArray(newestData)) {
            setNewestPosts(newestData)
          } else if (Array.isArray(newestData.posts)) {
            setNewestPosts(newestData.posts)
          } else {
            // fallback if API uses other shapes
            setNewestPosts(newestData.posts || newestData || [])
          }
        }

        // Fetch most visited posts (handle API returning arrays or { posts })
        const mostVisitedResponse = await fetch(`/api/blog?category=most-visited&limit=6&_t=${Date.now()}`)
        if (mostVisitedResponse.ok) {
          const mostVisitedData = await mostVisitedResponse.json()
          if (Array.isArray(mostVisitedData)) {
            setMostVisitedPosts(mostVisitedData)
          } else if (Array.isArray(mostVisitedData.posts)) {
            setMostVisitedPosts(mostVisitedData.posts)
          } else {
            setMostVisitedPosts(mostVisitedData.posts || mostVisitedData || [])
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/<[^>]*>/g, '')
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText
  }

  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const PostCard = ({ post }: { post: Post }) => (
    <Card className="service-card bg-black/40 border-blue-500/20 backdrop-blur-sm overflow-hidden group hover:border-blue-400/40 transition-colors">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {post.topic && (
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 text-xs">
                {post.topic.name}
              </Badge>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{formatViewCount(post.viewCount)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-3">
            {truncateContent(post.content)}
          </p>
        </div>
        
        <Link 
          href={`/blog/${post.slug || post.id}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          Đọc thêm
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className={`space-y-12 ${className || ""}`}>
        {/* Loading skeleton */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded animate-pulse" />
            <div className="w-32 h-6 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded animate-pulse" />
            <div className="w-40 h-6 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-16 ${className || ""}`}>
      {/* Newest Posts Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Bài Viết Mới Nhất</h3>
          </div>
          <Link 
            href="/blog" 
            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors"
          >
            Xem tất cả
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {newestPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newestPosts.map((post) => (
              <PostCard key={`newest-${post.id}`} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Chưa có bài viết nào</p>
          </div>
        )}
      </div>

      {/* Most Visited Posts Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Bài Viết Xem Nhiều Nhất</h3>
          </div>
          <Link 
            href="/blog" 
            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors"
          >
            Xem tất cả
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {mostVisitedPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mostVisitedPosts.map((post) => (
              <PostCard key={`most-visited-${post.id}`} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Chưa có bài viết nào</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link 
          href="/blog"
          className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Khám Phá Thêm Bài Viết
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}