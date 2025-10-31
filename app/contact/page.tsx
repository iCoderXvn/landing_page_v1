import React from "react";
import { Metadata } from "next";
import { getSiteSettings, generatePageMetadata } from "@/lib/settings";
import { ContactClient } from "./contact-client";

export function generateMetadata(): Metadata {
  return generatePageMetadata(
    "/contact",
    "Contact Us | iCoderX",
    "Liên hệ với chúng tôi để được tư vấn về dịch vụ lập trình bot và tự động hóa. Hỗ trợ 24/7 qua Telegram, Email và điện thoại."
  )
}

export default function ContactPage() {
  const settings = getSiteSettings();
  return <ContactClient settings={settings} />;
}
