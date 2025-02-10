import React from "react";
import { useNavigate } from "react-router-dom";
import { GetDataBaseLocations } from "../../../dataBase/DataBaseLocations";



export function CardsLocations() {

    const db = GetDataBaseLocations();
    return (
        <>
            {db.map((b, index) => cardProp(b, index))}
        </>
    )
}

export function GetCardLocation({index}){
    
    const db = GetDataBaseLocations();
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
        localStorage.setItem("location", num);
        navigate("/editlocation");
    }

    return (
        <>
            <button onClick={() => enviarDatos(num)} className="cardProyect">
                <div className='panelTitleCard'>
                    <div className='panelDescriptionLocation'>
                        <p>{props.name}</p>
                        <span>{props.location}</span>
                    </div>

                </div>
                <img src={props.imag} />
            </button>
        </>
    )
}

