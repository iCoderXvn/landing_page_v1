import { Metadata } from "next"
import { ServicesClient } from "./services-client"
import { getSiteSettings, generatePageMetadata } from "@/lib/settings"
import { serviceSchema } from "@/lib/structured-data"

// Generate metadata for services page
export function generateMetadata(): Metadata {
  return generatePageMetadata(
    "/services",
    "Dịch Vụ Tự Động Hóa - iCoderX",
    "Khám phá các dịch vụ tự động hóa chuyên nghiệp: Bot Chat, Phần mềm tùy chỉnh, Tự động hóa MMO và Bot giao dịch crypto."
  )
}

export default function ServicesPage() {
  const settings = getSiteSettings()
  
  return (
    <>
      {/* Structured Data for Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <ServicesClient settings={settings} />
    </>
  )
}