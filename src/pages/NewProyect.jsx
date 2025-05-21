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
  const [imagenBase64, setImagenBase64] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const idUsuario = await obtenerIdPorToken(token);

      if (!nombre) {
        setError("El campo nombre es obligatorio.");
        return;
      }

      const proyecto = {
        nombre,
        descripcion,
        imagen: imagenBase64.split(',')[1], // base64 string
        usuario: {
          id_usuario: idUsuario
        }
      };

      await axios.post(
        "http://localhost:8080/api/proyectos",
        proyecto,
        { headers: { "Content-Type": "application/json" } }
      );

      setError(null);
      navigate("/home");
    } catch (err) {
      setError("Error creando el proyecto.");
    }
  };


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };



  const handleUpload = async () => {
    if (!selectedFile) return alert('Selecciona una imagen primero');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      console.log("Base64:", base64String);
      setImagen(base64String);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <TopMenu />
      <Header title="New Proyect" />
      <div className="panelCenter">

        {/* <div className="cardBannerProyect">
          <input
            type="file"
            onChange={handleImagenChange}
            accept="image/*"
            required
            style={{ display: "none" }}
            id="banner-input"
          />
          <label className="panelTitleCard" htmlFor="banner-input" style={{ cursor: "pointer" }}>
            <span>Banner</span>
          </label>
          <img
            src={imagenBase64 || "default-image.webp"}
            alt="Vista previa"
          />
        </div> */}

        <CardUpdateBanner className="bannerUpdate"
          imagen={imagenBase64}
          handleFileChange={handleImagenChange}
        />


      </div>


      <div className="contentColum">
        <ErrorPanel error={error} set={setError} />
        <h2>Name</h2>
        <input className="inputName"
          placeholder="Proyect name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}>
        </input>
        <h2>Description</h2>
        <input className="inputDescription"
          placeholder="Proyect description"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}>
        </input>

      </div>
      <PanelButtonsBelow clickCreate={handleSubmit} clickCancel={() => navigate("/home")} text="Create" icon="add" />

    </>
  );
}

export default NewProyect;