import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/procesos`;

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProcesos = async () => {
  const res = await axios.get(API, getConfig());
  return res.data;
};

export const createProceso = async (data) => {
  const res = await axios.post(API, data, getConfig());
  return res.data;
};

export const updateProceso = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data, getConfig());
  return res.data;
};

export const deleteProceso = async (id) => {
  const res = await axios.delete(`${API}/${id}`, getConfig());
  return res.data;
};

export const getProcesosPendientes = async () => {
  const res = await axios.get(`${API}/pendientes`, getConfig());
  return res.data;
};