import React from "react";

const colorMap = {
  green: {
    label: "text-emerald-700",
    value: "text-emerald-700",
    icon: "bg-emerald-50 text-emerald-700",
  },
  red: {
    label: "text-stone-500",
    value: "text-red-600",
    icon: "bg-red-50 text-red-500",
  },
  neutral: {
    label: "text-stone-500",
    value: "text-zinc-900",
    icon: "bg-orange-50 text-orange-700",
  },
};

const SummaryCard = ({ title, amount, icon: Icon, color = "neutral" }) => {
  const colors = colorMap[color] || colorMap.neutral;
  const isNegative = amount < 0;

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wide mb-3 ${colors.label}`}>
            {title}
          </p>
          <p className={`text-2xl font-semibold font-mono tracking-tight ${isNegative ? "text-red-600" : colors.value}`}>
            {isNegative ? "-" : ""}₹{Math.abs(amount)?.toLocaleString("en-IN") || "0"}
          </p>
        </div>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colors.icon}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
