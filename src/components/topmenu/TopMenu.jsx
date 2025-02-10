import './topMenu.css'
import { useNavigate } from 'react-router-dom';
import ButtonTopMenu from './ButtonTopMenu'
import HorizontalDivider from '../HorizontalDivider';
import { useEffect, useRef } from 'react';

/* /usersettings */
function TopMenu() {
  
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


  return (
    <>
      <div className="panelTop">
        <ButtonTopMenu buttonId="button-menu" referen={button} icon="menu" click={()=>sowMenu()}/>
        <ButtonTopMenu buttonId="button-settings" icon="info"  click={() => navigate("/Documentation")}/>

        <ButtonTopMenu buttonId="button-settings" icon="account_circle"  click={() => navigate("/usersettings")}/>
      </div>

      <div id='panel-menu' ref={paragraph}  class="hidden" onMouseLeave={()=>paragraph.current.className  = 'hidden'}>
        <div className="panelLefth">
          <p onClick={() => navigate("/home")}>Home</p>
          <HorizontalDivider/>
          <p onClick={() => navigate("/storyboard")}>Storyboard</p>
          <p onClick={() => navigate("/locations")}>Locations</p>
          <p onClick={()=> navigate("/sequences")}>Time line</p>
          <p>Script</p>
        </div>
      </div>
    </>
  )
}

export default TopMenu