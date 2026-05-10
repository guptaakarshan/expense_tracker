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
  Cell,
} from "recharts";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { getDashboardOverview } from "../services/dashboardService";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-stone-300 mt-0.5">₹{payload[0].value?.toLocaleString("en-IN")}</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchData = async () => {
      try {
        const res = await getDashboardOverview();
        setData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.key]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-stone-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  const summaryCards = [
    {
      title: "Net Balance",
      amount: data?.savings || 0,
      icon: HiOutlineTrendingUp,
      color: "neutral",
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

      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      {/* Savings rate strip */}
      {data?.savingsRate !== undefined && (
        <div className="bg-white border border-stone-200 rounded-xl px-5 py-4 mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">
              Savings rate (last 30 days)
            </p>
            <p className={`text-2xl font-semibold font-mono mt-1 ${data.savingsRate >= 0 ? "text-emerald-700" : "text-red-600"}`}>
              {data.savingsRate}%
            </p>
          </div>
          <div className="flex-1 mx-8">
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{ width: `${Math.min(Math.max(data.savingsRate, 0), 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense by Category */}
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-zinc-900 mb-5">
            Spending by category
          </p>
          {data?.expenseDistribution?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={data.expenseDistribution}
                barSize={24}
                margin={{ top: 0, right: 0, bottom: 0, left: -10 }}
              >
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 11, fill: "#a8a29e" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#a8a29e" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f4f2" }} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {data.expenseDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#c2410c" : "#e8d5cc"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48">
              <p className="text-stone-400 text-sm">No expense data yet</p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-zinc-900 mb-5">
            Recent transactions
          </p>
          {data?.recentTransactions?.length > 0 ? (
            <div className="space-y-0.5">
              {data.recentTransactions.map((txn) => (
                <div
                  key={txn._id}
                  className="flex items-center justify-between py-2.5 border-b border-stone-50 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-800 font-medium truncate">
                      {txn.description}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {txn.category} ·{" "}
                      {new Date(txn.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold font-mono ml-4 shrink-0 ${
                      txn.type === "income" ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "−"}₹
                    {txn.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              <p className="text-stone-400 text-sm">No recent transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
