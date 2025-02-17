import TopMenu from "../components/topmenu/TopMenu"
import { useNavigate } from 'react-router-dom';

function UserSettings() {

  const navigate = useNavigate();

  function serrarSecion(){
    localStorage.setItem("token"," ")
    navigate("/login")
  }

  return (
    <>
      <TopMenu/>
      <h2>User Settings</h2>
      <button onClick={()=>serrarSecion()}>Log out</button>
    </>
  )
}

export default UserSettings