import React from "react";

function PersonajeDetalle({ personaje, onVolver }) {
  if (!personaje) return null;

  const {
    nombre,
    edad,
    ocupacion,
    especie,
    estado,
    genero,
    planeta_origen,
    imagen,
    descripcion,
  } = personaje;

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <button
        onClick={onVolver}
        style={{
          padding: "8px 16px",
          backgroundColor: "#00b0ff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Volver
      </button>

      <h1>{nombre}</h1>

      <img
        src={imagen}
        alt={nombre}
        style={{ width: "250px", borderRadius: "12px", margin: "20px 0" }}
      />

      <p><strong>Edad:</strong> {edad}</p>
      <p><strong>Ocupación:</strong> {ocupacion}</p>
      <p><strong>Especie:</strong> {especie}</p>
      <p><strong>Estado:</strong> {estado}</p>
      <p><strong>Género:</strong> {genero}</p>
      <p><strong>Planeta de origen:</strong> {planeta_origen}</p>

      <p style={{ marginTop: "20px" }}>{descripcion}</p>
    </div>
  );
}

export default PersonajeDetalle;
