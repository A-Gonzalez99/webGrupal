import HorizontalDivider from "../HorizontalDivider";
import { useRef, useState } from "react";
import PanelButtonsBelow from "../../components/Buttons/PanelButtonsBelow";
import { RemoveDatabaseStoryBoard } from "../../dataBase/DataBaseStoryBoard";
import { useNavigate } from "react-router-dom";
import { RemoveDataBaseLocations } from "../../dataBase/DataBaseLocations";

function NewSequence({ isActivo }) {
  const popUpNewS = useRef(null);
  const navigate = useNavigate();
  const inputText = useRef(null);
  const [description, setDescription] = useState(inputText);
  const textInfoRemove = useRef(null);

  function RemoveImage() {
      if (description === "REMOVE") {
        
      }else{
        textInfoRemove.a="removeTextAnim"
      }
  }

  if (isActivo) {
    sowPopUp();
    console.log("remove");
  }

  function sowPopUp() {
    if (popUpNewS.current.className === "popUpRemoveBack") {
      popUpNewS.current.className = "hidden";
    } else {
      popUpNewS.current.className = "popUpRemoveBack";
    }
  }

  return (
    <>
      <div className="removeBelow">
        <HorizontalDivider />
      </div>

      <div ref={popUpNewS} className="hidden">
        <div className="popUpRemovePanel">
          <p>Remove image</p>
          <HorizontalDivider />
          <p>Are you sure you want to delete the Image?</p>
          <p ref={textInfoRemove}>Type REMOVE to confirm</p>
          <input
            ref={inputText}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>

      </div>
    </>
  );
}

export default NewSequence;
