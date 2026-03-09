import React, { useState, useEffect } from "react";

const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

const ExpenseForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        description: initialData.description || "",
        amount: initialData.amount || "",
        date: initialData.date?.split("T")[0] || "",
        category: initialData.category || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    if (!initialData) {
      setForm({ description: "", amount: "", date: "", category: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {initialData ? "Edit Expense" : "Add Expense"}
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
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          {initialData ? "Update" : "Add Expense"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
