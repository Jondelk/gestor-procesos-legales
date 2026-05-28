import axios from "axios";

const API = "http://localhost:4000/api/estados";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const analizarPDF = async (formData) => {
  const res = await axios.post(`${API}/analizar-pdf`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const obtenerActuaciones = async () => {
  const res = await axios.get(`${API}/actuaciones`, getConfig());
  return res.data;
};