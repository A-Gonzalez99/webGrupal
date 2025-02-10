import { useRef } from "react";
import { GetDataBaseScenes } from "../../dataBase/DataBaseScenes";

function TimeLineBlockScenes() {
  const db = GetDataBaseScenes();

  return <>{db.map((b, index) => Block(b, index))}</>;
}

function Block(props, num ) {
  const textBlock = useRef(null);

  function mouseEnter() {
    if (textBlock.current.className === "textTimeLineBlock") {
      textBlock.current.className = "textTimeLineBlockHiden";
    } else {
      textBlock.current.className = "textTimeLineBlock";
    }
  }

  function radio(index) {
    console.log(index)
    if (index === 0) {
      return { backgroundColor: props.color, borderTopLeftRadius: 100,borderBottomLeftRadius: 100};
    } else {
      if (index === GetDataBaseScenes().length-1) {
        return { backgroundColor: props.color, borderTopRightRadius: 100,borderBottomRightRadius: 100};
    } else {
        return { backgroundColor: props.color};
      }
    }
  }

  return (
    <>
      <div className="timeLineBlock">
        <p ref={textBlock} className="textTimeLineBlockHiden">
          {props.name}
        </p>
        <div
          onMouseEnter={() => mouseEnter()}
          onMouseLeave={() => mouseEnter()}
          className="red"
          style={radio(num)}
        ></div>
        <div className="panelEnd">
            <div className="panelTime"></div>
            <p>{props.end}"</p>
        </div>
      </div>
    </>
  );
}

export default TimeLineBlockScenes;
