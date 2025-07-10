"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BinaryRain } from "@/components/binary-rain";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useParams } from "next/navigation";

interface Topic {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  isPublished: boolean;
  topicId: number | null;
  topic?: Topic;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string);
    }
  }, [params.id]);

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content: string) => {
    return content
      // Code blocks (must be processed before inline code)
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm font-mono text-green-300 whitespace-pre-wrap">$2</code></pre>')
      .replace(/```\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm font-mono text-green-300 whitespace-pre-wrap">$1</code></pre>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg border border-gray-700 my-6 mx-auto block" />')
      // Links with titles (for inline-links)
      .replace(/\[([^\]]+)\]\(([^)]+)\s+"([^"]+)"\)/g, '<a href="$2" title="$3" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">$1</a>')
      // Regular links (must be after titled links)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">$1</a>')
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em class="text-blue-300 italic">$1</em>')
      // Headings
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 text-white">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 text-gray-100">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-3 text-gray-200">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-medium mb-2 text-gray-300">$1</h4>')
      // Quotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-500/10 italic text-blue-200 rounded-r">$1</blockquote>')
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 text-gray-300">$1</li>')
      // Inline code (must be after code blocks)
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-300 border border-gray-700">$1</code>')
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
        <BinaryRain />
        <div className="gradient-bg-overlay" />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Đang tải bài viết...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
        <BinaryRain />
        <div className="gradient-bg-overlay" />
        <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
          <Card className="text-center py-12 bg-gray-900/90 backdrop-blur-sm border-gray-700">
            <CardContent>
              <h1 className="text-2xl font-bold text-white mb-4">Không tìm thấy bài viết</h1>
              <p className="text-gray-400 mb-6">Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
              <Link href="/blog">
                <Button className="cyber-button text-black font-semibold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại Blog
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />

      {/* Header matching home page style */}
      <header className="fixed top-0 z-50 w-full border-b border-blue-500/20 bg-black/80 backdrop-blur-md" role="banner">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="iCoderX Logo - Blog"
              width={40}
              height={40}
              className="rounded-lg animate-float"
              priority
            />
            <span className="text-2xl font-bold gradient-text">iCoderX</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium" role="navigation">
            <Link href="/#home" className="text-gray-300 hover:text-blue-400 transition-colors">
              Trang Chủ
            </Link>
            <Link href="/#services" className="text-gray-300 hover:text-blue-400 transition-colors">
              Dịch Vụ
            </Link>
            <Link href="/#solutions" className="text-gray-300 hover:text-blue-400 transition-colors">
              Giải Pháp
            </Link>
            <Link href="/#clients" className="text-gray-300 hover:text-blue-400 transition-colors">
              Khách Hàng
            </Link>
            <Link href="/blog" className="text-blue-400 font-semibold">
              Blog
            </Link>
            <Link href="/#contact" className="text-gray-300 hover:text-blue-400 transition-colors">
              Liên Hệ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:inline-flex cyber-button text-black font-semibold px-6 items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10">
              Báo Giá Miễn Phí
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-blue-500/20 bg-black/95 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4" role="navigation">
              <Link 
                href="/#home" 
                className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang Chủ
              </Link>
              <Link 
                href="/#services" 
                className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dịch Vụ
              </Link>
              <Link 
                href="/#solutions" 
                className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Giải Pháp
              </Link>
              <Link 
                href="/#clients" 
                className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Khách Hàng
              </Link>
              <Link 
                href="/blog" 
                className="text-blue-400 font-semibold py-2 px-2 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/#contact" 
                className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên Hệ
              </Link>
              <Link 
                href="/contact" 
                className="cyber-button text-black font-semibold px-6 py-3 rounded-md text-sm transition-colors mt-4 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Báo Giá Miễn Phí
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 relative z-10 pt-16" role="main">
        {/* Gradient background section */}
        <div className="gradient-bg-overlay" />
        
        {/* Back to blog button */}
        <div className="container mx-auto px-4 md:px-6 pt-8 relative z-10">
          <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Quay lại Blog
          </Link>
        </div>

        {/* Post Content */}
        <div className="container mx-auto px-4 md:px-6 pb-20 relative z-10">
          <article className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {/* Post Header */}
            <div className="px-8 py-8 border-b border-gray-700">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-400 flex-wrap">
                <span className="flex items-center gap-1 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Xuất bản {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-500/20">
                  Đã xuất bản
                </Badge>
                {post.topic && (
                  <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 border-blue-500/30">
                    {post.topic.name}
                  </Badge>
                )}
                {!post.topic && (
                  <Badge variant="outline" className="bg-gray-800/50 text-gray-400 border-gray-600">
                    Không có chủ đề
                  </Badge>
                )}
              </div>
            </div>

            {/* Post Body */}
            <div className="px-8 py-8">
              <div 
                className="prose prose-lg max-w-none text-gray-300 leading-relaxed prose-invert"
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
              />
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline" className="bg-gray-900/90 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all group">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Quay lại tất cả bài viết
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-gray-500">
            <p>© 2025 iCoderX Blog. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
