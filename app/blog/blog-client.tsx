"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BinaryRain } from "@/components/binary-rain";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbBar } from "@/components/breadcrumb-bar";
import { isVideoUrl } from "@/components/video-player";
import { Zap, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/settings";
import { formatDateWithTimezone, useTimezone } from "@/lib/timezone-utils";

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
  featuredImage?: string;
}

interface BlogPageClientProps {
  settings: SiteSettings;
}

export function BlogPageClient({ settings }: BlogPageClientProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newestPosts, setNewestPosts] = useState<Post[]>([]);
  const [mostVisitedPosts, setMostVisitedPosts] = useState<Post[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // all, newest, most-visited
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get timezone from admin settings
  const timezone = useTimezone();

  // Generate consistent random colors for topics
  const getTopicColor = (topicId: number) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-green-500 to-emerald-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-yellow-500 to-orange-500',
      'bg-gradient-to-r from-teal-500 to-cyan-500',
      'bg-gradient-to-r from-pink-500 to-rose-500',
      'bg-gradient-to-r from-violet-500 to-purple-500',
      'bg-gradient-to-r from-emerald-500 to-teal-500'
    ];
    
    return colors[topicId % colors.length];
  };

  // Get hover background and shadow color for each topic
  const getTopicHoverClasses = (topicId: number) => {
    const hoverClasses = [
      'hover:bg-blue-500/20 hover:shadow-blue-500/50',
      'hover:bg-purple-500/20 hover:shadow-purple-500/50',
      'hover:bg-green-500/20 hover:shadow-green-500/50',
      'hover:bg-orange-500/20 hover:shadow-orange-500/50',
      'hover:bg-indigo-500/20 hover:shadow-indigo-500/50',
      'hover:bg-yellow-500/20 hover:shadow-yellow-500/50',
      'hover:bg-teal-500/20 hover:shadow-teal-500/50',
      'hover:bg-pink-500/20 hover:shadow-pink-500/50',
      'hover:bg-violet-500/20 hover:shadow-violet-500/50',
      'hover:bg-emerald-500/20 hover:shadow-emerald-500/50'
    ];
    
    return hoverClasses[topicId % hoverClasses.length];
  };

  useEffect(() => {
    fetchData();
    
    // Add focus listener to refresh when user comes back to the tab
    const handleFocus = () => {
      fetchData();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Set up periodic refresh every 30 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);
    
    // Cleanup
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
  };

  const fetchData = async () => {
    try {
      // Add timestamp to prevent browser caching
      const timestamp = Date.now();
      const [allPostsResponse, newestResponse, mostVisitedResponse, topicsResponse] = await Promise.all([
        fetch(`/api/blog?_t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        }),
        fetch(`/api/blog?category=newest&limit=6&_t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        }),
        fetch(`/api/blog?category=most-visited&limit=6&_t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        }),
        fetch(`/api/topics?_t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
      ]);
      
      const allPostsData = await allPostsResponse.json();
      const newestData = await newestResponse.json();
      const mostVisitedData = await mostVisitedResponse.json();
      const topicsData = await topicsResponse.json();
      
      if (allPostsData.posts) {
        setPosts(allPostsData.posts);
      }
      if (newestData.posts) {
        setNewestPosts(newestData.posts);
      }
      if (mostVisitedData.posts) {
        setMostVisitedPosts(mostVisitedData.posts);
      }
      if (topicsData.topics) {
        setTopics(topicsData.topics);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getCurrentPosts = () => {
    let currentPosts;
    
    switch (selectedCategory) {
      case 'newest':
        currentPosts = newestPosts;
        break;
      case 'most-visited':
        currentPosts = mostVisitedPosts;
        break;
      default:
        currentPosts = posts;
        break;
    }
    
    // Apply topic filter only when a specific topic is selected
    if (selectedTopic !== "all") {
      return currentPosts.filter(post => {
        if (selectedTopic === "no-topic") return !post.topicId;
        return post.topicId === parseInt(selectedTopic);
      });
    }
    
    return currentPosts;
  };

  const filteredPosts = getCurrentPosts();

  // Group posts by topic for display in sections
  const groupPostsByTopic = (posts: Post[]) => {
    const phanMemTopic = topics.find(t => t.name === "Phần Mềm");
    const otherTopics = topics.filter(t => t.name !== "Phần Mềm");
    
    const grouped: { [key: string]: { topic: Topic | null; posts: Post[] } } = {};
    
    // Group Phần Mềm posts first
    if (phanMemTopic) {
      grouped[`topic-${phanMemTopic.id}`] = {
        topic: phanMemTopic,
        posts: posts.filter(p => p.topicId === phanMemTopic.id).slice(0, 6) // Show up to 6 posts
      };
    }
    
    // Group other topics
    otherTopics.forEach(topic => {
      const topicPosts = posts.filter(p => p.topicId === topic.id).slice(0, 3); // Show up to 3 posts for other topics
      if (topicPosts.length > 0) {
        grouped[`topic-${topic.id}`] = {
          topic,
          posts: topicPosts
        };
      }
    });
    
    // Group posts without topic
    const noTopicPosts = posts.filter(p => !p.topicId).slice(0, 3);
    if (noTopicPosts.length > 0) {
      grouped['no-topic'] = {
        topic: null,
        posts: noTopicPosts
      };
    }
    
    return grouped;
  };

  const renderContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-blue-300">$1</em>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-white">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 text-gray-200">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2 text-gray-300">$1</h3>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-blue-200 my-4">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1 text-gray-300">$1</li>')
      .replace(/\n/g, '<br>');
  };

  const hasVideo = (content: string) => {
    // Check for video markdown syntax or video URLs
    const videoRegex = /!\[video\]\(([^)]+)\)|!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = videoRegex.exec(content)) !== null) {
      const url = match[1] || match[3];
      if (url && isVideoUrl(url)) {
        return true;
      }
    }
    return false;
  };

  const getFirstMedia = (content: string): { url: string; type: 'image' | 'video' } | null => {
    // Try to find first image or video in markdown
    const mediaRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const match = mediaRegex.exec(content);
    
    if (match) {
      const url = match[2];
      if (isVideoUrl(url)) {
        return { url, type: 'video' };
      }
      return { url, type: 'image' };
    }
    return null;
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    // Remove markdown and get plain text
    const plainText = content
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '') // Remove images/videos
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Keep link text only
      .replace(/[#*>\-`]/g, '')
      .replace(/\n/g, ' ')
      .trim();
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
        <BinaryRain />
        <div className="gradient-bg-overlay" />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumbs with Ticker - Fixed */}
      <BreadcrumbBar
        items={[
          { name: 'Trang Chủ', href: '/' },
          { name: 'Blog', href: '/blog' }
        ]}
      />

      {/* Category navigation pills - below breadcrumb bar */}
      <div className="sticky top-[95px] md:top-[100px] z-30 w-full border-b border-purple-500/30 bg-gradient-to-r from-purple-900/40 via-violet-900/40 to-purple-900/40 backdrop-blur-md shadow-lg mt-[95px] md:mt-[100px]">
        <div className="container mx-auto px-2 md:px-6">
          <div className="flex items-center justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2 pt-2 md:pb-3 md:pt-3">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTopic('all');
              }}
              className={`
                px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200
                ${selectedCategory === 'all' && selectedTopic === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-800/50'
                }
              `}
            >
              Tất Cả
            </button>

            <button
              onClick={() => {
                setSelectedCategory('newest');
                setSelectedTopic('all');
              }}
              className={`
                px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200
                ${selectedCategory === 'newest'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-800/50'
                }
              `}
            >
              Mới Nhất
            </button>

            <button
              onClick={() => {
                setSelectedCategory('most-visited');
                setSelectedTopic('all');
              }}
              className={`
                px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200
                ${selectedCategory === 'most-visited'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-800/50'
                }
              `}
            >
              Phổ Biến
            </button>

            {topics.length > 0 && (
              <>
                <div className="h-4 w-px bg-purple-500/40" />
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTopic(topic.id.toString());
                    }}
                    className={`
                      px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200
                      ${selectedTopic === topic.id.toString() 
                        ? `${getTopicColor(topic.id)} text-white shadow-lg` 
                        : `text-gray-300 hover:text-white ${getTopicHoverClasses(topic.id)} hover:shadow-md`
                      }
                    `}
                  >
                    {topic.name}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 relative z-10 pt-8" role="main">
        {/* Overall gradient background for main content */}
        <div className="gradient-bg-overlay" />

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-6 pb-20 relative z-10">
        {filteredPosts.length === 0 ? (
          <Card className="text-center py-12 bg-gray-900/90 backdrop-blur-sm border-gray-700">
            <CardContent>
              <p className="text-gray-400 text-lg">
                {selectedTopic === "all" 
                  ? "Chưa có bài viết nào." 
                  : "Không có bài viết nào thuộc chủ đề này."}
              </p>
              <p className="text-gray-500 mt-2">
                {selectedTopic === "all" 
                  ? "Hãy quay lại sau để xem nội dung mới!" 
                  : "Thử chọn chủ đề khác hoặc xem tất cả bài viết."}
              </p>
              {selectedTopic !== "all" && (
                <Button 
                  variant="outline" 
                  className="mt-4 border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  onClick={() => setSelectedTopic("all")}
                >
                  Xem tất cả bài viết
                </Button>
              )}
            </CardContent>
          </Card>
        ) : selectedTopic !== "all" ? (
          // Show filtered posts for specific topic (existing layout)
          <div className="space-y-8">
            {/* Hero Post - Large Featured Article */}
            {filteredPosts.length > 0 && (
              <Link href={`/blog/${filteredPosts[0].slug || filteredPosts[0].id}`}>
                <article className="group cursor-pointer mb-12">
                  <div className="grid md:grid-cols-5 gap-6 bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300">
                    {/* Image/Video Preview */}
                    <div className="md:col-span-3 relative h-64 md:h-[400px] bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
                      {filteredPosts[0].featuredImage && filteredPosts[0].featuredImage.trim() !== '' ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={filteredPosts[0].featuredImage}
                            alt={filteredPosts[0].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              console.error('Failed to load image:', filteredPosts[0].featuredImage);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <Zap className="w-20 h-20 text-gray-700" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-wider">
                          Nổi Bật
                        </span>
                        {filteredPosts[0].topic && (
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getTopicColor(filteredPosts[0].topic.id)}`}>
                            {filteredPosts[0].topic.name}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                        {filteredPosts[0].title}
                      </h2>
                      
                      <p className="text-gray-400 text-lg mb-6 leading-relaxed line-clamp-3">
                        {filteredPosts[0].excerpt || getExcerpt(filteredPosts[0].content, 200)}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <time dateTime={new Date(filteredPosts[0].createdAt).toISOString()}>
                          {formatDateWithTimezone(filteredPosts[0].createdAt, timezone)}
                        </time>
                        {filteredPosts[0].viewCount > 0 && (
                          <>
                            <span>•</span>
                            <span>{filteredPosts[0].viewCount.toLocaleString()} lượt xem</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Grid of News Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug || post.id}`}
                  className="block h-full"
                >
                  <article className="group cursor-pointer h-full flex flex-col bg-gray-900/30 border border-gray-800/50 rounded-xl overflow-hidden hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300">
                    {/* Image/Video Preview */}
                    <div className="relative h-56 bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
                      {post.featuredImage && post.featuredImage.trim() !== '' ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              console.error('Failed to load image:', post.featuredImage);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <Zap className="w-16 h-16 text-gray-700" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      {post.topic && (
                        <span className={`inline-block w-fit px-3 py-1 rounded-full text-white text-xs font-medium mb-3 ${getTopicColor(post.topic.id)}`}>
                          {post.topic.name}
                        </span>
                      )}

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt || getExcerpt(post.content, 120)}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-800/50">
                        <time dateTime={new Date(post.createdAt).toISOString()}>
                          {formatDateWithTimezone(post.createdAt, timezone)}
                        </time>
                        {post.viewCount > 0 && (
                          <>
                            <span>•</span>
                            <span>{post.viewCount.toLocaleString()} lượt xem</span>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Show posts grouped by topics when viewing All/Newest/Popular
          <div className="space-y-16">
            {(() => {
              const groupedPosts = groupPostsByTopic(filteredPosts);
              const phanMemTopic = topics.find(t => t.name === "Phần Mềm");
              
              return Object.entries(groupedPosts).map(([key, { topic, posts }]) => {
                const isPhanMem = topic?.name === "Phần Mềm";
                
                return (
                  <section key={key} className="space-y-6">
                    {/* Topic Header */}
                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                      <div className="flex items-center gap-3">
                        {isPhanMem ? (
                          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            🔧 {topic?.name || "Khác"}
                          </h2>
                        ) : (
                          <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
                            {topic?.name || "Khác"}
                          </h2>
                        )}
                        <span className="text-sm text-gray-500">({posts.length})</span>
                      </div>
                      
                      {topic && (
                        <Link 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTopic(topic.id.toString());
                          }}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Xem tất cả →
                        </Link>
                      )}
                    </div>

                    {/* Posts Grid - Different layouts based on priority */}
                    {isPhanMem ? (
                      // Phần Mềm: Large featured layout with images
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                          <Link 
                            key={post.id} 
                            href={`/blog/${post.slug || post.id}`}
                            className="block h-full"
                          >
                            <article className="group cursor-pointer h-full flex flex-col bg-gray-900/40 border border-gray-800/50 rounded-xl overflow-hidden hover:border-blue-500/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                              {/* Image Preview */}
                              <div className="relative h-48 bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
                                {post.featuredImage && post.featuredImage.trim() !== '' ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={post.featuredImage}
                                      alt={post.title}
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                  </div>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                                    <Zap className="w-12 h-12 text-blue-500/50" />
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex flex-col flex-1 p-5">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                  {post.title}
                                </h3>

                                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                                  {post.excerpt || getExcerpt(post.content, 100)}
                                </p>

                                <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-800/50">
                                  <time dateTime={new Date(post.createdAt).toISOString()}>
                                    {formatDateWithTimezone(post.createdAt, timezone)}
                                  </time>
                                  {post.viewCount > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>{post.viewCount.toLocaleString()} views</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </article>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      // Other topics: Compact list layout, smaller or no images
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {posts.map((post) => (
                          <Link 
                            key={post.id} 
                            href={`/blog/${post.slug || post.id}`}
                            className="block"
                          >
                            <article className="group cursor-pointer flex gap-4 bg-gray-900/20 border border-gray-800/30 rounded-lg overflow-hidden hover:border-gray-700 hover:bg-gray-900/40 transition-all duration-300 p-4">
                              {/* Small thumbnail - optional */}
                              {post.featuredImage && post.featuredImage.trim() !== '' && (
                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                                  <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}

                              {/* Content */}
                              <div className="flex flex-col flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                  {post.title}
                                </h3>

                                <p className="text-gray-500 text-xs mb-2 leading-relaxed line-clamp-1">
                                  {post.excerpt || getExcerpt(post.content, 80)}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <time dateTime={new Date(post.createdAt).toISOString()}>
                                    {formatDateWithTimezone(post.createdAt, timezone)}
                                  </time>
                                  {post.viewCount > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>{post.viewCount.toLocaleString()}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </article>
                          </Link>
                        ))}
                      </div>
                    )}
                  </section>
                );
              });
            })()}
          </div>
        )}
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
