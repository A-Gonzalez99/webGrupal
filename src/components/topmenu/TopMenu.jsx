import './topMenu.css'
import { useNavigate } from 'react-router-dom';
import ButtonTopMenu from './ButtonTopMenu'
import HorizontalDivider from '../HorizontalDivider';
import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useParams } from "react-router-dom";

/* /usersettings */
function TopMenu() {
  const location = useLocation().pathname;
  const button = useRef(null);
  let paragraph = useRef(null);
  
  function sowMenu(){
    if (paragraph.current.className === 'parent-container') {
      paragraph.current.className  = 'popUpImagesHidden';
    } else {
      paragraph.current.className  = 'parent-container';
    }
  }
  
  const navigate = useNavigate();

  const CargarMenu = () => {
    if (location != "/home" && location != "/usersettings" && location != "/Documentation" &&
      location != "/reporte"
    ) {
      return (
        <>
          <p onClick={() => navigate("/storyboard")}>Storyboard</p>
          <p onClick={() => navigate("/locations")}>Locations</p>
          <p onClick={() => navigate("/sequences")}>Time line</p>
          <p>Script</p>
        </>
      )
    }
  }

  return (
    <>
      <div className="panelTop">
        <ButtonTopMenu buttonId="button-menu" referen={button} icon="menu" click={()=>sowMenu()}/>

          <div className="infoPanal"> 
            <ButtonTopMenu buttonId="button-settings" icon="info"  click={() => navigate("/Documentation")}/>
            <ButtonTopMenu buttonId="button-settings" icon="bar_chart"  click={() => navigate("/reporte")}/>
          </div>

        <ButtonTopMenu buttonId="button-settings" icon="account_circle"  click={() => navigate("/usersettings")}/>
      </div>

      <div id='panel-menu' ref={paragraph}  class="hidden" onMouseLeave={()=>paragraph.current.className  = 'hidden'}>
        <div className="panelLefth">
          <p onClick={() => navigate("/home")}>Home</p>
          <HorizontalDivider/>
          <CargarMenu/>
        </div>
      </div>
    </>
  )
}

export default TopMenu