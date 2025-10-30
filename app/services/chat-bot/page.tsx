import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BinaryRain } from '@/components/binary-rain'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BreadcrumbBar } from '@/components/breadcrumb-bar'
import {
  MessageSquare,
  Bot,
  Zap,
  Shield,
  Users,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Settings,
  Rocket,
  Brain,
  Globe,
  Smartphone,
  Layers,
  Code,
  BarChart3,
  Lock,
  Headphones,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()

  return {
    title: `Chat Bot Thông Minh - AI Chatbot Development | ${settings.siteName}`,
    description: 'Phát triển chatbot AI thông minh cho Telegram, Discord, Facebook Messenger, website. Tự động hóa customer service, quản lý cộng đồng 24/7 với NLP & Machine Learning.',
    keywords: 'chatbot AI, bot telegram, bot discord, facebook messenger bot, website chatbot, customer service bot, AI assistant, conversational AI, NLP chatbot, machine learning bot, automated customer support, community management bot, chat automation, intelligent chatbot, virtual assistant, chatbot development, messenger automation, telegram bot API, discord bot development',
    alternates: {
      canonical: `${settings.siteUrl}/services/chat-bot`,
    },
  }
}

export default function ChatBotPage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumb Navigation with Ticker - Fixed */}
      <BreadcrumbBar
        items={[
          { name: 'Trang Chủ', href: '/' },
          { name: 'Dịch Vụ', href: '/#services' },
          { name: 'Chat Bot Thông Minh', href: '/services/chat-bot' },
        ]}
      />

      <main className="flex-1 relative z-10 pt-[75px]" role="main">

        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-black/40" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Chatbot Development
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="gradient-text">Chat Bot Thông Minh</span>
                <br />
                <span className="text-white">Hỗ Trợ Khách Hàng 24/7</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Phát triển chatbot AI với NLP tiên tiến cho Telegram, Discord, Facebook Messenger và website. 
                Tự động hóa customer service, quản lý cộng đồng và tương tác khách hàng thông minh.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                  Tư Vấn Miễn Phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                >
                  Liên Hệ Telegram
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">50+</div>
                  <p className="text-gray-400 text-sm mt-2">Chatbot Đã Xây Dựng</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">24/7</div>
                  <p className="text-gray-400 text-sm mt-2">Hỗ Trợ Tự Động</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">95%</div>
                  <p className="text-gray-400 text-sm mt-2">Độ Chính Xác AI</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 mb-4">
                Nền Tảng Hỗ Trợ
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Chatbot Đa Nền Tảng</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Triển khai chatbot thông minh trên mọi nền tảng phổ biến
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="service-card bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-blue-500/20">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">Telegram Bot</h3>
                  <p className="text-gray-400 text-sm">
                    Bot Telegram tùy chỉnh với inline keyboard, payment, admin panel
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-gradient-to-br from-purple-900/20 to-purple-900/5 border-purple-500/20">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">Discord Bot</h3>
                  <p className="text-gray-400 text-sm">
                    Quản lý server, moderation, music bot, custom commands
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-gradient-to-br from-green-900/20 to-green-900/5 border-green-500/20">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">Messenger Bot</h3>
                  <p className="text-gray-400 text-sm">
                    Facebook Messenger automation cho fanpage và business
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-gradient-to-br from-orange-900/20 to-orange-900/5 border-orange-500/20">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">Website Chat</h3>
                  <p className="text-gray-400 text-sm">
                    Live chat widget tích hợp AI cho website và ecommerce
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
                Tính Năng Nổi Bật
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">AI-Powered Features</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="service-card bg-black/40 border-blue-500/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Natural Language Processing</h3>
                  <p className="text-gray-400">
                    Hiểu ngôn ngữ tự nhiên, xử lý intent, entity extraction với AI tiên tiến
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                    <Layers className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Multi-language Support</h3>
                  <p className="text-gray-400">
                    Hỗ trợ đa ngôn ngữ, tự động detect và translate messages
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                    <Headphones className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Customer Support Automation</h3>
                  <p className="text-gray-400">
                    Tự động trả lời câu hỏi thường gặp, ticket system, escalation
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Analytics & Insights</h3>
                  <p className="text-gray-400">
                    Thống kê chi tiết, user behavior tracking, conversation analytics
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Security & Privacy</h3>
                  <p className="text-gray-400">
                    Bảo mật dữ liệu người dùng, GDPR compliance, encrypted storage
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Custom Integration</h3>
                  <p className="text-gray-400">
                    Tích hợp với CRM, payment gateway, database, API bên thứ 3
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 mb-4">
                Ứng Dụng Thực Tế
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Chat Bot Cho Mọi Ngành</span>
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="cyber-border bg-black/40">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">E-commerce & Retail</h3>
                      <p className="text-gray-400 mb-4">
                        Hỗ trợ mua hàng, theo dõi đơn hàng, gợi ý sản phẩm thông minh
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Product recommendation AI
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Order tracking automation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Payment processing
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex-shrink-0">
                      <Headphones className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Customer Service</h3>
                      <p className="text-gray-400 mb-4">
                        Giải quyết yêu cầu khách hàng tự động, giảm chi phí vận hành
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          24/7 instant response
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          FAQ automation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Ticket system integration
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Marketing & Sales</h3>
                      <p className="text-gray-400 mb-4">
                        Lead generation, nurturing campaigns, conversion optimization
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Lead qualification bot
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Automated follow-up
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Campaign analytics
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Community Management</h3>
                      <p className="text-gray-400 mb-4">
                        Quản lý cộng đồng Discord/Telegram, moderation tự động
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Auto moderation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Welcome messages
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Role management
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 mb-4">
                Quy Trình Phát Triển
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Từ Ý Tưởng Đến Triển Khai</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: '01',
                  title: 'Phân Tích Yêu Cầu',
                  description: 'Tìm hiểu mục tiêu, use case, xác định tính năng cần thiết',
                  icon: Target,
                },
                {
                  step: '02',
                  title: 'Thiết Kế & Training',
                  description: 'Design conversation flow, train AI model với dữ liệu thực tế',
                  icon: Brain,
                },
                {
                  step: '03',
                  title: 'Development & Testing',
                  description: 'Code bot, tích hợp API, testing kỹ lưỡng với real scenarios',
                  icon: Code,
                },
                {
                  step: '04',
                  title: 'Deploy & Monitor',
                  description: 'Triển khai production, monitoring 24/7, continuous improvement',
                  icon: Rocket,
                },
              ].map((item, index) => (
                <Card key={index} className="service-card bg-black/40 border-blue-500/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 text-6xl font-bold text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
                    {item.step}
                  </div>
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-sm font-bold text-blue-400">{item.step}</div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 mb-4">
                Câu Hỏi Thường Gặp
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">FAQ</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  q: 'Chatbot có thể tích hợp với hệ thống CRM hiện tại không?',
                  a: 'Có, chúng tôi có thể tích hợp chatbot với hầu hết các hệ thống CRM phổ biến như Salesforce, HubSpot, Zoho CRM thông qua API. Bot sẽ tự động đồng bộ dữ liệu khách hàng và cập nhật thông tin realtime.',
                },
                {
                  q: 'Chatbot có hỗ trợ tiếng Việt không?',
                  a: 'Có, chatbot của chúng tôi được training với dữ liệu tiếng Việt và có thể hiểu ngữ cảnh, từ lóng, emoji. Ngoài ra còn hỗ trợ đa ngôn ngữ khác như English, Chinese, Korean.',
                },
                {
                  q: 'Chi phí phát triển chatbot là bao nhiêu?',
                  a: 'Chi phí phụ thuộc vào độ phức tạp, tính năng và nền tảng triển khai. Chatbot cơ bản từ 15-30 triệu, chatbot AI phức tạp từ 50-100 triệu. Liên hệ để nhận báo giá chi tiết cho dự án của bạn.',
                },
                {
                  q: 'Thời gian phát triển mất bao lâu?',
                  a: 'Chatbot đơn giản: 2-4 tuần. Chatbot AI với NLP: 1-2 tháng. Chatbot phức tạp tích hợp nhiều hệ thống: 2-3 tháng. Thời gian bao gồm analysis, design, development, testing và training.',
                },
                {
                  q: 'Có hỗ trợ sau khi deploy không?',
                  a: 'Có, chúng tôi cung cấp gói bảo hành 6 tháng miễn phí và gói support dài hạn. Bao gồm: bug fixing, feature updates, AI model retraining, performance optimization và 24/7 technical support.',
                },
              ].map((item, index) => (
                <Card key={index} className="service-card bg-black/40 border-blue-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-start">
                      <MessageSquare className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0 mt-1" />
                      {item.q}
                    </h3>
                    <p className="text-gray-400 pl-7">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Card className="cyber-border bg-black/60 backdrop-blur-sm">
              <CardContent className="p-12 text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold">
                    <span className="gradient-text">Sẵn Sàng Xây Dựng Chatbot?</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Để chatbot AI xử lý customer service, tăng conversion và tiết kiệm chi phí vận hành cho doanh nghiệp của bạn
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                    Bắt Đầu Dự Án
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href={settings.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                  >
                    Chat Ngay
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  <div className="flex items-center justify-center space-x-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Tư Vấn Miễn Phí</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Demo Trước Khi Deploy</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Bảo Hành 6 Tháng</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
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
