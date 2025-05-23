import Header from "../../components/header/Header";
import ButtonTopMenu from "../../components/topmenu/ButtonTopMenu";
import TopMenu from "../../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import TimeLineCaptionLableSequiences from "../../components/timeLine/TimeLineCaptionLableSequiences";
import TimeLineBlockSequences from "../../components/timeLine/TimeLineBlockSequences";
import { useRef, useState } from "react";
import HorizontalDivider from "../../components/HorizontalDivider";
import PanelButtonsBelow from "../../components/Buttons/PanelButtonsBelow";
import { actualizarSecuencia } from "../../services/secuenciaService";
import { ProyectBanner } from "../../components/proyect/ProyectBanner";
import axios from 'axios';
import { GetDataBaseSequences } from "../../dataBase/DataBaseSequences";
import { use } from "react";
import { useEffect } from "react";
import { ErrorPanel } from "../../components/errorPanel/ErrorPanel";

function Sequences() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState(null);
  const [inputStart, setInputStart] = useState(null);
  const [inputEnd, setInputEnd] = useState(null);
  const [inputColor, setInputColor] = useState(null);
  const popUpRemove = useRef(null);

  const myItems = [
    <ButtonTopMenu icon={"add"} text={""} click={() => sowPopUp()}/>
  ];


  function sowPopUp() {
    if (popUpRemove.current.className === "popUpRemoveBack") {
      popUpRemove.current.className = "hidden";
    } else {
      popUpRemove.current.className = "popUpRemoveBack";
    }
  }

  useEffect(() => {
    document.title = "Sequences - Shot Reel";
  }, []);


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
      proyecto: {
        id_proyecto: localStorage.getItem("proyect")
      },
      color: colorValue.replace('#', '') ,
    };

    console.log(ima);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/secuencias",
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
      setError(err.response?.data || "An error occurred while creating the sequence.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateAndSubmit();
  };

  return (
    <>
    <ErrorPanel error={error} set={setError} />
      <TopMenu />
      <div className="main-content">
      <ProyectBanner/>      
      <Header title="Sequences" button={myItems} />

      <div className="contentColum">
        <TimeLineCaptionLableSequiences/>
      </div>

      <div ref={popUpRemove}  className="hidden">
        <div className="popUpRemovePanel">
          <p>Add new sequence</p>
          <HorizontalDivider />
          <p>Name</p>
            <input
                    className="inputName"
            style={{paddingRight: "0px", paddingLeft: "10px"}}
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            placeholder="Name"
            />
          <p>Start"</p>
          <input
                   className="inputName"
            style={{paddingRight: "0px", paddingLeft: "10px"}}
            onChange={(e) => setInputStart(e.target.value)}
            type="integer"
            placeholder="0"
            />
          <p>End"</p>
          <input
                   className="inputName"
            style={{paddingRight: "0px", paddingLeft: "10px"}}
            onChange={(e) => setInputEnd(e.target.value)}
            type="integer"
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
            placeholder="#FFFFFF"
          />


        </div>
        <PanelButtonsBelow
            clickCreate={validateAndSubmit}
            clickCancel={() => sowPopUp()}
            text={"Create" }
            icon={"add" }
          />
      </div>
          </div>
    </>   
  );

}

export default Sequences;
