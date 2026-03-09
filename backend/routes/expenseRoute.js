import express from "express";

import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getExpenseOverview,
} from "../controllers/expenseController.js";
import { auth } from "../middlewares/auth.js";

const expenseRouter = express.Router();

expenseRouter.post("/create", auth, createExpense);
expenseRouter.get("/all", auth, getAllExpenses);
expenseRouter.put("/update/:id", auth, updateExpense);
expenseRouter.delete("/delete/:id", auth, deleteExpense);
expenseRouter.get("/overview", auth, getExpenseOverview);

export default expenseRouter;
