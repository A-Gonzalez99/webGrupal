import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from 'axios';
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";
import { useEffect } from "react";

function NewImage() {
  const navigate = useNavigate();
  const inputText = useRef(null);

  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [imagenBase64, setImagenBase64] = useState("");
  const [caracteresRestantes, setCaracteresRestantes] = useState(255);

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
      document.title = "New Image - Shot Reel";
    }, []);
  

  const handleSubmit = async (e) => {
    const ima = {
      descripcion: description,
      imagen: imagenBase64 ? imagenBase64.split(',')[1] : null,
      proyecto: {
        id_proyecto: localStorage.getItem("proyect")
      }
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/storyboard",
        ima, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError(null);
      navigate("/storyboard");
    } catch (err) {
      
      setError(err.response?.data || "Error creating storyboard.");
    }
  };


  return (
    <>
      <TopMenu />
      <div className="main-content">
      <Header title="New Image" />
      <div className="panelCenter">
          <CardUpdateBanner 
            text="Update Image"
            className="bannerUpdate" 
            imagen={imagenBase64} 
            handleFileChange={handleImagenChange} 
          />
      </div>

      <div className="contentColum">
        <ErrorPanel error={error} set={setError} />
        <h2>Description</h2>
        <div className="textarea-container">
          <textarea
            className="inputDescription"
            placeholder="Image description"
            ref={inputText}
            onChange={(e) => {
              const texto = e.target.value;
              setDescription(texto);
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
      <PanelButtonsBelow clickCreate={()=>handleSubmit()} clickCancel={()=>navigate("/storyboard")} text="Create" icon="add" />
      </div>
    </>
  );
}

export default NewImage;
