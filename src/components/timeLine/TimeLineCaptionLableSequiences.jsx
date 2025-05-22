import { GetDataBaseSequences } from "../../dataBase/DataBaseSequences";
import VerticalDivider from "../VerticalDivider";
import TimeLineCaption from "./TimeLineCaption";
import { useState, useEffect } from "react";
import { obtenerSecuencia } from "../../services/secuenciaService";
import { GetStorageProyect } from "../../controller/Controller";
import { useNavigate } from 'react-router-dom';
import TimeLineBlockSequences from "./TimeLineBlockSequences";

function TimeLineCaptionLableSequiences() {

  const db = GetDataBaseSequences();
  const page = "/scenes"
  const [proyecto, setProyecto] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarSecuencias = async () => {
      try {
        const data = await obtenerSecuencia(GetStorageProyect());
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

  const navigate = useNavigate();

  function changePage() {
    navigate(page)
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
        <TimeLineBlockSequences db={proyecto} />
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
                localStorage.setItem("sequences", item.id_secuencia);
                navigate(page);
              }}
            />
          ))
        }
      </div>
    </>
  );

}

export default TimeLineCaptionLableSequiences;
