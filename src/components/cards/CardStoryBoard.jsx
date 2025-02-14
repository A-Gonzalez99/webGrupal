import "./cardStoryBoard.css";
import { useRef, useState, useEffect } from "react";
import { GetDataBaseStoryBoard } from "../../dataBase/DataBaseStoryBoard";
import { useNavigate } from "react-router-dom";
import { GetStorageProyect } from "../../controller/Controller";
import { obtenerStoryBoards } from "../../services/proyectoService";

export function CardStoryBoard() {

  const num = GetStorageProyect();
  const [proyecto, setProyecto] = useState([]); // Inicializa como array vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerStoryBoards(GetStorageProyect(), setProyecto, setError);    
  }, []);
  return (
    <div>
      {proyecto.map((item, index) => (
        <GetCardStoryBoard  index={item.id_storyboard} item={item} />
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
  // console.log(proyecto);
  function enviarDatos(num) {
    localStorage.setItem("date", num);
    navigate("/editimage");

    console.log(num);
  }

  return (
    <>
      <div className="cardStoryBoard">
        <button onClick={() => enviarDatos(num)} className="buttonStoryBoard">
          <img src={props.imag} />
        </button>
        <p>{props.descripcion}</p>
      </div>
    </>
  );
}
