import axios from "axios";

const API_URL = "http://localhost:8080/api/escenas";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const obtenerEscenaPorId = (id) => api.get(`/${id}`);
export const crearEscena = (proyecto) => api.post("/", proyecto);
export const actualizarEscena = (id, proyecto) => api.put(`/${id}`, proyecto);
export const eliminarEscena = (id) => api.delete(`/${id}`);

export const obtenerEscenas = async (proyecto) => {
  
    const response = await axios.get(
      `http://localhost:8080/api/secuencias/${proyecto}/escenas` 
    );
  
       
    return response.data;
  
};

export const obtenerEscenaId = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/escenas/${id}`
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