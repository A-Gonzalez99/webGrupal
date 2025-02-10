import Header from "../../components/header/Header";
import ButtonTopMenu from "../../components/topmenu/ButtonTopMenu";
import TopMenu from "../../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import TimeLineCaptionLableSequiences from "../../components/timeLine/TimeLineCaptionLableSequiences";
import TimeLineBlockSequences from "../../components/timeLine/TimeLineBlockSequences";

function Sequences() {
  const navigate = useNavigate();

  const myItems = [
    <ButtonTopMenu icon={"edit"} text={""} click={() => navigate("/newproyect")}/>,
    <ButtonTopMenu icon={"add"} text={""} click={() => navigate("/newproyect")}/>
  ];

  return (
    <>
      <TopMenu />
      <Header title="Sequences" button={myItems} />

      <div >
      <div className="timeLineP">

       <TimeLineBlockSequences/>
        </div>
        <TimeLineCaptionLableSequiences/>
      </div>
    </>
  );

}

export default Sequences;
