import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";

export async function enviarRespuestas(datos) {
  const response = await axios.post(`${API_URL}/api/diagnostico`, datos);
  return response.data;
}
