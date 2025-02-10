import React from 'react';

function ButtonTopMenu({icon,click, buttonId, referen}) {
    return (
        <button className="button-default" ref={referen} id={buttonId} onClick={click}>
            <span class="material-icons">{icon}</span>
        </button>
    )
  }
  
export default ButtonTopMenu