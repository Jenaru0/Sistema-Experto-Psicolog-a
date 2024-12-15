import React, { useState, useEffect } from "react";
import { enviarRespuestas } from "../utils/api";
import preguntas from "../data/preguntas";
import "../styles/cuestionario.css";
import Pregunta from "../Pregunta";
import { useNavigate } from "react-router-dom";

function PaginaCuestionario({ respuestas, setRespuestas, usuario }) {
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(""); // Manejo de errores
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario.nombre?.trim() || !usuario.edad || isNaN(usuario.edad)) {
      navigate("/formulario");
    }
  }, [usuario, navigate]);

  const descripciones = {
    filtro: "Por favor, responde a la siguiente pregunta para continuar con el cuestionario.",
    intensidad: "Señala tu nivel de preocupación o nerviosismo en una escala del 1 al 5, donde 1 es poco y 5 es mucho.",
    estresor: "Señala con qué frecuencia te inquietaron las siguientes situaciones:",
    reaccion_fisica: "Indica con qué frecuencia experimentaste estas reacciones físicas:",
    reaccion_psicologica: "Indica con qué frecuencia experimentaste estas reacciones psicológicas:",
    reaccion_comportamental: "Indica con qué frecuencia mostraste estos comportamientos:",
    estrategia_afrontamiento: "Señala con qué frecuencia utilizaste las siguientes estrategias de afrontamiento:",
  };

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

    setError("");
    const preguntaActual = preguntas[indice];
    const nuevas = { ...respuestas, [preguntaActual.key]: valor };
    setRespuestas(nuevas);

    if (preguntaActual.key === "filtro" && valor === 1) {
      navigate("/concluido");
      return;
    }

    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
    } else {
      enviarDatos(nuevas);
    }
  };

  const handleRegresar = () => {
    if (indice > 0) {
      setIndice(indice - 1);
      setError("");
    }
  };

  const enviarDatos = async (resp) => {
    setCargando(true);
    try {
      const datosCompletos = {
        usuario: {
          nombre: usuario.nombre.trim(),
          edad: parseInt(usuario.edad, 10),
        },
        respuestas: resp,
      };

      console.log("Datos enviados al backend:", datosCompletos);

      const resultado = await enviarRespuestas(datosCompletos);

      if (resultado.error) {
        setError(resultado.mensaje || "Error desconocido al procesar los datos.");
      } else {
        navigate(
            "/resultados?data=" + encodeURIComponent(JSON.stringify(resultado))
        );
      }
    } catch (error) {
      console.error("Error enviando respuestas:", error);
      setError("Ocurrió un error al enviar las respuestas. Por favor, intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const progreso = ((indice + 1) / preguntas.length) * 100;

  const preguntaActual = preguntas[indice];
  const contexto = preguntaActual ? descripciones[preguntaActual.tipo] : "";
  const dimension = preguntaActual ? dimensiones[preguntaActual.tipo] : "";

  return (
      <div className="diagnostico-container">
        <h2>Cuestionario - Inventario SISCO</h2>

        <p className="contador-preguntas">
          Pregunta {indice + 1} de {preguntas.length}
        </p>

        <div className="barra-progreso">
          <div className="progreso" style={{ width: `${progreso}%` }}></div>
        </div>

        {dimension && (
            <div className="dimension-contexto-container">
              <p className="dimension-titulo">Dimensión: {dimension}</p>
              <p className="dimension-texto">{contexto}</p>
            </div>
        )}

        {cargando && <p>Enviando respuestas...</p>}
        {error && <p className="error-mensaje">{error}</p>}

        {preguntaActual && (
            <Pregunta
                pregunta={preguntaActual}
                handleRespuesta={handleRespuesta}
            />
        )}

        <div className="botones-navegacion">
          {indice > 0 && (
              <button className="btn-regresar" onClick={handleRegresar} disabled={cargando}>
                Regresar
              </button>
          )}
        </div>
      </div>
  );
}

export default PaginaCuestionario;
