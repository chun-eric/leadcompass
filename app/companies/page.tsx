"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CompanyCard } from "@/components/ui/company-card";
import {
  Company,
  companySizes,
  industries,
  fetchCompanies,
} from "@/lib/mock-companies";

export default function CompaniesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="">
          <h1 className="">Companies</h1>
          <p className="">companies</p>
        </div>

        {/* Search and Filter */}
        <div className=""></div>
      </div>
    </DashboardLayout>
  );
}
