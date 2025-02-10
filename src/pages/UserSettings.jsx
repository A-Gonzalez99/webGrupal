import TopMenu from "../components/topmenu/TopMenu"
import { useNavigate } from 'react-router-dom';

function UserSettings() {

  const navigate = useNavigate();

  return (
    <>
      <TopMenu/>
      <h2>User Settings</h2>
      <button onClick={()=>navigate("/login")}>Log out</button>
    </>
  )
}

export default UserSettings