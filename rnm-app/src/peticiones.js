// src/peticiones.js

// ✅ Base URL configurada desde variable de entorno
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://mock.apidog.com/m1/1120540-1111711-default";

// 🔹 Serie
export async function obtenerSerie() {
  const respuesta = await fetch(`${BASE_URL}/serie`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener la serie");
  }
  return await respuesta.json();
}

// 🔹 Personajes
export async function obtenerPersonajes() {
  const respuesta = await fetch(`${BASE_URL}/personajes`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener personajes");
  }
  return await respuesta.json(); // data es un array
}

// 🔹 Productos
export async function obtenerProductos() {
  const respuesta = await fetch(`${BASE_URL}/productos`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener productos");
  }
  return await respuesta.json();
}

// 🔹 Foros
export async function obtenerForos() {
  const respuesta = await fetch(`${BASE_URL}/foros`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener foros");
  }
  return await respuesta.json(); // array de temas
}

export async function obtenerForoPorId(id) {
  const respuesta = await fetch(`${BASE_URL}/foros/${id}`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener foro por ID");
  }
  return await respuesta.json(); // objeto con comentarios
}

// 🔹 Temporadas
export async function obtenerTemporadas() {
  const respuesta = await fetch(`${BASE_URL}/temporadas`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener temporadas");
  }
  return await respuesta.json(); // array de temporadas
}


