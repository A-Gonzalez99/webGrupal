import { GetDataBaseSequences } from "../../dataBase/DataBaseSequences";
import TimeLineBlock from "./TimeLineBlock";


function TimeLineH(){
    const db = GetDataBaseSequences();

    return (
        <>
            {db.map((b, index) => Block(b, index))}
        </>
    )
}

function Block(name, color) {

  return (
    <>


        <TimeLineBlock color={color} name={name}/>
    

   
    </>
  );
}

export default TimeLineH;
