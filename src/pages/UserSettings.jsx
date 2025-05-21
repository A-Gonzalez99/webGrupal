import TopMenu from "../components/topmenu/TopMenu"
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";

function UserSettings() {

  const navigate = useNavigate();

  function serrarSecion(){
    localStorage.setItem("token"," ")
    navigate("/login")
  }

  return (
    <>
      <TopMenu/>
      <h2>User Settings</h2>
      <button onClick={()=>serrarSecion()}>Log out</button>
         <div className="infoPanal">
          <ButtonTopMenu buttonId="button-settings" icon="info" click={() => navigate("/Documentation")} />
          <ButtonTopMenu buttonId="button-settings" icon="bar_chart" click={() => navigate("/reporte")} />
        </div>
    </>
  )
}

export default UserSettings