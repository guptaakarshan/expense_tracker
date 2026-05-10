import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be at least 1"],
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    default: "expense",
  },
},{
  timestamps: true,
});

const expenseModel = mongoose.model("Expense", expenseSchema);
export default expenseModel;