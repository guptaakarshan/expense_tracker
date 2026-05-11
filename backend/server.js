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
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow localhost and any Vercel deployment (production + previews)
    if (
      origin.startsWith("http://localhost") ||
      origin.endsWith(".vercel.app") ||
      origin === "https://spendsense.akarshan.dev"
    ) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
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

// Global error handler — must be last
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
