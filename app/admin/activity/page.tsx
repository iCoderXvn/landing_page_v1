"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Eye,
  Clock,
  Activity as ActivityIcon,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  TrendingUp,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useRouter } from "next/navigation";
import { formatDateWithTimezone, useTimezone, formatTimeDate } from '@/lib/timezone-utils';

interface RecentActivity {
  id: number;
  pagePath: string;
  postTitle?: string;
  deviceType: string;
  browser: string;
  os: string;
  country: string;
  createdAt: string;
}

interface ActivePage {
  path: string;
  title?: string;
  viewers: number;
}

interface LiveStats {
  activeVisitors: number;
  pageViewsLast5Min: number;
  avgTimeOnPage: number;
  activePages: ActivePage[];
}

export default function ActivityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [liveStats, setLiveStats] = useState<LiveStats>({
    activeVisitors: 0,
    pageViewsLast5Min: 0,
    avgTimeOnPage: 0,
    activePages: [],
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const timezone = useTimezone();

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchData();
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        fetch('/api/analytics?type=live-stats'),
        fetch('/api/analytics?type=recent-activity&limit=20')
      ]);

      const [statsData, activityData] = await Promise.all([
        statsRes.json(),
        activityRes.json()
      ]);

      if (statsData.success) {
        setLiveStats(statsData.data);
      }

      if (activityData.success) {
        setRecentActivity(activityData.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching activity data:', error);
      setLoading(false);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    // Parse the date string as UTC and get timezone-aware current time
    const date = new Date(dateString + (dateString.includes('Z') ? '' : 'Z')); // Ensure UTC parsing
    const now = new Date();
    
    // Convert both dates to the configured timezone for accurate comparison
    const formattedDate = formatDateWithTimezone(date, timezone, { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    const formattedNow = formatDateWithTimezone(now, timezone, { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    // Parse the formatted strings back to dates for comparison
    const timezoneDate = new Date(formattedDate);
    const timezoneNow = new Date(formattedNow);
    const seconds = Math.floor((timezoneNow.getTime() - timezoneDate.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
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
              <div>
                <h2 className="text-3xl font-bold text-white">Live Activity</h2>
                <p className="text-gray-400 mt-1">Real-time visitor tracking and activity feed</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    autoRefresh
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-white animate-pulse' : 'bg-gray-500'}`} />
                    {autoRefresh ? 'Live' : 'Paused'}
                  </div>
                </button>
              </div>
            </div>

            {/* Live Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Active Visitors</div>
                      <div className="text-3xl font-bold text-green-400">
                        {liveStats.activeVisitors}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    In the last 5 minutes
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Page Views</div>
                      <div className="text-3xl font-bold text-blue-400">
                        {liveStats.pageViewsLast5Min}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last 5 minutes
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Avg. Time</div>
                      <div className="text-3xl font-bold text-purple-400">
                        {formatTime(liveStats.avgTimeOnPage)}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Average session
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Active Pages</div>
                      <div className="text-3xl font-bold text-yellow-400">
                        {liveStats.activePages.length}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <ActivityIcon className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Pages with visitors
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Pages */}
            <Card className="bg-gray-900/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Active Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                  </div>
                ) : liveStats.activePages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No active pages at the moment
                  </div>
                ) : (
                  <div className="space-y-3">
                    {liveStats.activePages.map((page, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">
                            {page.title || page.path}
                          </div>
                          {page.title && (
                            <div className="text-sm text-gray-400 truncate">
                              {page.path}
                            </div>
                          )}
                        </div>
                        <Badge variant="outline" className="ml-4 bg-green-500/10 text-green-300 border-green-500/30">
                          <Users className="w-3 h-3 mr-1" />
                          {page.viewers} viewing
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card className="bg-gray-900/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ActivityIcon className="w-5 h-5" />
                  Recent Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800/50">
                        <TableHead>Page</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Browser</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="flex justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : recentActivity.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No recent activity
                          </TableCell>
                        </TableRow>
                      ) : (
                        recentActivity.map((activity) => (
                          <TableRow
                            key={activity.id}
                            className="border-gray-800 hover:bg-gray-800/50"
                          >
                            <TableCell className="max-w-md">
                              <div className="flex flex-col">
                                {activity.postTitle && (
                                  <span className="font-medium text-white truncate">
                                    {activity.postTitle}
                                  </span>
                                )}
                                <span className="text-sm text-gray-400 truncate">
                                  {activity.pagePath}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDeviceIcon(activity.deviceType)}
                                <span className="text-gray-300 capitalize">
                                  {activity.deviceType || 'Unknown'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-gray-300">
                                {activity.browser || 'Unknown'}
                                {activity.os && (
                                  <span className="text-gray-500 text-sm ml-1">
                                    ({activity.os})
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-gray-300">
                                <Globe className="w-4 h-4 text-gray-400" />
                                {activity.country || 'Unknown'}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-gray-400 text-sm">
                                {formatTimeAgo(activity.createdAt)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {recentActivity.length > 0 && (
                  <div className="p-4 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-400">
                      Showing last {recentActivity.length} activities • Auto-refresh:{' '}
                      <span className={autoRefresh ? 'text-green-400' : 'text-gray-500'}>
                        {autoRefresh ? 'ON' : 'OFF'}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
