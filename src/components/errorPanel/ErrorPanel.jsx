
import './errorPanel.css';

export function ErrorPanel ({error, set}){
    if(error){
        return (
            <div className="panelError">
                <div className="panelErrorColor"></div>
                <div className='divError'>
                    <button className="buttonError" onClick={() => set("")}>X</button>
                </div>
                <h2>Error</h2>
                <p className="textError">{error}</p>
            </div>            
        );
    }
}