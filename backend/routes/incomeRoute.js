import express from "express";

import {
  createIncome,
  getAllIncomes,
  updateIncome,
  deleteIncome,
  getIncomeOverview,
} from "../controllers/incomeController.js";
import { auth } from "../middlewares/auth.js";

const incomeRouter = express.Router();

incomeRouter.post("/create", auth, createIncome);
incomeRouter.get("/all", auth, getAllIncomes);
incomeRouter.put("/update/:id", auth, updateIncome);
incomeRouter.delete("/delete/:id", auth, deleteIncome);
incomeRouter.get("/overview", auth, getIncomeOverview);

export default incomeRouter;
