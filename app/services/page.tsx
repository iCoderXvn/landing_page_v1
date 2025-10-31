import { Metadata } from "next"
import { ServicesClient } from "./services-client"
import { getSiteSettings } from "@/lib/settings"

// Generate metadata for services page
export function generateMetadata(): Metadata {
  const settings = getSiteSettings()
  
  return {
    title: `Dịch Vụ Tự Động Hóa - ${settings.siteName}`,
    description: "Khám phá các dịch vụ tự động hóa chuyên nghiệp: Bot Chat, Phần mềm tùy chỉnh, Tự động hóa MMO và Bot giao dịch crypto.",
    keywords: "dịch vụ tự động hóa, bot chat, phần mềm tùy chỉnh, MMO automation, trading bot, crypto bot",
    alternates: {
      canonical: `${settings.siteUrl}/services`,
    },
  }
}

export default function ServicesPage() {
  const settings = getSiteSettings()
  
  return <ServicesClient settings={settings} />
}