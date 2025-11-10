console.log("🌐 API Base URL:", import.meta.env.VITE_API_BASE_URL);


import React, { useEffect, useState } from "react";
import {
  obtenerSerie,
  obtenerPersonajes,
  obtenerTemporadas,
} from "./peticiones";
import PersonajeDetalle from "./PersonajeDetalle";
import Merchandising from "./Merchandising";
import Foro from "./Foro";

function App() {
  // Control de vistas generales
  const [vista, setVista] = useState("inicio");

  // Datos
  const [serie, setSerie] = useState(null);
  const [personajes, setPersonajes] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  // Sección activa
  const [seccionActiva, setSeccionActiva] = useState("personajes");

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroEdad, setFiltroEdad] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");

  useEffect(() => {
    obtenerSerie().then(setSerie);
    obtenerPersonajes().then(setPersonajes);
    obtenerTemporadas().then(setTemporadas);
  }, []);

  // 🔹 Vista Merchandising
  if (vista === "merchandising") {
    return <Merchandising onVolver={() => setVista("inicio")} />;
  }

  // 🔹 Vista Foro
  if (vista === "foro") {
    return <Foro onVolver={() => setVista("inicio")} />;
  }

  // 🔹 Vista Detalle de personaje
  if (vista === "detalle" && personajeSeleccionado) {
    return (
      <PersonajeDetalle
        personaje={personajeSeleccionado}
        onVolver={() => {
          setPersonajeSeleccionado(null);
          setVista("inicio");
        }}
      />
    );
  }

  // 🔹 Cargando serie
  if (!serie) return <h2 style={{ color: "white" }}>Cargando...</h2>;

  // Valores únicos de filtros
  const especiesUnicas = [...new Set(personajes.map((p) => p.especie))];
  const edadesUnicas = [...new Set(personajes.map((p) => p.edad))];
  const generosUnicos = [...new Set(personajes.map((p) => p.genero))];

  // Aplicar filtros
  const personajesFiltrados = personajes.filter((p) => {
    const coincideNombre = p.nombre
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());
    const coincideEspecie = !filtroEspecie || p.especie === filtroEspecie;
    const coincideEdad = !filtroEdad || p.edad === filtroEdad;
    const coincideGenero = !filtroGenero || p.genero === filtroGenero;
    return coincideNombre && coincideEspecie && coincideEdad && coincideGenero;
  });

  // 🔹 Vista principal
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Información de la serie */}
      <h1>{serie.titulo}</h1>
      <img
        src={serie.imagen_portada}
        alt={serie.titulo}
        style={{ width: "220px", borderRadius: "10px", marginBottom: "20px" }}
      />
      <p><strong>Creador:</strong> {serie.creador}</p>
      <p><strong>Año:</strong> {serie.anio_estreno}</p>
      <p><strong>Géneros:</strong> {serie.genero.join(", ")}</p>
      <p><strong>Plataforma:</strong> {serie.plataforma}</p>
      <p><strong>País:</strong> {serie.pais_origen}</p>
      <p><strong>Temporadas:</strong> {serie.temporadas}</p>
      <p style={{ maxWidth: "700px" }}>{serie.sinopsis}</p>

      {/* Botones de navegación */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setVista("merchandising")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#00b0ff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Ver Merchandising
        </button>

        <button
          onClick={() => setVista("foro")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c4dff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Ir al foro
        </button>
      </div>

      {/* Tabs de sección */}
      <div
        style={{
          marginTop: "20px",
          marginBottom: "15px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setSeccionActiva("personajes")}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor:
              seccionActiva === "personajes" ? "#00b0ff" : "#222",
            color: "white",
          }}
        >
          Personajes
        </button>

        <button
          onClick={() => setSeccionActiva("temporadas")}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor:
              seccionActiva === "temporadas" ? "#00b0ff" : "#222",
            color: "white",
          }}
        >
          Temporadas
        </button>
      </div>

      {/* ======================================================= */}
      {/* SECCIÓN PERSONAJES */}
      {/* ======================================================= */}
      {seccionActiva === "personajes" && (
        <>
          <h2 style={{ marginTop: "10px" }}>Personajes principales</h2>

          {/* Filtros */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              backgroundColor: "#111",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 200px" }}>
              <label>Nombre: </label>
              <input
                type="text"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                placeholder="Buscar por nombre"
                style={{ width: "100%", padding: "5px" }}
              />
            </div>

            <div style={{ flex: "1 1 180px" }}>
              <label>Especie: </label>
              <select
                value={filtroEspecie}
                onChange={(e) => setFiltroEspecie(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              >
                <option value="">Todas</option>
                {especiesUnicas.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: "1 1 150px" }}>
              <label>Edad: </label>
              <select
                value={filtroEdad}
                onChange={(e) => setFiltroEdad(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              >
                <option value="">Todas</option>
                {edadesUnicas.map((edad) => (
                  <option key={edad} value={edad}>
                    {edad}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: "1 1 150px" }}>
              <label>Género: </label>
              <select
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              >
                <option value="">Todos</option>
                {generosUnicos.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de personajes */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxHeight: "420px",
              overflowY: "auto",
              paddingRight: "8px",
              borderRadius: "10px",
              border: "1px solid #333",
              backgroundColor: "#111",
            }}
          >
            {personajesFiltrados.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setPersonajeSeleccionado(p);
                  setVista("detalle");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  backgroundColor: "#1c1c1c",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border: "1px solid #333",
                }}
              >
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 2 }}>
                  <h3 style={{ margin: 0 }}>{p.nombre}</h3>
                  <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
                    {p.ocupacion}
                  </p>
                </div>
                <div style={{ flex: 1, fontSize: "14px" }}>
                  <p><strong>Especie:</strong> {p.especie}</p>
                </div>
                <div style={{ flex: 1, fontSize: "14px" }}>
                  <p><strong>Edad:</strong> {p.edad}</p>
                </div>
                <div style={{ flex: 1, fontSize: "14px" }}>
                  <p><strong>Género:</strong> {p.genero}</p>
                </div>
                <div style={{ flex: 1, fontSize: "14px" }}>
                  <p><strong>Estado:</strong> {p.estado}</p>
                </div>
              </div>
            ))}

            {personajesFiltrados.length === 0 && (
              <p style={{ padding: "10px" }}>
                No hay personajes que coincidan con los filtros.
              </p>
            )}
          </div>
        </>
      )}

      {/* ======================================================= */}
      {/* SECCIÓN TEMPORADAS */}
      {/* ======================================================= */}
      {seccionActiva === "temporadas" && (
        <div style={{ marginTop: "10px" }}>
          <h2>Temporadas</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "420px",
              overflowY: "auto",
              paddingRight: "8px",
              borderRadius: "10px",
              border: "1px solid #333",
              backgroundColor: "#111",
            }}
          >
            {temporadas.map((t) => (
              <div
                key={t.id_temporada}
                style={{
                  backgroundColor: "#1c1c1c",
                  borderRadius: "10px",
                  padding: "12px 15px",
                  border: "1px solid #333",
                  display: "flex",
                  gap: "15px",
                }}
              >
                <img
                  src={t.imagen_portada}
                  alt={t.titulo}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 2 }}>
                  <h3 style={{ margin: 0 }}>{t.titulo}</h3>
                  <p style={{ fontSize: "14px", color: "#ccc" }}>
                    Año: {t.anio} · Episodios: {t.num_episodios}
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    <strong>Rating fans:</strong> {t.rating_promedio} / 5
                  </p>
                  <p style={{ fontSize: "13px", color: "#bbb" }}>
                    {t.reseña_destacada}
                  </p>
                </div>

                {/* Episodios dentro de la temporada */}
                <div
                  style={{
                    flex: 3,
                    fontSize: "13px",
                    maxHeight: "140px",
                    overflowY: "auto",
                    backgroundColor: "#111",
                    borderRadius: "8px",
                    padding: "8px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Episodios:</strong>
                  {t.episodios.map((e) => (
                    <div
                      key={e.id_episodio}
                      style={{
                        marginTop: "6px",
                        paddingBottom: "6px",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {e.numero}. {e.titulo}
                      </span>{" "}
                      · ⭐ {e.rating}
                      <p style={{ margin: "2px 0", color: "#ccc" }}>
                        {e.sinopsis}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {temporadas.length === 0 && (
              <p style={{ padding: "10px" }}>
                No se encontraron temporadas en el mock.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
