
import './errorPanel.css';

export function ErrorPanel ({error, set}){
    if(error){
        return (
            <div className="panelError">
                <div className="errorIconContainer">
                    <span className="material-icons">error</span>
                </div>
                <div className='errorText'>
                    <p className="textError">{error}</p>
                </div>
                <div className='closeButton'>
                    <button className="buttonError" onClick={() => set("")}>X</button>
                </div>
            </div>            
        );
    }
}