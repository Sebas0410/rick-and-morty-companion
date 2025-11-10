// src/peticiones.js

export async function obtenerSerie() {
  const respuesta = await fetch(
    "https://mock.apidog.com/m1/1120540-1111711-default/serie"
  );
  const data = await respuesta.json();
  return data;
}

// src/peticiones.js
export async function obtenerPersonajes() {
  const respuesta = await fetch(
    "https://mock.apidog.com/m1/1120540-1111711-default/personajes"
  );
  const data = await respuesta.json(); // data es un array
  return data;
}

export async function obtenerProductos() {
  const respuesta = await fetch(
    "https://mock.apidog.com/m1/1120540-1111711-default/productos"
  );
  const data = await respuesta.json();
  return data;
}

// ⚠️ Cambia la baseURL por la tuya real de Apidog
const BASE_URL = "https://mock.apidog.com/m1/1120540-1111711-default";

export async function obtenerForos() {
  const respuesta = await fetch(`${BASE_URL}/foros`);
  const data = await respuesta.json();
  return data; // array de temas
}

export async function obtenerForoPorId(id) {
  const respuesta = await fetch(`${BASE_URL}/foros/${id}`);
  const data = await respuesta.json();
  return data; // objeto con comentarios
}

export async function obtenerTemporadas() {
  const respuesta = await fetch(`${BASE_URL}/temporadas`);
  const data = await respuesta.json();
  return data; // es un array de temporadas
}


