import { obtenerUsuarios } from "./usuarioService";
import { obtenerStoryBoards } from "./storyboarService";
import { obtenerLocalizaciones } from "./locationService"

export const obtenerIdUsuarioDesdeToken = () => {
  const token = localStorage.getItem("token");
  if(window.location.href!="/login") {
    if (!token) {
      // Redirect to /login if no token is found
      window.location.href = "/login";
      return null;
    }
  }

  const partes = token.split("-");
  if (partes.length !== 3) {
    // Redirect to /login if the token structure is invalid
    window.location.href = "/login";
    return null;
  }

  const idUsuario = partes[partes.length - 1];
  return parseInt(idUsuario, 10);
};

export async function obtenerDatos() {
  try {
    const response = await obtenerUsuarios();
    const data = response?.data || [];

    if (!Array.isArray(data)) {
      console.error("Error: response.data no es un arreglo", data);
      return [];
    }

    const newData = await Promise.all(
      data.map(async (user) => ({
        name: user?.correo,
        proyectos: user?.proyectos?.length || 0,
        storyboards: await obtenerNumSB(user),
        localizaciones: await obtenerNumL(user),
      }))
    );

    return newData;
  } catch (error) {
    return [];
  }
}


async function obtenerNumSB(user) {
  var num = 0;

  await Promise.all(
    user?.proyectos?.map(async (proyecto) => {
      const storyboards = await obtenerStoryBoards(proyecto.id_proyecto);
      num += storyboards.length;
    }) || []
  );

  return num
}

async function obtenerNumL(user) {
  var num = 0;

  await Promise.all(
    user?.proyectos?.map(async (proyecto) => {
      const storyboards = await obtenerLocalizaciones(proyecto.id_proyecto);
      num += storyboards.length;
    }) || []
  );

  return num
}




