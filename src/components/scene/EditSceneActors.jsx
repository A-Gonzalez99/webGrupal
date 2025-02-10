import { useRef, useEffect, useState } from "react";
import HorizontalDivider from "../HorizontalDivider";
import PanelButtonsBelow from "../Buttons/PanelButtonsBelow";
import { CardStoryBoard } from "../cards/CardStoryBoard";
import ActorsRaw from "../actors/ActorsRaw";
import UsersRaw from "../actors/UsersRaw";

export function EditSceneActors({ valor, setValor }) {
  const popUpEditScene = useRef(null);
  const colorInput = useRef(null);
  const [borderColor, setBorderColor] = useState("black"); // Valor inicial

  useEffect(function () {
    if (valor === 1) {
      sowPopUp();
      setValor(0);
    }
  });

  // Dentro de tu componente
  useEffect(() => {
    if (colorInput.current) {
      colorInput.current.addEventListener("input", (event) => {
        setBorderColor(event.target.value);
      });
    }
  }, [colorInput]);

  function sowPopUp() {
    if (popUpEditScene.current.className === "popUpRemoveBack") {
      popUpEditScene.current.className = "hidden";
    } else {
      popUpEditScene.current.className = "popUpRemoveBack";
    }
  }

  return (
    <>
      <div ref={popUpEditScene} className="hidden">
        <div className="popUpRemovePanel">
          <p>Edit Actors</p>
          <HorizontalDivider />
          <div className="panelContentEdit">
           <UsersRaw/>
          </div>
        </div>
        <PanelButtonsBelow
          text="Save"
          icon="update"
          clickCancel={() => sowPopUp()}
          clickCreate={() => sowPopUp()}
        />
      </div>
    </>
  );
}
