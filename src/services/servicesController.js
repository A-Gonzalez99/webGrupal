
export const obtenerIdUsuarioDesdeToken = () => {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    if (token) {
      const partes = token.split("-"); // Dividir el token por el guion
      const idUsuario = partes[partes.length - 1]; // El ID es la última parte
      return parseInt(idUsuario, 10); // Convertir a número
    }
    return null; // Si no hay token, devolver null
  };