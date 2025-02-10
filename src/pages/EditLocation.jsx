import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import {
  GetDataBaseStoryBoard,
  UpdateDataBaseStoryBoard,
} from "../dataBase/DataBaseStoryBoard";
import { useRef, useState } from "react";
import RemoveBelow from "../components/remove/RemoveBelow";
import {
  GetStorageLocation,
  GetStorageStoryBoard,
} from "../controller/Controller";
import { GetDataBaseLocations, UpdateDataBaseLocations } from "../dataBase/DataBaseLocations";

function EditLocation() {
  const num = GetStorageLocation();
  const db = GetDataBaseLocations();
  const inputLocation = useRef(null);
  const inputName = useRef(null);

  const [name, setName] = useState(db[num].name);
  const [location, setLocation] = useState(db[num].location);
  const navigate = useNavigate();

  function Update() {
    UpdateDataBaseLocations(num, name, location);
    navigate(-1);
  }

  return (
    <>
      <TopMenu />
      <Header title="Edit Location" />
      <div className="panelCenter">
        <CardUpdateBanner
          text="Update Image"
          imagen={db[num].imag}
          className="bannerUpdate"
        />
      </div>

      <div className="contentColum">
        <h2>Name</h2>
        <input 
        ref={inputName} 
        className="inputName" 
        placeholder="Location name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        ></input>
        <h2>Direccion</h2>
        <input
          ref={inputLocation}
          className="inputDescription"
          placeholder="Location direccion"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        ></input>
      </div>
      <PanelButtonsBelow clickCreate={() => Update()} text="Save" icon="add" />
      <RemoveBelow tipe="1" text="Remove Image" />
    </>
  );
}

export default EditLocation;
