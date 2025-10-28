import React from "react";
import { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { BlogPageClient } from "./blog-client";

// Ensure this page is always dynamically rendered
export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  const settings = getSiteSettings();
  
  return {
    title: `Blog | ${settings.siteName}`,
    description: settings.defaultMetaDescription || 'Đọc các bài viết về lập trình bot, tự động hóa, và công nghệ',
    keywords: settings.defaultKeywords,
  };
}

export default function BlogPage() {
  // Fetch settings directly from database on server
  const settings = getSiteSettings();

  return <BlogPageClient settings={settings} />;
}
