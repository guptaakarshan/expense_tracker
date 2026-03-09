import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineLogout,
} from "react-icons/hi";

const navItems = [
  { to: "/", label: "Dashboard", icon: HiOutlineViewGrid },
  { to: "/expenses", label: "Expenses", icon: HiOutlineCreditCard },
  { to: "/income", label: "Income", icon: HiOutlineCash },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold text-indigo-600 mb-8 px-2">
          ExpenseTracker
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
      >
        <HiOutlineLogout className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
