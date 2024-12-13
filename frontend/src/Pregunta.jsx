// Pregunta.jsx
import React from "react";
import "./styles/pregunta.css";

function Pregunta({ pregunta, handleRespuesta }) {
  // Si no es la primera pregunta (filtro), usamos la escala de 5 opciones
  // Si es la primera pregunta (filtro), mostramos sólo 2 opciones: "No" y "Sí"

  if (pregunta.key === "filtro") {
    // Primera pregunta: solo Sí/No
    // Por ejemplo, 1=No, 2=Sí
    return (
      <div className="pregunta-container">
        <h3 className="pregunta-title">{pregunta.texto}</h3>
        <div className="pregunta-buttons">
          <button
            className="pregunta-opcion"
            onClick={() => handleRespuesta(1)}
          >
            No
          </button>
          <button
            className="pregunta-opcion"
            onClick={() => handleRespuesta(5)}
          >
            Sí
          </button>
        </div>
      </div>
    );
  }

  // Para el resto de las preguntas, usar las etiquetas verbales:
  const opciones = [
    { valor: 1, etiqueta: "Nunca" },
    { valor: 2, etiqueta: "Rara vez" },
    { valor: 3, etiqueta: "Algunas veces" },
    { valor: 4, etiqueta: "Casi siempre" },
    { valor: 5, etiqueta: "Siempre" },
  ];

  return (
    <div className="pregunta-container">
      <h3 className="pregunta-title">{pregunta.texto}</h3>
      <div className="pregunta-buttons">
        {opciones.map((op) => (
          <button
            key={op.valor}
            className="pregunta-opcion"
            onClick={() => handleRespuesta(op.valor)}
          >
            {op.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pregunta;
