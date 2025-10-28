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
} from "recharts";
import {
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  Share2,
  TrendingUp,
  ExternalLink,
  Users,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useRouter } from "next/navigation";

interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

interface DeviceStat {
  device: string;
  count: number;
  percentage: number;
}

interface BrowserStat {
  browser: string;
  count: number;
  percentage: number;
}

interface TopReferrer {
  referrer: string;
  visits: number;
}

const DEVICE_COLORS = {
  desktop: "#3B82F6",
  mobile: "#10B981",
  tablet: "#F59E0B",
};

const BROWSER_COLORS = [
  "#3B82F6", // Chrome - Blue
  "#F97316", // Firefox - Orange
  "#06B6D4", // Safari - Cyan
  "#8B5CF6", // Edge - Purple
  "#EC4899", // Opera - Pink
  "#6B7280", // Other - Gray
];

const SOURCE_COLORS = [
  "#10B981", // Direct - Green
  "#3B82F6", // Referral - Blue
  "#F59E0B", // Social - Yellow
  "#8B5CF6", // Search - Purple
  "#EC4899", // Email - Pink
  "#6B7280", // Other - Gray
];

export default function TrafficPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("week");
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [deviceStats, setDeviceStats] = useState<DeviceStat[]>([]);
  const [browserStats, setBrowserStats] = useState<BrowserStat[]>([]);
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([]);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sourcesRes, devicesRes, browsersRes, referrersRes] = await Promise.all([
        fetch(`/api/analytics?type=traffic-sources&period=${period}`),
        fetch(`/api/analytics?type=device-stats&period=${period}`),
        fetch(`/api/analytics?type=browser-stats&period=${period}`),
        fetch(`/api/analytics?type=top-referrers&period=${period}&limit=10`),
      ]);

      const [sourcesData, devicesData, browsersData, referrersData] = await Promise.all([
        sourcesRes.json(),
        devicesRes.json(),
        browsersRes.json(),
        referrersRes.json(),
      ]);

      if (sourcesData.success) {
        setTrafficSources(sourcesData.data || []);
      }

      if (devicesData.success) {
        setDeviceStats(devicesData.data || []);
      }

      if (browsersData.success) {
        setBrowserStats(browsersData.data || []);
      }

      if (referrersData.success) {
        setTopReferrers(referrersData.data || []);
      }
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-5 h-5" />;
      case "tablet":
        return <Tablet className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const totalTrafficCount = trafficSources.reduce((sum, source) => sum + source.visits, 0);
  const totalDeviceCount = deviceStats.reduce((sum, device) => sum + device.count, 0);
  const totalBrowserCount = browserStats.reduce((sum, browser) => sum + browser.count, 0);

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
                <h2 className="text-3xl font-bold text-white">Traffic Analytics</h2>
                <p className="text-gray-400 mt-1">
                  Detailed insights about your traffic sources and visitor behavior
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Total Visits</div>
                      <div className="text-3xl font-bold text-white">
                        {totalTrafficCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Traffic Sources</div>
                      <div className="text-3xl font-bold text-white">
                        {trafficSources.length}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Share2 className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Top Device</div>
                      <div className="text-2xl font-bold text-white capitalize">
                        {deviceStats[0]?.device || "N/A"}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      {deviceStats[0] ? getDeviceIcon(deviceStats[0].device) : <Monitor className="w-6 h-6" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <Card className="bg-gray-900/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Traffic Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                    </div>
                  ) : trafficSources.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No traffic data available</div>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={trafficSources}
                            dataKey="visits"
                            nameKey="source"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={(entry) => `${entry.source}: ${entry.percentage}%`}
                          >
                            {trafficSources.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={SOURCE_COLORS[index % SOURCE_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "0.5rem",
                              color: "#fff",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="space-y-2 mt-4">
                        {trafficSources.map((source, index) => (
                          <div
                            key={source.source}
                            className="flex items-center justify-between p-2 bg-gray-800/50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: SOURCE_COLORS[index % SOURCE_COLORS.length],
                                }}
                              />
                              <span className="text-white capitalize">{source.source}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400">{source.visits.toLocaleString()}</span>
                              <Badge variant="outline" className="text-xs">
                                {source.percentage}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Device Distribution */}
              <Card className="bg-gray-900/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Device Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                    </div>
                  ) : deviceStats.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No device data available</div>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={deviceStats}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="device" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "0.5rem",
                              color: "#fff",
                            }}
                          />
                          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                            {deviceStats.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  DEVICE_COLORS[
                                    entry.device.toLowerCase() as keyof typeof DEVICE_COLORS
                                  ] || "#6B7280"
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>

                      <div className="space-y-2 mt-4">
                        {deviceStats.map((device) => (
                          <div
                            key={device.device}
                            className="flex items-center justify-between p-2 bg-gray-800/50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(device.device)}
                              <span className="text-white capitalize">{device.device}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400">{device.count.toLocaleString()}</span>
                              <Badge variant="outline" className="text-xs">
                                {device.percentage}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Browser Statistics */}
            <Card className="bg-gray-900/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Chrome className="w-5 h-5" />
                  Browser Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                  </div>
                ) : browserStats.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No browser data available</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {browserStats.map((browser, index) => (
                      <div
                        key={browser.browser}
                        className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{
                                backgroundColor: BROWSER_COLORS[index % BROWSER_COLORS.length],
                              }}
                            />
                            <span className="font-medium text-white">{browser.browser}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {browser.percentage}%
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">
                          {browser.count.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">visits</div>
                        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${browser.percentage}%`,
                              backgroundColor: BROWSER_COLORS[index % BROWSER_COLORS.length],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Referrers */}
            <Card className="bg-gray-900/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Top Referrers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                  </div>
                ) : topReferrers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No referrer data available</div>
                ) : (
                  <div className="space-y-2">
                    {topReferrers.map((referrer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-white truncate">
                              {referrer.referrer || "Direct Traffic"}
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-4">
                          <Users className="w-3 h-3 mr-1" />
                          {referrer.visits.toLocaleString()}
                        </Badge>
                      </div>
                    ))}
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
