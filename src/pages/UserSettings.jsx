import TopMenu from "../components/topmenu/TopMenu"
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import ButtonTopMenu from "../components/topmenu/ButtonTopMenu";
import ButtonBelow from "../components/Buttons/ButtonBelow";
import Header from "../components/header/Header";
import axios from "axios";
import { useState,useEffect } from "react";
import { actualizarUsuario } from "../services/usuarioService";

function UserSettings() {

  const navigate = useNavigate();

  function serrarSecion(){
    localStorage.removeItem("token");
    navigate("/login")
  }
  const myItems = [      <ButtonBelow icon="exit_to_app" text={"Log out"} click={() => serrarSecion()} clas={"buttonBelowCreate"}/>  ];

  const [proyectos, setProyectos] = useState([]);
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");


  
  const obtenerProyectosUsuario = async (id_usuario) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuarios/`+id_usuario
      );
      
      // Verificar si la respuesta tiene los datos esperados
      if (response.data && typeof response.data === 'object') {
        setProyectos(response.data); 
        setInputFirstName(response.data.nombre || ""); 
        setInputLastName(response.data.apellido || ""); 
        setInputEmail(response.data.correo || ""); 
        setInputPassword(response.data.contrasenna || ""); 
      } else {
        setInputFirstName(""); 
        setInputLastName(""); 
        setInputEmail(""); 
        setInputPassword(""); 
      }
    } catch (err) {
      setInputFirstName(""); 
      setInputLastName(""); 
      setInputEmail(""); 
      setInputPassword(""); 
    }
  };

  const handleUpdateUser = async (e) => {
    actualizarUsuario(proyectos.id_usuario, {
      nombre: inputFirstName,
      apellido: inputLastName,
      correo: inputEmail,
      contrasenna: inputPassword,
    }, setError);
    window.location.reload();
  }


  
  useEffect(() => {
    document.title = "Home - Shot Reel";
    const id_usuario = localStorage.getItem("token"); 
    if (id_usuario) {
      obtenerProyectosUsuario(id_usuario); 
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <TopMenu />
      
      <div className="main-content">
        <Header title="User Settings" button={myItems} />

        <h1 className="h1Proyect">First Name</h1> 
        <input className="inputName" type="text" placeholder="First Name" value={inputFirstName} onChange={(e) => setInputFirstName(e.target.value)} />
        <div style={{paddingTop: "16px"}}/>

        <h1 className="h1Proyect">Last Name</h1>
        <input className="inputName" type="text" placeholder="Last Name" value={inputLastName} onChange={(e) => setInputLastName(e.target.value)} />
        <div style={{paddingTop: "16px"}}/>

        <h1 className="h1Proyect">Email</h1>
        <input className="inputName" type="text" placeholder="Email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
        <div style={{paddingTop: "16px"}}/>

        <h1 className="h1Proyect">Password</h1>
        <input className="inputName" type="password" placeholder="Password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
        <div style={{paddingTop: "16px"}}/>
        
        <ButtonBelow icon="update" text={"Update"} click={() => handleUpdateUser()} clas={"buttonBelowCreate"}/>
        <div style={{paddingTop: "16px"}}/>

        <div className="infoPanal">
        <ButtonBelow icon="info" text={"View Help Docs"} click={() => navigate("/Documentation")} clas={"buttonBelowCreate"}/>
        <div style={{paddingTop: "16px"}}/>

        <ButtonBelow icon="bar_chart" text={"View Report"} click={() => navigate("/reporte")} clas={"buttonBelowCreate"}/>
                <div style={{paddingTop: "24px"}}/>


        </div>
      </div>
    </>
  )
}

export default UserSettings