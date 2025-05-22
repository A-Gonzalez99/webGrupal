import { GetDataBaseScenes } from "../../dataBase/DataBaseScenes";
import VerticalDivider from "../VerticalDivider";
import TimeLineCaption from "./TimeLineCaption";
import {useState, useEffect } from "react";
import {obtenerEscenas} from "../../services/escenasService";
import { GetStorageSequences } from "../../controller/Controller";
import { useNavigate } from 'react-router-dom';
import TimeLineBlockScenes from "./TimeLineBlockScenes";

function TimeLineCaptionLableScenes({edit}) {

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
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
        <TimeLineBlockScenes db={proyecto} />
      </div>

      <div className="panelHeaderLable">
        <VerticalDivider />
        <p>Start</p>
        <VerticalDivider />
        <p>End</p>
      </div>

      <div className="panelColum">
        {[...proyecto]
          .sort((a, b) => Number(a.min_inicio) - Number(b.min_inicio))
          .map((item, index) => (
            <TimeLineCaption
              key={item.id_secuencia || index}
              props={item}
              accion={() => {
                localStorage.setItem("scenes", item.id_escena);
                edit()
              }}
            />
          ))
        }
      </div>

    </>
  );
}

export default TimeLineCaptionLableScenes;
