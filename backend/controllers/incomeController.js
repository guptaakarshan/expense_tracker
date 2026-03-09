import incomeModel from "../models/incomeModel.js";
export const createIncome = async (req, res) => {
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
    const newIncome = await incomeModel.create({
      description,
      amount,
      date: new Date(date),
      category,
      userId: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "Income created successfully",
      newIncome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get all incomes
export const getAllIncomes = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "Income fetched successfully",
      income,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//update income
export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const { description, amount } = req.body;
  try {
    const updatedIncome = await incomeModel
      .findByIdAndUpdate(
        { _id: id, userId: userId },
        { description, amount },
        { new: true, runValidators: true },
      )
      .select("description amount");

    if (!updatedIncome) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      updatedIncome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//to delete an income

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const deletedIncome = await incomeModel.findByIdAndDelete({
      _id: id,
      userId: userId,
    });
    if (!deletedIncome) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
      deletedIncome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


//to get income overview
export const getIncomeOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await incomeModel.find({ userId });
    sort({ date: -1 }).select("amount category description date");

    const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
    const numberOfTransactions = incomes.length;

    const recentTransactions = incomes.slice(0, 9);

    const categories = incomes.reduce((acc, curr) => {
      if (!acc.includes(curr.category)) {
        acc.push(curr.category);
      }
      return acc;
    }, []);
    res.status(200).json({
      success: true,
      message: "Income overview fetched successfully",
      categories,
      incomes,
      totalIncome,
      averageIncome,
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
