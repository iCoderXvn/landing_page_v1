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
} from "lucide-react";

interface Setting {
  key: string;
  value: string;
  category: string;
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

  useEffect(() => {
    fetchSettings();
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
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
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
