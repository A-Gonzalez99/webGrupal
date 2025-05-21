import { CardsLocations } from "../components/cards/cardsLocations/CardsLocations";
import Header from "../components/header/Header";
import { ProyectBanner } from "../components/proyect/ProyectBanner";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Locations() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Locations - Shot Reel";
  }, []);

  const myItems = [
    <ButtonTopMenu click={() => navigate("/newlocation")} icon={"add"} text={""} />,
  ];
  return (
    <>
      <TopMenu />
      <ProyectBanner />
      <Header title="Locations" button={myItems} />
      <div className="proyectContent">
        <CardsLocations />
      </div>
    </>
  );
}

export default Locations;
