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
  
  return {
    title,
    description,
    keywords: keywords ? keywords.split(",").map((k: string) => k.trim()) : undefined,
    openGraph: {
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
      type: "article",
      publishedTime: new Date(post.createdAt).toISOString(),
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const settings = await getSiteSettings();
  return <BlogDetailClient settings={settings} postId={params.id} />;
}
