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

  // Load comapnies Data
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  // filter companies based on search
  const filteredCompanies = companies?.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("Filtered companies:", filteredCompanies);

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
        <div className="">
          <input
            type="text"
            placeholder="Search companies"
            className="w-full max-w-md px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <p className="">You searched for: {searchTerm}</p> */}

        <p className="">Found {companies?.length} companies</p>

        {/* Show company names */}
        <ul>
          {companies?.map((company) => (
            <li className="" key={company.id}>
              {company.name}
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
}
