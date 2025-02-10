import { GetDataBaseSequences } from "../../dataBase/DataBaseSequences";
import VerticalDivider from "../VerticalDivider";
import TimeLineCaption from "./TimeLineCaption";

function TimeLineCaptionLableSequiences() {

  const db = GetDataBaseSequences();
  const page ="/scenes"

  return (
    <>
    <div className="panelHeaderLable">
        <VerticalDivider/>
        <p>Start</p>
        <VerticalDivider/>
        <p>End</p>

        </div>
      <div  className="panelColum">
       {db.map((b, index) => TimeLineCaption(b, index, page))}

      </div>
    </>
  );
}

export default TimeLineCaptionLableSequiences;
