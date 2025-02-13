import CardProyects from "../components/cards/cardsProyects/CardProyects";
import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState(null);

  const obtenerProyectosUsuario = async (id_usuario) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuarios/`+id_usuario
      );
      setProyectos(response.data); 
      console.log("Proyectos del usuario:", response.data.proyectos);
      setError(null); 
    } catch (err) {
      console.error("Error al obtener los proyectos:", err.response?.data || err.message);
      setError(err.response?.data || "Error al obtener los proyectos");
      setProyectos([]); 
    }
  };

  
  useEffect(() => {
    const id_usuario = localStorage.getItem("token"); 
    if (id_usuario) {
      obtenerProyectosUsuario(id_usuario); 
    } else {
      setError("No se pudo obtener el ID del usuario desde el token.");
      navigate("/login");
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
