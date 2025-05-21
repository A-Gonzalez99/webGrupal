import Header from "../../components/header/Header";
import TimeLineBlockScenes from "../../components/timeLine/TimeLineBlockScenes";
import TimeLineBlock from "../../components/timeLine/TimeLineBlockSequences";
import TimeLineCaptionLableScenes from "../../components/timeLine/TimeLineCaptionLableScenes";
import TimeLineCaptionLable from "../../components/timeLine/TimeLineCaptionLableSequiences";
import ButtonTopMenu from "../../components/topmenu/ButtonTopMenu";
import TopMenu from "../../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import { useRef, useState,useEffect } from "react";
import axios from 'axios';
import { GetStorageSequences } from "../../controller/Controller";
import HorizontalDivider from "../../components/HorizontalDivider";
import PanelButtonsBelow from "../../components/Buttons/PanelButtonsBelow";
import { eliminarSecuencia, obtenerSecuenciaId } from "../../services/secuenciaService";
import { actualizarSecuencia } from "../../services/secuenciaService";
import RemoveBelow from "../../components/remove/RemoveBelow";


function Scenes() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState(null);
  const [inputStart, setInputStart] = useState(null);
  const [inputEnd, setInputEnd] = useState(null);
  const [inputColor, setInputColor] = useState(null);
  const popUpRemove = useRef(null);
  const [isNew, setIsNew] = useState(false);
  const [proyecto, setProyecto] = useState([]);

  const myItems = [
    <ButtonTopMenu icon={"edit"} text={""} click={() => sowPopUp(false)}/>,
    <ButtonTopMenu icon={"add"} text={""} click={() => sowPopUp(true)}/>
  ];

  function sowPopUp(isNew) {
  setIsNew(isNew);
  if (!isNew && proyecto) {
    setInputText(proyecto.nombre || "");
    setInputStart(proyecto.min_inicio || "");
    setInputEnd(proyecto.min_final || "");
    setInputColor(proyecto.color ? `#${proyecto.color}` : "#FFFFFF");
  } else {
    setInputText("");
    setInputStart("");
    setInputEnd("");
    setInputColor("#FFFFFF");
  }
  if (popUpRemove.current.className === "popUpRemoveBack") {
    popUpRemove.current.className = "hidden";
  } else {
    popUpRemove.current.className = "popUpRemoveBack";
  }
}

  useEffect(() => {
    obtenerSecuenciaId(GetStorageSequences(), setProyecto, setError);
    console.log(proyecto);
  }, []);  

  const deleteSecuencia = async () => {
    console.log("Delete image");
    await eliminarSecuencia(proyecto.id_secuencia);
    navigate("/sequences");
  };

 const handleUpdate = async (e) => {
    actualizarSecuencia(GetStorageSequences(), {
      min_final: inputEnd,
      min_inicio:inputStart,
      nombre: inputText,
      proyecto: {
        id_proyecto: localStorage.getItem("proyect")
      },
      color: inputColor ? inputColor.replace('#', '') : "",
    }, setError);
    window.location.reload();
  }

  const handleSubmit = async (e) => {
    const ima = {
      min_final: inputEnd,
      min_inicio:inputStart,
      nombre: inputText,
      secuencia: {
        id_secuencia: GetStorageSequences()
      },
      color: inputColor ? inputColor.replace('#', '') : "",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/escenas",
        ima, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError(null);
      window.location.reload();
    } catch (err) {
      
      setError(err.response?.data || "Error creating storyboard.");
    }
  };

  return (
    <>
      <TopMenu />
      <Header title="Scenes" button={myItems} />

      <div >
      <div className="timeLineP">

      <TimeLineBlockScenes/>
        </div>
        <TimeLineCaptionLableScenes/>
      </div>

      <div ref={popUpRemove}  className="hidden">
        <div className="popUpRemovePanel">
          <p>{isNew ? "Add new scene" : "Edit sequence"}</p>          
          <HorizontalDivider />

          <p>Name</p>
          <input
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            value={inputText}
            placeholder="Name"
          />
          <p>Start"</p>
          <input
            onChange={(e) => setInputStart(e.target.value)}
            type="number"
            value={inputStart}
            placeholder="0"
          />
          <p>End"</p>
          <input
            onChange={(e) => setInputEnd(e.target.value)}
            type="number"
            value={inputEnd}
            placeholder="1"
          />
          <p>Color</p>
          <input
            onChange={(e) => setInputColor(e.target.value)}
            type="color"
            value={inputColor}
          />

          <PanelButtonsBelow
            clickCreate={() => isNew? handleSubmit() : handleUpdate()}
            clickCancel={() => sowPopUp(true)}
            text="Create"
            icon="new"
          />

          {!isNew && (
            <RemoveBelow click={deleteSecuencia} tipe="1" text="Remove Sequence" />
          )}

        </div>
      
      </div>
    </>
  );
  
}

export default Scenes;
