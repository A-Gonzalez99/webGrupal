
import ButtonBelow from "../../components/Buttons/ButtonBelow";
import { useNavigate } from 'react-router-dom';

function PanelButtonsBelow({icon ,text, clickCreate, clickCancel}) {
    const navigate = useNavigate();

    return (
        <div className="panelButtonsBelow">
            <div className="panelButtonsBelowContent">
            <ButtonBelow icon={icon} text={text} click={clickCreate} clas={"buttonBelowCreate"}/>
            <div style={{width: "16px"}}></div>
            <ButtonBelow icon={"close"} text={"Go Back"} 
            
            click={()=> clickCancel ? clickCancel() : navigate("/proyect")} 
            
            clas={"buttonBelowCancel"}/>
            </div>
      </div>
    )
}
export default PanelButtonsBelow