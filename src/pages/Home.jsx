import CardProyects from "../components/cards/cardsProyects/CardProyects";
import Header from "../components/header/Header";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const myItems = [<ButtonTopMenu icon={"add"} text={""} click={() => navigate("/newproyect")}/>];
  return (
    <>
      <TopMenu />
      <Header title="Proyects" button={myItems} />

      <div>
        <div className="proyectContent">
          <CardProyects />
        </div>
      </div>
    </>
  );
}

export default Home;
