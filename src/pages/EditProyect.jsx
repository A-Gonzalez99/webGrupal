import Header from "../components/header/Header";
import { ProyectBanner } from "../components/proyect/ProyectBanner";
import { ProyectDescription } from "../components/proyect/ProyectDespription";
import { ProyectMenu } from "../components/proyect/ProyectMenu";
import { ProyectName } from "../components/proyect/ProyectName";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from "react-router-dom";
import { GetStorageProyect } from "../controller/Controller";
import { GetDataBaseProyect } from "../dataBase/DataBaseProyects";
import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import { useRef, useState } from "react";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import RemoveBelow from "../components/remove/RemoveBelow";
import UsersRaw from "../components/actors/UsersRaw";

export function EditProyect() {
  var num = GetStorageProyect();
  const db = GetDataBaseProyect();
  const inputLocation = useRef(null);
  const inputName = useRef(null);
  const [input, setInput] = useState(db[num].tittle);


  const [name, setName] = useState(db[num].tittle);
  const [location, setLocation] = useState(db[num].description);
  return (
    <>
      <TopMenu />
      <Header title="Edit Proyect" />
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
        <h2>Description</h2>
        <input
          ref={inputLocation}
          className="inputDescription"
          placeholder="Location direccion"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        ></input>
        <div className="panelRow">
          <select className="permissionsSelected">
            <option value="0">Storyboard</option>
            <option value="1">Locatios</option>
            <option value="2">Time line</option>
            <option value="3">Script</option>
          </select>
          <p className="pBlack">Permissions</p>
        </div>

        <div className="panelSearch">
          <input placeholder="Search user"></input>
          <span class="material-icons">search</span>
        </div>
        <div className="panelUsuariosProyecto">
          <UsersRaw />
        </div>
      </div>
      <PanelButtonsBelow text={"Edit"} icon={"update"} />
      <RemoveBelow tipe="1" text="Remove Image" />
    </>
  );
}
