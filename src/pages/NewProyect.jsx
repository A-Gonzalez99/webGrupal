import React, { useState } from 'react';
import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ErrorPanel } from '../components/errorPanel/ErrorPanel';
import { obtenerIdPorToken } from '../services/proyectoService';
import { useEffect } from "react";

function NewProyect() {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [mensaje, setMensaje] = useState('');
  const [imagenBase64, setImagenBase64] = useState("https://i.postimg.cc/15R4cP4M/banner.jpg");
  const [caracteresRestantesNombre, setCaracteresRestantesNombre] = useState(50);
  const [caracteresRestantes, setCaracteresRestantes] = useState(255);

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "New Proyect - Shot Reel";
  }, []);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenBase64(reader.result);
      console.log(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateAndSubmit = async () => {
    const token = localStorage.getItem("token");
    const idUsuario = await obtenerIdPorToken(token);

    if (!nombre) {
      setError("Name field is required.");
      return;
    }

    if (nombre.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    const proyecto = {
      nombre: nombre,
      descripcion,
      imagen: imagenBase64.split(',')[1], // base64 string
      usuario: {
        id_usuario: idUsuario
      }
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/proyectos",
        proyecto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setError(null);
      navigate("/proyects");
    } catch (err) {
      setError("An error occurred while creating the project.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateAndSubmit();
  };

  return (
    <>
      <TopMenu />
      <div className="main-content">
        <Header title="New Proyect" />
        <div className="panelCenter">
          <CardUpdateBanner
            text="Upload Image"
            imagen={
              imagenBase64
                ? imagenBase64
                : "default-image.webp"
            }
            className="bannerUpdate"
            handleFileChange={handleImagenChange}
          />
        </div>

        <div className="contentColum">
          <ErrorPanel error={error} set={setError} />

          <h2>Name</h2>
          <div className="input-container">
            <input
              type="text"
              className="inputName"
              value={nombre}
              onChange={(e) => {
                const texto = e.target.value;
                setNombre(texto);
                setCaracteresRestantesNombre(50 - texto.length);
              }}
              maxLength="50"
              placeholder="Project name"
            />
            <div className="contador-caracteres">
              {caracteresRestantesNombre} characters remaining
            </div>
          </div>

          <h2>Description</h2>
          <div className="textarea-container">
            <textarea
              className="inputDescription"
              value={descripcion}
              onChange={(e) => {
                const texto = e.target.value;
                setDescripcion(texto);
                setCaracteresRestantes(255 - texto.length);
              }}
              maxLength="255"
              rows="4"
              placeholder="Project description"
            />
            <div className="contador-caracteres">
              {caracteresRestantes} characters remaining
            </div>
          </div>
        </div>

        <PanelButtonsBelow clickCreate={handleSubmit} clickCancel={() => navigate("/home")} text="Create" icon="add" />
      </div>

    </>
  );
}

export default NewProyect;