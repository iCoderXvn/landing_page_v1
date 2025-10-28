'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BinaryRain } from "@/components/binary-rain"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { SiteSettings } from "@/lib/settings";
import {
  MessageSquare,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Custom Telegram and Zalo icons as SVG components
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

const ZaloIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.256-.408-.447-.692-.554-.284-.107-.59-.107-.874 0-.284.107-.523.298-.692.554l-1.405 2.134-1.405-2.134c-.169-.256-.408-.447-.692-.554-.284-.107-.59-.107-.874 0-.284.107-.523.298-.692.554-.169.256-.169.576 0 .832l2.097 3.201v3.674c0 .332.132.65.367.884.234.235.553.367.885.367.332 0 .65-.132.885-.367.234-.235.367-.552.367-.884v-3.674l2.097-3.201c.169-.256.169-.576 0-.832z"/>
  </svg>
)

interface ContactClientProps {
  settings: SiteSettings;
}

export function ContactClient({ settings }: ContactClientProps) {
  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      <main className="flex-1 relative z-10 py-20 pt-32" role="main">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              Liên Hệ Chuyên Gia
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none mb-6">
              <span className="gradient-text">Bắt Đầu Dự Án</span>
              <br />
              <span className="text-white">Của Bạn Ngay Hôm Nay</span>
            </h1>
            <p className="max-w-[700px] mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              Chọn phương thức liên hệ phù hợp để thảo luận về dự án tự động hóa của bạn. 
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn miễn phí 24/7.
            </p>
          </section>

          {/* Contact Methods */}
          <section className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 mb-16">
            {/* Telegram */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 animate-float">
                    <TelegramIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Telegram</h3>
                  <p className="text-gray-400 mb-4">Trò chuyện trực tiếp và nhận phản hồi nhanh chóng</p>
                  <p className="text-sm text-blue-400 mb-6">Phản hồi trong vòng 5 phút</p>
                </div>
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined') {
                        window.open('https://t.me/iCoderXvn', '_blank', 'noopener,noreferrer');
                      }
                    } catch (error) {
                      console.error('Failed to open Telegram:', error);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Chat Ngay
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>

            {/* Facebook */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 animate-float animation-delay-1">
                    <Facebook className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Facebook</h3>
                  <p className="text-gray-400 mb-4">Kết nối qua Messenger để trao đổi chi tiết</p>
                  <p className="text-sm text-blue-400 mb-6">Hỗ trợ 24/7</p>
                </div>
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined') {
                        window.open('https://www.facebook.com/iCoderX', '_blank', 'noopener,noreferrer');
                      }
                    } catch (error) {
                      console.error('Failed to open Facebook:', error);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Nhắn Tin
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>

            {/* Zalo */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 animate-float animation-delay-2">
                    <ZaloIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Zalo</h3>
                  <p className="text-gray-400 mb-4">Liên hệ qua Zalo cho khách hàng Việt Nam</p>
                  <p className="text-sm text-blue-400 mb-6">Tư vấn miễn phí</p>
                </div>
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined') {
                        window.open('https://zalo.me/0123456789', '_blank', 'noopener,noreferrer');
                      }
                    } catch (error) {
                      console.error('Failed to open Zalo:', error);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Liên Hệ
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </section>

          {/* Business Info */}
          <section className="grid gap-8 md:grid-cols-2 mb-16">
            {/* Contact Information */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Thông Tin Liên Hệ</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <p className="text-gray-400">{settings.contactEmail}</p>
                      <p className="text-sm text-gray-500 mt-1">Phản hồi trong 24h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Phone className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Hotline</h3>
                      <p className="text-gray-400">{settings.hotline}</p>
                      <p className="text-sm text-gray-500 mt-1">Hỗ trợ 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Giờ Làm Việc</h3>
                      <p className="text-gray-400">Thứ 2 - Chủ Nhật</p>
                      <p className="text-sm text-gray-500 mt-1">8:00 AM - 10:00 PM (GMT+7)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Địa Chỉ</h3>
                      <p className="text-gray-400">Hà Nội, Việt Nam</p>
                      <p className="text-sm text-gray-500 mt-1">Làm việc từ xa toàn cầu</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Tại Sao Chọn {settings.siteName}?</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Chuyên Nghiệp & Uy Tín</h3>
                      <p className="text-gray-400 text-sm">Hơn 5 năm kinh nghiệm trong lĩnh vực tự động hóa và bot trading</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Giải Pháp Tùy Chỉnh</h3>
                      <p className="text-gray-400 text-sm">Phát triển theo yêu cầu riêng, phù hợp với mọi quy mô dự án</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Hỗ Trợ 24/7</h3>
                      <p className="text-gray-400 text-sm">Đội ngũ kỹ thuật sẵn sàng hỗ trợ bất cứ lúc nào bạn cần</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Bảo Mật Tối Đa</h3>
                      <p className="text-gray-400 text-sm">Cam kết bảo mật thông tin và mã nguồn tuyệt đối</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Giá Cả Cạnh Tranh</h3>
                      <p className="text-gray-400 text-sm">Báo giá minh bạch, linh hoạt theo từng giai đoạn dự án</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="cyber-border bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/favicon.ico"
                      alt="iCoderX"
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-blue-500/50"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Sẵn Sàng Bắt Đầu Dự Án?
                  </h2>
                  <p className="text-gray-300 mb-8 text-lg">
                    Hãy để chúng tôi giúp bạn biến ý tưởng thành hiện thực. 
                    Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="cyber-button text-black font-semibold"
                      onClick={() => {
                        try {
                          if (typeof window !== 'undefined') {
                            window.open('https://t.me/iCoderXvn', '_blank', 'noopener,noreferrer');
                          }
                        } catch (error) {
                          console.error('Failed to open Telegram:', error);
                        }
                      }}
                    >
                      <TelegramIcon className="w-5 h-5 mr-2" />
                      Chat Telegram
                    </Button>
                    <Link href="/blog">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                      >
                        Xem Blog
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
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
