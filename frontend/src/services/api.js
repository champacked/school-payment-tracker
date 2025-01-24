import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`, // Replace with your actual API base URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (username, password) => {
  const response = await api.post("/auth/signup", { username, password });
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

//getTranscations == getAllTransactions
export const getTransactions = async () => {
  const response = await api.get("/api/transactions");
  return response.data;
};

export const getTransactionsBySchool = async (schoolId) => {
  const response = await api.get(`/api/transactions/school/${schoolId}`);
  return response.data;
};

export const checkTransactionStatus = async (customOrderId) => {
  const response = await api.get(`/check-status/${customOrderId}`);
  return response.data;
};
