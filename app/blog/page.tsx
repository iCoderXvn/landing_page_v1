import React from "react";
import { getSiteSettings } from "@/lib/settings";
import { BlogPageClient } from "./blog-client";

// Ensure this page is always dynamically rendered
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  // Fetch settings directly from database on server
  const settings = await getSiteSettings();

  return <BlogPageClient settings={settings} />;
}
