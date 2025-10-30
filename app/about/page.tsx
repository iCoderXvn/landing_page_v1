import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BinaryRain } from '@/components/binary-rain'
import { BreadcrumbSchema } from '@/components/breadcrumb-schema'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Target,
  Award,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  Code,
  Rocket,
  Globe,
  CheckCircle2,
  Star,
  Bot,
  Cpu,
  Lock,
  Clock,
  DollarSign,
  BarChart3,
  Briefcase,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()
  
  return {
    title: `Về Chúng Tôi - Công Ty Tự Động Hóa & Phát Triển Phần Mềm Hàng Đầu | ${settings.siteName}`,
    description: 'Nhà cung cấp giải pháp tự động hóa chuyên nghiệp: bot giao dịch, tự động hóa MMO, chatbot, phát triển phần mềm tùy chỉnh. 5+ năm kinh nghiệm, 500+ dự án thành công.',
    keywords: 'về icoderx, công ty tự động hóa, công ty phần mềm việt nam, công ty bot trading, đội ngũ phát triển chuyên nghiệp, giải pháp tự động hóa, nhà phát triển crypto bot, phần mềm tự động',
  }
}

export default function AboutPage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumbs */}
      <div className="relative z-10 pt-20 bg-black/80 border-b border-blue-500/20">
        <BreadcrumbSchema
          items={[
            { name: 'Về Chúng Tôi', href: '/about' }
          ]}
        />
      </div>

      <main className="flex-1 relative z-10" role="main">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/40" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2">
                <Briefcase className="w-4 h-4 mr-2" />
                Về Chúng Tôi
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-white">Tiên Phong Trong</span>
                <br />
                <span className="gradient-text">Tự Động Hóa & Phát Triển</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Chúng tôi chuyển đổi doanh nghiệp thông qua tự động hóa thông minh, giải pháp 
                phần mềm tiên tiến và công nghệ đổi mới. Được tin tưởng bởi 500+ khách hàng toàn cầu từ 2018.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">5+</div>
                  <p className="text-gray-400 text-sm mt-2">Năm Kinh Nghiệm</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">500+</div>
                  <p className="text-gray-400 text-sm mt-2">Dự Án Hoàn Thành</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">98%</div>
                  <p className="text-gray-400 text-sm mt-2">Khách Hàng Hài Lòng</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">24/7</div>
                  <p className="text-gray-400 text-sm mt-2">Hỗ Trợ Liên Tục</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">Sứ Mệnh</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Trao quyền cho doanh nghiệp và cá nhân với các giải pháp tự động hóa thông minh 
                    giúp tăng hiệu suất, tối đa hóa lợi nhuận và mở ra những khả năng mới trong 
                    nền kinh tế số. Chúng tôi tin rằng tự động hóa phải dễ tiếp cận, đáng tin cậy 
                    và mang tính chuyển đổi.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Cung cấp giải pháp tự động hóa tiên tiến</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Tối đa hóa ROI cho mọi khách hàng</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Duy trì tiêu chuẩn chất lượng cao nhất</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">Tầm Nhìn</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Trở thành công ty tự động hóa và phát triển hàng đầu Đông Nam Á, được công nhận 
                    về sự đổi mới, độ tin cậy và thành công vượt trội của khách hàng. Chúng tôi 
                    hình dung một tương lai nơi tự động hóa khuếch đại tiềm năng con người.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Dẫn đầu cuộc cách mạng tự động hóa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Mở rộng toàn cầu với trọng tâm khách hàng</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Đổi mới liên tục với công nghệ mới nổi</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 mb-4">
                Giá Trị Cốt Lõi
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                Điều Gì Thúc Đẩy Chúng Tôi
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Giá trị của chúng tôi định hình mọi quyết định, mọi dòng code và mọi mối quan hệ khách hàng
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Xuất Sắc</h3>
                  <p className="text-gray-400">
                    Chúng tôi theo đuổi sự xuất sắc trong mọi dự án, cung cấp giải pháp vượt 
                    mong đợi và thiết lập tiêu chuẩn ngành.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Chính Trực</h3>
                  <p className="text-gray-400">
                    Minh bạch, trung thực và thực hành đạo đức là nền tảng của mọi 
                    mối quan hệ khách hàng và hoạt động kinh doanh.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Đổi Mới</h3>
                  <p className="text-gray-400">
                    Liên tục khám phá công nghệ mới, phương pháp luận và giải pháp sáng tạo 
                    để giải quyết các thách thức phức tạp.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Lấy Khách Hàng Làm Trung Tâm</h3>
                  <p className="text-gray-400">
                    Thành công của bạn là thành công của chúng tôi. Chúng tôi xây dựng quan hệ đối tác 
                    dài hạn dựa trên niềm tin, giao tiếp và mục tiêu chung.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Đam Mê</h3>
                  <p className="text-gray-400">
                    Chúng tôi yêu những gì chúng tôi làm. Niềm đam mê với công nghệ và tự động hóa 
                    thúc đẩy chúng tôi mang đến kết quả xuất sắc mọi lúc.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Hướng Đến Kết Quả</h3>
                  <p className="text-gray-400">
                    Chúng tôi đo lường thành công bằng kết quả cụ thể: tăng hiệu suất, lợi nhuận 
                    cao hơn và ROI có thể đo lường được cho khách hàng.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 mb-4">
                Tại Sao Chọn Chúng Tôi
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                Điều Gì Làm Chúng Tôi Khác Biệt
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Chúng tôi không chỉ viết code—chúng tôi xây dựng giải pháp chuyển đổi doanh nghiệp
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Đội Ngũ Chuyên Gia</h3>
                      <p className="text-gray-400">
                        Các developer của chúng tôi có 5+ năm kinh nghiệm chuyên sâu về tự động hóa, 
                        bot trading và phần mềm doanh nghiệp. Luôn dẫn đầu xu hướng công nghệ.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Thành Tích Đã Chứng Minh</h3>
                      <p className="text-gray-400">
                        500+ dự án thành công được giao trên các lĩnh vực trading, gaming, e-commerce 
                        và doanh nghiệp. Portfolio của chúng tôi tự nói lên điều đó.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Bảo Mật Hàng Đầu</h3>
                      <p className="text-gray-400">
                        Bảo mật cấp ngân hàng, mã hóa thông tin liên lạc và tích hợp API an toàn. 
                        Dữ liệu và tài sản của bạn luôn được bảo vệ.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Giao Hàng Nhanh</h3>
                      <p className="text-gray-400">
                        Phương pháp phát triển Agile đảm bảo thời gian hoàn thành nhanh chóng mà không 
                        ảnh hưởng chất lượng. Hầu hết dự án giao trong 2-4 tuần.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Giá Cạnh Tranh</h3>
                      <p className="text-gray-400">
                        Giải pháp cấp doanh nghiệp với mức giá thân thiện startup. Phương thức thanh toán 
                        linh hoạt và giá minh bạch không phí ẩn.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Hỗ Trợ Trọn Đời</h3>
                      <p className="text-gray-400">
                        Hỗ trợ kỹ thuật 24/7, cập nhật miễn phí, sửa lỗi và tối ưu hóa liên tục. 
                        Chúng tôi đồng hành cùng bạn lâu dài.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
                Chuyên Môn Của Chúng Tôi
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                Giải Pháp Tự Động Hóa Toàn Diện
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Bot Giao Dịch</h3>
                  <p className="text-gray-400 text-sm">
                    Tự động hóa giao dịch crypto với AI và nhiều chiến lược
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Chat Bot</h3>
                  <p className="text-gray-400 text-sm">
                    Chatbot thông minh cho Telegram, Discord và website
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Tự Động Hóa MMO</h3>
                  <p className="text-gray-400 text-sm">
                    Bot game và hệ thống quản lý đa tài khoản
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Phần Mềm Tùy Chỉnh</h3>
                  <p className="text-gray-400 text-sm">
                    Giải pháp doanh nghiệp được thiết kế riêng cho bạn
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="cyber-border bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
              <CardContent className="p-12 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                <div className="relative z-10 space-y-6">
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                    <Rocket className="w-4 h-4 mr-2" />
                    Cùng Hợp Tác
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    <span className="gradient-text">Sẵn Sàng Chuyển Đổi</span>
                    <br />
                    <span className="text-white">Doanh Nghiệp Của Bạn?</span>
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Tham gia cùng 500+ khách hàng hài lòng đã tự động hóa thành công với giải pháp của chúng tôi
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
                      Chat Trên Telegram
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Tư Vấn Miễn Phí</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      <span>Giao Hàng Nhanh</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      <span>Hỗ Trợ 24/7</span>
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
