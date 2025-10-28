"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Eye,
  Upload,
  X,
  ArrowLeft,
  Calendar,
  Tag,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useRouter } from "next/navigation";
import renderContent from "@/lib/markdown-renderer";
import { VideoPlayer } from "@/components/video-player";
import { generateSlug } from "@/lib/slug-utils";

interface Topic {
  id: number;
  name: string;
}

interface PostFormData {
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  metaDescription: string;
  keywords: string;
  topicId: string;
  featuredImage: string;
  isPublished: boolean;
  scheduledAt: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved" | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const autoSaveTimeout = useRef<NodeJS.Timeout>();
  
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    slug: "",
    excerpt: "",
    metaDescription: "",
    keywords: "",
    topicId: "",
    featuredImage: "",
    isPublished: false,
    scheduledAt: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PostFormData, string>>>({});

  useEffect(() => {
    fetchTopics();
    loadDraft();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (formData.title || formData.content) {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
      
      setSaveStatus("unsaved");
      
      autoSaveTimeout.current = setTimeout(() => {
        saveDraft();
      }, 3000); // Auto-save after 3 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [formData]);

  const fetchTopics = async () => {
    try {
      const response = await fetch("/api/topics");
      const data = await response.json();
      if (data.success) {
        setTopics(data.topics);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const loadDraft = () => {
    const draft = localStorage.getItem("postDraft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed);
        setSaveStatus("saved");
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  };

  const saveDraft = () => {
    setSaveStatus("saving");
    localStorage.setItem("postDraft", JSON.stringify(formData));
    setTimeout(() => setSaveStatus("saved"), 500);
  };

  const clearDraft = () => {
    localStorage.removeItem("postDraft");
    setSaveStatus(null);
  };

  const handleChange = (field: keyof PostFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === "title" && typeof value === "string") {
      const slug = generateSlug(value);
      setFormData(prev => ({ ...prev, slug }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setFormData(prev => ({ ...prev, featuredImage: data.url }));
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    
    if (file && file.type.startsWith("image/")) {
      const input = document.createElement("input");
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      
      handleImageUpload({ target: input } as any);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PostFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (formData.isPublished && !formData.metaDescription.trim()) {
      newErrors.metaDescription = "Meta description is recommended for published posts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (publish: boolean) => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isPublished: publish,
          topicId: formData.topicId ? parseInt(formData.topicId) : null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearDraft();
        router.push("/admin/posts");
      } else {
        alert(data.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    localStorage.removeItem("authToken");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminSidebar onLogout={handleLogout} />
      
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/admin/posts")}
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Posts
                </Button>
                <div>
                  <h2 className="text-3xl font-bold text-white">Create New Post</h2>
                  {saveStatus && (
                    <div className="flex items-center gap-2 mt-1">
                      {saveStatus === "saving" && (
                        <span className="text-sm text-yellow-400">Saving draft...</span>
                      )}
                      {saveStatus === "saved" && (
                        <span className="text-sm text-green-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Draft saved
                        </span>
                      )}
                      {saveStatus === "unsaved" && (
                        <span className="text-sm text-gray-400">Unsaved changes</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(false)}
                  disabled={saving}
                  className="border-gray-600 text-gray-300"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSubmit(true)}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title & Slug */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-gray-300">
                        Title *
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Enter post title..."
                        className="mt-1.5 bg-gray-800 border-gray-600 text-white text-lg"
                      />
                      {errors.title && (
                        <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="slug" className="text-gray-300">
                        Slug *
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleChange("slug", e.target.value)}
                        placeholder="post-url-slug"
                        className="mt-1.5 bg-gray-800 border-gray-600 text-white font-mono text-sm"
                      />
                      {errors.slug && (
                        <p className="text-red-400 text-sm mt-1">{errors.slug}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">
                        URL: /blog/{formData.slug || "post-slug"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Editor */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Content *
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="write" className="w-full">
                      <TabsList className="bg-gray-800">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="write" className="mt-4">
                        <Textarea
                          value={formData.content}
                          onChange={(e) => handleChange("content", e.target.value)}
                          placeholder="Write your post content in markdown..."
                          className="min-h-[400px] bg-gray-800 border-gray-600 text-white font-mono"
                        />
                        {errors.content && (
                          <p className="text-red-400 text-sm mt-2">{errors.content}</p>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          Supports Markdown: **bold**, *italic*, # heading, - list, [link](url), ```code```
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="preview" className="mt-4">
                        <div className="min-h-[400px] bg-gray-800 border border-gray-600 rounded-lg p-6 prose prose-lg max-w-none text-gray-300 leading-relaxed prose-invert">
                          {formData.content ? (
                            <PreviewInner content={formData.content} />
                          ) : (
                            <p className="text-gray-500 italic">Nothing to preview yet...</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Excerpt */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-base">Excerpt (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => handleChange("excerpt", e.target.value)}
                      placeholder="Brief summary of the post (shown in listings)..."
                      className="min-h-[100px] bg-gray-800 border-gray-600 text-white"
                      maxLength={300}
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      {formData.excerpt.length}/300 characters
                    </p>
                  </CardContent>
                </Card>

                {/* SEO Settings */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      SEO Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="metaDescription" className="text-gray-300">
                        Meta Description
                      </Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) => handleChange("metaDescription", e.target.value)}
                        placeholder="Description for search engines..."
                        className="mt-1.5 bg-gray-800 border-gray-600 text-white"
                        maxLength={160}
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        {formData.metaDescription.length}/160 characters
                      </p>
                      {errors.metaDescription && (
                        <p className="text-yellow-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.metaDescription}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="keywords" className="text-gray-300">
                        Keywords
                      </Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) => handleChange("keywords", e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                        className="mt-1.5 bg-gray-800 border-gray-600 text-white"
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        Comma-separated keywords for SEO
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Featured Image */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-base flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Featured Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="featuredImageUrl" className="text-gray-300">
                        Image URL
                      </Label>
                      <Input
                        id="featuredImageUrl"
                        type="url"
                        value={formData.featuredImage}
                        onChange={(e) => handleChange("featuredImage", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1.5 bg-gray-800 border-gray-600 text-white"
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        Paste image URL for preview
                      </p>
                    </div>
                    
                    {formData.featuredImage && (
                      <div className="relative">
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="w-full h-40 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23666">Invalid URL</text></svg>';
                          }}
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleChange("featuredImage", "")}
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Topic */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-base">Topic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={formData.topicId}
                      onValueChange={(v) => handleChange("topicId", v)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Topic</SelectItem>
                        {topics.map((topic) => (
                          <SelectItem key={topic.id} value={topic.id.toString()}>
                            {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Publish Settings */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-base flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Publish Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isPublished" className="text-gray-300">
                        Publish immediately
                      </Label>
                      <Switch
                        id="isPublished"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) => handleChange("isPublished", checked)}
                      />
                    </div>

                    {!formData.isPublished && (
                      <div>
                        <Label htmlFor="scheduledAt" className="text-gray-300">
                          Schedule for later
                        </Label>
                        <Input
                          id="scheduledAt"
                          type="datetime-local"
                          value={formData.scheduledAt}
                          onChange={(e) => handleChange("scheduledAt", e.target.value)}
                          className="mt-1.5 bg-gray-800 border-gray-600 text-white"
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Word Count */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">
                          {formData.content.split(/\s+/).filter(Boolean).length}
                        </div>
                        <div className="text-xs text-gray-400">Words</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">
                          {formData.content.length}
                        </div>
                        <div className="text-xs text-gray-400">Characters</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Small helper used in the preview to set innerHTML and mount VideoPlayer roots
function PreviewInner({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevContentRef = useRef<string>('');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const html = renderContent(content);

    if (prevContentRef.current !== html) {
      container.innerHTML = html;
      prevContentRef.current = html;
    }

    const videoContainers = Array.from(container.querySelectorAll('.video-embed')) as HTMLElement[];
    videoContainers.forEach((c) => {
      if (c.getAttribute('data-react-mounted') === '1') return;
      const url = c.getAttribute('data-video-url');
      const title = c.getAttribute('data-video-title') || undefined;
      if (url) {
        import('react-dom/client')
          .then(({ createRoot }) => {
            const root = createRoot(c);
            // @ts-ignore
            root.render(React.createElement(VideoPlayer, { src: url, title }));
            c.setAttribute('data-react-mounted', '1');
          })
          .catch(console.error);
      }
    });
  }, [content]);

  return <div ref={containerRef} />;
}
