import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import RemoveBelow from "../components/remove/RemoveBelow";
import { GetStorageStoryBoard } from "../controller/Controller";
import { obtenerStoryBoards, eliminarStoryboard, actualizarStoryboard, obtenerStoryBoardId } from "../services/storyboarService";
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";
import { obtenerStoryboardPorId } from "../services/storyboarService";


function EditImage() {
  const num = GetStorageStoryBoard();

  const inputText = useRef(null);
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [proyecto, setProyecto] = useState([]);
  const [imagenBase64, setImagenBase64] = useState("");
  const [inputDescription, setInputDescription] = useState("");
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
    document.title = "Edit Image - Shot Reel";
    obtenerStoryBoardId(num, setProyecto, setError);
    console.log(proyecto);
  }, []);

  useEffect(() => {
    setInputDescription(proyecto.descripcion);
  }, [proyecto]);

  const handleSubmit = async (e) => {
    const datosActualizados = {
      descripcion: inputDescription ? inputDescription : proyecto.descripcion,
      imagen: imagenBase64
        ? imagenBase64.split(',')[1]
        : (proyecto && proyecto.imagen)
          ? proyecto.imagen
          : null
    };

    try {
      await actualizarStoryboard(num, datosActualizados);
      navigate("/storyboard");
      setError(null);
    } catch (err) {
      setError("Error updating project. Please try again.");
    }
  };

  const deleteImage = async () => {
    console.log("Delete image");
    await eliminarStoryboard(num);
    navigate("/storyboard");
  };

  return (
    <>
      <TopMenu />
      <div className="main-content">
        <Header title="Edit Image" />
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

        <div className="contentColum">
          <ErrorPanel error={error} set={setError} />
          <h2>Description</h2>
          <div className="textarea-container">
            <textarea
              ref={inputText}
              value={inputDescription}
              className="inputDescription"
              placeholder={proyecto ? proyecto.descripcion : "Image description"}
              onChange={(e) => {
                const texto = e.target.value;
                setInputDescription(texto);
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
        <PanelButtonsBelow clickCreate={() => handleSubmit()} clickCancel={() => navigate("/storyboard")} text="Save" icon="add" />
        <RemoveBelow click={deleteImage} tipe="0" text="Remove Image" />
      </div>    </>
  );
}

export default EditImage;
