import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-colors";

  return (
    <div className="min-h-screen bg-[#faf9f7] flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[420px] bg-zinc-900 flex-col justify-between p-10 shrink-0">
        <span className="text-white text-3xl font-semibold tracking-tight">
          Spend<span className="text-orange-500">Sense</span>
        </span>
        <div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Track your income, expenses, and savings — all in one clean, simple place.
          </p>
          <div className="space-y-3">
            {["Smart AI insights", "Income & expense tracking", "Category breakdowns"].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-zinc-400 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-zinc-600 text-xs">© 2025 SpendSense</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-stone-400 text-sm mt-1.5">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-orange-800 transition-colors disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-sm text-stone-400 pt-1">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-700 font-medium hover:text-orange-800"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
