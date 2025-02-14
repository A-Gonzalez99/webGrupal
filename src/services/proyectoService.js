import axios from "axios";

const API_URL = "http://localhost:8080/api/proyectos";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Endpoints de Proyectos
export const obtenerProyectoPorId = (id) => api.get(`/${id}`);
export const crearProyecto = (proyecto) => api.post("/", proyecto);
export const actualizarProyecto = (id, proyecto) => api.put(`/${id}`, proyecto);
export const eliminarProyecto = (id) => api.delete(`/${id}`);

export const obtenerProyecto = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/proyectos/${id}`
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

export const obtenerStoryBoards = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/proyectos/${id}/storyboards`
    );
   

    // Guardar el proyecto en el estado
    setProyecto(response.data);    

    // Limpiar errores anteriores
    if (setError) {
      setError(null);
    }

    // Retornar los datos del proyecto
    return response;
  } catch (err) {
    // Establecer el error en el estado
    if (setError) {
      setError(err.response?.data || "Error al obtener el proyecto");
    }

    // Retornar null en caso de error
    return null;
  }
};


export const obtenerIdPorToken = async (token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/usuarios/`+token
    );
    console.log("Response:", response.data);
    console.log("Proyectos del usuario:", response.data.id_usuario);
    return response.data.id_usuario;
    
  } catch (err) {
    console.error("Error al obtener los proyectos:", err.response?.data || err.message);
    return null;
  }
};