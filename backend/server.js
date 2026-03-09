import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";
import aiRouter from "./routes/aiRoute.js";
const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(express.json());
app.use(cors({
  origin: ["https://expense-tracker-six-pi-11.vercel.app", "http://localhost:5173"],
}));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/users", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/ai", aiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
