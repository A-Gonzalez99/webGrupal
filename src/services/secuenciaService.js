import axios from "axios";

const API_URL = "http://localhost:8080/api/secuencias";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const obtenerSecuenciaPorId = (id) => api.get(`/${id}`);
export const crearSecuencia = (proyecto) => api.post("/", proyecto);
export const actualizarSecuencia = (id, proyecto) => api.put(`/${id}`, proyecto);
export const eliminarSecuencia = (id) => api.delete(`/${id}`);

export const obtenerSecuencia = async (proyecto) => {
  
    const response = await axios.get(
      `http://localhost:8080/api/proyectos/${proyecto}/secuencias`
    );
  
       
    return response.data;
  
};


export const obtenerSecuenciaId = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/secuencias/${id}`
    );
    console.log(response.data);
    console.log("Proyecto:", response.data.nombre);

    setProyecto(response.data);    

    if (setError) {
      setError(null);
    }

    return response.data;
  } catch (err) {

    if (setError) {
      setError("Error getting locations.");
    }

    return null;
  }
};