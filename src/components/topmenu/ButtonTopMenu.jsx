import React from 'react';

function ButtonTopMenu({icon,click, buttonId, referen, texto}) {
    return (
        <button className="button-default" ref={referen} id={buttonId} onClick={click}>
            <span class="material-icons">{icon?icon:""}</span>
            <p className="texto">{texto}</p>
        </button>
    )
  }
  
export default ButtonTopMenu