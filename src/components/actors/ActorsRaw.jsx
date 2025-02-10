import React from "react";
import { GetDataBaseStoryBoard } from "../../dataBase/DataBaseStoryBoard";
import { useNavigate } from "react-router-dom";
import VerticalDivider from "../VerticalDivider";




export default function ActorsRaw(){
    const db = [
        {
            name: "Madame D",
            character: "Annette T. Fletcher",
            ima:"https://imgcdn.stablediffusionweb.com/2024/4/23/e007a28a-e6b3-41a9-a516-0a9ae7bbdfa8.jpg"
        },
        {
            name: "Agatha",
            character: "Judy W. Abel",
            ima:"https://imgcdn.stablediffusionweb.com/2024/4/3/52185716-d0bb-4dbd-855f-2acd1d8b7def.jpg"
        },
        {
            name: "Zerp",
            character: "Kelly M. Welch",
            ima:"https://imgcdn.stablediffusionweb.com/2024/5/11/260b2fac-ecb6-432f-ab42-c6dd5c36fb3f.jpg"
        },
        {
            name: "Clotilde",
            character: "Patricia R. Bell",
            ima:"https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
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
          <div className="userAvatar">
            <img src={props.ima}></img>
          </div>
          <div className="nameTimelineContainer">
            <p className="colorTextBlack">{props.name}</p>
            <VerticalDivider />
            <p className="colorTextBlack">{props.character}</p>
          </div>
        
        </div>
      </div>
    </>
  );
}
