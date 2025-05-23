import "./cardsProyects.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function CardProyects(db) {
  return (
    <>
      {db?.db?.proyectos?.map((proyecto) => (
      <>
          {cardProp(proyecto, proyecto.id_proyecto)}
      </>
      ))}
    </>
  );
}

function cardProp(props, index) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  function OpenProyect(index) {
    localStorage.setItem("proyect", index);
    navigate("/proyect");
  }

  return (
    <>
    <div className="cardInfo" onClick={() => OpenProyect(index)}>
      <div className="cardProyect">
        <div className="panelTitleCard">
          <div className="panelIconoEditar">
              <span class="material-icons" >more_vert</span>
          </div>
        </div>
        <img src={props.imagen ? "data:image/png;base64,"+props.imagen : "https://i.postimg.cc/15R4cP4M/banner.jpg"} alt="Vista previa" />        {/* <img src={props.imagen} /> */}
      </div>
      <div>
        <h2>{props.nombre}</h2>
        <p>{props.descripcion}</p>

      </div>
    </div>
    </>
  );
}

export default CardProyects;
