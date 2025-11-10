import React, { useEffect, useState } from "react";
import { obtenerProductos } from "./peticiones";

function Merchandising({ onVolver }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos().then(setProductos);
  }, []);

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

      <h1>🛍️ Merchandising oficial</h1>
      <p>Encuentra productos inspirados en el universo de Rick & Morty.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {productos.map((p) => (
          <div
            key={p.id}
            style={{
              backgroundColor: "#1c1c1c",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              border: "1px solid #333",
            }}
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ marginTop: "10px" }}>{p.nombre}</h3>
            <p style={{ color: "#ccc", fontSize: "14px" }}>{p.descripcion}</p>
            <p><strong>Categoría:</strong> {p.categoria}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>
            <p style={{ color: p.stock > 0 ? "#00ff88" : "#ff4444" }}>
              {p.stock > 0 ? `En stock (${p.stock})` : "Agotado"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 👇 ESTA LÍNEA ES CLAVE
export default Merchandising;
