import React from "react";

function Pregunta({ pregunta, handleRespuesta, respuestaSeleccionada }) {
    // Primera pregunta (filtro): opciones Sí/No
    if (pregunta.key === "filtro") {
        return (
            <div className="pregunta-container">
                <h3 className="pregunta-title">{pregunta.texto}</h3>
                <div className="pregunta-buttons">
                    <button
                        className={`pregunta-opcion ${
                            respuestaSeleccionada === 1 ? "seleccionada" : ""
                        }`}
                        onClick={() => handleRespuesta(1)}
                    >
                        No
                    </button>
                    <button
                        className={`pregunta-opcion ${
                            respuestaSeleccionada === 5 ? "seleccionada" : ""
                        }`}
                        onClick={() => handleRespuesta(5)}
                    >
                        Sí
                    </button>
                </div>
            </div>
        );
    }

    // Segunda pregunta: escala de 1 a 5 para intensidad
    if (pregunta.key === "intensidad") {
        const opcionesIntensidad = [1, 2, 3, 4, 5]; // Escala del 1 al 5
        return (
            <div className="pregunta-container">
                <h3 className="pregunta-title">{pregunta.texto}</h3>
                <div className="pregunta-buttons intensidad-scale">
                    {opcionesIntensidad.map((valor) => (
                        <button
                            key={valor}
                            className={`pregunta-opcion ${
                                respuestaSeleccionada === valor ? "seleccionada" : ""
                            }`}
                            onClick={() => handleRespuesta(valor)}
                        >
                            {valor}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Otras preguntas: escala verbal (Nunca, Rara vez, etc.)
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
                        className={`pregunta-opcion ${
                            respuestaSeleccionada === op.valor ? "seleccionada" : ""
                        }`}
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
