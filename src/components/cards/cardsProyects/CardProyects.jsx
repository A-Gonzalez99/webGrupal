import './cardsProyects.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDataBaseProyect } from '../../../dataBase/DataBaseProyects';

function CardProyects(db) {
    console.log("db")
    console.log(db)


    return (        
        <>
            {(
                db.db.map((proyecto) => cardProp(proyecto, proyecto.id_proyecto))                
            ) }
        </>
    )
}

function cardProp(props, index) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function OpenProyect(index) {
        localStorage.setItem("proyect", index);
        navigate('/proyect')
    }

    return (
        <>
            <button className="cardProyect" onClick={() => OpenProyect(index)}>
                <div className='panelTitleCard'>
                    <div className=''>
                        <p>{props.nombre}</p>
                    </div>

                </div>
                <img src={props.imagen} />

            </button>
        </>
    )
}

export default CardProyects