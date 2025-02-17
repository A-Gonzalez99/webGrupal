import Header from "../components/header/Header";

import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from "react-router-dom";
import { GetStorageProyect } from "../controller/Controller";
import { GetDataBaseProyect } from "../dataBase/DataBaseProyects";
import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import { useRef, useState,useEffect } from "react";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import RemoveBelow from "../components/remove/RemoveBelow";
import UsersRaw from "../components/actors/UsersRaw";
import { obtenerProyecto } from "../services/proyectoService";
import { actualizarProyecto } from "../services/proyectoService";
import{eliminarProyecto} from "../services/proyectoService";
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";

export function EditProyect() {
  var num = GetStorageProyect();
  const db = GetDataBaseProyect();
  const inputLocation = useRef(null);
  const inputName = useRef(null);
  
  const navigate = useNavigate();

  const [proyecto, setProyecto] = useState();
  const [error, setError] = useState(null);

  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();

  useEffect(() => {    
    obtenerProyecto(num,setProyecto,setError);
  }, []);


  const handleSubmit = async (e) => {

    const datosActualizados = {
      nombre: nombre ? nombre : proyecto.nombre,
      descripcion: descripcion ? descripcion : proyecto.descripcion,
      imagen: "",
    };

    try {
      await actualizarProyecto(num, datosActualizados);
      navigate("/proyect");
      setError(null);
    } catch (err) {
      setError("The description exceeds the 255 character limit. Please shorten the text and try again.");
    }
  };

  const deleteImage = async () => {
    await eliminarProyecto(num);
    navigate("/home");
  };

 
  return ( 
    <>
      <TopMenu />
      <Header title="Edit Proyect" />
      <div className="panelCenter">
        <CardUpdateBanner
          text="Update Image"
          imagen={proyecto ? proyecto.imagen : "Loading name..."}
          className="bannerUpdate"
        />
      </div>

      <div className="contentColum">
        <ErrorPanel error={error} set={setError} />
        <h2>Name</h2>
        <input
          ref={inputName}
          className="inputName"
          placeholder={proyecto ? proyecto.nombre : "Name"}
          onChange={(e) => setNombre(e.target.value)}>
        </input>

        <h2>Description</h2>
        <input
          ref={inputLocation}
          className="inputDescription"
          placeholder={proyecto ? proyecto.descripcion : "Description"}
          onChange={(e) => setDescripcion(e.target.value)}>
        </input>

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
      <PanelButtonsBelow 
        clickCreate={handleSubmit} 
        text={"Edit"} icon={"update"} />
      <RemoveBelow click={deleteImage} tipe="1" text="Remove Image" />
    </>
  );
}
