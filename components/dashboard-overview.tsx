"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Eye,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  RefreshCw
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  viewsChange: number;
  visitorsChange: number;
}

interface ViewsOverTime {
  period: string;
  views: number;
  visitors: number;
}

interface TopPost {
  id: number;
  title: string;
  slug: string;
  views: number;
  unique_visitors: number;
}

interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

export function DashboardOverview() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [viewsData, setViewsData] = useState<ViewsOverTime[]>([]);
  const [topPosts, setTopPosts] = useState<TopPost[]>([]);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [activeVisitors, setActiveVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, viewsRes, postsRes, sourcesRes, activeRes] = await Promise.all([
        fetch(`/api/analytics?type=dashboard&period=${period}`),
        fetch(`/api/analytics?type=views-over-time&period=${period}&groupBy=${period === 'day' ? 'hour' : 'day'}`),
        fetch(`/api/analytics?type=top-posts&period=${period}&limit=5`),
        fetch(`/api/analytics?type=traffic-sources&period=${period}`),
        fetch(`/api/analytics?type=active-visitors`)
      ]);

      const [statsData, viewsData, postsData, sourcesData, activeData] = await Promise.all([
        statsRes.json(),
        viewsRes.json(),
        postsRes.json(),
        sourcesRes.json(),
        activeRes.json()
      ]);

      if (statsData.success) setStats(statsData.data);
      if (viewsData.success) setViewsData(viewsData.data);
      if (postsData.success) setTopPosts(postsData.data);
      if (sourcesData.success) setTrafficSources(sourcesData.data);
      if (activeData.success) setActiveVisitors(activeData.data.count);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [period]);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Period Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400 mt-1">Monitor your blog's performance and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            className="border-gray-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">Total Posts</CardTitle>
            <FileText className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats?.totalPosts || 0}</div>
            <p className="text-xs text-blue-300 mt-1">Published articles</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">Total Views</CardTitle>
            <Eye className="w-4 h-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats?.totalViews.toLocaleString() || 0}</div>
            <div className="flex items-center mt-1">
              {stats && stats.viewsChange > 0 ? (
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
              )}
              <p className={`text-xs ${stats && stats.viewsChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats ? Math.abs(stats.viewsChange).toFixed(1) : 0}% vs previous {period}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-200">Unique Visitors</CardTitle>
            <Users className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats?.uniqueVisitors.toLocaleString() || 0}</div>
            <div className="flex items-center mt-1">
              {stats && stats.visitorsChange > 0 ? (
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
              )}
              <p className={`text-xs ${stats && stats.visitorsChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats ? Math.abs(stats.visitorsChange).toFixed(1) : 0}% vs previous {period}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 border-orange-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-200">Active Now</CardTitle>
            <Activity className="w-4 h-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{activeVisitors}</div>
            <p className="text-xs text-orange-300 mt-1">Live visitors (last 5 min)</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time Chart */}
        <Card className="bg-gray-900/90 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="period" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name="Views" />
                <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={2} name="Visitors" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources Pie Chart */}
        <Card className="bg-gray-900/90 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, percent }) => `${source} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="visits"
                  nameKey="source"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Posts Table */}
      <Card className="bg-gray-900/90 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Post Title</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Views</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Unique Visitors</th>
                </tr>
              </thead>
              <tbody>
                {topPosts.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  topPosts.map((post, index) => (
                    <tr key={post.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-600">{index + 1}</span>
                          <span className="text-white">{post.title}</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-blue-400 font-semibold">
                        {post.views.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-purple-400 font-semibold">
                        {post.unique_visitors.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
