import { GetDataBaseScenes } from "../../dataBase/DataBaseScenes";
import VerticalDivider from "../VerticalDivider";
import TimeLineCaption from "./TimeLineCaption";
import {useState, useEffect } from "react";
import {obtenerEscenas} from "../../services/escenasService";
import { GetStorageSequences } from "../../controller/Controller";
import { useNavigate } from 'react-router-dom';

function TimeLineCaptionLableScenes() {

  const db = GetDataBaseScenes();
  const page ="/scene"
  const [proyecto, setProyecto] = useState([]);

  useEffect(() => {
    const cargarSecuencias = async () => {
      try {
        const data = await obtenerEscenas(GetStorageSequences());
        setProyecto(data);
        console.error("Escenas:", proyecto);
      } catch (error) {
        console.error("Error al obtener Escenas:", error);
      }
    };
    cargarSecuencias();
  }, []);


  
  useEffect(() => {
    if (proyecto.length > 0) {
      console.log("Secuencias cargadas:", proyecto);
    }
  }, [proyecto]);

  const navigate = useNavigate();

  return (
    <>
      <div className="panelHeaderLable">
        <VerticalDivider />
        <p>Start</p>
        <VerticalDivider />
        <p>End</p>
      </div>
      <div className="panelColum">
      {proyecto.map((item, index) => (
          <TimeLineCaption props = {item} accion={
            () => {
              navigate(page)
            }            
          } />        
        ))}       
      </div>
    </>
  );
}

export default TimeLineCaptionLableScenes;
