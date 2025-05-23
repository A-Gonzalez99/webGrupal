import axios from "axios";
import { login } from "../services/usuarioService";

export const iniciarSecion = async (email, password, setError, nav) => {
  // Validar campos vacíos
  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  // Validar longitud de contraseña
  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return;
  }

  try {
    const response = await login(email, password);
    localStorage.setItem("token", response.data.token);
    nav("/home");
    setError("");
  } catch (error) {
    setError("Incorrect username or password");
  }
};

export const crearCuenta = async (nombre, apellido, email, password, fecha, setError, nav) => {
  // Validate that all fields are filled
  if (!nombre || !apellido || !email || !password || !fecha) {
    setError("Please fill in all fields.");
    return; // Exit the function if any field is missing
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return; // Exit the function if the email is invalid
  }

  // Validate password length (e.g., at least 6 characters)
  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return; // Exit the function if the password is too short
  }

  // Validate year of birth (e.g., must be a valid year)
  const currentYear = new Date().getFullYear();
  const birthYear = new Date(fecha).getFullYear();
  if (birthYear < 1900 || birthYear > currentYear) {
    setError("Please enter a valid year of birth.");
    return; // Exit the function if the year of birth is invalid
  }

  // Prepare the user data object
  const usuarioData = {
    nombre: nombre,
    apellido: apellido,
    correo: email,
    contrasenna: password,
    fecha_N: fecha,
  };

  try {
    // Make the API call to create the account
    await axios.post("http://localhost:8080/api/usuarios", usuarioData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Redirect to the login page after successful account creation
    nav("/login");
    setError(""); // Clear any previous error messages
  } catch (error) {
    console.error("Error completo:", error);

    // Handle different types of errors
    if (error.response) {
      setError("Please check that all fields are complete and valid.");
    } else if (error.request) {
      setError("No response was received from the server. Please check your connection.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  }
};
