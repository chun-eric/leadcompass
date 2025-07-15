import React from "react";
import { Company } from "@/lib/mock-companies";

interface CompanyCardProps {
  company: Company;
  onClick?: (company: Company) => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const getIntentColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getEmployeeSize = (employees: number) => {
    if (employees <= 10) return "Startup";
    if (employees <= 50) return "Small";
    if (employees <= 200) return "Medium";
    if (employees <= 1000) return "Large";
    return "Enterprise";
  };

  return (
    <div
      className="bg-white rounded-lg border hover:shadow-md transition-shadow  cursor-pointer p-6"
      onClick={() => onClick?.(company)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 ">
          <h3 className="font-semibold text-lg text-gray-900">
            {company.name}
          </h3>
          <p className="">{company.intentScore}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getIntentColor(
            company.intentScore
          )}`}
        >
          {company.intentScore}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {company.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{company.industry}</span>
          <span>•</span>
          <span>{company.employees} employees</span>
          <span>•</span>
          <span>{getEmployeeSize(company.employees)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{company.location}</span>
        <span className="text-sm text-gray-500">{company.lastActivity}</span>
      </div>
    </div>
  );
}
