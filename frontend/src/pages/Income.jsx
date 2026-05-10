import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} from "../services/incomeService";

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Business",
  "Other",
];

const EMPTY_FORM = { description: "", amount: "", date: "", category: "" };

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchIncomes = async () => {
    try {
      const { data } = await getAllIncomes();
      setIncomes(data.income || []);
    } catch (err) {
      console.error("Failed to fetch incomes", err);
      setError("Failed to load incomes. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  useEffect(() => {
    if (editing) {
      setForm({
        description: editing.description || "",
        amount: editing.amount || "",
        date: editing.date?.split("T")[0] || "",
        category: editing.category || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing) {
        await updateIncome(editing._id, { ...form, amount: Number(form.amount) });
        setEditing(null);
      } else {
        await createIncome({ ...form, amount: Number(form.amount) });
        setForm(EMPTY_FORM);
      }
      fetchIncomes();
    } catch (err) {
      console.error("Failed to save income", err);
      setError(err.response?.data?.message || "Failed to save income.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteIncome(id);
      fetchIncomes();
    } catch (err) {
      console.error("Failed to delete income", err);
      setError(err.response?.data?.message || "Failed to delete income.");
    }
  };

  const inputClass =
    "w-full bg-white border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-colors";

  return (
    <div>
      <Navbar title="Income" />

      <div className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Add / Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-stone-200 rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold text-zinc-900 mb-5">
            {editing ? "Edit Income" : "Add Income"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount (₹)"
              value={form.amount}
              onChange={handleChange}
              required
              min="1"
              className={inputClass}
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select category</option>
              {INCOME_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-5">
            <button
              type="submit"
              className="bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              {editing ? "Update" : "Add Income"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="bg-stone-100 text-stone-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-stone-400 text-sm">Loading...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-400">
                {incomes.length} transaction{incomes.length !== 1 ? "s" : ""}
              </p>
            </div>
            <TransactionList
              transactions={incomes}
              type="income"
              onEdit={(item) => setEditing(item)}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Income;
