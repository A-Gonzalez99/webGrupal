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
      imagen: imagen,
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
        setError("The name field is required.");
      }

    } catch (err) {
      setError( "Error creating project.");
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
        <CardUpdateBanner className="bannerUpdate" />

         <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir Imagen</button>
          </div>

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