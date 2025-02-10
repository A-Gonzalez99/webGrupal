import Header from "../../components/header/Header";
import TimeLineBlockScenes from "../../components/timeLine/TimeLineBlockScenes";
import TimeLineBlock from "../../components/timeLine/TimeLineBlockSequences";
import TimeLineCaptionLableScenes from "../../components/timeLine/TimeLineCaptionLableScenes";
import TimeLineCaptionLable from "../../components/timeLine/TimeLineCaptionLableSequiences";
import ButtonTopMenu from "../../components/topmenu/ButtonTopMenu";
import TopMenu from "../../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';

function Scenes() {
  const navigate = useNavigate();

  const myItems = [
    <ButtonTopMenu icon={"edit"} text={""} click={() => navigate("/newproyect")}/>,
    <ButtonTopMenu icon={"add"} text={""} click={() => navigate("/newproyect")}/>
  ];
  return (
    <>
      <TopMenu />
      <Header title="Scenes" button={myItems} />

      <div >
      <div className="timeLineP">

      <TimeLineBlockScenes/>
        </div>
        <TimeLineCaptionLableScenes/>
      </div>
    </>
  );
}

export default Scenes;
