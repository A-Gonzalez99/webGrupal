import HorizontalDivider from "../HorizontalDivider";
import { useRef, useState } from "react";
import PanelButtonsBelow from "../../components/Buttons/PanelButtonsBelow";
import { RemoveDatabaseStoryBoard } from "../../dataBase/DataBaseStoryBoard";
import { useNavigate } from "react-router-dom";
import { RemoveDataBaseLocations } from "../../dataBase/DataBaseLocations";

function RemoveBelow({ text, tipe }) {
  const popUpRemove = useRef(null);
  const navigate = useNavigate();
  const inputText = useRef(null);
  const [description, setDescription] = useState(inputText);
  const textInfoRemove = useRef(null);

  function RemoveImage() {
      if (description === "REMOVE") {
        if(tipe==="0"){
          const num = localStorage.getItem("date");
          RemoveDatabaseStoryBoard(num);
        }
        if(tipe==="1"){
          const num = localStorage.getItem("location");
          RemoveDataBaseLocations(num)
        }
        navigate(-1);
      }else{
        textInfoRemove.a="removeTextAnim"
      }
  }

  function sowPopUp() {
    if (popUpRemove.current.className === "popUpRemoveBack") {
      popUpRemove.current.className = "hidden";
    } else {
      popUpRemove.current.className = "popUpRemoveBack";
    }
  }

  return (
    <>
      <div className="removeBelow">
        <HorizontalDivider />
        <p onClick={() => sowPopUp()}>{text}</p>
      </div>

      <div ref={popUpRemove} className="hidden">
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
        <PanelButtonsBelow
          clickCreate={() => RemoveImage()}
          text="Delete"
          icon="delete"
        />
      </div>
    </>
  );
}

export default RemoveBelow;
