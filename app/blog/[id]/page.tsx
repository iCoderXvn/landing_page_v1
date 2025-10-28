import React from "react";
import { getSiteSettings } from "@/lib/settings";
import { BlogDetailClient } from "./blog-detail-client";
import { postOperations } from "@/lib/database";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const settings = await getSiteSettings();
  
  let post;
  if (/^\d+$/.test(id)) {
    post = postOperations.getById(parseInt(id));
  } else {
    post = postOperations.getBySlug(id);
  }
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  
  const title = `${post.title} | ${settings.siteTitle || settings.siteName}`;
  const description = post.metaDescription || post.excerpt || post.content.substring(0, 155);
  const keywords = post.keywords || "";
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug || id}`;
  
  return {
    title,
    description,
    keywords: keywords ? keywords.split(",").map((k: string) => k.trim()) : undefined,
    authors: [{ name: settings.siteName }],
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: settings.siteName,
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
      type: "article",
      publishedTime: new Date(post.createdAt).toISOString(),
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
      authors: [settings.siteName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
      creator: settings.siteName,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const settings = await getSiteSettings();
  return <BlogDetailClient settings={settings} postId={params.id} />;
}
