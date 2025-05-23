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


  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [proyecto, setProyecto] = useState([]);
  const [imagenBase64, setImagenBase64] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [caracteresRestantes, setCaracteresRestantes] = useState(255);
  const [caracteresRestantesNombre, setCaracteresRestantesNombre] = useState(50);

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




  useEffect(() => {
    document.title = "Edit Location - Shot Reel";
    obtenerLocation(num, setProyecto, setError);
    console.log(proyecto);
  }, []);

  useEffect(() => {
    setInputName(proyecto.nombre);
    setInputLocation(proyecto.descripcion);
  }, [proyecto]);

  const handleSubmit = async (e) => {

    const datosActualizados = {
      nombre: inputName ? inputName : proyecto.nombre,
      descripcion: inputLocation ? inputLocation : proyecto.descripcion,
      imagen: imagenBase64
        ? imagenBase64.split(',')[1]
        : (proyecto && proyecto.imagen)
          ? proyecto.imagen
          : null,
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
    console.log("Delete location");
    await eliminarStoryboard(num);
    navigate("/locations");
  };

  return (
    <>
      <TopMenu />
      <div className="main-content">
        <Header title="Edit Location" />
        <div className="panelCenter">
          <CardUpdateBanner
            text="Update Image"
            imagen={
              imagenBase64
                ? imagenBase64
                : (proyecto && proyecto.imagen)
                  ? "data:image/png;base64," + proyecto.imagen
                  : "https://via.placeholder.com/400x300?text=No+Image"
            }

            className="bannerUpdate"
            handleFileChange={handleImagenChange}
          />
        </div>
        <ErrorPanel error={error} set={setError} />
        <div className="contentColum">
          <h2>Name</h2>
          <div className="input-container">
            <input
              ref={name}
              value={inputName}
              className="inputName"
              placeholder={proyecto ? proyecto.nombre : "Location name"}
              onChange={(e) => {
                const texto = e.target.value;
                setInputName(texto);
                setCaracteresRestantesNombre(50 - texto.length);
              }}
              maxLength="50"
            />
            <div className="contador-caracteres">
              {caracteresRestantesNombre} characters remaining
            </div>
          </div>

          <h2>Direccion</h2>
          <div className="textarea-container">
            <textarea
              ref={location}
              value={inputLocation}
              className="inputDescription"
              placeholder={proyecto ? proyecto.descripcion : "Location direccion"}
              onChange={(e) => {
                const texto = e.target.value;
                setInputLocation(texto);
                setCaracteresRestantes(255 - texto.length);
              }}
              maxLength="255"
              rows="4"
            ></textarea>
            <div className="contador-caracteres">
              {caracteresRestantes} characters remaining
            </div>
          </div>
        </div>
        <PanelButtonsBelow clickCreate={() => handleSubmit()} clickCancel={() => navigate("/locations")} text="Update" icon="update" />
        <RemoveBelow click={deleteImage} tipe="1" text="Remove Location" />
      </div>
    </>
  );
}

export default EditLocation;
