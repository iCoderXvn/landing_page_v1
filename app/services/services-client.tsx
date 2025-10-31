'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BinaryRain } from "@/components/binary-rain"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbBar } from "@/components/breadcrumb-bar"
import type { SiteSettings } from "@/lib/settings"
import {
  Bot,
  Gamepad2,
  MessageSquare,
  TrendingUp,
  Settings,
  Building,
  ArrowRight,
  Zap,
  Shield,
  Target,
  Users,
  Award,
  Cpu,
  Code,
  Smartphone,
  Globe,
  DollarSign,
  BarChart3,
  Lock,
  Clock,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ServicesClientProps {
  settings: SiteSettings
}

export function ServicesClient({ settings }: ServicesClientProps) {
  const services = [
    {
      id: "chat-bot",
      title: "Bot Chat & Chatbot",
      description: "Chatbot thông minh, quản lý cộng đồng và hệ thống tin nhắn tự động cho Telegram, Discord, Facebook",
      icon: MessageSquare,
      gradient: "from-green-500 to-green-600",
      features: [
        "Bot Telegram & Discord",
        "Chatbot AI thông minh",
        "Quản lý cộng đồng tự động",
        "Hệ thống lệnh tùy chỉnh",
        "Tích hợp API đa nền tảng",
        "Hỗ trợ đa ngôn ngữ"
      ],
      href: "/services/chat-bot",
      stats: { users: "10K+", uptime: "99.9%", response: "<5s" }
    },
    {
      id: "custom-software",
      title: "Phần Mềm Tùy Chỉnh",
      description: "Giải pháp phần mềm được thiết kế riêng cho web scraping, xử lý dữ liệu và tối ưu hóa quy trình",
      icon: Code,
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Web Scraping Tools",
        "Data Processing Systems",
        "Workflow Automation",
        "Desktop Applications",
        "Browser Extensions",
        "API Integration"
      ],
      href: "/services/custom-software",
      stats: { projects: "100+", languages: "10+", platforms: "5+" }
    },
    {
      id: "mmo-automation",
      title: "Tự Động Hóa MMO",
      description: "Tự động hóa game tiên tiến, bot nhân vật và công cụ nâng cao cho các trò chơi MMO phổ biến",
      icon: Gamepad2,
      gradient: "from-purple-500 to-purple-600",
      features: [
        "Character Automation",
        "Resource Farming",
        "Quest Completion",
        "PvP & PvE Support",
        "Multi-Account Management",
        "Anti-Detection Systems"
      ],
      href: "/services/mmo-automation",
      stats: { games: "20+", accounts: "1000+", hours: "40h/week" }
    },
    {
      id: "trading-bots",
      title: "Bot Giao Dịch Crypto",
      description: "Giao dịch thuật toán, tự động hóa DeFi và quản lý danh mục tiền điện tử với AI",
      icon: TrendingUp,
      gradient: "from-yellow-500 to-orange-500",
      features: [
        "Algorithmic Trading",
        "DeFi Automation",
        "Portfolio Management",
        "Risk Management",
        "Multi-Exchange Support",
        "AI-Powered Strategies"
      ],
      href: "/services/trading-bots",
      stats: { roi: "300%", exchanges: "15+", pairs: "500+" }
    }
  ]

  const additionalServices = [
    {
      icon: Settings,
      title: "Công Cụ Trình Duyệt & Desktop",
      description: "Tiện ích mở rộng trình duyệt, tự động hóa desktop và công cụ tích hợp hệ thống",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Building,
      title: "Phần Mềm SaaS & Doanh Nghiệp",
      description: "Nền tảng SaaS có thể mở rộng, giải pháp doanh nghiệp và tự động hóa dựa trên đám mây",
      gradient: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumbs with Ticker */}
      <BreadcrumbBar
        items={[
          { name: 'Trang Chủ', href: '/' },
          { name: 'Dịch Vụ', href: '/services' }
        ]}
      />

      <main className="flex-1 relative z-10 pt-32 pb-20" role="main">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Dịch Vụ Chuyên Nghiệp
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none mb-6">
              <span className="gradient-text">Giải Pháp Tự Động Hóa</span>
              <br />
              <span className="text-white">Toàn Diện</span>
            </h1>
            <p className="max-w-[800px] mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              Từ bot chat thông minh đến hệ thống giao dịch crypto tự động, chúng tôi cung cấp 
              các giải pháp tự động hóa tiên tiến cho mọi nhu cầu doanh nghiệp.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100+</div>
                <div className="text-gray-400 text-sm">Dự Án Hoàn Thành</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-gray-400 text-sm">Hỗ Trợ Kỹ Thuật</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-gray-400 text-sm">Năm Kinh Nghiệm</div>
              </div>
            </div>
          </section>

          {/* Main Services Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text mb-4">
                Dịch Vụ Chính
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Khám phá các dịch vụ tự động hóa hàng đầu được thiết kế để tối ưu hóa hiệu suất và tiết kiệm thời gian
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.id} className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6 mb-6">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} animate-float`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{service.description}</p>
                        </div>
                      </div>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg mb-6">
                        {Object.entries(service.stats).map(([key, value], index) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-white">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link href={service.href}>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
                          Tìm Hiểu Thêm
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Additional Services */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text mb-4">
                Dịch Vụ Bổ Sung
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Các giải pháp chuyên biệt khác để đáp ứng mọi nhu cầu tự động hóa của bạn
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {additionalServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} animate-float`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text mb-4">
                Tại Sao Chọn {settings.siteName}?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="cyber-border bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Bảo Mật Tối Đa</h3>
                  <p className="text-gray-400">Cam kết bảo mật thông tin và mã nguồn tuyệt đối với các tiêu chuẩn quốc tế</p>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Đội Ngũ Chuyên Gia</h3>
                  <p className="text-gray-400">Hơn 5 năm kinh nghiệm trong lĩnh vực tự động hóa và phát triển bot</p>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Hỗ Trợ 24/7</h3>
                  <p className="text-gray-400">Đội ngũ kỹ thuật sẵn sàng hỗ trợ bất cứ lúc nào bạn cần</p>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Giải Pháp Tùy Chỉnh</h3>
                  <p className="text-gray-400">Phát triển theo yêu cầu riêng, phù hợp với mọi quy mô dự án</p>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Giá Cả Cạnh Tranh</h3>
                  <p className="text-gray-400">Báo giá minh bạch, linh hoạt theo từng giai đoạn dự án</p>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Hiệu Suất Cao</h3>
                  <p className="text-gray-400">Các giải pháp được tối ưu hóa để đạt hiệu suất tối đa</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text mb-4">
                Quy Trình Làm Việc
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Quy trình chuyên nghiệp đảm bảo chất lượng và tiến độ dự án
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {[
                { step: "01", title: "Tư Vấn & Phân Tích", desc: "Tìm hiểu yêu cầu và đánh giá khả thi" },
                { step: "02", title: "Thiết Kế & Báo Giá", desc: "Thiết kế giải pháp và báo giá chi tiết" },
                { step: "03", title: "Phát Triển & Test", desc: "Coding và kiểm thử toàn diện" },
                { step: "04", title: "Triển Khai & Hỗ Trợ", desc: "Deploy và hỗ trợ dài hạn" }
              ].map((item, index) => (
                <Card key={index} className="cyber-border bg-black/40 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="cyber-border bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Sẵn Sàng Bắt Đầu Dự Án Tự Động Hóa?
                  </h2>
                  <p className="text-gray-300 mb-8 text-lg">
                    Hãy để chúng tôi giúp bạn biến ý tưởng thành hiện thực. 
                    Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết cho dự án của bạn.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button 
                        size="lg" 
                        className="cyber-button text-black font-semibold px-8 py-4"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Tư Vấn Miễn Phí
                      </Button>
                    </Link>
                    <Link href="/blog">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4"
                      >
                        Xem Case Studies
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
  )
}