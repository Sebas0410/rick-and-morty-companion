import React, { useEffect, useState } from "react";
import { obtenerForos, obtenerForoPorId } from "./peticiones";

function Foro({ onVolver }) {
  const [foros, setForos] = useState([]);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  // Registro del usuario
  const [usuarioId, setUsuarioId] = useState("");
  const [usuarioNombre, setUsuarioNombre] = useState("");

  // Nuevo comentario
  const [nuevoComentario, setNuevoComentario] = useState("");

  // Crear tema
  const [nuevoTema, setNuevoTema] = useState({ titulo: "", descripcion: "" });

  // Cargar foros iniciales
  useEffect(() => {
    obtenerForos().then(setForos);
  }, []);

  // Recuperar usuario guardado al entrar
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuarioForo"));
    if (userData) {
      setUsuarioId(userData.id);
      setUsuarioNombre(userData.nombre);
    }
  }, []);

  // Guardar usuario cuando cambia
  useEffect(() => {
    if (usuarioId && usuarioNombre) {
      localStorage.setItem(
        "usuarioForo",
        JSON.stringify({ id: usuarioId, nombre: usuarioNombre })
      );
    }
  }, [usuarioId, usuarioNombre]);

  // Abrir tema concreto
  function abrirTema(id) {
    obtenerForoPorId(id).then((tema) => {
      setTemaSeleccionado(tema);
      setComentarios(tema.comentarios || []);
    });
  }

  // Registro de usuario
  function manejarRegistro(e) {
    e.preventDefault();
    if (!usuarioId.trim() || !usuarioNombre.trim()) {
      alert("Completa el ID y el nombre para registrarte.");
      return;
    }
    alert(`Usuario registrado como ${usuarioNombre} (id: ${usuarioId})`);
  }

  // Crear un nuevo tema
  function manejarCrearTema(e) {
    e.preventDefault();
    if (!usuarioId.trim() || !usuarioNombre.trim()) {
      alert("Debes registrarte para crear un tema.");
      return;
    }
    if (!nuevoTema.titulo.trim() || !nuevoTema.descripcion.trim()) {
      alert("Completa el título y la descripción del tema.");
      return;
    }

    const temaNuevo = {
      id: foros.length + 1,
      titulo: nuevoTema.titulo,
      descripcion: nuevoTema.descripcion,
      creador: usuarioId,
      fecha_creacion: new Date().toISOString().split("T")[0],
      num_respuestas: 0,
      comentarios: [],
    };

    setForos((prev) => [...prev, temaNuevo]);
    setNuevoTema({ titulo: "", descripcion: "" });
    alert("Tema creado correctamente 🎉");
  }

  // Enviar comentario
  function manejarEnviarComentario(e) {
    e.preventDefault();

    if (!usuarioId.trim() || !usuarioNombre.trim()) {
      alert("Debes registrarte con un ID y nombre antes de comentar.");
      return;
    }

    if (!nuevoComentario.trim()) return;

    const comentarioNuevo = {
      id_comentario: comentarios.length + 1,
      usuario_id: usuarioId,
      usuario_nombre: usuarioNombre,
      mensaje: nuevoComentario,
      fecha: new Date().toLocaleString("es-ES"),
    };

    setComentarios((prev) => [...prev, comentarioNuevo]);
    setNuevoComentario("");
  }

  // Eliminar comentario
  function manejarEliminarComentario(idComentario) {
    setComentarios((prev) =>
      prev.filter((c) => c.id_comentario !== idComentario)
    );
  }

  // ========= VISTA LISTA DE TEMAS =========
  if (!temaSeleccionado) {
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
          Volver al inicio
        </button>

        <h1>Foro de Rick & Morty</h1>
        <p style={{ marginBottom: "20px" }}>
          Elige un tema para ver y escribir comentarios, o crea el tuyo.
        </p>

        {/* Zona superior: Registro + Crear tema como tarjetas */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          {/* Tarjeta de Registro */}
          <div
            style={{
              flex: "1 1 260px",
              background:
                "linear-gradient(135deg, rgba(0,176,255,0.15), rgba(0,230,118,0.05))",
              borderRadius: "12px",
              padding: "16px 18px",
              border: "1px solid #1e88e5",
              boxShadow: "0 0 12px rgba(0,176,255,0.25)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
              🪪 Registro de usuario
            </h3>
            <p style={{ fontSize: "13px", color: "#ccc" }}>
              Regístrate una vez y podrás comentar y crear temas.
            </p>
            <form
              onSubmit={manejarRegistro}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <input
                type="text"
                placeholder="ID de usuario (ej: user_03)"
                value={usuarioId}
                onChange={(e) => setUsuarioId(e.target.value)}
                style={{
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  backgroundColor: "#050505",
                  color: "white",
                }}
              />
              <input
                type="text"
                placeholder="Nombre visible (ej: MortyFan)"
                value={usuarioNombre}
                onChange={(e) => setUsuarioNombre(e.target.value)}
                style={{
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  backgroundColor: "#050505",
                  color: "white",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "8px",
                  background:
                    "linear-gradient(135deg, #00b0ff, #00e676)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "4px",
                }}
              >
                Guardar usuario
              </button>
              {usuarioNombre && (
                <p style={{ fontSize: "12px", color: "#8bc34a", margin: 0 }}>
                  Sesión activa como <strong>{usuarioNombre}</strong> ({usuarioId})
                </p>
              )}
            </form>
          </div>

          {/* Tarjeta de Crear tema */}
          <div
            style={{
              flex: "1 1 260px",
              backgroundColor: "#111",
              borderRadius: "12px",
              padding: "16px 18px",
              border: "1px solid #333",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
              🧪 Crear nuevo tema
            </h3>
            <p style={{ fontSize: "13px", color: "#ccc" }}>
              Comparte teorías, debates, episodios favoritos o lo que quieras.
            </p>
            <form
              onSubmit={manejarCrearTema}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <input
                type="text"
                placeholder="Título del tema"
                value={nuevoTema.titulo}
                onChange={(e) =>
                  setNuevoTema({ ...nuevoTema, titulo: e.target.value })
                }
                style={{
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  backgroundColor: "#050505",
                  color: "white",
                }}
              />
              <textarea
                rows="3"
                placeholder="Descripción breve"
                value={nuevoTema.descripcion}
                onChange={(e) =>
                  setNuevoTema({ ...nuevoTema, descripcion: e.target.value })
                }
                style={{
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  backgroundColor: "#050505",
                  color: "white",
                  resize: "vertical",
                }}
              ></textarea>
              <button
                type="submit"
                style={{
                  padding: "8px",
                  backgroundColor: "#00b0ff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                }}
              >
                Publicar tema
              </button>
            </form>
          </div>
        </div>

        {/* Lista de temas con estilo */}
        <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>
          Temas del foro
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {foros.map((tema) => (
            <div
              key={tema.id}
              onClick={() => abrirTema(tema.id)}
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #1c1c1c, #101010)",
                cursor: "pointer",
                border: "1px solid #333",
                transition: "transform 0.15s, box-shadow 0.15s, border 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(0,0,0,0.7)";
                e.currentTarget.style.border = "1px solid #00b0ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.border = "1px solid #333";
              }}
            >
              <h3 style={{ margin: 0 }}>{tema.titulo}</h3>
              <p style={{ margin: "4px 0", color: "#ccc", fontSize: "14px" }}>
                {tema.descripcion}
              </p>
              <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
                Creador: <strong>{tema.creador}</strong> · Respuestas:{" "}
                {tema.num_respuestas ?? 0} · Fecha: {tema.fecha_creacion}
              </p>
            </div>
          ))}

          {foros.length === 0 && <p>No hay temas de foro en el mock.</p>}
        </div>
      </div>
    );
  }

  // ========= VISTA DETALLE DEL TEMA =========
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
        onClick={() => setTemaSeleccionado(null)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#00b0ff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Volver a la lista de temas
      </button>

      <h1>{temaSeleccionado.titulo}</h1>
      <p style={{ maxWidth: "700px" }}>{temaSeleccionado.descripcion}</p>

      {/* Comentarios */}
      <h3 style={{ marginTop: "30px" }}>Comentarios</h3>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "#111",
          border: "1px solid #333",
          marginBottom: "15px",
        }}
      >
        {comentarios.map((c) => (
          <div
            key={c.id_comentario}
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "#1c1c1c",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div>
              <p style={{ margin: 0 }}>
                <strong>{c.usuario_nombre}</strong>{" "}
                <span style={{ fontSize: "12px", color: "#aaa" }}>
                  ({c.usuario_id}) · {c.fecha}
                </span>
              </p>
              <p style={{ margin: "4px 0" }}>{c.mensaje}</p>
            </div>

            {/* Botón borrar solo si el comentario es del usuario actual */}
            {usuarioId === c.usuario_id && (
              <button
                onClick={() => manejarEliminarComentario(c.id_comentario)}
                style={{
                  alignSelf: "flex-start",
                  padding: "4px 8px",
                  backgroundColor: "#e53935",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                Borrar
              </button>
            )}
          </div>
        ))}

        {comentarios.length === 0 && <p>Aún no hay comentarios.</p>}
      </div>

      {/* Formulario nuevo comentario */}
      <form
        onSubmit={manejarEnviarComentario}
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "600px",
        }}
      >
        <textarea
          rows="3"
          placeholder="Escribe tu comentario..."
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          style={{
            padding: "8px",
            resize: "vertical",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#050505",
            color: "white",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#00e676",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            alignSelf: "flex-start",
            fontWeight: "bold",
          }}
        >
          Publicar comentario
        </button>
      </form>
    </div>
  );
}

export default Foro;
