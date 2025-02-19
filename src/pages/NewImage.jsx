import CardUpdateBanner from "../components/cards/cardUpdateBanner/CardUpdateBanner";
import Header from "../components/header/Header";
import TopMenu from "../components/topmenu/TopMenu";
import PanelButtonsBelow from "../components/Buttons/PanelButtonsBelow";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from 'axios';
import { ErrorPanel } from "../components/errorPanel/ErrorPanel";

function NewImage() {
  const navigate = useNavigate();
  const inputText = useRef(null);

  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    const ima = {
      descripcion: description,
      imagen: null,
      proyecto: {
        id_proyecto: localStorage.getItem("proyect")
      }
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/storyboard",
        ima, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError(null);
      navigate("/storyboard");
    } catch (err) {
      
      setError(err.response?.data || "Error creating storyboard.");
    }
  };


  return (
    <>
      <TopMenu />
      <Header title="New Image" />
      <div className="panelCenter">
        <CardUpdateBanner className="bannerUpdate" />
      </div>

      <div className="contentColum">
        <ErrorPanel error={error} set={setError} />
        <h2>Description</h2>
        <input
          className="inputDescription"
          placeholder="Image description"
          ref={inputText}
          onChange={(e) => setDescription(e.target.value)}

        ></input>
      </div>
      <PanelButtonsBelow clickCreate={()=>handleSubmit()} clickCancel={()=>navigate("/storyboard")} text="Create" icon="add" />
    </>
  );
}

export default NewImage;
