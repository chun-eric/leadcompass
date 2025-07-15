import React from "react";
import { Sidebar } from "./sidebar";

// This is the entire dashboard layout and will have other layouts within it

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
