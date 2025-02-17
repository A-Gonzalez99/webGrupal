import axios from "axios";

const API_URL = "http://localhost:8080/api/localizacion";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Endpoints de Proyectos
export const obtenerLocationPorId = (id) => api.get(`/${id}`);
export const crearStoryboard = (proyecto) => api.post("/", proyecto);
export const actualizarStoryboard = (id, proyecto) => api.put(`/${id}`, proyecto);
export const eliminarStoryboard = (id) => api.delete(`/${id}`);

export const obtenerLocalizaciones = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/proyectos/${id}/localizaciones`
    );
    
    if(setProyecto){
      setProyecto(response.data);
    }

    if (setError) {
      setError(null);
    }

    return response.data;
  } catch (err) {

    if (setError) {
      setError(err.response?.data || "Error getting locations.");
    }

    return null;
  }
};

export const obtenerLocation = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/localizacion/${id}`
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