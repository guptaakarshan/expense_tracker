import expenseModel from "../models/expenseModel.js";
import XLSX from "xlsx";

//add expense
export const createExpense = async (req, res) => {
  const { description, amount, date, category } = req.body;
  if (!description || !amount || !date || !category) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than 0",
    });
  }
  try {
    const newExpense = await expenseModel.create({
      description,
      amount,
      date: new Date(date),
      category,
      userId: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "Expense created successfully",
      newExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get all expenses
export const getAllExpenses = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await expenseModel.find({ userId }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//update expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const { description, amount } = req.body;
  try {
    const updatedExpense = await expenseModel
      .findByIdAndUpdate(
        { _id: id, userId: userId },
        { description, amount },
        { new: true, runValidators: true },
      )
      .select("description amount");

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      updatedExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//to delete an expense

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const deletedExpense = await expenseModel.findByIdAndDelete({
      _id: id,
      userId: userId,
    });
    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      deletedExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//to download the data in excel format
export const downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await expenseModel
      .find({ userId })
      .select("description amount category date");

    if (!expenses.length) {
      return res.status(404).json({
        success: false,
        message: "No expense data found",
      });
    }

    // Convert MongoDB data to plain JSON
    const data = expenses.map((expense) => ({
      Description: expense.description,
      Amount: expense.amount,
      Category: expense.category,
      Date: expense.date.toISOString().split("T")[0],
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense");

    // Convert workbook to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Set headers for download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense-data.xlsx",
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.send(buffer);
  } catch (error) {
    console.error("Excel export error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//to get expense overview
export const getExpenseOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await expenseModel.find({ userId });
    sort({ date: -1 }).select("amount category description date");

    const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
    const averageExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;
    const numberOfTransactions = expenses.length;

    const recentTransactions = expenses.slice(0, 9);

    const categories = expenses.reduce((acc, curr) => {
      if (!acc.includes(curr.category)) {
        acc.push(curr.category);
      }
      return acc;
    }, []);
    res.status(200).json({
      success: true,
      message: "Expense overview fetched successfully",
      categories,
      expenses,
      totalExpense,
      averageExpense,
      numberOfTransactions,
      recentTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
