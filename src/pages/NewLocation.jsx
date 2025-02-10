import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { PostDataBaseLocations } from "../dataBase/DataBaseLocations";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function NewLocation() {
  const navigate = useNavigate();
  const inputLocation = useRef(null);
  const inputName = useRef(null);

  const [name, setName] = useState(inputLocation);
  const [location, setLocation] = useState(inputName);

  function postImage(){
    PostDataBaseLocations(name, location);
    navigate(-1);
  }

  return (
    <>
      <TopMenu />
      <Header title="New Location" />
      <div className="panelCenter">
        <CardUpdateBanner className="bannerUpdate"/>
      </div>

    
      <div className="contentColum">
        <h2>Name</h2>
        <input 
        ref={inputName} 
        className="inputName" 
        placeholder="Location name" 
  
        onChange={(e) => setName(e.target.value)}
        ></input>
        <h2>Direccion</h2>
        <input
          ref={inputLocation}
          className="inputDescription"
          placeholder="Location direccion"
   
          onChange={(e) => setLocation(e.target.value)}
        ></input>
      </div>
        <PanelButtonsBelow clickCreate={()=>postImage()} text="Create" icon="add"/>
      
    </>
  );
}

export default NewLocation;