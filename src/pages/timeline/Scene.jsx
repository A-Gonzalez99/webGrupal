import Header from "../../components/header/Header";
import ButtonTopMenu from "../../components/topmenu/ButtonTopMenu";
import TopMenu from "../../components/topmenu/TopMenu";
import { useNavigate } from "react-router-dom";
import { GetCardLocation } from "../../components/cards/cardsLocations/CardsLocations";
import { GetDataBaseLocations } from "../../dataBase/DataBaseLocations";
import { GetCardStoryBoard } from "../../components/cards/CardStoryBoard";
import ActorsRaw from "../../components/actors/ActorsRaw";
import ScriptScene from "../../components/ScriptScene";
import { EditScene } from "../../components/scene/EditScene";
import { useState } from "react";
import { EditSceneStoryBoard } from "../../components/scene/EditSceneStoryBoard";
import { EditSceneLocation } from "../../components/scene/EditSceneLocation";
import { EditSceneActors } from "../../components/scene/EditSceneActors";
import { EditSceneScript } from "../../components/scene/EditSceneScript";

function Scene() {
  const navigate = useNavigate();
  const db = GetDataBaseLocations();
  const [boolEditScene, setBoolEditScene] = useState(0);
  const [boolEditSceneStoryBoard, setBoolEditSceneStoryBoard] = useState(0);
  const [boolEditSceneLocation, setBoolEditSceneLocation] = useState(0);
  const [boolEditSceneActors, setBoolEditSceneActors] = useState(0);
  const [boolEditSceneScripts, setBoolEditSceneScript] = useState(0);

  const itemsScene = [
    <ButtonTopMenu icon={"edit"} text={""} click={() => setBoolEditScene(1)} />,
  ];
  const itemsStoryboard = [
    <ButtonTopMenu
      icon={"edit"}
      text={""}
      click={() => setBoolEditSceneStoryBoard(1)}
    />,
  ];
  const itemsLocations = [
    <ButtonTopMenu
      icon={"edit"}
      text={""}
      click={() => setBoolEditSceneLocation(1)}
    />,
  ];
  const itemsActors = [
    <ButtonTopMenu
      icon={"edit"}
      text={""}
      click={() => setBoolEditSceneActors(1)}
    />,
  ];
  const itemsScript = [
    <ButtonTopMenu
      icon={"edit"}
      text={""}
      click={() => setBoolEditSceneScript(1)}
    />,
  ];
  return (
    <>
      <TopMenu />
      <Header title="Scene" button={itemsScene} />
      <Header title="Duration" />
      <div className="panelDuration">
        <div>
          <h3>Start </h3>
          <p>00"</p>
        </div>
        <div>
          <h3>End </h3>
          <p>00"</p>
        </div>
        <div>
          <h3>Total </h3>
          <p>00"</p>
        </div>
      </div>
      <Header title="Storyboard" button={itemsStoryboard} />
      <GetCardStoryBoard index={1} />

      <Header title="Locations" button={itemsLocations} />
      <GetCardLocation index={5} />

      <Header title="Actors" button={itemsActors} />
      <div className="panelHeader">
        <ActorsRaw />
      </div>

      <Header title="Script" button={itemsScript} />
      <div className="panelHeader">
        <ScriptScene />
      </div>
      <EditScene valor={boolEditScene} setValor={setBoolEditScene} />

      <EditSceneStoryBoard
        valor={boolEditSceneStoryBoard}
        setValor={setBoolEditSceneStoryBoard}
      />

      <EditSceneLocation
        valor={boolEditSceneLocation}
        setValor={setBoolEditSceneLocation}
      />

      <EditSceneActors
        valor={boolEditSceneActors}
        setValor={setBoolEditSceneActors}
      />

      <EditSceneScript
        valor={boolEditSceneScripts}
        setValor={setBoolEditSceneScript}
      />
      <div></div>
    </>
  );
}

export default Scene;
