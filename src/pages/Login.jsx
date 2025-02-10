import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { login } from "../services/api";

export function Login() {
  const navigate = useNavigate();

  function changePage(page) {
    navigate(page);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    console.log("submit");
    // e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token); // Guardar token
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Guardar token

      alert("Login exitoso");
      setError("Correcto");

    } catch (error) {
      setError("Usuario o contraseña incorrectos");
    }
    console.log(error);

  };

  return (
    <>
      <div className="backGroundLoging">
        <h1>Shot Reel</h1>
        <p>
          Reel Shot helps filmmakers connect, collaborate, and manage their
          projects from script to screen.
        </p>
        <div className="panelLogin">
          <input className="inputLogin" type="text" 
            placeholder="Email" 
            value={email}   
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className="inputLogin" 
          type="text" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p>{error}</p>}
          <button className="buttonLogin" onClick={() => handleSubmit()}>
            Login
          </button>
          <p className="buttonPassword">Have you forgotten your password?</p>
          <button
            className="buttonBack"
            onClick={() => changePage("/newaccount")}
          >
            Create new account
          </button>
        </div>
      </div>
    </>
  );
}
