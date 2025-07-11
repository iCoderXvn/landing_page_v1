"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BinaryRain } from "@/components/binary-rain";
import { Filter, Zap, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsResponse, topicsResponse] = await Promise.all([
        fetch('/api/blog'),
        fetch('/api/topics')
      ]);
      
      const postsData = await postsResponse.json();
      const topicsData = await topicsResponse.json();
      
      if (postsData.posts) {
        setPosts(postsData.posts);
      }
      if (topicsData.topics) {
        setTopics(topicsData.topics);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (selectedTopic === "all") return true;
    if (selectedTopic === "no-topic") return !post.topicId;
    return post.topicId === parseInt(selectedTopic);
  });

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

  const getExcerpt = (content: string, maxLength: number = 200) => {
    const plainText = content.replace(/[#*>\-`]/g, '').replace(/\n/g, ' ');
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

      {/* Header matching home page style */}
      <header className="fixed top-0 z-50 w-full border-b border-blue-500/20 bg-black/80 backdrop-blur-md" role="banner">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/favicon.ico"
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
        {/* Overall gradient background for main content */}
        <div className="gradient-bg-overlay" />
        
        {/* Hero Section with gradient background */}
        <section className="w-full py-20 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
              <div className="space-y-6 animate-slide-in-up">
                <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Blog & Tin Tức
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  <span className="gradient-text">Khám Phá Kiến Thức.</span>
                  <br />
                  <span className="text-gray-300">Chia Sẻ Kinh Nghiệm.</span>
                </h1>
                <p className="mx-auto max-w-2xl text-gray-400 md:text-xl leading-relaxed">
                  Cập nhật những xu hướng mới nhất trong công nghệ tự động hóa, 
                  chia sẻ kiến thức và kinh nghiệm thực tế từ các chuyên gia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-6 pb-20 relative z-10">
          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Bài Viết Mới Nhất</h2>
                <p className="text-gray-400">
                  {filteredPosts.length} bài viết
                  {selectedTopic !== "all" && (
                    <span>
                      {" "}• Lọc theo: {
                        selectedTopic === "no-topic" 
                          ? "Không có chủ đề" 
                          : topics.find(t => t.id.toString() === selectedTopic)?.name
                      }
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            {/* Topic Filter Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-4 h-4 text-gray-400 mr-2" />
              
              {/* All posts button */}
              <Button
                variant={selectedTopic === "all" ? "default" : "outline"}
                onClick={() => setSelectedTopic("all")}
                className={`
                  ${selectedTopic === "all" 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0' 
                    : 'bg-gray-800/80 border-gray-600 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                  }
                  transition-all duration-200 font-medium
                `}
              >
                Tất cả ({posts.length})
              </Button>

              {/* No topic button */}
              <Button
                variant={selectedTopic === "no-topic" ? "default" : "outline"}
                onClick={() => setSelectedTopic("no-topic")}
                className={`
                  ${selectedTopic === "no-topic" 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white border-0' 
                    : 'bg-gray-800/80 border-gray-600 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                  }
                  transition-all duration-200 font-medium
                `}
              >
                Không chủ đề ({posts.filter(post => !post.topicId).length})
              </Button>

              {/* Topic buttons */}
              {topics.map((topic) => (
                <Button
                  key={topic.id}
                  variant={selectedTopic === topic.id.toString() ? "default" : "outline"}
                  onClick={() => setSelectedTopic(topic.id.toString())}
                  className={`
                    ${selectedTopic === topic.id.toString() 
                      ? `${getTopicColor(topic.id)} text-white border-0 shadow-lg` 
                      : 'bg-gray-800/80 border-gray-600 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                    }
                    transition-all duration-200 font-medium hover:scale-105
                  `}
                >
                  {topic.name} ({posts.filter(post => post.topicId === topic.id).length})
                </Button>
              ))}
            </div>
          </div>

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
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 bg-gray-900/90 backdrop-blur-sm border-gray-700 service-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2 hover:text-blue-400 transition-colors text-white">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-500/20">
                          Đã xuất bản
                        </Badge>
                        {post.topic && (
                          <Badge 
                            variant="outline" 
                            className={`
                              ${getTopicColor(post.topic.id)} 
                              text-white border-0 shadow-md hover:shadow-lg transition-all duration-200
                            `}
                            onClick={() => setSelectedTopic(post.topic!.id.toString())}
                          >
                            {post.topic.name}
                          </Badge>
                        )}
                        {!post.topic && (
                          <Badge 
                            variant="outline" 
                            className="bg-gray-800/50 text-gray-400 border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                            onClick={() => setSelectedTopic("no-topic")}
                          >
                            Không có chủ đề
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {getExcerpt(post.content)}
                  </p>
                  <Link href={`/blog/${post.id}`}>
                    <Button className="cyber-button text-black font-semibold group">
                      Đọc tiếp →
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p>© 2025 iCoderX Blog. Tất cả quyền được bảo lưu.</p>
        </div>
        </div>
      </main>
    </div>
  );
}
