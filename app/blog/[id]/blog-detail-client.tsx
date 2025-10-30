"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BinaryRain } from "@/components/binary-rain";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { VideoPlayer, isVideoUrl } from "@/components/video-player";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/settings";
import { 
  ArrowLeft, 
  Share2, 
  Facebook, 
  Twitter, 
  Copy, 
  Check,
  TrendingUp,
  Clock,
  Eye,
  ChevronRight,
  Mail,
  MessageCircle
} from "lucide-react";

// Telegram icon as SVG component
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

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
  slug: string;
  viewCount: number;
  createdAt: Date;
  isPublished: boolean;
  topicId: number | null;
  topic?: Topic;
  excerpt?: string;
  metaDescription?: string;
  keywords?: string;
  featuredImage?: string;
  scheduledAt?: Date | null;
  updatedAt?: Date;
}

interface BlogDetailClientProps {
  settings: SiteSettings;
  postId: string;
}

export function BlogDetailClient({ settings, postId }: BlogDetailClientProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contentHtml, setContentHtml] = useState<string>('');
  const [tocItems, setTocItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [newestPosts, setNewestPosts] = useState<Post[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prevContentRef = useRef<string>('');

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
      fetchPopularPosts();
      fetchNewestPosts();
    }
  }, [postId]);

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
        if (data.post?.content) {
          setContentHtml(renderContent(data.post.content));
        }
        if (data.post?.topicId) {
          fetchRelatedPosts(data.post.topicId, data.post.id);
        }
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

  const fetchRelatedPosts = async (topicId: number, currentPostId: number) => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        const related = data.posts
          .filter((p: Post) => p.topicId === topicId && p.id !== currentPostId)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const fetchPopularPosts = async () => {
    try {
      const response = await fetch('/api/blog?category=most-visited&limit=5');
      if (response.ok) {
        const data = await response.json();
        setPopularPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching popular posts:', error);
    }
  };

  const fetchNewestPosts = async () => {
    try {
      const response = await fetch('/api/blog?category=newest&limit=5');
      if (response.ok) {
        const data = await response.json();
        setNewestPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching newest posts:', error);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const renderContent = (content: string) => {
    let processedContent = content;
    let videoCounter = 0;

    processedContent = processedContent.replace(
      /!\[video\]\(([^)]+)\s*(?:"([^"]*)")?\)/g, 
      (match, url, title) => {
        if (isVideoUrl(url)) {
          const videoId = `video-${videoCounter++}`;
          return `<div id="${videoId}" data-video-url="${url}" data-video-title="${title || ''}" class="video-embed my-6"></div>`;
        }
        return match;
      }
    );

    processedContent = processedContent.replace(
      /!\[([^\]]*)\]\(([^)]+)\s*(?:"([^"]*)")?\)/g,
      (match, altText, url, title) => {
        if (isVideoUrl(url)) {
          const videoId = `video-${videoCounter++}`;
          return `<div id="${videoId}" data-video-url="${url}" data-video-title="${title || altText || ''}" class="video-embed my-6"></div>`;
        }
        return `<img src="${url}" alt="${altText}" title="${title || ''}" class="max-w-full h-auto rounded-lg border border-gray-700 my-6 mx-auto block" />`;
      }
    );

    const headingCounts: Record<string, number> = {};
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

    return processedContent
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm font-mono text-green-300 whitespace-pre-wrap">$2</code></pre>')
      .replace(/```\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm font-mono text-green-300 whitespace-pre-wrap">$1</code></pre>')
      .replace(/\[([^\]]+)\]\(([^)]+)\s+"([^"]+)"\)/g, '<a href="$2" title="$3" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">$1</a>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-blue-300 italic">$1</em>')
      .replace(/^# (.*$)/gim, (m, p1) => {
        const base = slugify(p1);
        const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
        const id = `${base}${count > 1 ? `-${count}` : ''}`;
        return `<h1 id="${id}" class="text-3xl font-bold mb-6 text-white">${p1}</h1>`;
      })
      .replace(/^## (.*$)/gim, (m, p1) => {
        const base = slugify(p1);
        const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
        const id = `${base}${count > 1 ? `-${count}` : ''}`;
        return `<h2 id="${id}" class="text-2xl font-semibold mb-4 text-gray-100">${p1}</h2>`;
      })
      .replace(/^### (.*$)/gim, (m, p1) => {
        const base = slugify(p1);
        const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
        const id = `${base}${count > 1 ? `-${count}` : ''}`;
        return `<h3 id="${id}" class="text-xl font-medium mb-3 text-gray-200">${p1}</h3>`;
      })
      .replace(/^#### (.*$)/gim, (m, p1) => {
        const base = slugify(p1);
        const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
        const id = `${base}${count > 1 ? `-${count}` : ''}`;
        return `<h4 id="${id}" class="text-lg font-medium mb-2 text-gray-300">${p1}</h4>`;
      })
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-500/10 italic text-blue-200 rounded-r">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 text-gray-300">$1</li>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-300 border border-gray-700">$1</code>')
      .replace(/\n/g, '<br>');
  };

  useEffect(() => {
    if (!contentHtml || typeof window === 'undefined') return;

    const container = contentRef.current;
    if (!container) return;

    if (prevContentRef.current !== contentHtml) {
      container.innerHTML = contentHtml;
      prevContentRef.current = contentHtml;
    }

    const videoContainers = Array.from(container.querySelectorAll('.video-embed')) as HTMLElement[];
    videoContainers.forEach((c) => {
      if (c.getAttribute('data-react-mounted') === '1') return;

      const url = c.getAttribute('data-video-url');
      const title = c.getAttribute('data-video-title');

      if (url) {
        import('react-dom/client')
          .then(({ createRoot }) => {
            const root = createRoot(c);
            root.render(React.createElement(VideoPlayer, {
              src: url,
              title: title || undefined,
              className: "w-full"
            }));
            c.setAttribute('data-react-mounted', '1');
          })
          .catch(console.error);
      }
    });

    const headings = Array.from(container.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')) as HTMLElement[];
    const toc = headings.map((h) => ({ id: h.id, text: h.textContent || '', level: parseInt(h.tagName.replace('H', ''), 10) }));
    setTocItems(toc);
  }, [contentHtml]);

  useEffect(() => {
    if (post && post.content && !contentHtml) {
      setContentHtml(renderContent(post.content));
    }
  }, [post, contentHtml]);

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
      <Header siteName={settings.siteName} />
      {post && <AnalyticsTracker postId={post.id} />}

      {/* Breadcrumbs */}
      <div className="relative z-10 pt-20 bg-black/80 border-b border-blue-500/20">
        <BreadcrumbSchema
          items={[
            { name: 'Blog', href: '/blog' },
            { name: post.title, href: `/blog/${post.slug || post.id}` }
          ]}
        />
      </div>

      <main className="flex-1 relative z-10 pt-8" role="main">
        <div className="gradient-bg-overlay" />

        <div className="container mx-auto px-4 md:px-6 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <article className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/20">
                {post.featuredImage && (
                  <div className="w-full h-64 md:h-96 relative overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="px-8 py-8 border-b border-gray-700">
                  <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                    {post.title}
                  </h1>
                  
                  {post.excerpt && (
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed italic border-l-4 border-blue-500 pl-4 bg-blue-500/10 py-3 rounded-r">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    {post.viewCount > 0 && (
                      <span className="flex items-center gap-1 text-sm text-blue-400">
                        <Eye className="w-4 h-4" />
                        {post.viewCount.toLocaleString()} lượt xem
                      </span>
                    )}
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-500/20">
                      Đã xuất bản
                    </Badge>
                    {post.topic && (
                      <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 border-blue-500/30">
                        {post.topic.name}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Chia sẻ:
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('facebook')}
                        className="bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20"
                      >
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('twitter')}
                        className="bg-sky-600/10 border-sky-500/30 text-sky-400 hover:bg-sky-600/20"
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('telegram')}
                        className="bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('copy')}
                        className="bg-gray-600/10 border-gray-500/30 text-gray-300 hover:bg-gray-600/20"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-8">
                  <div
                    ref={contentRef}
                    className="prose prose-lg max-w-none text-gray-300 leading-relaxed prose-invert"
                  />
                </div>

                <div className="px-8 py-6 border-t border-gray-700 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/favicon.ico"
                      alt="iCoderX Author"
                      width={64}
                      height={64}
                      className="rounded-full border-2 border-blue-500/50"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">iCoderX Team</h3>
                      <p className="text-gray-400 mb-4">
                        Đội ngũ chuyên gia về tự động hóa, bot trading và phát triển phần mềm. 
                        Chúng tôi chia sẻ kiến thức và kinh nghiệm thực tế trong lĩnh vực công nghệ.
                      </p>
                      <div className="flex gap-3">
                        <Link href="/#contact">
                          <Button size="sm" className="cyber-button text-black font-semibold">
                            <Mail className="w-4 h-4 mr-2" />
                            Liên Hệ Tư Vấn
                          </Button>
                        </Link>
                        <Link href="https://t.me/iCoderXvn" target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Telegram
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {relatedPosts.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <ChevronRight className="w-6 h-6 text-blue-400" />
                    Bài Viết Liên Quan
                  </h2>
                  <div className="grid gap-6 md:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                        <Card className="h-full bg-gray-900/90 backdrop-blur-sm border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer group">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(relatedPost.createdAt).toLocaleDateString('vi-VN')}
                              </span>
                              {relatedPost.viewCount > 0 && (
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {relatedPost.viewCount}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {tocItems.length > 0 && (
                  <Card className="bg-gradient-to-br from-gray-900/95 via-purple-900/10 to-blue-900/10 backdrop-blur-sm border-gray-700 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700/50">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-white">Mục Lục</h4>
                      </div>
                      <nav className="space-y-1.5 text-sm">
                        {tocItems.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`block px-3 py-2 rounded-lg text-gray-300 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-200 border-l-2 border-transparent hover:border-purple-400`}
                            style={{ marginLeft: `${Math.max(0, (item.level - 1) * 12)}px` }}
                          >
                            {item.text}
                          </a>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                )}

                {popularPosts.length > 0 && (
                  <Card className="bg-gradient-to-br from-gray-900/95 via-yellow-900/10 to-orange-900/10 backdrop-blur-sm border-gray-700 hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-700/50">
                        <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg animate-pulse">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Bài Viết Hot
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {popularPosts.map((popularPost, index) => (
                          <Link key={popularPost.id} href={`/blog/${popularPost.slug}`}>
                            <div className="group cursor-pointer">
                              <div className="flex gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-600/10 hover:to-orange-600/10 transition-all duration-200 border border-transparent hover:border-yellow-500/30">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-orange-500/30 transition-all duration-200 border border-yellow-500/20 group-hover:border-yellow-500/40">
                                    <span className="text-lg font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                                      {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 mb-2">
                                    {popularPost.title}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Eye className="w-3 h-3 text-yellow-400" />
                                    <span className="text-yellow-400 font-medium">{popularPost.viewCount.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              {index < popularPosts.length - 1 && (
                                <div className="mt-3 border-t border-gray-700/50" />
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border-blue-500/40 hover:border-blue-400/60 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4 shadow-lg shadow-blue-500/50 animate-bounce">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                        Cần Tư Vấn Dự Án?
                      </h3>
                      <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                        Liên hệ với chúng tôi để được tư vấn miễn phí về giải pháp tự động hóa cho doanh nghiệp của bạn.
                      </p>
                      <Link href="/contact">
                        <Button className="w-full cyber-button text-black font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                          <Mail className="w-4 h-4 mr-2" />
                          Liên Hệ Ngay
                        </Button>
                      </Link>
                      <div className="mt-5 pt-5 border-t border-gray-600/50">
                        <p className="text-xs text-gray-400 mb-3 font-medium">Hoặc chat trực tiếp:</p>
                        <Link href="https://t.me/iCoderXvn" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full border-blue-500/50 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 group">
                            <MessageCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                            Telegram: @iCoderXvn
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900/95 via-blue-900/10 to-purple-900/10 backdrop-blur-sm border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        Dịch Vụ Của Chúng Tôi
                      </h3>
                    </div>
                    <div className="space-y-2.5">
                      <Link href="/#services" className="group flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-500/10 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-blue-300 transition-colors text-sm font-medium">
                          Bot Trading & Crypto
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 ml-auto transition-all group-hover:translate-x-1" />
                      </Link>
                      <Link href="/#services" className="group flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-500/10 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-purple-300 transition-colors text-sm font-medium">
                          Tự Động Hóa MMO
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 ml-auto transition-all group-hover:translate-x-1" />
                      </Link>
                      <Link href="/#services" className="group flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-green-500/10 border border-gray-700/50 hover:border-green-500/50 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-green-300 transition-colors text-sm font-medium">
                          Bot Telegram & Discord
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-green-400 ml-auto transition-all group-hover:translate-x-1" />
                      </Link>
                      <Link href="/#services" className="group flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-orange-500/10 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                          <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-orange-300 transition-colors text-sm font-medium">
                          Phần Mềm Tùy Chỉnh
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-orange-400 ml-auto transition-all group-hover:translate-x-1" />
                      </Link>
                      <Link href="/#services" className="group flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-pink-500/10 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                          <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-pink-300 transition-colors text-sm font-medium">
                          Giải Pháp SaaS
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 ml-auto transition-all group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {newestPosts.length > 0 && (
                  <Card className="bg-gradient-to-br from-gray-900/95 via-green-900/10 to-emerald-900/10 backdrop-blur-sm border-gray-700 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-700/50">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Bài Viết Mới Nhất
                        </h3>
                        <div className="ml-auto">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400 font-medium border border-green-500/30">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            New
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {newestPosts.map((newestPost, index) => (
                          <Link key={newestPost.id} href={`/blog/${newestPost.slug}`}>
                            <div className="group cursor-pointer">
                              <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-green-600/10 hover:to-emerald-600/10 transition-all duration-200 border border-transparent hover:border-green-500/30">
                                <div className="flex items-start gap-3 mb-3">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all">
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <h4 className="flex-1 text-sm font-semibold text-white group-hover:text-green-300 transition-colors line-clamp-2 leading-relaxed">
                                    {newestPost.title}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400 ml-11">
                                  <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded-md">
                                    <Clock className="w-3 h-3 text-green-400" />
                                    <span className="text-green-400 font-medium">
                                      {new Date(newestPost.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                  </span>
                                  {newestPost.viewCount > 0 && (
                                    <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded-md">
                                      <Eye className="w-3 h-3 text-blue-400" />
                                      <span className="text-blue-400 font-medium">
                                        {newestPost.viewCount.toLocaleString()}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>
                              {index < newestPosts.length - 1 && (
                                <div className="mt-4 border-t border-gray-700/50" />
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer 
        siteName={settings.siteName}
        siteDescription={settings.siteDescription}
        contactEmail={settings.contactEmail}
        facebookUrl={settings.facebookUrl}
        twitterUrl={settings.twitterUrl}
        youtubeUrl={settings.youtubeUrl}
        telegramUrl={settings.telegramUrl}
      />
    </div>
  );
}
