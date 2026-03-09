import API from "./api";

export const createExpense = (data) => API.post("/expense/create", data);

export const getAllExpenses = () => API.get("/expense/all");

export const updateExpense = (id, data) => API.put(`/expense/update/${id}`, data);

export const deleteExpense = (id) => API.delete(`/expense/delete/${id}`);
