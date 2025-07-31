"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { IntentTrendCharts } from "@/components/charts/intent-trends";
import { fetchAnalytics } from "@/lib/analytics-data";

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                className="h-32 bg-gray-200 rounded-lg animate-pulse"
                key={i}
              ></div>
            ))}
          </div>
          <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) return null;

  const totalCompanies = analytics.conversionFunnel[0]?.count || 0;
  const qualifiedCompanies = analytics.conversionFunnel[1]?.count || 0;
  const avgIntentScore = Math.round(
    analytics.intentTrends.reduce((sum, day) => sum + day.score, 0) /
      analytics.intentTrends.length
  );
  const conversionRate = Math.round(
    (analytics.conversionFunnel[3]?.count / totalCompanies) * 100
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-gray-600">Performance insights and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Companies"
            value={totalCompanies}
            color="blue"
          />
          <StatCard
            title="Qualified Leads"
            value={qualifiedCompanies}
            color="green"
          />
          <StatCard
            title="Avg Intent Score"
            value={avgIntentScore}
            color="orange"
          />
          <StatCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            color="red"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <IntentTrendCharts data={analytics.intentTrends} />
          <div className="space-y-4">
            {analytics.industryBreakdown.map((item) => (
              <div
                key={item.industry}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{item.industry}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{item.count} companies</div>
                  <div className="text-sm text-gray-500">
                    {item.avgIntent}% avg intent
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
        <div className="space-y-4">
          {analytics.conversionFunnel.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{stage.stage}</span>
                <span className="text-sm text-gray-500">
                  {stage.count} ({stage.percentage}% )
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
