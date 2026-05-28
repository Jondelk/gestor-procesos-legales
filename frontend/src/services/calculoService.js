import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/calculo`;

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const calcularDiasHabiles = async (data) => {
  const res = await axios.post(`${API}/dias-habiles`, data, getConfig());
  return res.data;
};