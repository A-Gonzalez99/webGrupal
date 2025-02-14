import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";
import { iniciarSecion } from "../services/usuarioController";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    iniciarSecion(email, password, setError, navigate);
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
          <ErrorPanel error={error} set={setError} />

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
          <button className="buttonLogin" onClick={() => handleSubmit()}>
            Login
          </button>
          <p className="buttonPassword">Have you forgotten your password?</p>
          <button
            className="buttonBack"
            onClick={() => navigate("/newaccount")}
          >
            Create new account
          </button>
        </div>
      </div>
    </>
  );
}
