import Header from "../components/header/Header";
import { ProyectBanner } from "../components/proyect/ProyectBanner";
import { ProyectDescription } from "../components/proyect/ProyectDespription";
import { ProyectMenu } from "../components/proyect/ProyectMenu";
import { ProyectName } from "../components/proyect/ProyectName";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import { GetStorageProyect } from "../controller/Controller";
import { GetDataBaseProyect } from "../dataBase/DataBaseProyects";
import React, { useState, useEffect } from "react";
import { obtenerProyecto } from "../services/proyectoService";

export function Proyect() {
  const navigate = useNavigate();
  const num = GetStorageProyect();
  const myItems = [<ButtonTopMenu icon={"edit"} text={""} click={() => navigate("/editproyect")}/>];
  const [proyecto, setProyecto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Proyect - Shot Reel";
    obtenerProyecto(num,setProyecto,setError);
  }, []);
  
  return (
    <>
      <TopMenu />
      {/* <Header title="Proyect" button={myItems} /> */}
   
        <div className="main-content">       
            <ProyectBanner/>   
            <Header title="Proyect" button={myItems} />
            <ProyectName nam={proyecto ? proyecto.nombre : "Cargando nombre..."} />            
            <ProyectDescription des={proyecto ? proyecto.descripcion : "Cargando descripcion..."}/>
            <ProyectMenu/>
        </div>
      
    </>
  );
  
}

