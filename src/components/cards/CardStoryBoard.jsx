import "./cardStoryBoard.css";
import { useRef, useState, useEffect } from "react";
import { GetDataBaseStoryBoard } from "../../dataBase/DataBaseStoryBoard";
import { useNavigate } from "react-router-dom";
import { GetStorageProyect } from "../../controller/Controller";
import { obtenerStoryBoards } from "../../services/proyectoService";

export function CardStoryBoard() {

  const num = GetStorageProyect();
  const [proyecto, setProyecto] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerStoryBoards(GetStorageProyect(), setProyecto, setError);
  }, []);
  return (
    <div className="proyectContent">
      {proyecto.map((item, index) => (
        <GetCardStoryBoard index={item.id_storyboard} item={item} />
      ))}
    </div>
  );
}

export function GetCardStoryBoard({ index, item }) {
  return (
    <>
      {cardProp(item, index)}
    </>
  );
}

function cardProp(props, num) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  function enviarDatos(num) {
    localStorage.setItem("date", num);
    navigate("/editimage");

    console.log(num);
  }

  return (
    <>
      <div className="cardInfo" onClick={() => enviarDatos(num)}>
        <div className="cardProyect">
          <div className="panelTitleCard">
            <div className="panelIconoEditar">
              <span class="material-icons" >edit</span>
            </div>
          </div>
          <img src={"data:image/png;base64," + props.imagen} alt="Vista previa" />
          {/* <img src={props.imagen} /> */}
        </div>
        <div>
          <h2>{props.descripcion}</h2>
          {/* <p>{props.descripcion}</p> */}

        </div>
      </div>

    </>
  );
}
