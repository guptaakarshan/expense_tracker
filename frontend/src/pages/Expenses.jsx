import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";
import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const { data } = await getAllExpenses();
      setExpenses(data.expense || []);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      setError("Failed to load expenses. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async (form) => {
    try {
      setError("");
      await createExpense(form);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to add expense", err);
      setError(err.response?.data?.message || "Failed to add expense.");
    }
  };

  const handleUpdate = async (form) => {
    try {
      setError("");
      await updateExpense(editing._id, form);
      setEditing(null);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to update expense", err);
      setError(err.response?.data?.message || "Failed to update expense.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to delete expense", err);
      setError(err.response?.data?.message || "Failed to delete expense.");
    }
  };

  return (
    <div>
      <Navbar title="Expenses" />

      <div className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <ExpenseForm
          onSubmit={editing ? handleUpdate : handleAdd}
          initialData={editing}
          onCancel={() => setEditing(null)}
        />

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-stone-400 text-sm">Loading...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-400">
                {expenses.length} transaction{expenses.length !== 1 ? "s" : ""}
              </p>
            </div>
            <TransactionList
              transactions={expenses}
              type="expense"
              onEdit={(item) => setEditing(item)}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Expenses;
