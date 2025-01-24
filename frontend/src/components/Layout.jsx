//Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { School, LayoutDashboard, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Layout() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <nav
        className={`fixed w-64 h-full p-4 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-8">
          <School
            className={`w-8 h-8 ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
          <h1
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            School Payments
          </h1>
        </div>

        <div className="space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-200"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/school-transactions"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-200"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <School className="w-5 h-5" />
            School Transactions
          </Link>
        </div>
      </nav>
      <button
        onClick={toggleTheme}
        className={`absolute top-0 right-0 p-2 m-6 rounded-lg ${
          isDarkMode
            ? "hover:bg-gray-700 text-gray-200"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <main
        className={`ml-64 p-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}
      >
        <Outlet />
      </main>
    </div>
  );
}
