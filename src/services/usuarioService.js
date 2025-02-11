import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios"; // Ajusta el puerto según Spring Boot

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const obtenerUsuarios = () => api.get("/");
export const verificarExistencia = (nickname, email) =>
  api.get(`/exists?nickname=${nickname}&email=${email}`);
export const login = (email, password) =>
  api.post("/login", { email, password });
export const crearUsuario = (usuario) => api.post("/", usuario);
export const obtenerUsuarioPorId = (id) => api.get(`/${id}`);
export const eliminarUsuario = (id) => api.delete(`/${id}`);
export const actualizarUsuario = (id, usuario) => api.put(`/${id}`, usuario);
