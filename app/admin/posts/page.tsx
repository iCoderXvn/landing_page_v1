"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  MoreVertical,
  CheckSquare,
  Square
} from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateWithTimezone, useTimezone } from "@/lib/timezone-utils";

interface Topic {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
}

interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  viewCount: number;
  createdAt: Date;
  isPublished: boolean;
  topicId: number | null;
  topic?: Topic;
}

type SortField = 'title' | 'viewCount' | 'createdAt' | 'isPublished';
type SortOrder = 'asc' | 'desc';

export default function PostsManagementPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Get timezone from admin settings
  const timezone = useTimezone();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const requestInit: RequestInit = authToken ? {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      } : {};

      const [postsRes, topicsRes] = await Promise.all([
        fetch('/api/posts', requestInit),
        fetch('/api/topics', requestInit)
      ]);
      
      const [postsData, topicsData] = await Promise.all([
        postsRes.json(),
        topicsRes.json()
      ]);

      if (postsData.success) setPosts(postsData.posts);
      if (topicsData.success) setTopics(topicsData.topics);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      // Search filter
      if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter === "published" && !post.isPublished) return false;
      if (statusFilter === "draft" && post.isPublished) return false;
      
      // Topic filter
      if (topicFilter !== "all") {
        if (topicFilter === "none" && post.topicId !== null) return false;
        if (topicFilter !== "none" && post.topicId !== parseInt(topicFilter)) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'viewCount':
          comparison = a.viewCount - b.viewCount;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'isPublished':
          comparison = (a.isPublished === b.isPublished) ? 0 : a.isPublished ? 1 : -1;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedPosts.size === paginatedPosts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(paginatedPosts.map(p => p.id)));
    }
  };

  const toggleSelectPost = (id: number) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPosts(newSelected);
  };

  // Bulk actions
  const handleBulkDelete = async () => {
    if (selectedPosts.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedPosts.size} post(s)?`)) return;
    
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      
      await Promise.all(
        Array.from(selectedPosts).map(id => {
          const requestInit: RequestInit = { method: 'DELETE' };
          if (authToken) {
            requestInit.headers = { 'Authorization': `Bearer ${authToken}` };
          }
          return fetch(`/api/posts/${id}`, requestInit);
        })
      );
      setSelectedPosts(new Set());
      await fetchData();
    } catch (error) {
      console.error('Error deleting posts:', error);
      alert('Failed to delete some posts');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkTogglePublish = async (publish: boolean) => {
    if (selectedPosts.size === 0) return;
    
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      
      await Promise.all(
        Array.from(selectedPosts).map(id => {
          const requestInit: RequestInit = { method: 'PATCH' };
          if (authToken) {
            requestInit.headers = { 'Authorization': `Bearer ${authToken}` };
          }
          return fetch(`/api/posts/${id}`, requestInit);
        })
      );
      setSelectedPosts(new Set());
      await fetchData();
    } catch (error) {
      console.error('Error updating posts:', error);
      alert('Failed to update some posts');
    } finally {
      setLoading(false);
    }
  };

  // Individual actions
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`/api/posts/${id}`, { 
        method: 'DELETE',
        headers: authToken ? {
          'Authorization': `Bearer ${authToken}`
        } : {}
      });
      if (response.ok) {
        await fetchData();
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id: number) => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`/api/posts/${id}`, { 
        method: 'PATCH',
        headers: authToken ? {
          'Authorization': `Bearer ${authToken}`
        } : {}
      });
      if (response.ok) {
        await fetchData();
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  // Sort handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return sortOrder === 'asc' ? 
      <ArrowUp className="w-4 h-4 ml-1" /> : 
      <ArrowDown className="w-4 h-4 ml-1" />;
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('authToken');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminSidebar onLogout={handleLogout} />
      
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Posts Management</h2>
                <p className="text-gray-400 mt-1">Manage all your blog posts</p>
              </div>
              <Link href="/admin/posts/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>

            {/* Filters and Search */}
            <Card className="bg-gray-900/90 border-gray-700">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Topic Filter */}
                  <Select value={topicFilter} onValueChange={setTopicFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      <SelectItem value="none">No Topic</SelectItem>
                      {topics.map(topic => (
                        <SelectItem key={topic.id} value={topic.id.toString()}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bulk Actions */}
                {selectedPosts.size > 0 && (
                  <div className="mt-4 flex items-center gap-2 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                    <span className="text-blue-300 text-sm font-medium">
                      {selectedPosts.size} post(s) selected
                    </span>
                    <div className="flex gap-2 ml-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkTogglePublish(true)}
                        className="border-gray-600 text-gray-300"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Publish
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkTogglePublish(false)}
                        className="border-gray-600 text-gray-300"
                      >
                        <EyeOff className="w-4 h-4 mr-1" />
                        Unpublish
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleBulkDelete}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Posts Table */}
            <Card className="bg-gray-900/90 border-gray-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800/50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedPosts.size === paginatedPosts.length && paginatedPosts.length > 0}
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort('title')}
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            Title
                            <SortIcon field="title" />
                          </button>
                        </TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort('isPublished')}
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            Status
                            <SortIcon field="isPublished" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort('viewCount')}
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            Views
                            <SortIcon field="viewCount" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort('createdAt')}
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            Created
                            <SortIcon field="createdAt" />
                          </button>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : paginatedPosts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No posts found
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedPosts.map((post) => (
                          <TableRow
                            key={post.id}
                            className="border-gray-800 hover:bg-gray-800/50"
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedPosts.has(post.id)}
                                onCheckedChange={() => toggleSelectPost(post.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium text-white max-w-md">
                              <div className="truncate">{post.title}</div>
                            </TableCell>
                            <TableCell>
                              {post.topic ? (
                                <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30">
                                  {post.topic.name}
                                </Badge>
                              ) : (
                                <span className="text-gray-500 text-sm">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={post.isPublished ? "default" : "secondary"}>
                                {post.isPublished ? "Published" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {post.viewCount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">
                              {formatDateWithTimezone(post.createdAt, timezone, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link href={`/blog/${post.slug}`} target="_blank">
                                  <Button size="sm" variant="ghost" title="View post">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </Link>
                                <Link href={`/admin/posts/${post.id}/edit`}>
                                  <Button size="sm" variant="ghost" title="Edit post">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </Link>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleTogglePublish(post.id)}
                                  title={post.isPublished ? "Unpublish" : "Publish"}
                                >
                                  {post.isPublished ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDelete(post.id)}
                                  className="text-red-400 hover:text-red-300"
                                  title="Delete post"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                      {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of{' '}
                      {filteredPosts.length} posts
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(v) => {
                          setItemsPerPage(parseInt(v));
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-20 bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-gray-600"
                      >
                        Previous
                      </Button>
                      <span className="text-gray-300 text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="border-gray-600"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-white">
                    {posts.length}
                  </div>
                  <div className="text-sm text-gray-400">Total Posts</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {posts.filter(p => p.isPublished).length}
                  </div>
                  <div className="text-sm text-gray-400">Published</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {posts.filter(p => !p.isPublished).length}
                  </div>
                  <div className="text-sm text-gray-400">Drafts</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {posts.reduce((sum, p) => sum + p.viewCount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Views</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
