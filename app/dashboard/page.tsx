import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-3xl font-bold mb-6">
          Sales Intelligence Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="Total Companies" value="1257" color="blue" />
          <StatCard title="High Intent" value="89" color="green" />
          <StatCard title="Contacted Today" value="23" color="orange" />
          <StatCard title="Deals Closed" value="7" color="green" />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Dashboard content coming soon....</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
