import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BinaryRain } from '@/components/binary-rain'
import { BreadcrumbBar } from '@/components/breadcrumb-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Shield,
  AlertCircle,
  CheckCircle2,
  Scale,
  Lock,
  UserCheck,
  Ban,
  RefreshCw,
  Mail,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()
  
  return {
    title: `Điều Khoản Dịch Vụ - Terms & Conditions | ${settings.siteName}`,
    description: 'Điều khoản và điều kiện sử dụng dịch vụ của iCoderX. Quy định về quyền và trách nhiệm, chính sách bảo mật, thanh toán và hỗ trợ khách hàng.',
    keywords: 'điều khoản dịch vụ, terms of service, điều kiện sử dụng, quy định dịch vụ, chính sách icoderx, hợp đồng dịch vụ, terms and conditions',
  }
}

export default function TermsPage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumbs with Ticker - Fixed */}
      <BreadcrumbBar
        items={[
          { name: 'Trang Chủ', href: '/' },
          { name: 'Điều Khoản Dịch Vụ', href: '/terms' }
        ]}
      />
      
      {/* Spacer for fixed breadcrumb bar */}
      <div className="h-11"></div>

      <main className="flex-1 relative z-10" role="main">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/40" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                Điều Khoản & Điều Kiện
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="gradient-text">Điều Khoản Dịch Vụ</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Vui lòng đọc kỹ các điều khoản và điều kiện này trước khi sử dụng dịch vụ của chúng tôi
              </p>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <RefreshCw className="w-4 h-4" />
                <span>Cập nhật lần cuối: 31 Tháng 10, 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">1. Giới Thiệu</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          Chào mừng bạn đến với <span className="text-blue-400 font-semibold">{settings.siteName}</span>. 
                          Bằng cách truy cập và sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi 
                          các điều khoản và điều kiện sau đây.
                        </p>
                        <p>
                          Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Definition */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">2. Định Nghĩa Dịch Vụ</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          Dịch vụ của {settings.siteName} bao gồm nhưng không giới hạn ở:
                        </p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Bot Giao Dịch Crypto:</strong> Phát triển và triển khai bot trading tự động với AI</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Tự Động Hóa MMO:</strong> Phát triển bot game và hệ thống quản lý đa tài khoản</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Chat Bot:</strong> Phát triển chatbot thông minh cho Telegram, Discord, Messenger</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Phần Mềm Tùy Chỉnh:</strong> Phát triển giải pháp phần mềm theo yêu cầu</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">3. Trách Nhiệm Của Khách Hàng</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Cung cấp thông tin chính xác và đầy đủ khi đăng ký dịch vụ</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Bảo mật thông tin tài khoản và API keys của bạn</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Sử dụng dịch vụ cho mục đích hợp pháp và tuân thủ pháp luật</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Không sử dụng dịch vụ cho mục đích gian lận hoặc vi phạm pháp luật</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Chịu trách nhiệm về mọi hoạt động diễn ra dưới tài khoản của bạn</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">4. Điều Khoản Thanh Toán</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Báo giá:</strong> Mọi báo giá có hiệu lực trong 30 ngày kể từ ngày phát hành</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Đặt cọc:</strong> Yêu cầu thanh toán 50% trước khi bắt đầu dự án</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Thanh toán cuối:</strong> 50% còn lại thanh toán khi hoàn thành và bàn giao</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Hoàn tiền:</strong> Chính sách hoàn tiền áp dụng trong 7 ngày đầu nếu dịch vụ không đáp ứng yêu cầu đã thỏa thuận</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Phương thức:</strong> Chấp nhận thanh toán qua chuyển khoản ngân hàng, USDT, Bitcoin</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">5. Quyền Sở Hữu Trí Tuệ</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Source code và sản phẩm được bàn giao hoàn toàn thuộc quyền sở hữu của khách hàng sau khi thanh toán đầy đủ</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Khách hàng có toàn quyền sử dụng, chỉnh sửa và phân phối sản phẩm</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Chúng tôi giữ quyền sử dụng dự án làm portfolio (với sự đồng ý của khách hàng)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Framework và thư viện open-source sử dụng trong dự án tuân theo license gốc</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Warranty & Limitation */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">6. Bảo Hành & Giới Hạn Trách Nhiệm</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">Bảo Hành:</h3>
                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                              <span>Gói Starter: 1 tháng hỗ trợ miễn phí</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                              <span>Gói Pro: 3 tháng hỗ trợ miễn phí</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                              <span>Gói Enterprise: Hỗ trợ trọn đời</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 mt-6">Giới Hạn Trách Nhiệm:</h3>
                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start">
                              <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                              <span>Không chịu trách nhiệm về thua lỗ trong giao dịch trading (bot chỉ là công cụ hỗ trợ)</span>
                            </li>
                            <li className="flex items-start">
                              <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                              <span>Không đảm bảo lợi nhuận cụ thể từ việc sử dụng bot</span>
                            </li>
                            <li className="flex items-start">
                              <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                              <span>Không chịu trách nhiệm về sự cố do lỗi của bên thứ ba (sàn giao dịch, API, hosting)</span>
                            </li>
                            <li className="flex items-start">
                              <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                              <span>Khách hàng chịu trách nhiệm tuân thủ quy định pháp lý tại quốc gia của mình</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">7. Bảo Mật & Quyền Riêng Tư</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span>Chúng tôi cam kết bảo vệ thông tin cá nhân và dữ liệu của khách hàng</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span>Không chia sẻ thông tin khách hàng với bên thứ ba mà không có sự đồng ý</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span>API keys và thông tin nhạy cảm được mã hóa và lưu trữ an toàn</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span>Khách hàng có quyền yêu cầu xóa dữ liệu cá nhân bất kỳ lúc nào</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span>Xem chi tiết tại <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Chính Sách Bảo Mật</Link></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Termination */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Ban className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">8. Chấm Dứt Dịch Vụ</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Chúng tôi có quyền chấm dứt hoặc tạm ngưng dịch vụ nếu:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Khách hàng vi phạm điều khoản sử dụng</span>
                          </li>
                          <li className="flex items-start">
                            <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Sử dụng dịch vụ cho mục đích bất hợp pháp</span>
                          </li>
                          <li className="flex items-start">
                            <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Không thanh toán đúng hạn theo thỏa thuận</span>
                          </li>
                          <li className="flex items-start">
                            <Ban className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span>Có hành vi gian lận hoặc lạm dụng dịch vụ</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Changes to Terms */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">9. Thay Đổi Điều Khoản</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          Chúng tôi có quyền cập nhật và thay đổi các điều khoản này bất kỳ lúc nào. 
                          Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
                        </p>
                        <p>
                          Khách hàng có trách nhiệm xem xét định kỳ các điều khoản. Việc tiếp tục sử dụng 
                          dịch vụ sau khi có thay đổi được coi là chấp nhận các điều khoản mới.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">10. Liên Hệ</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi:
                        </p>
                        <div className="space-y-2 ml-6">
                          <p className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-blue-400" />
                            <span>Email: <a href={`mailto:${settings.contactEmail}`} className="text-blue-400 hover:text-blue-300 underline">{settings.contactEmail}</a></span>
                          </p>
                          <p className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-blue-400" />
                            <span>Telegram: <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">@iCoderX</a></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="cyber-border bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
                <CardContent className="p-12 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                  <div className="relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      <span className="gradient-text">Có Câu Hỏi?</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                      Đội ngũ của chúng tôi sẵn sàng giải đáp mọi thắc mắc về điều khoản dịch vụ
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                        Liên Hệ Ngay
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
                  </div>
                </CardContent>
              </Card>
            </div>
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
