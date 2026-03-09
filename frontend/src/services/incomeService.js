import API from "./api";

export const createIncome = (data) => API.post("/income/create", data);

export const getAllIncomes = () => API.get("/income/all");

export const updateIncome = (id, data) => API.put(`/income/update/${id}`, data);

export const deleteIncome = (id) => API.delete(`/income/delete/${id}`);
