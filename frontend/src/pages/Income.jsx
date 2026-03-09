import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import {
  getAllIncomes,
  createIncome,
  deleteIncome,
} from "../services/incomeService";

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Business",
  "Other",
];

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const fetchIncomes = async () => {
    try {
      const { data } = await getAllIncomes();
      setIncomes(data.income || []);
    } catch (err) {
      console.error("Failed to fetch incomes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createIncome({ ...form, amount: Number(form.amount) });
      setForm({ description: "", amount: "", date: "", category: "" });
      fetchIncomes();
    } catch (err) {
      console.error("Failed to add income", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
      fetchIncomes();
    } catch (err) {
      console.error("Failed to delete income", err);
    }
  };

  return (
    <div>
      <Navbar title="Income" />

      <div className="space-y-6">
        {/* Add Income Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add Income
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
              min="1"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {INCOME_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Add Income
          </button>
        </form>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : (
          <TransactionList
            transactions={incomes}
            type="income"
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Income;
