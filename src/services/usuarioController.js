import axios from "axios";
import { login } from "../services/usuarioService";

export const iniciarSecion = async (email, password, setError, nav) => {
  try {
    const response = await login(email, password);
    localStorage.setItem("token", response.data.token);
    nav("/home");
    setError("");
  } catch (error) {
    setError("Usuario o contraseña incorrectos");
  }
};

export const crearCuenta = async (nombre, apellido, email, password, fecha, setError, nav) => {
  const usuarioData = {
    nombre: nombre,
    apellido: apellido,
    correo: email,
    contrasenna: password,
    fecha_N: fecha,
  };

  try {
    await axios.post(
      "http://localhost:8080/api/usuarios",
      usuarioData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Cuenta creada exitosamente");
    nav("/login");
  } catch (error) {
    console.error("Error completo:", error);

    if (error.response) {
      const errorMessage =
        error.response?.data?.message || "Hubo un error al crear la cuenta.";
      setError(errorMessage);
    } else if (error.request) {
      setError("No se recibió respuesta del servidor. Verifique la conexión.");
    } else {
      setError("Hubo un error inesperado al intentar crear la cuenta.");
    }
  }
};
