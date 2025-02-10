import Header from "../components/header/Header";
import { ProyectBanner } from "../components/proyect/ProyectBanner";
import { ProyectDescription } from "../components/proyect/ProyectDespription";
import { ProyectMenu } from "../components/proyect/ProyectMenu";
import { ProyectName } from "../components/proyect/ProyectName";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import TopMenu from "../components/topmenu/TopMenu";
import { useNavigate } from 'react-router-dom';
import { GetStorageProyect } from "../controller/Controller";
import { GetDataBaseProyect } from "../dataBase/DataBaseProyects";

export function Proyect() {
  const navigate = useNavigate();
  var num = GetStorageProyect();
  const myItems = [<ButtonTopMenu icon={"edit"} text={""} click={() => navigate("/editproyect")}/>];
  const db = GetDataBaseProyect();
  
  return (
    <>
      <TopMenu />
      <Header title="Proyect" button={myItems} />

      <div>
        <div className="contentColum">
            <ProyectBanner ima={db[num].imag}/>
            <ProyectName nam={db[num].tittle}/>
            <ProyectDescription des={db[num].description}/>
            <ProyectMenu/>
        </div>
      </div>
    </>
  );
}

