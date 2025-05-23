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

  function sowMenu() {
    if (paragraph.current.className === 'parent-container') {
      paragraph.current.className = 'popUpImagesHidden';
    } else {
      paragraph.current.className = 'parent-container';
    }
  }

  const navigate = useNavigate();

  const CargarMenu = () => {
    if (location != "/home" && location != "/usersettings" && location != "/Documentation" &&
      location != "/reporte"
    ) {
      return (
        <>
          <HorizontalDivider />
          <p onClick={() => navigate("/storyboard")}>Storyboard</p>
          <HorizontalDivider />
          <p onClick={() => navigate("/locations")}>Locations</p>
          <HorizontalDivider />
          <p onClick={() => navigate("/sequences")}>Time line</p>
          <HorizontalDivider />

          {/* <p>Script</p> */}
        </>
      )
    }
  }

  return (
    <>
      <div className="panelTop">
        <div className="only-mobile">
          <ButtonTopMenu buttonId="button-menu" referen={button} icon="menu" click={() => sowMenu()} />
        </div>

        <div className="not-mobile">
          <h2 onClick={() => navigate("/home")}>Shot Reel</h2>
          <ButtonTopMenu buttonId="button-settings" icon="" texto={"Home"} click={() => navigate("/home")} />

          {(location !== "/home" && location !== "/usersettings" && location !== "/Documentation" && location !== "/reporte") && (
            <>
              <ButtonTopMenu buttonId="button-settings" icon="" texto={"Storyboard"} click={() => navigate("/Storyboard")} />
              <ButtonTopMenu buttonId="button-settings" icon="" texto={"Locations"} click={() => navigate("/locations")} />
              <ButtonTopMenu buttonId="button-settings" icon="" texto={"Time line"} click={() => navigate("/sequences")} />
              {/* <ButtonTopMenu buttonId="button-settings" icon="" texto={"Script"} click={() => navigate("/Home")} /> */}
            </>
          )}
        </div>

        <ButtonTopMenu buttonId="button-settings" icon="account_circle" click={() => navigate("/usersettings")} />
      </div>

      <div id='panel-menu' ref={paragraph} class="hidden" onMouseLeave={() => paragraph.current.className = 'hidden'}>
        <div className="panelLefth">
          <ButtonTopMenu icon={"close"} text={""} click={() => sowMenu()}/>
          <p onClick={() => navigate("/home")}>Home</p>
          <CargarMenu />
        </div>
      </div>

    </>
  )
}

export default TopMenu