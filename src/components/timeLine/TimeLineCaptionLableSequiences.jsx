import { GetDataBaseSequences } from "../../dataBase/DataBaseSequences";
import VerticalDivider from "../VerticalDivider";
import TimeLineCaption from "./TimeLineCaption";
import {useState, useEffect } from "react";
import {obtenerSecuencia} from "../../services/secuenciaService";

function TimeLineCaptionLableSequiences() {

  const db = GetDataBaseSequences();
  const page ="/scenes"
  const [proyecto, setProyecto] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarSecuencias = async () => {
      try {
        const data = await obtenerSecuencia();
        setProyecto(data);
        console.error("Secuencias:", proyecto);
      } catch (error) {
        console.error("Error al obtener secuencias:", error);
      }
    };
    cargarSecuencias();
  }, []);

  useEffect(() => {
    if (proyecto.length > 0) {
      console.log("Secuencias cargadas:", proyecto);
    }
  }, [proyecto]);

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
          <TimeLineCaption props = {item} key={index} />        
        ))}      
      </div>
    </>
  );

}

export default TimeLineCaptionLableSequiences;
