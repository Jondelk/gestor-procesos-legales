import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};