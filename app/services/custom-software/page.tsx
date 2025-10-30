import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BinaryRain } from '@/components/binary-rain'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Code,
  Zap,
  Shield,
  Target,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Settings,
  Rocket,
  Building,
  Users,
  BarChart3,
  Globe,
  Smartphone,
  Cloud,
  Database,
  Lock,
  Layers,
  GitBranch,
  Terminal,
  Package,
  Cog,
  FileCode,
  Workflow,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()

  return {
    title: `Phần Mềm Tùy Chỉnh - Custom Software Development | ${settings.siteName}`,
    description: 'Phát triển phần mềm tùy chỉnh theo yêu cầu: Web App, Mobile App, Desktop App, API, SaaS. Giải pháp công nghệ toàn diện cho doanh nghiệp từ Startup đến Enterprise.',
    keywords: 'phần mềm tùy chỉnh, custom software development, lập trình theo yêu cầu, web application development, mobile app development, desktop software, SaaS development, API development, enterprise software, startup tech solution, phát triển ứng dụng, thiết kế phần mềm, tư vấn công nghệ, outsourcing development, offshore development',
  }
}

export default function CustomSoftwarePage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      <main className="flex-1 relative z-10 pt-16" role="main">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/40" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2">
                <Code className="w-4 h-4 mr-2" />
                Custom Software Development
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="gradient-text">Phần Mềm Tùy Chỉnh</span>
                <br />
                <span className="text-white">Giải Pháp Công Nghệ Toàn Diện</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Phát triển phần mềm theo yêu cầu từ Web, Mobile đến Desktop. 
                Giải pháp công nghệ tối ưu cho mọi quy mô từ Startup đến Enterprise.
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
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                >
                  Liên Hệ Telegram
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">100+</div>
                  <p className="text-gray-400 text-sm mt-2">Dự Án Hoàn Thành</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">10+</div>
                  <p className="text-gray-400 text-sm mt-2">Năm Kinh Nghiệm</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">98%</div>
                  <p className="text-gray-400 text-sm mt-2">Khách Hàng Hài Lòng</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
                Dịch Vụ Phát Triển
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                Giải Pháp Phần Mềm Đa Dạng
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Từ ý tưởng đến sản phẩm hoàn thiện, chúng tôi xây dựng giải pháp công nghệ phù hợp
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Web Application</h3>
                  <p className="text-gray-400">
                    Ứng dụng web hiện đại với React, Next.js, Vue.js. Tối ưu hiệu suất và SEO
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                      SPA & PWA Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                      Dashboard & Admin Panel
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                      E-commerce Platform
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Mobile Application</h3>
                  <p className="text-gray-400">
                    App di động cho iOS & Android với React Native, Flutter. Native performance
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                      Cross-platform Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                      Native iOS/Android
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                      App Store Deployment
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Desktop Application</h3>
                  <p className="text-gray-400">
                    Phần mềm desktop cho Windows, macOS, Linux với Electron, .NET
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                      Cross-platform Desktop
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                      System Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                      Auto-update System
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">SaaS Platform</h3>
                  <p className="text-gray-400">
                    Nền tảng SaaS có thể mở rộng với multi-tenancy, subscription billing
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                      Multi-tenant Architecture
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                      Subscription Management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                      Analytics Dashboard
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">API Development</h3>
                  <p className="text-gray-400">
                    RESTful API, GraphQL, WebSocket. Tích hợp dịch vụ bên thứ ba
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-red-400" />
                      RESTful & GraphQL API
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-red-400" />
                      API Documentation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-red-400" />
                      Third-party Integration
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Enterprise Solution</h3>
                  <p className="text-gray-400">
                    Giải pháp doanh nghiệp: ERP, CRM, HRM. Quản lý tài nguyên tổng thể
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                      ERP/CRM/HRM System
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                      Business Intelligence
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                      Legacy System Migration
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 mb-4">
                Technology Stack
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Công Nghệ Tiên Tiến
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Sử dụng các công nghệ mới nhất và được chứng minh hiệu quả
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/60 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <FileCode className="w-5 h-5 mr-2 text-blue-400" />
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• React / Next.js</li>
                    <li>• Vue.js / Nuxt.js</li>
                    <li>• Angular</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-green-400" />
                    Backend
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Node.js / Express</li>
                    <li>• Python / Django</li>
                    <li>• Java / Spring Boot</li>
                    <li>• .NET Core</li>
                    <li>• Go / Gin</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Smartphone className="w-5 h-5 mr-2 text-purple-400" />
                    Mobile
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• React Native</li>
                    <li>• Flutter</li>
                    <li>• Swift (iOS)</li>
                    <li>• Kotlin (Android)</li>
                    <li>• Ionic</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Cloud className="w-5 h-5 mr-2 text-yellow-400" />
                    DevOps
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Docker / Kubernetes</li>
                    <li>• AWS / Azure / GCP</li>
                    <li>• CI/CD Pipeline</li>
                    <li>• Monitoring Tools</li>
                    <li>• Load Balancing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 mb-4">
                Quy Trình Phát Triển
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                6 Bước Xây Dựng Phần Mềm
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  step: '01',
                  icon: Target,
                  title: 'Phân Tích & Lập Kế Hoạch',
                  description: 'Thu thập yêu cầu, phân tích nghiệp vụ, đánh giá khả thi và lập roadmap',
                },
                {
                  step: '02',
                  icon: Layers,
                  title: 'Thiết Kế Hệ Thống',
                  description: 'Thiết kế kiến trúc, database, UI/UX wireframe và prototype',
                },
                {
                  step: '03',
                  icon: Code,
                  title: 'Phát Triển',
                  description: 'Code theo sprint Agile, daily standup, code review liên tục',
                },
                {
                  step: '04',
                  icon: Shield,
                  title: 'Testing & QA',
                  description: 'Unit test, integration test, UAT testing, security testing',
                },
                {
                  step: '05',
                  icon: Rocket,
                  title: 'Deployment',
                  description: 'Deploy lên production, config server, monitoring setup',
                },
                {
                  step: '06',
                  icon: Settings,
                  title: 'Maintenance & Support',
                  description: 'Bug fixing, feature update, performance optimization, 24/7 support',
                },
              ].map((item, index) => (
                <Card key={index} className="bg-black/40 border-blue-500/20 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl font-bold text-blue-500/10 absolute top-2 right-2 group-hover:text-blue-500/20 transition-all">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative z-10">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">{item.title}</h3>
                    <p className="text-sm text-gray-400 relative z-10">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 mb-4">
                Lý Do Chọn Chúng Tôi
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text">
                Tại Sao Chọn iCoderX?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Users,
                  title: 'Đội Ngũ Chuyên Gia',
                  description: '10+ năm kinh nghiệm, cập nhật công nghệ mới liên tục',
                },
                {
                  icon: Zap,
                  title: 'Giao Hàng Đúng Hạn',
                  description: 'Agile/Scrum methodology, sprint planning chặt chẽ',
                },
                {
                  icon: Shield,
                  title: 'Bảo Mật Tối Đa',
                  description: 'Code security, data encryption, GDPR compliance',
                },
                {
                  icon: BarChart3,
                  title: 'Hỗ Trợ Dài Hạn',
                  description: 'Maintenance, update, scale theo nhu cầu phát triển',
                },
              ].map((item, index) => (
                <Card key={index} className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
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
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
                Câu Hỏi Thường Gặp
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text">FAQ</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: 'Chi phí phát triển phần mềm tùy chỉnh là bao nhiêu?',
                  a: 'Chi phí phụ thuộc vào quy mô, độ phức tạp và thời gian. Từ $2,000 cho MVP đơn giản đến $50,000+ cho enterprise solution. Liên hệ để được báo giá chi tiết.',
                },
                {
                  q: 'Thời gian phát triển mất bao lâu?',
                  a: 'MVP đơn giản: 1-2 tháng. Web/Mobile app chuẩn: 3-6 tháng. Enterprise solution: 6-12 tháng. Thời gian tùy thuộc vào yêu cầu cụ thể.',
                },
                {
                  q: 'Quy trình làm việc như thế nào?',
                  a: 'Chúng tôi áp dụng Agile/Scrum. Sprint 2 tuần, demo cuối sprint, feedback liên tục. Khách hàng tham gia vào toàn bộ quá trình phát triển.',
                },
                {
                  q: 'Có hỗ trợ sau khi bàn giao không?',
                  a: 'Có. Free support 3-6 tháng đầu (tùy gói). Sau đó có gói maintenance hàng tháng/năm bao gồm bug fixing, update và technical support.',
                },
                {
                  q: 'Source code có được bàn giao không?',
                  a: 'Có. Toàn bộ source code, documentation và quyền sở hữu được chuyển giao cho khách hàng sau khi hoàn tất thanh toán.',
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-start">
                      <span className="text-blue-400 mr-2">Q:</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-400 pl-6">
                      <span className="text-green-400 mr-2">A:</span>
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="cyber-border bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
              <CardContent className="p-12 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                <div className="relative z-10 space-y-6">
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                    <Rocket className="w-4 h-4 mr-2" />
                    Bắt Đầu Dự Án
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    <span className="gradient-text">Sẵn Sàng Biến Ý Tưởng</span>
                    <br />
                    <span className="text-white">Thành Hiện Thực?</span>
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Tư vấn miễn phí về giải pháp công nghệ phù hợp với doanh nghiệp của bạn
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                      Nhận Tư Vấn Miễn Phí
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href={settings.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                    >
                      Chat Telegram
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span>Code Chất Lượng Cao</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span>Đội Ngũ Chuyên Nghiệp</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <span>Giao Hàng Đúng Hạn</span>
                    </div>
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
