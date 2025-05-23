import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { PostDataBaseLocations } from "../dataBase/DataBaseLocations";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from 'axios';
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";
import { useEffect } from "react";

function NewLocation() {
  const navigate = useNavigate();
  const inputLocation = useRef(null);
  const inputName = useRef(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [imagenBase64, setImagenBase64] = useState("");
  const [caracteresRestantesNombre, setCaracteresRestantesNombre] = useState(50);
  const [caracteresRestantes, setCaracteresRestantes] = useState(255);

  useEffect(() => {
    document.title = "New Location - Shot Reel";
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

  const validateAndSubmit = async () => {
    if (!name) {
      setError("Name field is required.");
      return;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    const localizacion = {
      nombre: name,
      descripcion: location,
      imagen: imagenBase64 ? imagenBase64.split(',')[1] : null,
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

      setError(null);
      navigate("/locations");
    } catch (err) {
      setError("An error occurred while creating the location.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateAndSubmit();
  };

  return (
    <>
      <TopMenu />
        <div className="main-content">
        <Header title="New Location" />
        <div className="panelCenter">
          <CardUpdateBanner
            text="Update location image" 
            className="bannerUpdate"
            imagen={imagenBase64}
            handleFileChange={handleImagenChange}
          />
        </div>

        <div className="contentColum">
          <ErrorPanel error={error} set={setError} />

          <h2>Name</h2>
          <div className="input-container">
            <input
              ref={inputName}
              className="inputName"
              placeholder="Location name"
              onChange={(e) => {
                const texto = e.target.value;
                setName(texto);
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
              ref={inputLocation}
              className="inputDescription"
              placeholder="Location direccion"
              onChange={(e) => {
                const texto = e.target.value;
                setLocation(texto);
                setCaracteresRestantes(255 - texto.length);
              }}
              maxLength="255"
              rows="4"
            />
            <div className="contador-caracteres">
              {caracteresRestantes} characters remaining
            </div>
          </div>
        </div>
      <PanelButtonsBelow clickCreate={validateAndSubmit} clickCancel={() => navigate("/locations")} text="Create" icon="add" />
      </div>
    </>
  );
}

export default NewLocation;