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

    setProyecto(response.data);    

    if (setError) {
      setError(null);
    }
    return response.data;
  } catch (err) {

    if (setError) {
      setError(err.response?.data || "Error getting project.");
    }

    return null;
  }
};

export const obtenerStoryBoards = async (id, setProyecto, setError) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/proyectos/${id}/storyboards`
    );
    console.log(response.data);
    setProyecto(response.data);    

    if (setError) {
      setError(null);
    }

    return response;
  } catch (err) {
    if (setError) {
      setError(err.response?.data || "Error getting the storyboard.");
    }

    return null;
  }
};


export const obtenerIdPorToken = async (token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/usuarios/`+token
    );
   
    return response.data.id_usuario;
    
  } catch (err) {
    return null;
  }
};