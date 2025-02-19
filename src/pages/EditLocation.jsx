import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import RemoveBelow from "../components/remove/RemoveBelow";
import { GetStorageLocation } from "../controller/Controller";
import { actualizarStoryboard } from "../services/locationService";
import { obtenerLocation, eliminarStoryboard } from "../services/locationService";
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";


function EditLocation() {
  const num = GetStorageLocation();
  const inputLocation = useRef(null);
  const inputName = useRef(null);

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [proyecto, setProyecto] = useState([]);

  useEffect(() => {
    obtenerLocation(num, setProyecto, setError);
    console.log(proyecto);
  }, []);

  const handleSubmit = async (e) => {

    const datosActualizados = {
      nombre: name ? name : proyecto.nombre,
      descripcion: location ? location : proyecto.descripcion,
      imagen: null,
      link_map: null
    };

    try {
      await actualizarStoryboard(num, datosActualizados);
      navigate("/locations");
      setError(null);
    } catch (err) {
      setError("Please check that the name and description fields are not deleted and that the description does not exceed 255 characters.");
    }
  };

  const deleteImage = async () => {
    console.log("Delete image");
    await eliminarStoryboard(num);
    navigate("/locations");
  };

  return (
    <>
      <TopMenu />
      <Header title="Edit Location" />
      <div className="panelCenter">
        <CardUpdateBanner
          text="Update Image"
          imagen=""
          className="bannerUpdate"
        />
      </div>
        <ErrorPanel error={error} set={setError} />
      <div className="contentColum">
        <h2>Name</h2>
        <input
          ref={inputName}
          className="inputName"
          placeholder={proyecto ? proyecto.nombre : "Location name"}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <h2>Direccion</h2>
        <input
          ref={inputLocation}
          className="inputDescription"
          placeholder={proyecto ? proyecto.descripcion : "Location direccion"}
          onChange={(e) => setLocation(e.target.value)}
        ></input>
      </div>
      <PanelButtonsBelow clickCreate={() => handleSubmit()} clickCancel={()=>navigate("/locations")} text="Save" icon="add" />
      <RemoveBelow click={deleteImage} tipe="1" text="Remove Image" />
    </>
  );
}

export default EditLocation;
