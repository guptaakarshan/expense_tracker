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

const EMPTY_FORM = { description: "", amount: "", date: "", category: "" };

const ExpenseForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (initialData) {
      setForm({
        description: initialData.description || "",
        amount: initialData.amount || "",
        date: initialData.date?.split("T")[0] || "",
        category: initialData.category || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    if (!initialData) {
      setForm(EMPTY_FORM);
    }
  };

  const inputClass =
    "w-full bg-white border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-200 rounded-xl p-6"
    >
      <h3 className="text-sm font-semibold text-zinc-900 mb-5">
        {initialData ? "Edit Expense" : "Add Expense"}
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
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 mt-5">
        <button
          type="submit"
          className="bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-800 transition-colors cursor-pointer"
        >
          {initialData ? "Update" : "Add Expense"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-stone-100 text-stone-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
