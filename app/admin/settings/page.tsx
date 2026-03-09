"use client";

import { useEffect, useState } from "react";

type AnalyticsData = {
  summary: {
    totalSessions: number;
    totalPageViews: number;
    conversions: number;
    phoneCalls: number;
    formStarts: number;
    formCompletes: number;
    conversionRate: string;
  };
  dailyStats: Array<{
    date: string;
    total_events: number;
    unique_visitors: number;
    page_views: number;
    phone_clicks: number;
    form_starts: number;
    form_completions: number;
  }>;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ source: string; count: number }>;
  deviceBreakdown: Array<{ type: string; count: number }>;
};

export default function AdminSettingsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    loadAnalytics();
  }, [days]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics?days=${days}`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white">Analytics</h1>
        <p className="text-[#999999]">Loading analytics data...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white">Analytics</h1>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <p className="text-red-400">
            Failed to load analytics. Make sure the analytics schema is set up
            in Supabase.
          </p>
        </div>
      </div>
    );
  }

  const { summary, dailyStats, topPages, topReferrers, deviceBreakdown } =
    analytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Analytics</h1>
          <p className="text-[#999999] mt-2">
            Track visitor behavior and conversions
          </p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="input-field w-48"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <p className="text-[#999999] text-sm mb-1">Total Visits</p>
          <p className="text-3xl font-bold text-white">
            {summary.totalSessions.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <p className="text-[#999999] text-sm mb-1">Page Views</p>
          <p className="text-3xl font-bold text-white">
            {summary.totalPageViews.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <p className="text-[#999999] text-sm mb-1">Phone Clicks</p>
          <p className="text-3xl font-bold text-primary">
            {summary.phoneCalls.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <p className="text-[#999999] text-sm mb-1">Form Submissions</p>
          <p className="text-3xl font-bold text-[#4ADE80]">
            {summary.formCompletes.toLocaleString()}
          </p>
          <p className="text-xs text-[#999999] mt-1">
            {summary.conversionRate}% conversion rate
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Top Pages</h2>
          <div className="space-y-3">
            {topPages.slice(0, 8).map((page, index) => {
              const maxViews = topPages[0]?.views || 1;
              const percentage = (page.views / maxViews) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-white truncate flex-1">
                      {page.path}
                    </span>
                    <span className="text-[#999999] ml-2">{page.views}</span>
                  </div>
                  <div className="w-full bg-[#262626] rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Traffic Sources</h2>
          <div className="space-y-3">
            {topReferrers.slice(0, 8).map((referrer, index) => {
              const maxCount = topReferrers[0]?.count || 1;
              const percentage = (referrer.count / maxCount) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-white truncate flex-1">
                      {referrer.source}
                    </span>
                    <span className="text-[#999999] ml-2">
                      {referrer.count}
                    </span>
                  </div>
                  <div className="w-full bg-[#262626] rounded-full h-2">
                    <div
                      className="bg-[#4ADE80] h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Device Breakdown & Daily Trend */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Devices</h2>
          <div className="space-y-4">
            {deviceBreakdown.map((device, index) => {
              const total = deviceBreakdown.reduce(
                (sum, d) => sum + d.count,
                0,
              );
              const percentage = ((device.count / total) * 100).toFixed(1);
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white capitalize">{device.type}</span>
                    <span className="text-[#999999] text-sm">
                      {device.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#262626] rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Daily Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#999999] border-b border-[#404040]">
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Visitors</th>
                  <th className="pb-2 pr-4">Page Views</th>
                  <th className="pb-2 pr-4">Calls</th>
                  <th className="pb-2">Forms</th>
                </tr>
              </thead>
              <tbody>
                {dailyStats.slice(0, 10).map((day, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#262626] text-white"
                  >
                    <td className="py-2 pr-4">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-2 pr-4">{day.unique_visitors}</td>
                    <td className="py-2 pr-4">{day.page_views}</td>
                    <td className="py-2 pr-4 text-primary">
                      {day.phone_clicks}
                    </td>
                    <td className="py-2 text-[#4ADE80]">
                      {day.form_completions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Setup Info */}
      <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-3">About Analytics</h2>
        <div className="text-sm text-[#999999] space-y-2">
          <p>
            📊 <strong className="text-white">Page Views:</strong> Automatically
            tracked for all public pages
          </p>
          <p>
            📞 <strong className="text-white">Phone Clicks:</strong> Tracked
            when users click phone numbers
          </p>
          <p>
            📝 <strong className="text-white">Form Tracking:</strong> Add form
            tracking to booking flow for funnel analysis
          </p>
          <p>
            🔗 <strong className="text-white">UTM Parameters:</strong> Use
            ?utm_source=source&utm_medium=medium&utm_campaign=campaign in your
            marketing links
          </p>
        </div>
      </div>
    </div>
  );
}
