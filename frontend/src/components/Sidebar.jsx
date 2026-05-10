import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineLogout,
  HiOutlineLightBulb,
} from "react-icons/hi";

const navItems = [
  { to: "/", label: "Dashboard", icon: HiOutlineViewGrid },
  { to: "/expenses", label: "Expenses", icon: HiOutlineCreditCard },
  { to: "/income", label: "Income", icon: HiOutlineCash },
  { to: "/insights", label: "AI Insights", icon: HiOutlineLightBulb },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-zinc-900 flex flex-col justify-between py-7 px-4">
      {/* Logo */}
      <div>
        <div className="mb-9 px-2">
          <span className="text-white text-lg font-semibold tracking-tight">
            Spend<span className="text-orange-500">Sense</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-orange-400" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
      >
        <HiOutlineLogout className="w-4 h-4" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
