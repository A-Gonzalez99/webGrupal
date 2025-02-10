import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import {
  PostDataBaseStoryBoard,
} from "../dataBase/DataBaseStoryBoard";
  function NewImage() {
  const navigate = useNavigate();
  const inputText = useRef(null);

  const [description, setDescription] = useState(inputText);

  function postImage(){
    PostDataBaseStoryBoard(description);
    navigate(-1);
  }

  return (
    <>
      <TopMenu />
      <Header title="New Image" />
      <div className="panelCenter">
        <CardUpdateBanner className="bannerUpdate" />
      </div>

      <div className="contentColum">
        <h2>Description</h2>
        <input
          className="inputDescription"
          placeholder="Proyect description"
          ref={inputText}
          onChange={(e) => setDescription(e.target.value)}

        ></input>
      </div>
      <PanelButtonsBelow clickCreate={()=>postImage()} text="Create" icon="add" />
    </>
  );
}

export default NewImage;
