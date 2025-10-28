"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  FileText,
  BarChart3,
  Activity,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useRouter } from "next/navigation";

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

export default function AnalyticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("week");
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalViews: 0,
    uniqueVisitors: 0,
    avgTimeOnPage: 0,
    viewsChange: 0,
    visitorsChange: 0,
  });
  const [viewsOverTime, setViewsOverTime] = useState<ViewsOverTime[]>([]);
  const [topPosts, setTopPosts] = useState<TopPost[]>([]);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, viewsRes, postsRes] = await Promise.all([
        fetch(`/api/analytics?type=dashboard&period=${period}`),
        fetch(`/api/analytics?type=views-over-time&period=${period}&groupBy=${getGroupBy(period)}`),
        fetch(`/api/analytics?type=top-posts&period=${period}&limit=10`),
      ]);

      const [statsData, viewsData, postsData] = await Promise.all([
        statsRes.json(),
        viewsRes.json(),
        postsRes.json(),
      ]);

      if (statsData.success) {
        setDashboardStats(statsData.data);
      }

      if (viewsData.success) {
        setViewsOverTime(viewsData.data);
      }

      if (postsData.success) {
        setTopPosts(postsData.data);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGroupBy = (period: string) => {
    switch (period) {
      case "day":
        return "hour";
      case "week":
      case "month":
        return "day";
      case "year":
        return "month";
      default:
        return "day";
    }
  };

  const formatPeriod = (period: string, groupBy: string) => {
    if (groupBy === "hour") {
      return period.split(" ")[1] || period;
    }
    return period;
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    localStorage.removeItem("authToken");
    router.push("/admin");
  };

  const formatTimeAgo = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminSidebar onLogout={handleLogout} />

      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Analytics Dashboard</h2>
                <p className="text-gray-400 mt-1">
                  Comprehensive insights into your website performance
                </p>
              </div>
              <Select value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gray-900/90 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Total Views</div>
                          <div className="text-3xl font-bold text-white">
                            {dashboardStats.totalViews.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {dashboardStats.viewsChange >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <span
                              className={`text-sm ${
                                dashboardStats.viewsChange >= 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {Math.abs(dashboardStats.viewsChange).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Eye className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/90 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Unique Visitors</div>
                          <div className="text-3xl font-bold text-white">
                            {dashboardStats.uniqueVisitors.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {dashboardStats.visitorsChange >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <span
                              className={`text-sm ${
                                dashboardStats.visitorsChange >= 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {Math.abs(dashboardStats.visitorsChange).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/90 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Avg. Time</div>
                          <div className="text-3xl font-bold text-white">
                            {formatTimeAgo(dashboardStats.avgTimeOnPage)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Per session</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/90 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Total Posts</div>
                          <div className="text-3xl font-bold text-white">
                            {dashboardStats.totalPosts}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Published</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-yellow-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Views Over Time Chart */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Views & Visitors Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {viewsOverTime.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No data available for this period
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={viewsOverTime}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis
                            dataKey="period"
                            stroke="#9CA3AF"
                            tickFormatter={(value) => formatPeriod(value, getGroupBy(period))}
                          />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "0.5rem",
                              color: "#fff",
                            }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="views"
                            stroke="#3B82F6"
                            fillOpacity={1}
                            fill="url(#colorViews)"
                            name="Page Views"
                          />
                          <Area
                            type="monotone"
                            dataKey="visitors"
                            stroke="#10B981"
                            fillOpacity={1}
                            fill="url(#colorVisitors)"
                            name="Unique Visitors"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>

                {/* Top Posts */}
                <Card className="bg-gray-900/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Top Performing Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {topPosts.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No posts data available
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {topPosts.map((post, index) => (
                          <div
                            key={post.id}
                            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-semibold flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white truncate">
                                  {post.title}
                                </div>
                                <div className="text-sm text-gray-400">/{post.slug}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 ml-4">
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-400">
                                  {post.views.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">views</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-green-400">
                                  {post.unique_visitors.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">visitors</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
