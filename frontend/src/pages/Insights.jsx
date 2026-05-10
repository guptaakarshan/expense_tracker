import React, { useState } from "react";
import { HiOutlineLightBulb, HiOutlineRefresh } from "react-icons/hi";
import Navbar from "../components/Navbar";
import { getFinancialInsights } from "../services/aiService";

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getFinancialInsights();
      setInsights(data.insights);
      setSummary(data.summary || null);
    } catch (err) {
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const parseBullets = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^[•\-\*]\s*/, ""));
  };

  return (
    <div>
      <Navbar title="AI Insights" />

      {/* Header card */}
      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-base">Financial Insights</p>
            <p className="text-zinc-400 text-sm mt-1">
              AI analysis of your income &amp; spending over the last 90 days
            </p>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center gap-2 bg-orange-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-800 transition-colors disabled:opacity-50 cursor-pointer shrink-0 ml-4"
          >
            {loading ? (
              <>
                <HiOutlineRefresh className="w-4 h-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <HiOutlineLightBulb className="w-4 h-4" />
                {insights ? "Refresh" : "Generate insights"}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Summary stats */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide mb-2">
              Total Income
            </p>
            <p className="text-xl font-semibold font-mono text-emerald-700">
              ₹{summary.totalIncome?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide mb-2">
              Total Expenses
            </p>
            <p className="text-xl font-semibold font-mono text-red-600">
              ₹{summary.totalExpense?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide mb-2">
              Net Savings
            </p>
            <p
              className={`text-xl font-semibold font-mono ${
                summary.savings >= 0 ? "text-zinc-900" : "text-red-600"
              }`}
            >
              {summary.savings < 0 ? "−" : ""}₹
              {Math.abs(summary.savings)?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      )}

      {/* Top spending category badge */}
      {summary?.topCategory && summary.topCategory !== "None" && (
        <div className="bg-white border border-stone-200 rounded-xl px-5 py-4 mb-6 flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
            <HiOutlineLightBulb className="w-4 h-4 text-orange-700" />
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-0.5">Top spending category</p>
            <p className="text-sm font-semibold text-zinc-900">
              {summary.topCategory}{" "}
              <span className="text-stone-400 font-normal">
                · {summary.topCategoryPercent}% of spend
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Insights list */}
      {insights && (
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <p className="text-sm font-semibold text-zinc-900 mb-5">
            Your insights
          </p>
          <ul className="space-y-4">
            {parseBullets(insights).map((point, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-[11px] font-mono text-stone-400 mt-0.5 shrink-0 w-5 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-zinc-700 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty state */}
      {!insights && !loading && !error && (
        <div className="bg-white border border-stone-200 rounded-xl p-14 text-center">
          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
            <HiOutlineLightBulb className="w-5 h-5 text-stone-400" />
          </div>
          <p className="text-stone-400 text-sm">
            Click "Generate insights" to get AI-powered analysis
          </p>
        </div>
      )}
    </div>
  );
};

export default Insights;
