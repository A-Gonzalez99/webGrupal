import axios from "axios";

const API_URL = "http://localhost:8080/api/storyboard";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Endpoints de Proyectos
export const obtenerStoryboardPorId = (id) => api.get(`/${id}`);
export const crearStoryboard = (proyecto) => api.post("/", proyecto);
export const actualizarStoryboard = (id, proyecto) => api.put(`/${id}`, proyecto);
export const eliminarStoryboard = (id) => api.delete(`/${id}`);


export const obtenerStoryBoards = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/proyectos/${id}/storyboard`
    );
  
    // Guardar el proyecto en el estado
    setProyecto(response.data);    

    // Limpiar errores anteriores
    if (setError) {
      setError(null);
    }

    // Retornar los datos del proyecto
    return response.data;
  } catch (err) {

    // Establecer el error en el estado
    if (setError) {
      setError(err.response?.data || "Error al obtener el proyecto");
    }

    // Retornar null en caso de error
    return null;
  }
};