import React from "react";
import { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { ContactClient } from "./contact-client";

export function generateMetadata(): Metadata {
  const settings = getSiteSettings();
  
  return {
    title: `Contact Us | ${settings.siteName}`,
    description: settings.defaultMetaDescription || 'Liên hệ với chúng tôi để được tư vấn về dịch vụ lập trình bot và tự động hóa',
    keywords: settings.defaultKeywords,
  };
}

export default function ContactPage() {
  const settings = getSiteSettings();
  return <ContactClient settings={settings} />;
}
