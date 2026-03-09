import React from "react";

const Navbar = ({ title }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <span className="text-sm text-gray-600 hidden sm:block">
          {user.name || "User"}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
