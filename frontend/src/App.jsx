import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";

// Protects routes that require authentication
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar />
      <main className="ml-60 flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

// Redirects logged-in users away from auth pages
const AuthRoute = () => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
};

const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;