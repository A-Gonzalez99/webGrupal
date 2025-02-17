import React from "react";
import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import { GetStorageProyect } from "../../../controller/Controller";
import { obtenerLocalizaciones } from "../../../services/locationService";

export function CardsLocations() {
    const [proyecto, setProyecto] = useState([]); // Inicializa como array vacío
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerLocalizaciones(GetStorageProyect(), setProyecto, setError);
        console.log(proyecto);
    }, []);
    
    return (
        <div>
            {proyecto.map((item, index) => (
                <GetCardLocation index={item.id_localizacion} item={item} />
            ))}
        </div>
    );

}

export function GetCardLocation({ index, item }) {
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
        localStorage.setItem("location", num);
        navigate("/editlocation");
    }

    return (
        <>
            <button onClick={() => enviarDatos(num)} className="cardProyect">
                <div className='panelTitleCard'>
                    <div className='panelDescriptionLocation'>
                        <p>{props.nombre}</p>
                        <span>{props.descripcion}</span>
                    </div>

                </div>
                <img src={props.imag} />
            </button>
        </>
    )
}

