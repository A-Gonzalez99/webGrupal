/* eslint-disable jsx-a11y/alt-text */
import {CardStoryBoard} from "../components/cards/CardStoryBoard";
import Header from "../components/header/Header";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { GetDataBaseStoryBoard } from "../dataBase/DataBaseStoryBoard";

function Storyboard() {
  const navigate = useNavigate();
  const popUpPresentation = useRef(null);
  const db = GetDataBaseStoryBoard();
  var [imageCounter, setImageCounter] = useState(1);

  const myItems = [
    <ButtonTopMenu click={() => sowPopUp()} icon={"play_arrow"} text={""} />,
    <ButtonTopMenu
      click={() => navigate("/newimage")}
      icon={"add"}
      text={""}
    />,
  ];

  function sowPopUp() {
    if (popUpPresentation.current.className === "popUpImages") {
      popUpPresentation.current.className = "hidden";
    } else {
      popUpPresentation.current.className = "popUpImages";
    }
  }

  function imageCounterUp() {
    if (imageCounter < db.length) {
      setImageCounter(imageCounter + 1);
      console.log = imageCounter;
    }
  }
  function imageCounterDown() {
    if (imageCounter > 1) {
      setImageCounter(imageCounter - 1);
      console.log = imageCounter;
    }
  }

  return (
    <>
      <TopMenu />
      <Header title="Storyboard" button={myItems} />

      <div>
        <div className="proyectContent">
          <CardStoryBoard />
        </div>
      </div>

      <div ref={popUpPresentation} className="popUpImagesHidden">
        <div className="buttonBackStoryBoard">
          <span onClick={() => sowPopUp()} class="material-icons">
            arrow_back_ios_new
          </span>
        </div>
        <img src={db[imageCounter - 1].imag} />
        <p>{db[imageCounter - 1].tittle}</p>
        <div className="storyBoardControl">
          <p onClick={() => imageCounterDown()}>&lt;</p>
          <p>
            {imageCounter}/{db.length}
          </p>
          <p onClick={() => imageCounterUp()}>&gt;</p>
        </div>
      </div>
    </>
  );
}

export default Storyboard;
