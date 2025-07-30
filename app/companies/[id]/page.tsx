"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { fetchCompanies } from "@/lib/mock-companies";
import { useEffect, useState } from "react";

interface CompanyDetailsProps {
  params: Promise<{ id: string }>; // params is a promise we need to unwrap the promise in next 15
}

export default function CompanyDetail({ params }: CompanyDetailsProps) {
  // add routing capability
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  // we need to unwrap the promise
  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  // wait until id is set before search within the companies array
  const company = id ? companies?.find((company) => company.id) : null;

  if (isLoading || !id) {
    return (
      <DashboardLayout>
        <div>Loading company details...</div>
      </DashboardLayout>
    );
  }

  if (!company) {
    return <div className="">Company not found</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back button */}
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer"
          onClick={() => router.back()}
        >
          ← Back to Companies
        </button>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-gray-600">{company.website}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-lg font-bold ${
              company.intentScore >= 80
                ? "bg-green-100 text-green-800"
                : company.intentScore >= 60
                ? "bg-orange-100 text-orange-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Intent Score: {company.intentScore}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Employees" value={company.employees} color="blue" />
          <StatCard title="Industry" value={company.industry} color="green" />
          <StatCard
            title="Intent Score"
            value={company.intentScore}
            color="orange"
          />
          <StatCard
            title="Last Activity"
            value={company.lastActivity}
            color="red"
          />
        </div>

        {/* Company Details */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-3">
              <div className="">
                <span className="font-medium">Description:</span>
                <p className="text-gray-600 mt-1">{company.description}</p>
              </div>
              <div className="">
                <span className="font-medium">Location:</span>
                <span className="text-gray-600 ml-2">{company.location}</span>
              </div>
              <div className="">
                <span className="font-medium">Website:</span>
                <span className="text-blue-600 ml-2">{company.website}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Intent Signals</h2>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <p className="font-medium text-green-800">
                    High engagement detected
                  </p>
                  <p className="text-sm text-green-600">
                    Visited pricing page 3 times this week
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="font-medium text-blue-800">
                    Content downloaded
                  </p>
                  <p className="text-sm text-blue-600">
                    Downloaded whitepaper 2 days ago
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-400">
                  <p className="font-medium text-orange-800">Recent searches</p>
                  <p className="text-sm text-orange-600">
                    Searched for "{company.industry} software"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
