import React, { useState } from 'react';
import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { crearProyecto } from "../services/proyectoService";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function NewProyect() {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {

    const proyecto = {
      nombre: nombre,
      descripcion: descripcion,
      imagen: null, // Para manejar la imagen como archivo
      usuario: {
        "id_usuario": 1 // ID del usuario asociado
      }
    };

    try {
      // Enviar los datos al endpoint de la API
      const response = await axios.post(
        "http://localhost:8080/api/proyectos", // URL del endpoint
        proyecto // Datos del proyecto
      );

      // Manejar la respuesta exitosa
      console.log("Proyecto creado:", response.data);
      setError(null); // Limpiar errores anteriores

      // Mostrar un mensaje de éxito o redirigir al usuario
      alert("Proyecto creado con éxito!");
      navigate("/home"); // Redirige al login después de la creación

    } catch (err) {
      // Manejar errores
      console.error("Error al crear el proyecto:", err.response?.data || err.message);
      setError(err.response?.data || "Error al crear el proyecto");
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
      <PanelButtonsBelow clickCreate={handleSubmit} text="Create" icon="add" />

    </>
  );
}

export default NewProyect;