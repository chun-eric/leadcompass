export interface AnalyticsData {
  intentTrends: Array<{ date: string; score: number; companies: number }>;
  industryBreakdown: Array<{
    industry: string;
    count: number;
    avgIntent: number;
  }>;
  activityTimeline: Array<{ date: string; activities: number }>;
  conversionFunnel: Array<{ stage: string; count: number; percentage: number }>;
}

export const mockAnalytics: AnalyticsData = {
  intentTrends: [
    { date: "2024-01-01", score: 65, companies: 45 },
    { date: "2024-01-02", score: 68, companies: 52 },
    { date: "2024-01-03", score: 72, companies: 58 },
    { date: "2024-01-04", score: 70, companies: 61 },
    { date: "2024-01-05", score: 75, companies: 67 },
    { date: "2024-01-06", score: 78, companies: 73 },
    { date: "2024-01-07", score: 82, companies: 79 },
  ],

  industryBreakdown: [
    { industry: "Software", count: 25, avgIntent: 78 },
    { industry: "SaaS", count: 18, avgIntent: 82 },
    { industry: "Fintech", count: 15, avgIntent: 75 },
    { industry: "Healthcare", count: 12, avgIntent: 68 },
    { industry: "Analytics", count: 10, avgIntent: 85 },
  ],

  activityTimeline: [
    { date: "2024-01-01", activities: 125 },
    { date: "2024-01-02", activities: 143 },
    { date: "2024-01-03", activities: 167 },
    { date: "2024-01-04", activities: 156 },
    { date: "2024-01-05", activities: 189 },
    { date: "2024-01-06", activities: 201 },
    { date: "2024-01-07", activities: 234 },
  ],

  conversionFunnel: [
    { stage: "Identified", count: 1247, percentage: 100 },
    { stage: "Qualified", count: 623, percentage: 50 },
    { stage: "Engaged", count: 187, percentage: 15 },
    { stage: "Converted", count: 37, percentage: 3 },
  ],
};

export const fetchAnalytics = async (): Promise<AnalyticsData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockAnalytics;
};
