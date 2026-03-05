import expenseModel from "../models/expenseModel.js";
import incomeModel from "../models/incomeModel.js";

export const getDashboardOverview = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();
  const last30Days = new Date();
  last30Days.setDate(now.getDate() - 30);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const [incomes, expenses] = await Promise.all([
      incomeModel.find({ userId, date: { $gte: last30Days, $lte:now } }),
      expenseModel.find({ userId, date: { $gte: last30Days, $lte:now } }),
    ]);

    const monthlyIncome = incomes.reduce(
      (acc, cur) => acc + Number(cur.amount || 0),
      0
    );

    const monthlyExpense = expenses.reduce(
      (acc, cur) => acc + Number(cur.amount || 0),
      0
    );

    const categories = Array.from(
      new Set([...expenses, ...incomes].map((item) => item.category))
    );

    const savings = monthlyIncome - monthlyExpense;

    const savingsRate =
      monthlyIncome === 0
        ? 0
        : Math.round((savings / monthlyIncome) * 100);

    const recentTransactions = [
      ...incomes.map((i) => ({ ...i._doc, type: "income" })),
      ...expenses.map((e) => ({ ...e._doc, type: "expense" })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const spendByCategory = {};

    for (const exp of expenses) {
      const cat = exp.category || "Other";
      spendByCategory[cat] =
        (spendByCategory[cat] || 0) + Number(exp.amount || 0);
    }

    const expenseDistribution = Object.entries(spendByCategory).map(
      ([category, amount]) => ({
        category,
        amount,
        percent:
          monthlyExpense === 0
            ? 0
            : Math.round((amount / monthlyExpense) * 100),
      })
    );

    res.status(200).json({
      success: true,
      message: "Dashboard overview fetched successfully",
      monthlyIncome,
      monthlyExpense,
      savings,
      savingsRate,
      categories,
      recentTransactions,
      expenseDistribution,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};