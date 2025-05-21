import React, { useEffect, useState } from 'react';
import { GetStorageProyect } from '../../controller/Controller';
import { obtenerProyecto } from '../../services/proyectoService';


export function ProyectBanner({ima}){
  const num = GetStorageProyect();
  const [proyecto, setProyecto] = useState(null);
  const [error, setError] = useState(null);

    useEffect(() => {    
        obtenerProyecto(num,setProyecto,setError);
    }, []);

    return(
        <>
        <div className='bannerProyect'>
          

            <img src={proyecto ? "data:image/png;base64,"+proyecto.imagen : "default-image.webp"}></img>
            <div className='proyectTitle'>
                <h1>{proyecto ? proyecto.nombre : "Cargando nombre..."}</h1>
            </div>
              <div className="gradientOverlay"></div>

        </div>
        </>
    );

}