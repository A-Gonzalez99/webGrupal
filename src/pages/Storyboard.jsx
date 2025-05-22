/* eslint-disable jsx-a11y/alt-text */
import { CardStoryBoard } from "../components/cards/CardStoryBoard";
import Header from "../components/header/Header";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { GetDataBaseStoryBoard } from "../dataBase/DataBaseStoryBoard";
import { ProyectBanner } from "../components/proyect/ProyectBanner";
import { obtenerStoryBoards } from "../services/proyectoService";
import { GetStorageProyect } from "../controller/Controller";

function Storyboard() {
  const navigate = useNavigate();
  const popUpPresentation = useRef(null);
  const [proyecto, setProyecto] = useState([]);
  const [error, setError] = useState(null);
  var [imageCounter, setImageCounter] = useState(0);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    document.title = "Storyboard - Shot Reel";
    obtenerStoryBoards(GetStorageProyect(), setProyecto, setError);

  }, []);

  const myItems = [
    <ButtonTopMenu click={() => sowPopUp()} icon={"play_arrow"} text={""} />,
    <div style={{ paddingRight: "12px" }}></div>,
    <ButtonTopMenu
      click={() => navigate("/newimage")}
      icon={"add"}
      text={""}
    />,
  ];

  function sowPopUp() {
    if (popUpPresentation.current.className === "popUpImages") {
      popUpPresentation.current.className = "hidden";
      setShowPopup(false);

    } else {
      popUpPresentation.current.className = "popUpImages";
      setShowPopup(true);

    }
  }

  function imageCounterUp() {
    if (imageCounter < proyecto.length - 1) {
      setImageCounter(imageCounter + 1);
      console.log = imageCounter;
    }
  }
  function imageCounterDown() {
    if (imageCounter > 0) {
      setImageCounter(imageCounter - 1);
      console.log = imageCounter;
    }
  }

  return (
    <>
      {!showPopup && (
        <>
          <TopMenu />
          <ProyectBanner />
          <Header title="Storyboard" button={myItems} />
       
              <CardStoryBoard />
          
        
        </>
      )}

      <div ref={popUpPresentation} className="popUpImagesHidden">


        <div className="panelIconoEditar" style={{ display: "flex", position: "absolute", top: "0px", zIndex: "10" }}>
          <span onClick={() => sowPopUp()} className="material-icons" >arrow_back_ios_new</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", height: "100vh" }}>
          {proyecto[imageCounter] ? (
            <>
              <img src={"data:image/png;base64," + proyecto[imageCounter].imagen} />
            </>
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="storyBoardMenuInferior">
          {proyecto[imageCounter] && proyecto[imageCounter].descripcion && (
            <div className="panelIconoEditar" style={{ display: "flex", top: "0px", zIndex: "10", margin: "0px" }}>
              <p style={{ margin: "12px" }}>{proyecto[imageCounter].descripcion}</p>
            </div>
          )}
          <div className="storyBoardControl">
            <div className="panelIconoEditar" style={{ display: "flex", top: "0px", zIndex: "10", cursor: "unset", margin: "0px" }}>

              <div className="panelIconoEditar" style={{ display: "flex", top: "0px", zIndex: "10", margin: "0px" }}>
                <span onClick={() => imageCounterDown()} className="material-icons" >arrow_back_ios_new</span>
              </div>

              <p style={{ color: "#f1f1f1", fontSize: "large", fontWeight: 900, cursor: "unset" }}>
                {imageCounter + 1} / {proyecto.length}
              </p>

              <div className="panelIconoEditar" style={{ display: "flex", top: "0px", zIndex: "10", margin: "0px" }}>
                <span onClick={() => imageCounterUp()} className="material-icons" >arrow_forward_ios</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Storyboard;
