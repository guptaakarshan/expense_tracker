import React from "react";

const Navbar = ({ title }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="flex items-center justify-between mb-8 pb-6 border-b border-stone-200">
      <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">{title}</h1>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-orange-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <span className="text-sm text-stone-500 hidden sm:block">
          {user.name || "User"}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
