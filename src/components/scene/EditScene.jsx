import { useRef, useEffect, useState } from "react";
import HorizontalDivider from "../HorizontalDivider";
import PanelButtonsBelow from "../Buttons/PanelButtonsBelow";

export function EditScene({ valor, setValor }) {
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
      <>
        <div ref={popUpEditScene} className="hidden">
          <div className="popUpRemovePanel">
            <p>Edit Scene</p>
            <HorizontalDivider />
            <div className="panelRow">
              <p>Name</p>
              <input></input>
            </div>
            <div className="panelRow">
              <p>Start</p>
              <input></input>
              <p>minutes</p>
            </div>
            <div className="panelRow">
              <p>End</p>
              <input></input>
              <p>minutes</p>
            </div>
            <div className="panelRow">
              <p>Color</p>
              <input
                ref={colorInput}
                style={{ backgroundColor: borderColor, width: 40 }}
                className="colorEditor"
                type="color"
                id="colorPicker"
              />
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
    </>
  );
}
