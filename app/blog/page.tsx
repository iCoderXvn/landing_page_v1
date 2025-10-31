import React from "react";
import { Metadata } from "next";
import { getSiteSettings, generatePageMetadata } from "@/lib/settings";
import { BlogPageClient } from "./blog-client";

// Ensure this page is always dynamically rendered
export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return generatePageMetadata(
    "/blog",
    "Blog | iCoderX",
    "Đọc các bài viết về lập trình bot, tự động hóa, trading bots, chatbots, MMO automation và công nghệ mới nhất. Hướng dẫn và kinh nghiệm từ chuyên gia."
  )
}

export default function BlogPage() {
  // Fetch settings directly from database on server
  const settings = getSiteSettings();

  return <BlogPageClient settings={settings} />;
}
