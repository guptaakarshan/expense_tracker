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

  // Parse bullet points from the AI response
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

      {/* Generate Button */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <HiOutlineLightBulb className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Financial Insights
              </h3>
              <p className="text-sm text-gray-500">
                AI-powered analysis of your income and spending patterns
              </p>
            </div>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <HiOutlineRefresh className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <HiOutlineLightBulb className="w-4 h-4" />
                {insights ? "Refresh" : "Generate Insights"}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Income (90d)</p>
            <p className="text-xl font-bold text-green-600">
              ₹{summary.totalIncome?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Expenses (90d)</p>
            <p className="text-xl font-bold text-red-600">
              ₹{summary.totalExpense?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Net Savings (90d)</p>
            <p
              className={`text-xl font-bold ${summary.savings >= 0 ? "text-indigo-600" : "text-red-600"}`}
            >
              ₹{summary.savings?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      )}

      {/* Insights List */}
      {insights && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            Your Personalized Insights
          </h3>
          <ul className="space-y-3">
            {parseBullets(insights).map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="text-indigo-500 mt-0.5 shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty state */}
      {!insights && !loading && !error && (
        <div className="bg-white rounded-xl border border-gray-100 p-12 shadow-sm text-center">
          <HiOutlineLightBulb className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            Click "Generate Insights" to get AI-powered financial advice based
            on your transactions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Insights;
