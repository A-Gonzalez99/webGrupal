// src/utils/checkConnection.js
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const checkServerConnection = async () => {
  try {
    // Intenta hacer una solicitud al servidor (por ejemplo, un endpoint de salud)
    await axios.get('http://localhost:8080/api/usuarios', {
      timeout: 5000, // Tiempo de espera de 5 segundos
    });
    return true; // Hay conexión
  } catch (error) {
    console.error('Error de conexión:', error);
    return false; // No hay conexión
  }
};