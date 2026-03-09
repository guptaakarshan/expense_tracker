import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { getDashboardOverview } from "../services/dashboardService";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Refetch every time the user navigates to this page
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getDashboardOverview();
        setData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.key]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  const summaryCards = [
    {
      title: "Total Balance",
      amount: data?.savings || 0,
      icon: HiOutlineTrendingUp,
      color: "indigo",
    },
    {
      title: "Total Income",
      amount: data?.monthlyIncome || 0,
      icon: HiOutlineCash,
      color: "green",
    },
    {
      title: "Total Expenses",
      amount: data?.monthlyExpense || 0,
      icon: HiOutlineCreditCard,
      color: "red",
    },
  ];

  return (
    <div>
      <Navbar title="Dashboard" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Distribution Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            Expense by Category
          </h3>
          {data?.expenseDistribution?.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.expenseDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#4F46E5"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-16">
              No expense data yet
            </p>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            Recent Transactions
          </h3>
          {data?.recentTransactions?.length > 0 ? (
            <div className="space-y-3">
              {data.recentTransactions.map((txn) => (
                <div
                  key={txn._id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm text-gray-800">{txn.description}</p>
                    <p className="text-xs text-gray-400">
                      {txn.category} •{" "}
                      {new Date(txn.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      txn.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"}₹
                    {txn.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-16">
              No recent transactions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
