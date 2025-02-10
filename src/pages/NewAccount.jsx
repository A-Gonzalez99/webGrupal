import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Personal } from "../components/Login/Personal";
import { crearUsuario } from "../services/api";
import axios from 'axios';

export function NewAccount() {
  const navigate = useNavigate();

  function changePage(page) {
    navigate(page);
  }

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    // e.preventDefault();  // Evitar el refresco de la página
  
    const usuarioData = {
      nombre: nombre,
      apellido: apellido,
      correo: email,
      contrasenna: password,
      fecha_N: `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`, // Usar el estado de fecha para una fecha dinámica
    };
  
    console.log("Enviando datos:", usuarioData);
  
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios', usuarioData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Usuario creado:", response); // Muestra la respuesta completa
  
      alert("Cuenta creada exitosamente");
      navigate("/login"); // Redirige al login después de la creación
    } catch (error) {
      console.error("Error completo:", error); // Muestra el objeto de error completo
  
      if (error.response) {
        // Si hay una respuesta, obtenemos el mensaje de error del backend
        const errorMessage = error.response?.data?.message || "Hubo un error al crear la cuenta.";
        setError(errorMessage);
      } else if (error.request) {
        // Si no hubo respuesta, el error puede estar en la solicitud
        setError("No se recibió respuesta del servidor. Verifique la conexión.");
      } else {
        // Cualquier otro error (por ejemplo, de configuración de axios)
        setError("Hubo un error inesperado al intentar crear la cuenta.");
      }
    }
  };
  

  function Years() {
    var year = 2024;
    var dbYear = [];

    for (let i = 0; i <= 100; i++) {
      dbYear.push({ year: year - i });
    }

    return dbYear.map((yearObj) => (
      <option key={yearObj.year} value={yearObj.year}>
        {yearObj.year}
      </option>
    ));
  }

  function Day() {
    var dbDay = [];

    for (let i = 0; i <= 30; i++) {
      dbDay.push({ day: i + 1 });
    }

    return dbDay.map((yearObj) => (
      <option key={yearObj.day} value={yearObj.day}>
        {yearObj.day}
      </option>
    ));
  }

  return (
    
    <>
      <div className="backGroundLoging">
        <h1>Shot Reel</h1>
        <div className="panelLogin">
          <div className="panelLoginButtonNewUserTop">
            <button className="buttonLogin">Personal</button>
            <div className="LoginSeparator"></div>
            <button className="buttonBack">Company</button>
          </div>

          <div className="panelLoginButtonNewUserTop">
        <input className="inputLogin" type="text" placeholder="Name"
          value={nombre}   
          onChange={(e) => setNombre(e.target.value)}
        />
        <div className="LoginSeparator"></div>
        <input className="inputLogin" type="text" placeholder="Last name"
          value={apellido}   
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <p
        style={{
          color: "#0b2130",
          margin: "0px",
          marginTop: "6px",
          marginRight: "auto",
          fontWeight: "bold",
        }}
      >
        Birthdate
      </p>
      <div className="panelLoginButtonNewUserTop">
        <select id="day" value={dia} onChange={(e) => setDia(e.target.value)}>
          <Day></Day>
        </select>
        <div style={{ width: "24px" }}></div>

        <select value={mes} onChange={(e) => setMes(e.target.value)}>
          <option value="1">January </option>
          <option value="2">February </option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <div style={{ width: "24px" }}></div>

        <select value={anio} onChange={(e) => setAnio(e.target.value)}>
          <Years />
        </select>
      </div>

      <input className="inputLogin" type="text" placeholder="Email"
        value={email}   
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className="inputLogin" type="text" placeholder="Password"
        value={password}   
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <p
            style={{
              fontSize: "14px",
              color: "#0b2130",
              margin: "0px",
              marginTop: "6px",
            }}
          >
            By registering, you agree to our [Terms of Service] and our [Privacy
            Policy]. We will keep you informed about the latest news through
            notifications. You can deactivate them at any time
          </p>
          <button
            className="buttonLogin"
            style={{ marginTop: "6px" }}
            onClick={() => handleSubmit()}
          >
            Register
          </button>
          <p className="buttonPassword" onClick={() => changePage("/login")}>
            Do you already have an account?{" "}
          </p>
        </div>
      </div>
    </>
  );
}
