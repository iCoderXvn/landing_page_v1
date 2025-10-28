"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { DashboardOverview } from "@/components/dashboard-overview";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: number; username: string } | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Check for existing session on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      // Check if session is still valid (within 24 hours)
      const sessionAge = Date.now() - sessionData.timestamp;
      const maxAge = 24 * 60 * 60 * 1000;
      
      if (sessionAge < maxAge && sessionData.token) {
        setIsAuthenticated(true);
        setCurrentUser(sessionData.user);
        setAuthToken(sessionData.token);
      } else {
        // Session expired
        localStorage.removeItem('adminSession');
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setAuthToken(data.token);
        setLoginForm({ username: "", password: "" });
        
        // Save session and token to localStorage
        const sessionData = {
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          timestamp: Date.now()
        };
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        localStorage.setItem('authToken', data.token);
        
        // Fetch posts and topics after successful login
        await fetchPosts();
        await fetchTopics();
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthToken(null);
    setPosts([]);
    setTopics([]);
    // Remove session and token from localStorage
    localStorage.removeItem('adminSession');
    localStorage.removeItem('authToken');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Password changed successfully');
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordChange(false);
      } else {
        alert(data.error || 'Password change failed');
      }
    } catch (error) {
      console.error('Password change error:', error);
      alert('Password change failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async () => {
    if (!newTopicName.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: newTopicName.trim(),
          description: newTopicDescription.trim() || null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setNewTopicName("");
        setNewTopicDescription("");
        await fetchTopics();
        alert('Topic created successfully');
      } else {
        alert(data.error || 'Failed to create topic');
      }
    } catch (error) {
      console.error('Create topic error:', error);
      alert('Failed to create topic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateTopic = async () => {
    if (!editingTopic || !editingTopic.name.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/topics/${editingTopic.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: editingTopic.name.trim(),
          description: editingTopic.description?.trim() || null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEditingTopic(null);
        await fetchTopics();
        alert('Topic updated successfully');
      } else {
        alert(data.error || 'Failed to update topic');
      }
    } catch (error) {
      console.error('Update topic error:', error);
      alert('Failed to update topic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTopic = async (id: number) => {
    if (!confirm('Are you sure you want to delete this topic? This action cannot be undone.')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/topics/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchTopics();
        alert(data.message || 'Topic deleted successfully');
      } else {
        alert(data.error || 'Failed to delete topic');
      }
    } catch (error) {
      console.error('Delete topic error:', error);
      alert('Failed to delete topic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const insertFormatting = (format: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newContent = "";
    let cursorPosition = start;
    
    switch (format) {
      case "bold":
        newContent = content.substring(0, start) + `**${selectedText || "bold text"}**` + content.substring(end);
        cursorPosition = selectedText ? end + 4 : start + 12;
        break;
      case "italic":
        newContent = content.substring(0, start) + `*${selectedText || "italic text"}*` + content.substring(end);
        cursorPosition = selectedText ? end + 2 : start + 13;
        break;
      case "heading":
        newContent = content.substring(0, start) + `# ${selectedText || "Heading"}` + content.substring(end);
        cursorPosition = selectedText ? end + 2 : start + 9;
        break;
      case "quote":
        newContent = content.substring(0, start) + `> ${selectedText || "Quote text"}` + content.substring(end);
        cursorPosition = selectedText ? end + 2 : start + 12;
        break;
      case "list":
        newContent = content.substring(0, start) + `- ${selectedText || "List item"}` + content.substring(end);
        cursorPosition = selectedText ? end + 2 : start + 11;
        break;
      case "image":
        const imageUrl = prompt("Enter image URL:", "https://example.com/image.jpg");
        if (imageUrl) {
          const altText = selectedText || prompt("Enter alt text (optional):", "Image description") || "Image";
          newContent = content.substring(0, start) + `![${altText}](${imageUrl})` + content.substring(end);
          cursorPosition = start + altText.length + imageUrl.length + 6;
        } else {
          return;
        }
        break;
      case "video":
        const videoUrl = prompt("Enter video URL:", "https://youtube.com/watch?v=... or https://vimeo.com/... or direct video file URL");
        if (videoUrl) {
          const videoTitle = selectedText || prompt("Enter video title (optional):", "Video") || "Video";
          newContent = content.substring(0, start) + `![video](${videoUrl} "${videoTitle}")` + content.substring(end);
          cursorPosition = start + videoTitle.length + videoUrl.length + 12;
        } else {
          return;
        }
        break;
      case "link":
        const linkUrl = prompt("Enter URL:", "https://example.com");
        if (linkUrl) {
          const linkText = selectedText || prompt("Enter link text:", "Link text") || "Link";
          newContent = content.substring(0, start) + `[${linkText}](${linkUrl})` + content.substring(end);
          cursorPosition = start + linkText.length + linkUrl.length + 4;
        } else {
          return;
        }
        break;
      case "embed-link":
        const embedUrl = prompt("Enter URL to embed:", "https://youtube.com/watch?v=...");
        if (embedUrl) {
          const embedTitle = selectedText || prompt("Enter display title:", "Click here to view") || "Embedded Link";
          newContent = content.substring(0, start) + `[🔗 ${embedTitle}](${embedUrl})` + content.substring(end);
          cursorPosition = start + embedTitle.length + embedUrl.length + 7;
        } else {
          return;
        }
        break;
      case "inline-link":
        const inlineUrl = prompt("Enter URL:", "https://facebook.com");
        if (inlineUrl && selectedText) {
          newContent = content.substring(0, start) + `[${selectedText}](${inlineUrl} "Click to open ${selectedText}")` + content.substring(end);
          cursorPosition = end + inlineUrl.length + selectedText.length + 17;
        } else if (inlineUrl) {
          const linkWord = prompt("Enter word/phrase to make clickable:", "Facebook") || "clickable text";
          newContent = content.substring(0, start) + `[${linkWord}](${inlineUrl} "Click to open ${linkWord}")` + content.substring(end);
          cursorPosition = start + linkWord.length + inlineUrl.length + linkWord.length + 17;
        } else {
          return;
        }
        break;
      case "code":
        newContent = content.substring(0, start) + `\`${selectedText || "code"}\`` + content.substring(end);
        cursorPosition = selectedText ? end + 2 : start + 6;
        break;
      case "code-block":
        const language = prompt("Enter programming language (optional):", "javascript") || "";
        newContent = content.substring(0, start) + `\`\`\`${language}\n${selectedText || "// Your code here"}\n\`\`\`` + content.substring(end);
        cursorPosition = selectedText ? end + language.length + 8 : start + language.length + 26;
        break;
      default:
        return;
    }
    
    setContent(newContent);
    
    // Set cursor position after state update
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setLoading(true);
    
    try {
      const isEditing = editingPost !== null;
      const url = isEditing ? `/api/posts/${editingPost.id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title,
          content,
          isPublished: true,
          topicId: selectedTopicId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTitle("");
        setContent("");
        setSelectedTopicId(null);
        setEditingPost(null);
        await fetchPosts(); // Refresh posts list
        alert(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      } else {
        alert(data.error || `Failed to ${isEditing ? 'update' : 'create'} post`);
      }
    } catch (error) {
      console.error(`${editingPost ? 'Update' : 'Create'} post error:`, error);
      alert(`Failed to ${editingPost ? 'update' : 'create'} post. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const editPost = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setSelectedTopicId(post.topicId);
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setTitle("");
    setContent("");
    setSelectedTopicId(null);
  };

  const deletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchPosts(); // Refresh posts list
      } else {
        alert(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete post error:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: number) => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchPosts(); // Refresh posts list
      } else {
        alert(data.error || 'Failed to update post');
      }
    } catch (error) {
      console.error('Toggle publish error:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content: string) => {
    return content
      // Handle video embeds first: output mount points that will be hydrated into VideoPlayer instances
      .replace(/!\[video\]\(([^)]+)\s*(?:"([^"]*)")?\)/g, (match, url, title) => {
        if (isVideoUrl(url)) {
          const id = `admin-video-${Math.random().toString(36).slice(2, 9)}`;
          return `<div id="${id}" class="video-embed my-3" data-video-url="${url}" data-video-title="${title || ''}"></div>`;
        }
        return match;
      })
      // Handle regular images that might be videos based on URL: render mount points for videos, images normally
      .replace(/!\[([^\]]*)\]\(([^)]+)\s*(?:"([^"]*)")?\)/g, (match, altText, url, title) => {
        if (isVideoUrl(url)) {
          const id = `admin-video-${Math.random().toString(36).slice(2, 9)}`;
          return `<div id="${id}" class="video-embed my-3" data-video-url="${url}" data-video-title="${title || altText || ''}"></div>`;
        }
        // Regular image
        return `<img src="${url}" alt="${altText}" title="${title || ''}" class="max-w-full h-auto rounded border my-2" style="max-height: 200px;" />`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold">$1</h1>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br>');
  };

  const hasVideo = (content: string) => {
    // Check for video markdown syntax or video URLs
    const videoRegex = /!\[video\]\(([^)]+)\)|!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = videoRegex.exec(content)) !== null) {
      const url = match[1] || match[3];
      if (url && isVideoUrl(url)) {
        return true;
      }
    }
    return false;
  };

  // Hydrate video embeds in admin live preview so admin can play videos while editing
  useEffect(() => {
    // Wait until DOM is updated with preview HTML
    const hydrate = async () => {
      if (typeof window === 'undefined') return;
      // Find video embed containers inside the live preview area and mount VideoPlayer into them
      const containers = Array.from(document.querySelectorAll('.video-embed')) as HTMLElement[];

      // Import createRoot dynamically to avoid SSR issues
      const { createRoot } = await import('react-dom/client');

      containers.forEach((container) => {
        // Avoid remounting if already mounted
        if ((container as any).__mountedRoot) return;

        const url = container.getAttribute('data-video-url') || '';
        const title = container.getAttribute('data-video-title') || undefined;

        try {
          const root = createRoot(container);
          root.render(React.createElement(VideoPlayer, { src: url, title, className: 'w-full' }));
          (container as any).__mountedRoot = root;
        } catch (err) {
          console.error('Failed to mount video player in admin preview:', err);
        }
      });
    };

    // Small timeout to ensure preview HTML has been injected
    const t = setTimeout(hydrate, 50);
    return () => clearTimeout(t);
  }, [content, editingPost]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900/90 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Username</label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <p className="text-sm text-gray-400 text-center">
                Demo credentials: admin / password
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gray-900/90 backdrop-blur-sm shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setShowTopicManagement(true)} 
                variant="outline" 
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Tags size={16} className="mr-1" />
                Topics
              </Button>
              <Button 
                onClick={() => setShowPasswordChange(true)} 
                variant="outline" 
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Settings size={16} className="mr-1" />
                Settings
              </Button>
              <Button onClick={handleLogout} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Create Post Form - Takes more space */}
          <div className="xl:col-span-3">
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </CardTitle>
                  {editingPost && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={cancelEdit}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
                {editingPost && (
                  <p className="text-sm text-blue-400 mt-2">
                    Editing: {editingPost.title}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter post title"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Topic</label>
                    <Select value={selectedTopicId?.toString() || "none"} onValueChange={(value) => setSelectedTopicId(value === "none" ? null : parseInt(value))}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select a topic (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No topic</SelectItem>
                        {topics.map((topic) => (
                          <SelectItem key={topic.id} value={topic.id.toString()}>
                            {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Content</label>
                    <div className="border rounded-lg border-gray-600">
                      {/* Formatting Toolbar */}
                      <div className="flex items-center gap-2 p-3 border-b bg-gray-800 border-gray-600 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("bold")}
                            title="Bold"
                          >
                            <Bold size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("italic")}
                            title="Italic"
                          >
                            <Italic size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("heading")}
                            title="Heading"
                          >
                            H1
                          </Button>
                        </div>
                        
                        <div className="h-6 w-px bg-gray-600"></div>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("quote")}
                            title="Quote"
                          >
                            <Quote size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("list")}
                            title="List"
                          >
                            <List size={16} />
                          </Button>
                        </div>
                        
                        <div className="h-6 w-px bg-gray-600"></div>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("image")}
                            title="Insert Image"
                          >
                            <Image size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("video")}
                            title="Insert Video (YouTube, Vimeo, or direct URL)"
                          >
                            <Video size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("link")}
                            title="Insert Link"
                          >
                            <Link size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("embed-link")}
                            title="Embed Link with Icon"
                          >
                            <ExternalLink size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("inline-link")}
                            title="Make Text Clickable"
                          >
                            <Type size={16} />
                          </Button>
                        </div>
                        
                        <div className="h-6 w-px bg-gray-600"></div>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("code")}
                            title="Inline Code"
                          >
                            `code`
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertFormatting("code-block")}
                            title="Code Block"
                          >
                            ```
                          </Button>
                        </div>
                      </div>
                      
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content here... Use **bold**, *italic*, # heading, > quote, - list"
                        className="min-h-[600px] border-0 focus:ring-0 resize-y bg-gray-800 text-white placeholder-gray-400 text-sm leading-relaxed"
                        required
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-400">
                        Use markdown formatting: **bold**, *italic*, # heading, &gt;quote, - list, ![video](url "title") for videos
                      </p>
                      <p className="text-xs text-gray-500">
                        {content.length} characters
                      </p>
                    </div>
                  </div>

                  {/* Live Preview */}
                  {content.trim() && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Live Preview</label>
                      <div className="border rounded-lg p-4 bg-gray-800 border-gray-600 max-h-96 overflow-y-auto">
                        <div 
                          className="prose prose-sm max-w-none text-gray-300"
                          dangerouslySetInnerHTML={{ __html: renderContent(content) }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Videos will be fully interactive in the published post
                      </p>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading 
                      ? (editingPost ? 'Updating...' : 'Publishing...') 
                      : (editingPost ? 'Update Post' : 'Publish Post')
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Posts List - Compact sidebar */}
          <div className="xl:col-span-1">
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 sticky top-24 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-white text-lg">Posts ({posts.length})</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto min-h-0 p-4">
                {posts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8 text-sm">No posts yet.</p>
                ) : (
                  <div className="space-y-3">
                    {posts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-3 bg-gray-800 border-gray-600 hover:bg-gray-750 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-sm line-clamp-2 text-white pr-2">{post.title}</h3>
                          <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                            <Badge variant={post.isPublished ? "default" : "secondary"} className="text-xs">
                              {post.isPublished ? "Pub" : "Draft"}
                            </Badge>
                            {hasVideo(post.content) && (
                              <Badge variant="outline" className="text-xs bg-red-600/20 text-red-400 border-red-500/20 flex items-center gap-1">
                                <Play className="w-2 h-2" />
                                Video
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => editPost(post)}
                              disabled={loading}
                              title="Edit post"
                              className="h-7 w-7 p-0"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletePost(post.id)}
                              disabled={loading}
                              title="Delete post"
                              className="h-7 w-7 p-0 hover:text-red-400"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePublish(post.id)}
                            disabled={loading}
                            className="h-6 text-xs px-2"
                          >
                            {post.isPublished ? "Hide" : "Show"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Topic Management Modal */}
      {showTopicManagement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-gray-900/95 backdrop-blur-sm border-gray-700 max-h-[80vh] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Topic Management</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowTopicManagement(false);
                    setEditingTopic(null);
                    setNewTopicName("");
                    setNewTopicDescription("");
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto min-h-0">
              {/* Create New Topic */}
              <div className="mb-6 p-4 border border-gray-600 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Create New Topic</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Topic Name</label>
                    <Input
                      value={newTopicName}
                      onChange={(e) => setNewTopicName(e.target.value)}
                      placeholder="Enter topic name"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Description (Optional)</label>
                    <Textarea
                      value={newTopicDescription}
                      onChange={(e) => setNewTopicDescription(e.target.value)}
                      placeholder="Enter topic description"
                      className="bg-gray-800 border-gray-600 text-white"
                      rows={3}
                    />
                  </div>
                  <Button onClick={createTopic} disabled={loading || !newTopicName.trim()}>
                    <Plus size={16} className="mr-1" />
                    Create Topic
                  </Button>
                </div>
              </div>

              {/* Existing Topics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Existing Topics ({topics.length})</h3>
                {topics.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No topics yet.</p>
                ) : (
                  <div className="space-y-3">
                    {topics.map((topic) => (
                      <div key={topic.id} className="border border-gray-600 rounded-lg p-4">
                        {editingTopic?.id === topic.id ? (
                          <div className="space-y-3">
                            <Input
                              value={editingTopic.name}
                              onChange={(e) => setEditingTopic({...editingTopic, name: e.target.value})}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                            <Textarea
                              value={editingTopic.description || ""}
                              onChange={(e) => setEditingTopic({...editingTopic, description: e.target.value})}
                              className="bg-gray-800 border-gray-600 text-white"
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button onClick={updateTopic} disabled={loading} size="sm">
                                Save
                              </Button>
                              <Button 
                                onClick={() => setEditingTopic(null)} 
                                variant="outline" 
                                size="sm"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-white">{topic.name}</h4>
                                {topic.description && (
                                  <p className="text-sm text-gray-400 mt-1">{topic.description}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                  Created: {new Date(topic.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => setEditingTopic(topic)}
                                  variant="outline"
                                  size="sm"
                                  disabled={loading}
                                >
                                  <Edit size={14} />
                                </Button>
                                <Button
                                  onClick={() => deleteTopic(topic.id)}
                                  variant="destructive"
                                  size="sm"
                                  disabled={loading}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-600">
                <Button 
                  onClick={() => {
                    setShowTopicManagement(false);
                    setEditingTopic(null);
                    setNewTopicName("");
                    setNewTopicDescription("");
                  }}
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-gray-900/95 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Current Password</label>
                  <Input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">New Password</label>
                  <Input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    minLength={6}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Confirm New Password</label>
                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    minLength={6}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Changing...' : 'Change Password'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowPasswordChange(false);
                      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      <Footer />
    </div>
  );
}
