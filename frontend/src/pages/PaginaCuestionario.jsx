import React, { useState } from "react";
import { enviarRespuestas } from "../utils/api";
import preguntas from "../data/preguntas";
import "../styles/diagnostico.css";
import Pregunta from "../Pregunta";
import { useNavigate } from "react-router-dom";

function PaginaCuestionario({ respuestas, setRespuestas }) {
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleRespuesta = (valor) => {
    const preguntaActual = preguntas[indice];
    const nuevas = { ...respuestas, [preguntaActual.key]: valor };
    setRespuestas(nuevas);

    let nuevoIndice = indice + 1;
    if (nuevoIndice < preguntas.length) {
      setIndice(nuevoIndice);
    } else {
      // Enviar al backend
      enviarDatos(nuevas);
    }
  };

  const enviarDatos = async (resp) => {
    setCargando(true);
    const datos = {
      filtro: "Si",
      intensidad: 4,
      ...resp,
    };
    try {
      const resultado = await enviarRespuestas(datos);
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

  return (
    <div className="diagnostico-container">
      <h2>Cuestionario - Inventario SISCO</h2>
      {cargando && <p>Enviando respuestas...</p>}
      <div className="barra-progreso">
        <div className="progreso" style={{ width: `${progreso}%` }}></div>
      </div>
      {preguntas[indice] && (
        <Pregunta
          pregunta={preguntas[indice]}
          handleRespuesta={handleRespuesta}
        />
      )}
    </div>
  );
}

export default PaginaCuestionario;
