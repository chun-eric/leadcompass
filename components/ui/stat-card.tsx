import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  color: "blue" | "green" | "orange" | "red";
}

export function StatCard({ title, value, color }: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition:shadow">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}
