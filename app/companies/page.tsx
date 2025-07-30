"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CompanyCard } from "@/components/ui/company-card";
import {
  Company,
  companySizes,
  industries,
  fetchCompanies,
} from "@/lib/mock-companies";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cva } from "class-variance-authority";

// Want a page where
// 1. Search for companies by name
// 2. Filter by industry, size, intent score
// 3. See results in a grid of cards
// 4. Make search actually filter the companies

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState(""); // track what user types in search box
  const [selectedIndustry, setSelectedIndustry] = useState(""); // filter industry
  const [intentFilter, setIntentFilter] = useState("");

  // Load comapnies Data
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  // filter companies based on search
  const filteredCompanies =
    companies?.filter((company) => {
      const matchesSearch = company.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesIndustry =
        !selectedIndustry || company.industry === selectedIndustry;

      const matchesIntent =
        !intentFilter ||
        (() => {
          if (intentFilter === "high") return company.intentScore >= 80;
          if (intentFilter === "medium")
            return company.intentScore >= 60 && company.intentScore < 80;
          if (intentFilter === "low") return company.intentScore < 60;
          return true;
        })(); // iife

      return matchesSearch && matchesIndustry && matchesIntent;
    }) || [];
  console.log("Filtered companies:", filteredCompanies);

  // Get a list of unique industries
  const industries = [
    ...new Set(companies?.map((company) => company.industry)),
  ];

  // Load companies data
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          </div>

          {/* Loading skeleton */}
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="">
          <h1 className="text-3xl font-bold mb-6">Companies</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search companies"
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-blue-300 focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-blue-300 "
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option value={industry} key={industry} className="">
                {industry}
              </option>
            ))}
          </select>
          <select
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-blue-300 "
          >
            <option value="">All Intent Levels</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedIndustry("");
              setIntentFilter("");
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear Filters
          </button>
        </div>

        {/* <p className="">You searched for: {searchTerm}</p> */}
        <p className="">Found {filteredCompanies?.length} companies</p>

        {/* Quick stats - add this before the company grid */}
        {filteredCompanies.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredCompanies.filter((c) => c.intentScore >= 80).length}
              </div>
              <div className="text-sm text-gray-600">High Intent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {
                  filteredCompanies.filter(
                    (c) => c.intentScore >= 60 && c.intentScore < 80
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Medium Intent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(
                  filteredCompanies.reduce((sum, c) => sum + c.employees, 0) /
                    filteredCompanies.length || 0
                )}
              </div>
              <div className="text-sm text-gray-600">Avg Employees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(filteredCompanies.map((c) => c.industry)).size}
              </div>
              <div className="text-sm text-gray-600">Industries</div>
            </div>
          </div>
        )}

        {/* Grid of company cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={(company) => console.log("Clicked:", company.name)}
            />
          ))}
        </div>

        {/* When no companies match the filters */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No companies found matching your criteria.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your filters or search term.{" "}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
