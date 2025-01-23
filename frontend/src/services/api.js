import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8789", // Replace with your actual API base URL
});

export const getTransactions = async (params) => {
  const response = await api.get("/transactions", { params });
  return response.data;
};

export const getTransactionsBySchool = async (schoolId) => {
  const response = await api.get(`/transactions/school/${schoolId}`);
  return response.data;
};

export const checkTransactionStatus = async (customOrderId) => {
  const response = await api.get(`/check-status/${customOrderId}`);
  return response.data;
};
