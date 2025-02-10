import React from "react";
import { useNavigate } from "react-router-dom";
import VerticalDivider from "./VerticalDivider";




export default function ScriptScene(){
    const db = [
        {
            name: "Rubén y Guillermo",
            start: 1,
            end: 1  
          }
    
    ];

    return (
        <>
            {db.map((b, index) => Actors(b, index))}
        </>
    )
}

function Actors(props, num) {

  
  return (
    <>
       <div className="timeLineCaption" >
        <div
        
          className="timeLineCaptionContainer"
        >
          
          <div className="nameTimelineContainer">
            <p className="colorTextBlack">{props.name}</p>
            <VerticalDivider />
            <p className="colorTextBlack">Pag {props.start} to {props.end}</p>
          </div>
        
        </div>
      </div>
    </>
  );
}
