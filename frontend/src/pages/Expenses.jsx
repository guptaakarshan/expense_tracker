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

  const fetchExpenses = async () => {
    try {
      const { data } = await getAllExpenses();
      setExpenses(data.expense || []);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async (form) => {
    try {
      await createExpense(form);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  const handleUpdate = async (form) => {
    try {
      await updateExpense(editing._id, form);
      setEditing(null);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to update expense", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  return (
    <div>
      <Navbar title="Expenses" />

      <div className="space-y-6">
        <ExpenseForm
          onSubmit={editing ? handleUpdate : handleAdd}
          initialData={editing}
          onCancel={() => setEditing(null)}
        />

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : (
          <TransactionList
            transactions={expenses}
            type="expense"
            onEdit={(item) => setEditing(item)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Expenses;
