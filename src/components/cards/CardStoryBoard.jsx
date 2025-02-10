import "./cardStoryBoard.css";
import React from "react";
import { GetDataBaseStoryBoard } from "../../dataBase/DataBaseStoryBoard";
import { useNavigate } from "react-router-dom";

export function CardStoryBoard() {
  const db = GetDataBaseStoryBoard();

  return <>{db.map((b, index) => cardProp(b, index))}</>;
}

export function GetCardStoryBoard({index}){
  const db = GetDataBaseStoryBoard();

  return (
      <>
          {db.slice(index-1, index).map((b, index) => cardProp(b, index))}
      </>
  )
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
      <div className="cardStoryBoard">
        <button onClick={() => enviarDatos(num)} className="buttonStoryBoard">
          <img src={props.imag} />
        </button>
        <p>{props.tittle}</p>
      </div>
    </>
  );
}
