import React, { useState } from "react";
import { enviarRespuestas } from "../utils/api";
import preguntas from "../data/preguntas";
import "../styles/diagnostico.css";
import Pregunta from "../Pregunta";
import { useNavigate } from "react-router-dom";

function PaginaCuestionario({ respuestas, setRespuestas }) {
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(""); // Manejo de errores
  const navigate = useNavigate();

  // Descripciones de contexto para cada dimensión
  const descripciones = {
    filtro: "Por favor, responde a la siguiente pregunta para continuar con el cuestionario.",
    intensidad: "Señala tu nivel de preocupación o nerviosismo en una escala del 1 al 5, donde 1 es poco y 5 es mucho.",
    estresor: "Señala con qué frecuencia te inquietaron las siguientes situaciones:",
    reaccion_fisica: "Indica con qué frecuencia experimentaste estas reacciones físicas:",
    reaccion_psicologica: "Indica con qué frecuencia experimentaste estas reacciones psicológicas:",
    reaccion_comportamental: "Indica con qué frecuencia mostraste estos comportamientos:",
    estrategia_afrontamiento: "Señala con qué frecuencia utilizaste las siguientes estrategias de afrontamiento:",
  };

  // Mapeo de dimensiones
  const dimensiones = {
    filtro: "Filtro",
    intensidad: "Intensidad",
    estresor: "Factores Estresores",
    reaccion_fisica: "Reacciones Físicas",
    reaccion_psicologica: "Reacciones Psicológicas",
    reaccion_comportamental: "Reacciones Comportamentales",
    estrategia_afrontamiento: "Estrategias de Afrontamiento",
  };

  const handleRespuesta = (valor) => {
    if (valor === null) {
      setError("Debes seleccionar una respuesta antes de continuar.");
      return;
    }
    setError(""); // Limpiar errores si hay respuesta

    const preguntaActual = preguntas[indice];
    const nuevas = { ...respuestas, [preguntaActual.key]: valor };
    setRespuestas(nuevas);

    // Verificar si es la primera pregunta ("filtro")
    if (preguntaActual.key === "filtro") {
      if (valor === 1) {
        // Redirigir a la página de conclusión si la respuesta es "No"
        navigate("/concluido");
        return;
      }
      if (valor === 5) {
        // Avanzar a la segunda pregunta (intensidad)
        setIndice(indice + 1);
        return;
      }
    }

    // Continuar con el flujo normal
    let nuevoIndice = indice + 1;
    if (nuevoIndice < preguntas.length) {
      setIndice(nuevoIndice);
    } else {
      // Enviar respuestas al backend si es la última pregunta
      enviarDatos(nuevas);
    }
  };

  const handleRegresar = () => {
    if (indice > 0) {
      setIndice(indice - 1);
      setError(""); // Limpiar errores al regresar
    }
  };

  const enviarDatos = async (resp) => {
    setCargando(true);
    try {
      const resultado = await enviarRespuestas(resp);
      navigate(
          "/resultados?data=" + encodeURIComponent(JSON.stringify(resultado))
      );
    } catch (error) {
      console.error("Error enviando respuestas", error);
      alert("Ocurrió un error al enviar las respuestas.");
    } finally {
      setCargando(false);
    }
  };

  const progreso = ((indice + 1) / preguntas.length) * 100;

  // Obtener la dimensión y el contexto de la pregunta actual
  const preguntaActual = preguntas[indice];
  const contexto = preguntaActual ? descripciones[preguntaActual.tipo] : "";
  const dimension = preguntaActual ? dimensiones[preguntaActual.tipo] : "";

  return (
      <div className="diagnostico-container">
        <h2>Cuestionario - Inventario SISCO</h2>

        {/* Indicador de pregunta */}
        <p className="contador-preguntas">
          Pregunta {indice + 1} de {preguntas.length}
        </p>

        {/* Barra de progreso */}
        <div className="barra-progreso">
          <div className="progreso" style={{ width: `${progreso}%` }}></div>
        </div>

        {/* Dimensión y contexto */}
        {dimension && (
            <div className="dimension-contexto-container">
              <p className="dimension-titulo">Dimensión: {dimension}</p>
              <p className="dimension-texto">{contexto}</p>
            </div>
        )}

        {cargando && <p>Enviando respuestas...</p>}

        {/* Mostrar mensaje de error si no hay respuesta */}
        {error && <p className="error-mensaje">{error}</p>}

        {/* Renderizar la pregunta */}
        {preguntas[indice] && (
            <Pregunta
                pregunta={preguntas[indice]}
                handleRespuesta={handleRespuesta}
            />
        )}

        {/* Botones de navegación */}
        <div className="botones-navegacion">
          {indice > 0 && (
              <button className="btn-regresar" onClick={handleRegresar}>
                Regresar
              </button>
          )}
          {indice < preguntas.length - 1 && (
              <button
                  className="btn-continuar"
                  onClick={() => handleRespuesta(null)}
              >
                Continuar
              </button>
          )}
        </div>
      </div>
  );
}

export default PaginaCuestionario;