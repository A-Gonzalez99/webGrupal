import { useRef } from "react";
import VerticalDivider from "../VerticalDivider";
import { useNavigate } from 'react-router-dom';

function TimeLineCaption({props,accion}) {
  const panelCaption = useRef(null);
  console.log(props.page)
  function mouseEnter() {
    if (panelCaption.current.className === "timeLineCaption") {
      panelCaption.current.className = "timeLineCaptionOver";
    } else {
      panelCaption.current.className = "timeLineCaption";
    }
  }
  const navigate = useNavigate();

  function changePage(){
    //navigate(url)
  }

  return (
    <>
      <div ref={panelCaption} className="timeLineCaption" onClick={accion}>
        <div
          onMouseEnter={() => mouseEnter()}
          onMouseLeave={() => mouseEnter()}
          className="timeLineCaptionContainer"
        >
          <div className="colorCaption" style={{ backgroundColor: "#"+props.color }}></div>
          <VerticalDivider />
          <div className="nameTimelineContainer">
            <p className="colorTextBlack">{props.nombre}</p>
          </div>
          <VerticalDivider />
          <p className="colorTextBlack">{props.min_inicio}</p>
          <VerticalDivider />
          <p className="colorTextBlack">{props.min_final}</p>
        </div>
      </div>
    </>
  );
}

export default TimeLineCaption;
