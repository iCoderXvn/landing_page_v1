"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings as SettingsIcon,
  Globe,
  Search,
  Share2,
  FileText,
  Database,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  Eye,
} from "lucide-react";

interface Setting {
  key: string;
  value: string;
  category: string;
}

interface PageSEO {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  priority: string;
  changefreq: string;
  noindex: boolean;
  nofollow: boolean;
}

export function AdminSettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Site Settings
  const [siteName, setSiteName] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [hotline, setHotline] = useState("");

  // SEO Settings
  const [defaultMetaDescription, setDefaultMetaDescription] = useState("");
  const [defaultKeywords, setDefaultKeywords] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [googleSearchConsole, setGoogleSearchConsole] = useState("");

  // Page-specific SEO
  const [pageSEOList, setPageSEOList] = useState<PageSEO[]>([]);
  const [selectedPageSEO, setSelectedPageSEO] = useState<PageSEO | null>(null);
  const [isEditingPageSEO, setIsEditingPageSEO] = useState(false);

  // Social Media
  const [twitterUrl, setTwitterUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");

  // Content Settings
  const [postsPerPage, setPostsPerPage] = useState("10");
  const [enableComments, setEnableComments] = useState(true);
  const [allowGuestPosts, setAllowGuestPosts] = useState(false);

  // System Settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [dateFormat, setDateFormat] = useState("MMM dd, yyyy");
  const [timezone, setTimezone] = useState("UTC");

  // Default pages for SEO configuration
  const defaultPages = [
    { path: "/", name: "Trang Chủ" },
    { path: "/services", name: "Dịch Vụ" },
    { path: "/services/chat-bot", name: "Phát Triển Chatbot AI" },
    { path: "/services/trading-bots", name: "Bot Giao Dịch Crypto" },
    { path: "/services/custom-software", name: "Phần Mềm Tùy Chỉnh" },
    { path: "/services/mmo-automation", name: "Tự Động Hóa Game MMO" },
    { path: "/blog", name: "Blog" },
    { path: "/about", name: "Giới Thiệu" },
    { path: "/contact", name: "Liên Hệ" },
    { path: "/docs", name: "Tài Liệu" },
    { path: "/terms", name: "Điều Khoản Sử Dụng" },
    { path: "/privacy", name: "Chính Sách Bảo Mật" },
  ];

  useEffect(() => {
    fetchSettings();
    fetchPageSEOSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();
      loadSettingsToState(data.settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const fetchPageSEOSettings = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/settings/pages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPageSEOList(data.pages || []);
      }
    } catch (err) {
      console.log("No existing page SEO settings found");
    }
  };

  const loadSettingsToState = (settingsList: Setting[]) => {
    settingsList.forEach((setting) => {
      switch (setting.key) {
        case "site_name":
          setSiteName(setting.value);
          break;
        case "site_title":
          setSiteTitle(setting.value);
          break;
        case "site_description":
          setSiteDescription(setting.value);
          break;
        case "site_url":
          setSiteUrl(setting.value);
          break;
        case "contact_email":
          setContactEmail(setting.value);
          break;
        case "hotline":
          setHotline(setting.value);
          break;
        case "default_meta_description":
          setDefaultMetaDescription(setting.value);
          break;
        case "default_keywords":
          setDefaultKeywords(setting.value);
          break;
        case "google_analytics_id":
          setGoogleAnalyticsId(setting.value);
          break;
        case "google_search_console":
          setGoogleSearchConsole(setting.value);
          break;
        case "twitter_url":
          setTwitterUrl(setting.value);
          break;
        case "facebook_url":
          setFacebookUrl(setting.value);
          break;
        case "linkedin_url":
          setLinkedinUrl(setting.value);
          break;
        case "github_url":
          setGithubUrl(setting.value);
          break;
        case "youtube_url":
          setYoutubeUrl(setting.value);
          break;
        case "telegram_url":
          setTelegramUrl(setting.value);
          break;
        case "posts_per_page":
          setPostsPerPage(setting.value);
          break;
        case "enable_comments":
          setEnableComments(setting.value === "true");
          break;
        case "allow_guest_posts":
          setAllowGuestPosts(setting.value === "true");
          break;
        case "maintenance_mode":
          setMaintenanceMode(setting.value === "true");
          break;
        case "date_format":
          setDateFormat(setting.value);
          break;
        case "timezone":
          setTimezone(setting.value);
          break;
      }
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const settingsToUpdate = {
        // Site Settings
        site_name: siteName,
        site_title: siteTitle,
        site_description: siteDescription,
        site_url: siteUrl,
        contact_email: contactEmail,
        hotline: hotline,

        // SEO Settings
        default_meta_description: defaultMetaDescription,
        default_keywords: defaultKeywords,
        google_analytics_id: googleAnalyticsId,
        google_search_console: googleSearchConsole,

        // Social Media
        twitter_url: twitterUrl,
        facebook_url: facebookUrl,
        linkedin_url: linkedinUrl,
        github_url: githubUrl,
        youtube_url: youtubeUrl,
        telegram_url: telegramUrl,

        // Content Settings
        posts_per_page: postsPerPage,
        enable_comments: enableComments.toString(),
        allow_guest_posts: allowGuestPosts.toString(),

        // System Settings
        maintenance_mode: maintenanceMode.toString(),
        date_format: dateFormat,
        timezone: timezone,
      };

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ settings: settingsToUpdate }),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const createNewPageSEO = () => {
    const newPageSEO: PageSEO = {
      id: Date.now().toString(),
      path: "",
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonical: "",
      priority: "0.8",
      changefreq: "weekly",
      noindex: false,
      nofollow: false,
    };
    setSelectedPageSEO(newPageSEO);
    setIsEditingPageSEO(true);
  };

  const editPageSEO = (pageSEO: PageSEO) => {
    setSelectedPageSEO(pageSEO);
    setIsEditingPageSEO(true);
  };

  const savePageSEO = async () => {
    if (!selectedPageSEO) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/settings/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pageSEO: selectedPageSEO }),
      });

      if (!response.ok) throw new Error("Failed to save page SEO");

      // Update local state
      const existingIndex = pageSEOList.findIndex(p => p.id === selectedPageSEO.id);
      if (existingIndex >= 0) {
        const updated = [...pageSEOList];
        updated[existingIndex] = selectedPageSEO;
        setPageSEOList(updated);
      } else {
        setPageSEOList([...pageSEOList, selectedPageSEO]);
      }

      setIsEditingPageSEO(false);
      setSelectedPageSEO(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save page SEO");
    }
  };

  const deletePageSEO = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/settings/pages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete page SEO");

      setPageSEOList(pageSEOList.filter(p => p.id !== id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete page SEO");
    }
  };

  const initializeDefaultPages = async () => {
    try {
      const newPages: PageSEO[] = defaultPages.map(page => ({
        id: `default-${Date.now()}-${Math.random()}`,
        path: page.path,
        title: `${page.name} - ${siteName}`,
        description: defaultMetaDescription,
        keywords: defaultKeywords,
        ogTitle: `${page.name} - ${siteName}`,
        ogDescription: defaultMetaDescription,
        ogImage: "/og-image.png",
        canonical: `${siteUrl}${page.path}`,
        priority: page.path === "/" ? "1.0" : "0.8",
        changefreq: "weekly",
        noindex: false,
        nofollow: false,
      }));

      for (const pageSEO of newPages) {
        const token = localStorage.getItem("authToken");
        await fetch("/api/settings/pages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pageSEO }),
        });
      }

      setPageSEOList([...pageSEOList, ...newPages]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError("Failed to initialize default pages");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white">Loading settings...</div>
      </div>
    );
  }

  return (
    <main className="lg:ml-64 min-h-screen">
      <div className="p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400 mt-1">Manage your site configuration</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {showSuccess && (
            <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-green-400">Settings saved successfully!</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-400">{error}</span>
            </div>
          )}

          <Tabs defaultValue="site" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="site" className="data-[state=active]:bg-gray-700">
                <Globe className="h-4 w-4 mr-2" />
                Site
              </TabsTrigger>
              <TabsTrigger value="seo" className="data-[state=active]:bg-gray-700">
                <Search className="h-4 w-4 mr-2" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="pages" className="data-[state=active]:bg-gray-700">
                <FileText className="h-4 w-4 mr-2" />
                Page SEO
              </TabsTrigger>
              <TabsTrigger value="social" className="data-[state=active]:bg-gray-700">
                <Share2 className="h-4 w-4 mr-2" />
                Social
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-gray-700">
                <FileText className="h-4 w-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-gray-700">
                <Database className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
            </TabsList>

            {/* Site Information */}
            <TabsContent value="site">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Site Information</CardTitle>
                  <CardDescription>Basic information about your website</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName" className="text-white">Site Name</Label>
                    <Input
                      id="siteName"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="iCoderX"
                    />
                    <p className="text-sm text-gray-400">The brand name displayed on the site</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteTitle" className="text-white">Site Title</Label>
                    <Input
                      id="siteTitle"
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="iCoderX - Bot Trading & Tự Động Hóa"
                    />
                    <p className="text-sm text-gray-400">Used in HTML &lt;title&gt; tags and browser tabs</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription" className="text-white">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl" className="text-white">Site URL</Label>
                    <Input
                      id="siteUrl"
                      type="url"
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-white">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotline" className="text-white">Hotline</Label>
                    <Input
                      id="hotline"
                      type="tel"
                      value={hotline}
                      onChange={(e) => setHotline(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="+84 123 456 789"
                    />
                    <p className="text-sm text-gray-400">Phone number for customer support</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Configuration */}
            <TabsContent value="seo">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">SEO Configuration</CardTitle>
                  <CardDescription>Search engine optimization settings</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription" className="text-white">Default Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={defaultMetaDescription}
                      onChange={(e) => setDefaultMetaDescription(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords" className="text-white">Default Keywords</Label>
                    <Textarea
                      id="keywords"
                      value={defaultKeywords}
                      onChange={(e) => setDefaultKeywords(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gaId" className="text-white">Google Analytics ID</Label>
                    <Input
                      id="gaId"
                      value={googleAnalyticsId}
                      onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gscId" className="text-white">Google Search Console Verification</Label>
                    <Input
                      id="gscId"
                      value={googleSearchConsole}
                      onChange={(e) => setGoogleSearchConsole(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Page-specific SEO Configuration */}
            <TabsContent value="pages">
              <div className="space-y-6">
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-white">Page-Specific SEO</CardTitle>
                        <CardDescription>Configure SEO settings for individual pages</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={initializeDefaultPages}
                          variant="outline"
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Initialize Default Pages
                        </Button>
                        <Button
                          onClick={createNewPageSEO}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Page
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {/* Page SEO List */}
                    <div className="space-y-4">
                      {pageSEOList.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No page SEO configurations found.</p>
                          <p className="text-sm">Click "Initialize Default Pages" to get started.</p>
                        </div>
                      ) : (
                        pageSEOList.map((pageSEO) => (
                          <div
                            key={pageSEO.id}
                            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                          >
                            <div className="flex-1">
                              <h3 className="text-white font-medium">{pageSEO.path}</h3>
                              <p className="text-gray-400 text-sm truncate max-w-md">
                                {pageSEO.title}
                              </p>
                              <p className="text-gray-500 text-xs truncate max-w-lg">
                                {pageSEO.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => editPageSEO(pageSEO)}
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => deletePageSEO(pageSEO.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 hover:bg-red-600/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Page SEO Editor */}
                {isEditingPageSEO && selectedPageSEO && (
                  <Card className="bg-gray-900/90 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">
                        {selectedPageSEO.path ? `Edit Page SEO: ${selectedPageSEO.path}` : "New Page SEO"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pagePath" className="text-white">Page Path</Label>
                          <Input
                            id="pagePath"
                            value={selectedPageSEO.path}
                            onChange={(e) => setSelectedPageSEO({...selectedPageSEO, path: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="/example-page"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pageCanonical" className="text-white">Canonical URL</Label>
                          <Input
                            id="pageCanonical"
                            value={selectedPageSEO.canonical}
                            onChange={(e) => setSelectedPageSEO({...selectedPageSEO, canonical: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="https://example.com/page"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pageTitle" className="text-white">Page Title</Label>
                        <Input
                          id="pageTitle"
                          value={selectedPageSEO.title}
                          onChange={(e) => setSelectedPageSEO({...selectedPageSEO, title: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Page Title - Site Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pageDescription" className="text-white">Meta Description</Label>
                        <Textarea
                          id="pageDescription"
                          value={selectedPageSEO.description}
                          onChange={(e) => setSelectedPageSEO({...selectedPageSEO, description: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                          placeholder="Page description for search engines..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pageKeywords" className="text-white">Keywords</Label>
                        <Textarea
                          id="pageKeywords"
                          value={selectedPageSEO.keywords}
                          onChange={(e) => setSelectedPageSEO({...selectedPageSEO, keywords: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                          placeholder="keyword1, keyword2, keyword3..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ogTitle" className="text-white">OpenGraph Title</Label>
                          <Input
                            id="ogTitle"
                            value={selectedPageSEO.ogTitle}
                            onChange={(e) => setSelectedPageSEO({...selectedPageSEO, ogTitle: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Social media title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ogImage" className="text-white">OpenGraph Image</Label>
                          <Input
                            id="ogImage"
                            value={selectedPageSEO.ogImage}
                            onChange={(e) => setSelectedPageSEO({...selectedPageSEO, ogImage: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="/og-image.png"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ogDescription" className="text-white">OpenGraph Description</Label>
                        <Textarea
                          id="ogDescription"
                          value={selectedPageSEO.ogDescription}
                          onChange={(e) => setSelectedPageSEO({...selectedPageSEO, ogDescription: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Social media description..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority" className="text-white">Sitemap Priority</Label>
                          <Select value={selectedPageSEO.priority} onValueChange={(value) => setSelectedPageSEO({...selectedPageSEO, priority: value})}>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                              <SelectItem value="0.9">0.9</SelectItem>
                              <SelectItem value="0.8">0.8</SelectItem>
                              <SelectItem value="0.7">0.7</SelectItem>
                              <SelectItem value="0.6">0.6</SelectItem>
                              <SelectItem value="0.5">0.5 (Medium)</SelectItem>
                              <SelectItem value="0.4">0.4</SelectItem>
                              <SelectItem value="0.3">0.3</SelectItem>
                              <SelectItem value="0.2">0.2</SelectItem>
                              <SelectItem value="0.1">0.1 (Lowest)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="changefreq" className="text-white">Change Frequency</Label>
                          <Select value={selectedPageSEO.changefreq} onValueChange={(value) => setSelectedPageSEO({...selectedPageSEO, changefreq: value})}>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="always">Always</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="noindex"
                              checked={selectedPageSEO.noindex}
                              onCheckedChange={(checked) => setSelectedPageSEO({...selectedPageSEO, noindex: checked})}
                            />
                            <Label htmlFor="noindex" className="text-white">No Index</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="nofollow"
                              checked={selectedPageSEO.nofollow}
                              onCheckedChange={(checked) => setSelectedPageSEO({...selectedPageSEO, nofollow: checked})}
                            />
                            <Label htmlFor="nofollow" className="text-white">No Follow</Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={savePageSEO}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Save Page SEO
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditingPageSEO(false);
                            setSelectedPageSEO(null);
                          }}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Social Media */}
            <TabsContent value="social">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Social Media Links</CardTitle>
                  <CardDescription>Your social media profiles</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-white">Twitter/X URL</Label>
                    <Input
                      id="twitter"
                      type="url"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="text-white">Facebook URL</Label>
                    <Input
                      id="facebook"
                      type="url"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-white">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-white">GitHub URL</Label>
                    <Input
                      id="github"
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="text-white">YouTube URL</Label>
                    <Input
                      id="youtube"
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telegram" className="text-white">Telegram URL</Label>
                    <Input
                      id="telegram"
                      type="url"
                      value={telegramUrl}
                      onChange={(e) => setTelegramUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Settings */}
            <TabsContent value="content">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Content Settings</CardTitle>
                  <CardDescription>Configure content management options</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="postsPerPage" className="text-white">Posts Per Page</Label>
                    <Select value={postsPerPage} onValueChange={setPostsPerPage}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableComments" className="text-white">Enable Comments</Label>
                      <p className="text-sm text-gray-400">Allow users to comment on posts</p>
                    </div>
                    <Switch
                      id="enableComments"
                      checked={enableComments}
                      onCheckedChange={setEnableComments}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowGuestPosts" className="text-white">Allow Guest Posts</Label>
                      <p className="text-sm text-gray-400">Allow non-admin users to submit posts</p>
                    </div>
                    <Switch
                      id="allowGuestPosts"
                      checked={allowGuestPosts}
                      onCheckedChange={setAllowGuestPosts}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">System Settings</CardTitle>
                  <CardDescription>Configure system-level options</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode" className="text-white">Maintenance Mode</Label>
                      <p className="text-sm text-gray-400">Display maintenance page to visitors</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat" className="text-white">Date Format</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MMM dd, yyyy">MMM dd, yyyy</SelectItem>
                        <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                        <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh</SelectItem>
                        <SelectItem value="America/New_York">America/New York</SelectItem>
                        <SelectItem value="America/Los_Angeles">America/Los Angeles</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
