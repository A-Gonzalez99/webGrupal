import './cardsProyects.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDataBaseProyect } from '../../../dataBase/DataBaseProyects';

function CardProyects() {

    var db = GetDataBaseProyect();

  return ( 
    <>
        {db.map((b, index) => cardProp(b, index))}
    </>
  )
}

function cardProp(props, index) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function OpenProyect(index){
        localStorage.setItem("proyect", index);
        navigate('/proyect')
    }

    return (
        <>
            <button className="cardProyect" onClick={()=>OpenProyect(index)}>
                <div className='panelTitleCard'>
                    <div className=''>
                        <p>{props.tittle}</p>
                    </div>

                </div>
                <img src={props.imag} />
        
            </button>
        </>
    )
}

export default CardProyects