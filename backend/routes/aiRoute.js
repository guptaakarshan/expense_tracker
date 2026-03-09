import express from "express";
import { getFinancialInsights } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";

const aiRouter = express.Router();

aiRouter.get("/insights", auth, getFinancialInsights);

export default aiRouter;
