import React, { useState } from 'react';
import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ErrorPanel } from '../components/errorPanel/ErrorPanel';
import { obtenerIdPorToken } from '../services/proyectoService';

function NewProyect() {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    console.log("idUsuario: " + await obtenerIdPorToken(localStorage.getItem("token")));

    const proyecto = {
      nombre: nombre,
      descripcion: descripcion,
      imagen: null,
      usuario: {
        id_usuario: await obtenerIdPorToken(localStorage.getItem("token"))
      }
    };

    try {    
      const response = await axios.post(
        "http://localhost:8080/api/proyectos", 
        proyecto
      );

      if (nombre !== "") {        
        console.log("Proyecto creado:", response.data);
        setError(null);

        navigate("/home");
      } else {
        setError("El campo nombre es obligatorio");
      }

    } catch (err) {
      console.error("Error al crear el proyecto:", err.response?.data || err.message);
      setError( "Error al crear el proyecto");
    }
  };


  return (
    <>
      <TopMenu />
      <Header title="New Proyect" />
      <div className="panelCenter">
        <CardUpdateBanner className="bannerUpdate" />
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
      <PanelButtonsBelow clickCreate={handleSubmit} clickCancel={()=>navigate("/home")} text="Create" icon="add" />

    </>
  );
}

export default NewProyect;