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
  const [imagenBase64, setImagenBase64] = useState("");

  useEffect(() => {    
    obtenerProyecto(num,setProyecto,setError);
    document.title = "Edit Proyect - Shot Reel";
  }, []);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenBase64(reader.result);
      console.log(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {

    const datosActualizados = {
      nombre: nombre ? nombre : proyecto.nombre,
      descripcion: descripcion ? descripcion : proyecto.descripcion,
      imagen: imagenBase64 ? imagenBase64.split(',')[1] : proyecto.imagen,
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

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
  };
 
  return ( 
    <>
      <TopMenu />
      <Header title="Edit Proyect" />
      <div className="panelCenter">
        <CardUpdateBanner
          text="Update Image"
          imagen={
              imagenBase64
                ? imagenBase64
                : proyecto && proyecto.imagen
                  ? "data:image/png;base64," + proyecto.imagen
                  : "default-image.webp"
            }          
            
          className="bannerUpdate"
          handleFileChange={handleImagenChange} 
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
