import {CardsLocations} from "../components/cards/cardsLocations/CardsLocations";
import CardProyects from "../components/cards/cardsProyects/CardProyects";
import CardStoryBoard from "../components/cards/CardStoryBoard";
import Header from "../components/header/Header";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from "react-router-dom";
import { ChangePage } from "../controller/Controller";

function Locations() {
  const navigate = useNavigate();

  const myItems = [
    <ButtonTopMenu click={()=>navigate("/newlocation")} icon={"add"} text={""} />,
  ];
  return (
    <>
      <TopMenu />
      <Header title="Locations" button={myItems} />

      <div className="proyectContent">
          <CardsLocations/>
        </div>


    </>
  );
}

export default Locations;
