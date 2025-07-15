import React from "react";

export function Sidebar() {
  return (
    <div className="h-screen w-64 p-4 text-white bg-gray-900 mt-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold">LeadCompass</h2>
      </div>
      <nav className="">
        <ul className="space-y-2">
          <li className="block p-3 rounded hover:bg-gray-700">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="block p-3 rounded hover:bg-gray-700">
            <a href="/companies">Companies</a>
          </li>
          <li className="block p-3 rounded hover:bg-gray-700">
            <a href="/analytics">Analytics</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
