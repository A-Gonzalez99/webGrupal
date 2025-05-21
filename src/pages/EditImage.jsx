import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import RemoveBelow from "../components/remove/RemoveBelow";
import { GetStorageStoryBoard } from "../controller/Controller";
import { obtenerStoryBoards, eliminarStoryboard,actualizarStoryboard, obtenerStoryBoardId } from "../services/storyboarService";
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
    obtenerStoryBoardId(num,setProyecto,setError);
    console.log(proyecto);
  }, []);

  const handleSubmit = async (e) => {
    const datosActualizados = {
      descripcion: description ? description : proyecto.descripcion,
      imagen: imagenBase64 ? imagenBase64.split(',')[1] : null,
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
      <Header title="Edit Image" />
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
