import { GoogleGenerativeAI } from "@google/generative-ai";
import expenseModel from "../models/expenseModel.js";
import incomeModel from "../models/incomeModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getFinancialInsights = async (req, res) => {
  const userId = req.user.id;

  try {
    // last 90 days
    const since = new Date();
    since.setDate(since.getDate() - 90);
    since.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const [incomes, expenses] = await Promise.all([
      incomeModel.find({ userId, date: { $gte: since, $lte: endOfToday } }),
      expenseModel.find({ userId, date: { $gte: since, $lte: endOfToday } }),
    ]);

    if (incomes.length === 0 && expenses.length === 0) {
      return res.status(200).json({
        success: true,
        insights:
          "• No financial data available yet. Start adding transactions to generate insights.",
      });
    }

    // totals
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const savings = totalIncome - totalExpense;

    // category breakdown
    const expenseByCategory = {};
    expenses.forEach((e) => {
      const category = e.category || "Other";
      expenseByCategory[category] =
        (expenseByCategory[category] || 0) + e.amount;
    });

    // find largest category
    let topCategory = "None";
    let topCategoryAmount = 0;

    Object.entries(expenseByCategory).forEach(([cat, amt]) => {
      if (amt > topCategoryAmount) {
        topCategory = cat;
        topCategoryAmount = amt;
      }
    });

    const topCategoryPercent =
      totalExpense > 0
        ? Math.round((topCategoryAmount / totalExpense) * 100)
        : 0;

    const expenseIncomeRatio =
      totalIncome > 0 ? (totalExpense / totalIncome).toFixed(2) : 0;

    const avgExpense =
      expenses.length > 0
        ? Math.round(totalExpense / expenses.length)
        : 0;

    // prompt
    const prompt = `
You are a financial insights engine for a personal finance dashboard.

Generate EXACTLY 5 insights.

Rules:
- Each insight must be ONE short sentence
- Maximum 20 words
- Use bullet symbol •
- No explanations
- No paragraphs

Financial Summary (Last 90 Days)

Income: ₹${totalIncome}
Expenses: ₹${totalExpense}
Net Savings: ₹${savings}

Expense/Income Ratio: ${expenseIncomeRatio}

Largest Expense Category: ${topCategory}
Amount: ₹${topCategoryAmount}
Share of spending: ${topCategoryPercent}%

Average Expense Transaction: ₹${avgExpense}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    let insights = result.response.text();

    // clean output
    insights = insights
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("•"))
      .slice(0, 5)
      .join("\n");

    res.status(200).json({
      success: true,
      insights,
      summary: {
        totalIncome,
        totalExpense,
        savings,
        expenseIncomeRatio,
        topCategory,
        topCategoryPercent,
        expenseByCategory,
      },
    });
  } catch (error) {
    console.error("AI Insights error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate financial insights",
    });
  }
};