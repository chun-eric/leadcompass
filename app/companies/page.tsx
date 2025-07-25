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
        <div className="">Loading companies...</div>
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
        </div>

        {/* <p className="">You searched for: {searchTerm}</p> */}
        <p className="">Found {filteredCompanies?.length} companies</p>

        {/* Show company names */}
        {/* <ul>
          {filteredCompanies?.map((company) => (
            <li className="" key={company.id}>
              {company.name}
            </li>
          ))}
        </ul> */}

        {/* Grid of company cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={(company) => console.log("Clicked", company.name)}
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
