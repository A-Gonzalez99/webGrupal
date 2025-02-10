import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";

function NewProyect() {

  return (
    <>
      <TopMenu />
      <Header title="New Proyect" />
      <div className="panelCenter">
        <CardUpdateBanner className="bannerUpdate"/>
      </div>

    
        <div className="contentColum">

      
          <h2>Name</h2>
          <input className="inputName" placeholder="Proyect name"></input>
          <h2>Description</h2>
          <input className="inputDescription" placeholder="Proyect description"></input>
        
        </div>
        <PanelButtonsBelow text="Create" icon="add"/>
      
    </>
  );
}

export default NewProyect;