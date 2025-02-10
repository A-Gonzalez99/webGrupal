
import ButtonBelow from "../../components/Buttons/ButtonBelow";
import { useNavigate } from 'react-router-dom';

function PanelButtonsBelow({icon ,text, clickCreate, clickCancel}) {
    const navigate = useNavigate();

    return (
        <div className="panelButtonsBelow">
            <div className="panelButtonsBelowContent">
            <ButtonBelow icon={icon} text={text} click={clickCreate} clas={"buttonBelowCreate"}/>
            <ButtonBelow icon={"close"} text={"Cancel"} click={()=>navigate(-1)} clas={"buttonBelowCancel"}/>
            </div>
      </div>
    )
}
export default PanelButtonsBelow