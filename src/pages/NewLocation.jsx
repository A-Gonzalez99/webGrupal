import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { PostDataBaseLocations } from "../dataBase/DataBaseLocations";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from 'axios';
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";

function NewLocation() {
  const navigate = useNavigate();
  const inputLocation = useRef(null);
  const inputName = useRef(null);

  const [name, setName] = useState(inputLocation);
  const [location, setLocation] = useState(inputName);
  const [error, setError] = useState(null);

  function postImage(){
    PostDataBaseLocations(name, location);
    navigate(-1);
  }

  const handleSubmit = async (e) => {
    const localizacion = {
      nombre: name,
      descripcion: location,
      imagen: null,
      link_map: null,
      proyecto: {
        id_proyecto: localStorage.getItem("proyect")
      }
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/localizacion",
        localizacion,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        
      console.log("Localización creada:", response.data);
      setError(null);
      navigate("/locations");
    } catch (err) {
      console.error("Error al crear la localización:", err.response?.data || err.message);
      setError(err.response?.data || "El campo nombre y descripcion son obligatorio");
    }
  };

  return (
    <>
      <TopMenu />
      <Header title="New Location" />
      <div className="panelCenter">
        <CardUpdateBanner className="bannerUpdate"/>
      </div>
    
      <div className="contentColum">
        <ErrorPanel error={error} set={setError} />

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
        <PanelButtonsBelow clickCreate={()=>handleSubmit()} clickCancel={()=>navigate("/locations")} text="Create" icon="add"/>
      
    </>
  );
}

export default NewLocation;