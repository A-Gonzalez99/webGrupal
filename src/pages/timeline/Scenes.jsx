import Header from "../../components/header/Header";
import TimeLineBlockScenes from "../../components/timeLine/TimeLineBlockScenes";
import TimeLineBlock from "../../components/timeLine/TimeLineBlockSequences";
import TimeLineCaptionLableScenes from "../../components/timeLine/TimeLineCaptionLableScenes";
import TimeLineCaptionLable from "../../components/timeLine/TimeLineCaptionLableSequiences";
import ButtonTopMenu from "../../components/topmenu/ButtonTopMenu";
import TopMenu from "../../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { GetStorageSequences } from "../../controller/Controller";
import HorizontalDivider from "../../components/HorizontalDivider";
import PanelButtonsBelow from "../../components/Buttons/PanelButtonsBelow";
import { eliminarSecuencia, obtenerSecuenciaId } from "../../services/secuenciaService";
import { actualizarSecuencia } from "../../services/secuenciaService";
import RemoveBelow from "../../components/remove/RemoveBelow";
import { ProyectBanner } from "../../components/proyect/ProyectBanner";
import { actualizarEscena, obtenerEscenaId, eliminarEscena } from "../../services/escenasService";
import { GetStorageScenes } from "../../controller/Controller";
import { ErrorPanel } from "../../components/errorPanel/ErrorPanel";

function Scenes() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  const [inputText, setInputText] = useState(null);
  const [inputStart, setInputStart] = useState(null);
  const [inputEnd, setInputEnd] = useState(null);
  const [inputColor, setInputColor] = useState(null);
  const popUpRemove = useRef(null);
  const [isNew, setIsNew] = useState(false);
  const [isScene, setIsScene] = useState(false);

  const [proyecto, setProyecto] = useState([]);
  const [escena, setEscena] = useState([]);

  const myItems = [
    <ButtonTopMenu icon={"edit"} text={""} click={() => sowPopUp(false, false)} />,
    <div style={{ paddingRight: "12px" }}></div>,
    <ButtonTopMenu icon={"add"} text={""} click={() => sowPopUp(true, false)} />
  ];

  function sowPopUp(isNew, isScened) {
    setIsNew(isNew);
    setIsScene(isScened);

    obtenerEscenaId(GetStorageScenes(), setEscena, setError2);
    console.log(escena);

    // Para modo edición de secuencia (no escena)
    if (!isNew && proyecto && !isScened) {
      setInputText(proyecto.nombre || "");
      setInputStart(proyecto.min_inicio || "");
      setInputEnd(proyecto.min_final || "");
      setInputColor(proyecto.color ? `#${proyecto.color}` : "#FFFFFF");
    }

    // Para modo nueva secuencia (no escena)
    if (isNew && !isScened) {
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
    obtenerSecuenciaId(GetStorageSequences(), setProyecto, setError2);
    console.log(proyecto);
    document.title = "Scenes - Shot Reel";
  }, []);

  useEffect(() => {
    if (isScene && escena) {
      setInputText((escena.nombre || "") + "");
      setInputStart(escena.min_inicio || "");
      setInputEnd(escena.min_final || "");
      setInputColor(escena.color ? `#${escena.color}` : "#FFFFFF");
    }
  }, [escena, isScene]);

  const deleteSecuencia = async () => {
    console.log("Delete image");
    await eliminarSecuencia(proyecto.id_secuencia);
    navigate("/sequences");
  };

  const deleteEscena = async () => {
    console.log("Delete image");
    await eliminarEscena(escena.id_escena);
    window.location.reload();
  };

  const handleUpdate = async (e) => {
    try {
      await actualizarSecuencia(GetStorageSequences(), {
        min_final: inputEnd,
        min_inicio: inputStart,
        nombre: inputText,
        proyecto: {
          id_proyecto: localStorage.getItem("proyect")
        },
        color: inputColor ? inputColor.replace('#', '') : "",
      });
      setError(null);
    } catch (err) {
      // setError(err.response?.data.error || "Error updating sequence.");
    }
    window.location.reload();
  }

  const handleUpdateScene = async (e) => {
    try {
      await actualizarEscena(GetStorageScenes(), {
        min_final: inputEnd,
        min_inicio: inputStart,
        nombre: inputText,
        secuencia: {
          id_secuencia: GetStorageSequences()
        },
        color: inputColor ? inputColor.replace('#', '') : "",
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data.error || "Error updating scene.");
    }
    window.location.reload();
  }

  const validateAndSubmit = async () => {
    if (!inputText) {
      setError("Name field is required.");
      return;
    }

    if (inputText.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    if (!inputStart || !inputEnd) {
      setError("Start and end minutes are required.");
      return;
    }

    if (inputStart >= inputEnd) {
      setError("Start minute must be less than end minute.");
      return;
    }

    const colorValue = inputColor || "#FFFFFF";

    const ima = {
      min_final: inputEnd,
      min_inicio: inputStart,
      nombre: inputText,
      secuencia: {
        id_secuencia: GetStorageSequences()
      },
      color: colorValue.replace('#', '') ,
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
      setError(err.response?.data.error || "Error creating scene.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateAndSubmit();
  };

  return (
    <>
      <TopMenu />
      <ErrorPanel error={error} set={setError} />
      <div className="main-content">
        <ProyectBanner />
        <Header title={"Scenes to " + proyecto.nombre} button={myItems} />

        <TimeLineCaptionLableScenes edit={
          () => {
            sowPopUp(false, true);
          }
        } />

        <div ref={popUpRemove} className="hidden">
          <div className="popUpRemovePanel">
            <p>{isNew ? "Add new scene" : isScene ? "Edit scene" : "Edit sequence"}</p>
            <HorizontalDivider />

            <p>Name</p>
            <input
              className="inputName"
              style={{ paddingRight: "0px", paddingLeft: "10px" }}
              onChange={(e) => setInputText(e.target.value)}
              type="text"
              value={inputText}
              placeholder="Name"
            />

            <p>Start"</p>
            <input
              className="inputName"
              style={{ paddingRight: "0px", paddingLeft: "10px" }}
              onChange={(e) => setInputStart(e.target.value)}
              type="number"
              value={inputStart}
              placeholder="0"
            />

            <p>End"</p>
            <input
              className="inputName"
              style={{ paddingRight: "0px", paddingLeft: "10px" }}
              onChange={(e) => setInputEnd(e.target.value)}
              type="number"
              value={inputEnd}
              placeholder="1"
            />

            <p>Color</p>
            <input
              className="inputName"
              style={{
                paddingRight: "0px",
                paddingLeft: "0px",
                backgroundColor: inputColor,
              }}

              onChange={(e) => setInputColor(e.target.value)}
              type="color"
              value={inputColor}
            />

            {!isNew && (
              <RemoveBelow click={isScene ? deleteEscena : deleteSecuencia} tipe="1" text={isScene ? "Delete scene" : "Delete sequence"} />
            )}

          </div>

          <PanelButtonsBelow
            clickCreate={() => isNew ? handleSubmit({ preventDefault: () => {} }) : isScene ? handleUpdateScene() : handleUpdate()}
            clickCancel={() => sowPopUp(true)}
            text={isNew ? "Create" : "Update"}
            icon={isNew ? "add" : "update"}
          />
        </div>
      </div>
    </>
  );
}

export default Scenes;
