import HorizontalDivider from "../HorizontalDivider";
import { useNavigate } from 'react-router-dom';

export function ProyectMenu() {
    const navigate = useNavigate();

    return (
    <>
      <HorizontalDivider />
      <table className="tablaMenuProyecto">
        <tr>
          <th>Art</th>
          <th>Direction</th>
          <th>Post-production</th>
        </tr>
        <tr>
          <td onClick={()=>navigate('/storyboard')}>Storyboard</td>
          <td>Script</td>
          <td onClick={()=>navigate('/sequences')}>Timeline</td>
        </tr>
        <tr>
          <td onClick={()=>navigate('/locations')}>Locations</td>
        </tr>
      </table>
    </>
  );
}
