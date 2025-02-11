import CardProyects from "../components/cards/cardsProyects/CardProyects";
import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import {obtenerIdUsuarioDesdeToken} from '../services/servicesController';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener los proyectos del usuario
  const obtenerProyectosUsuario = async (id_usuario) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuarios/1`
      );
      setProyectos(response.data.proyectos); // Guardar los proyectos en el estado
      console.log("Proyectos del usuario:", response.data.proyectos);
      setError(null); // Limpiar errores anteriores
    } catch (err) {
      console.error("Error al obtener los proyectos:", err.response?.data || err.message);
      setError(err.response?.data || "Error al obtener los proyectos");
      setProyectos([]); // Limpiar la lista de proyectos en caso de error
    }
  };

  // Obtener el id_usuario del token y cargar los proyectos cuando el componente se monta
  useEffect(() => {
    const id_usuario = obtenerIdUsuarioDesdeToken(); // Extraer el ID del token
    if (id_usuario) {
      obtenerProyectosUsuario(id_usuario); // Obtener los proyectos del usuario
    } else {
      setError("No se pudo obtener el ID del usuario desde el token.");
      navigate("/login"); // Redirigir al login si no se pudo obtener el ID del usuario
    }
  }, []);

  const myItems = [<ButtonTopMenu icon={"add"} text={""} click={() => navigate("/newproyect")}/>];
  return (
    <>
      <TopMenu />
      <Header title="Proyects" button={myItems} />

      <div>
        <div className="proyectContent">
          <CardProyects db={proyectos} />
        </div>
      </div>
    </>
  );
}

export default Home;
