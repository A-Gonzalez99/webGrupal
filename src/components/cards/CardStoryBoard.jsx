import "./cardStoryBoard.css";
import { useRef, useState, useEffect } from "react";
import { GetDataBaseStoryBoard } from "../../dataBase/DataBaseStoryBoard";
import { useNavigate } from "react-router-dom";
import { GetStorageProyect } from "../../controller/Controller";
import { obtenerProyecto } from "../../services/proyectoService";

export function CardStoryBoard() {

  const num = GetStorageProyect();
  const [proyecto, setProyecto] = useState(null);
  const [proyecto2, setProyecto2] = useState();

  const [error, setError] = useState(null);

  useEffect(() => {

    obtenerProyecto(GetStorageProyect(), setProyecto, setError);
  }, []);
  console.log("ST");
  console.log(proyecto);
  setProyecto2(proyecto)
  console.log(proyecto2.toString());
}

export function GetCardStoryBoard({ index }) {
  // const db = GetDataBaseStoryBoard();
  return (
    <>
      {/* {db.slice(index-1, index).map((b, index) => cardProp(b, index))} */}
    </>
  )
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
