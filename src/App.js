import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UserSettings from './pages/UserSettings';
import NewProyect from './pages/NewProyect';
import Storyboard from './pages/Storyboard';
import Locations from './pages/Locations';
import NewImage from './pages/NewImage';
import EditImage from './pages/EditImage';
import NewLocation from './pages/NewLocation';
import EditLocation from './pages/EditLocation';
import Scenes from './pages/timeline/Scenes';
import Sequences from './pages/timeline/Sequences';
import Scene from './pages/timeline/Scene';
import { Login } from './pages/Login';
import { NewAccount } from './pages/NewAccount';
import { Proyect } from './pages/Proyect';
import { EditProyect } from './pages/EditProyect';
import { Offline } from './pages/Offline';
import HtmlIframe from './pages/HtmlIframe';
import Report from './pages/Report';
import { checkServerConnection } from './utils/checkConnection'; // Importa la función de verificación

function App() {
  const [isOnline, setIsOnline] = useState(true); // Estado para verificar la conexión

  useEffect(() => {
    // Verifica la conexión con el servidor cuando la aplicación se carga
    const verifyConnection = async () => {
      const isConnected = await checkServerConnection();
      setIsOnline(isConnected);
    };

    verifyConnection();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para la página de "Sin conexión" */}
        <Route path="/offline" element={<Offline />} />

        {/* Redirige a /offline si no hay conexión */}
        {!isOnline && (
          <Route path="*" element={<Navigate to="/offline" replace />} />
        )}

        {/* Rutas normales */}
        {isOnline && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/usersettings" element={<UserSettings />} />
            <Route path="/newproyect" element={<NewProyect />} />
            <Route path="/storyboard" element={<Storyboard />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/newimage" element={<NewImage />} />
            <Route path="/editimage" element={<EditImage />} />
            <Route path="/newlocation" element={<NewLocation />} />
            <Route path="/editlocation" element={<EditLocation />} />
            <Route path="/sequences" element={<Sequences />} />
            <Route path="/scenes" element={<Scenes />} />
            <Route path="/scene" element={<Scene />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newaccount" element={<NewAccount />} />
            <Route path="/proyect" element={<Proyect />} />
            <Route path="/editproyect" element={<EditProyect />} />
            <Route path="/Documentation" element={<HtmlIframe />} />
            <Route path="/reporte" element={<Report />} />
          </>
        )}

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;