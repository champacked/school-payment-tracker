import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTransactions } from "../services/api";
import TransactionTable from "../components/TransactionTable";
import { useTheme } from "../hooks/useTheme";

export default function Dashboard() {
  const { isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    startDate: undefined,
    endDate: undefined,
    searchQuery: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions(filters);
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Transactions Overview
      </h2>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search
              className={`absolute left-3 top-3 w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 placeholder-gray-500"
              }`}
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-4">
          <select
            className={`px-4 py-2 rounded-lg border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            }`}
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option
              value=""
              className={isDarkMode ? "bg-gray-800" : "bg-white"}
            >
              All Status
            </option>
            <option
              value="Success"
              className={isDarkMode ? "bg-gray-800" : "bg-white"}
            >
              Success
            </option>
            <option
              value="Pending"
              className={isDarkMode ? "bg-gray-800" : "bg-white"}
            >
              Pending
            </option>
            <option
              value="Failed"
              className={isDarkMode ? "bg-gray-800" : "bg-white"}
            >
              Failed
            </option>
          </select>

          <div className="flex gap-2">
            <DatePicker
              selected={filters.startDate}
              onChange={(date) =>
                setFilters({ ...filters, startDate: date || undefined })
              }
              placeholderText="Start Date"
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 placeholder-gray-500"
              }`}
            />
            <DatePicker
              selected={filters.endDate}
              onChange={(date) =>
                setFilters({ ...filters, endDate: date || undefined })
              }
              placeholderText="End Date"
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 placeholder-gray-500"
              }`}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <TransactionTable transactions={transactions} isDarkMode={isDarkMode} />
      )}
    </div>
  );
}
