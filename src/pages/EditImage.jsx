import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import RemoveBelow from "../components/remove/RemoveBelow";
import { GetStorageStoryBoard } from "../controller/Controller";
import { obtenerStoryBoards, eliminarStoryboard,actualizarStoryboard } from "../services/storyboarService";
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";

function EditImage() {
  const num = GetStorageStoryBoard();

  const inputText = useRef(null);
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [proyecto, setProyecto] = useState([]);

  useEffect(() => {
    obtenerStoryBoards(num, setProyecto, setError);
  }, []);

  const handleSubmit = async (e) => {
    const datosActualizados = {
      descripcion: description ? description : proyecto.descripcion,
      imagen: null,
    };

    try {
      await actualizarStoryboard(num, datosActualizados);
      navigate("/storyboard");
      setError(null); 
    } catch (err) {
      setError("Error al actualizar el proyecto. Por favor, intenta de nuevo.");
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
      <Header title="Edit Image" />
      <div className="panelCenter">
        <CardUpdateBanner
          text="Update Image"
          imagen={""}
          className="bannerUpdate"
        />
      </div>

      <div className="contentColum">
        <ErrorPanel error={error} set={setError} />
        <h2>Description</h2>
        <input
          ref={inputText}
          className="inputDescription"
          placeholder={proyecto ? proyecto.descripcion : "Image description"}
        
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
      <PanelButtonsBelow clickCreate={() => handleSubmit()} clickCancel={()=>navigate("/storyboard")} text="Save" icon="add" />
      <RemoveBelow click={deleteImage} tipe="0" text="Remove Image" />
    </>
  );
}

export default EditImage;
