import { useRef } from "react";

function TimeLineBlockScenes({ db }) {
  // Ordena por min_inicio ascendente
  const sortedDb = [...db].sort((a, b) => Number(a.min_inicio) - Number(b.min_inicio));
  // Calcula el mayor min_final
  const tiempoFinal = Math.max(...sortedDb.map(element => Number(element.min_final)));

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {sortedDb.map((b, index) => (
        <Block
          key={b.id_escena || index}
          {...b}
          num={index}
          db={sortedDb}
          tiempoFinal={tiempoFinal}
        />
      ))}
    </div>
  );
}

function Block(props) {
  const textBlock = useRef(null);

  function mouseEnter() {
    if (textBlock.current.className === "textTimeLineBlock") {
      textBlock.current.className = "textTimeLineBlockHiden";
    } else {
      textBlock.current.className = "textTimeLineBlock";
    }
  }

  function radio(index) {
    if (index === 0) {
      return { backgroundColor: "#" + props.color, borderTopLeftRadius: 100, borderBottomLeftRadius: 100 };
    } else if (index === props.db.length - 1) {
      return { backgroundColor: "#" + props.color, borderTopRightRadius: 100, borderBottomRightRadius: 100 };
    } else {
      return { backgroundColor: "#" + props.color };
    }
  }

  function calcularLargo(ini, fin, ultima) {
    var duracion = fin - ini;
    var porcentaje = (duracion * 100) / ultima;
    return porcentaje;
  }

  return (
    <div
      className="timeLineBlock"
      style={{ width: calcularLargo(props.min_inicio, props.min_final, props.tiempoFinal) + "%" }}
    >
      <p ref={textBlock} className="textTimeLineBlockHiden">
        {props.nombre}
      </p>
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseEnter}
        className="red"
        style={radio(props.num)}
      ></div>
      <div className="panelEnd">
        <div className="panelTime"></div>
        <p>{props.min_final}"</p>
      </div>
    </div>
  );
}

export default TimeLineBlockScenes;