import express from "express";

import { getDashboardOverview } from "../controllers/dashboardController.js";
import { auth } from "../middlewares/auth.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/overview", auth, getDashboardOverview);     

export default dashboardRouter;