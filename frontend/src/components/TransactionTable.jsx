// TransactionTable.jsx
import React from "react";
import { format } from "date-fns";

export default function TransactionTable({ transactions = [], isDarkMode }) {
  if (!Array.isArray(transactions)) {
    console.error("Transactions prop must be an array");
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-100"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <tr>
            <th className="p-4 text-left font-semibold">Sr.No.</th>
            <th className="p-4 text-left font-semibold">School ID</th>
            <th className="p-4 text-left font-semibold">Gateway</th>
            <th className="p-4 text-left font-semibold">Order Amount</th>
            <th className="p-4 text-left font-semibold">Transaction Amount</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Custom Order ID</th>
            <th className="p-4 text-left font-semibold">Date</th>
          </tr>
        </thead>
        <tbody className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          {transactions.map((transaction, index) => {
            const createdAt = new Date(transaction.created_at);
            const formattedDate = createdAt.getTime()
              ? format(createdAt, "MMM d, yyyy")
              : "N/A";

            const uniqueKey =
              transaction.collect_id ||
              transaction.custom_order_id ||
              `${transaction.collect_id}-${transaction.custom_order_id}`;

            return (
              <tr
                key={uniqueKey}
                className={`border-b ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                } transform transition-all duration-300 ease-in-out hover:scale-105`} // Added hover effect
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{transaction.school_id}</td>
                <td className="p-4">{transaction.gateway}</td>
                <td className="p-4">
                  $
                  {transaction.order_amount
                    ? transaction.order_amount.toFixed(2)
                    : "N/A"}
                </td>
                <td className="p-4">
                  $
                  {transaction.transaction_amount
                    ? transaction.transaction_amount.toFixed(2)
                    : "N/A"}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      transaction.status === "Success"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "Failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status || "Success"}
                  </span>
                </td>
                <td className="p-4">{transaction.custom_order_id}</td>
                <td className="p-4">{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
