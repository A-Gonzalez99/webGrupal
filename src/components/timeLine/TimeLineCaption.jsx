import { useRef } from "react";
import VerticalDivider from "../VerticalDivider";
import { useNavigate } from 'react-router-dom';

function TimeLineCaption(props,index) {
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
    navigate(props.page)
  }

  return (
    <>
      <div ref={panelCaption} className="timeLineCaption" onClick={()=>changePage()}>
        <div
          onMouseEnter={() => mouseEnter()}
          onMouseLeave={() => mouseEnter()}
          className="timeLineCaptionContainer"
        >
          <div className="colorCaption" style={{ backgroundColor: props.color }}></div>
          <VerticalDivider />
          <div className="nameTimelineContainer">
            <p className="colorTextBlack">{props.name}</p>
          </div>
          <VerticalDivider />
          <p className="colorTextBlack">{props.start}</p>
          <VerticalDivider />
          <p className="colorTextBlack">{props.end}</p>
        </div>
      </div>
    </>
  );
}

export default TimeLineCaption;
