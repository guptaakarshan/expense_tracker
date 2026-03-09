import React from "react";

const SummaryCard = ({ title, amount, icon: Icon, color }) => {
  const colorClasses = {
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{title}</span>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorClasses[color] || colorClasses.indigo}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800">
        ₹{amount?.toLocaleString("en-IN") || "0"}
      </p>
    </div>
  );
};

export default SummaryCard;
