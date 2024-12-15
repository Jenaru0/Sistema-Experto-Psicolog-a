import React, { useEffect, useState } from "react";
import "../styles/resultados.css";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PaginaResultados({ onReiniciar }) {
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataStr = params.get("data");

    if (!dataStr) {
      setError("No se encontró el parámetro de datos en la URL.");
      return;
    }

    try {
      const diag = JSON.parse(decodeURIComponent(dataStr));
      if (diag && diag.diagnostico) {
        setResultado(diag.diagnostico);
      } else {
        setError("El objeto recibido no contiene datos de diagnóstico.");
      }
    } catch (error) {
      setError("Error al procesar los datos recibidos.");
      console.error("Error decodificando o parseando el JSON:", error);
    }
  }, []);

  const handleReiniciar = () => {
    onReiniciar();
    navigate("/formulario");
  };

  if (error) {
    return (
        <div className="resultados">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleReiniciar}>
            Reiniciar
          </button>
        </div>
    );
  }

  if (!resultado) {
    return (
        <div className="resultados">
          <h2>Cargando resultados...</h2>
        </div>
    );
  }

  const datos = resultado.datos_numericos || {};

  const categorias = [
    { nombre: "Factores Estresores", clave: "factores_estresores" },
    { nombre: "Reacciones Físicas", clave: "reacciones_fisicas" },
    { nombre: "Reacciones Psicológicas", clave: "reacciones_psicologicas" },
    { nombre: "Reacciones Comportamentales", clave: "reacciones_comportamentales" },
    { nombre: "Estrategias de Afrontamiento", clave: "estrategias_afrontamiento" },
  ];

  const porcentajesAltos = categorias.map(
      (cat) => datos[cat.clave]?.porcentaje_altos || 0
  );

  const globalDatos = datos.global || {};
  const globalPromedio =
      globalDatos?.promedio !== undefined && globalDatos?.promedio !== null
          ? globalDatos.promedio.toFixed(2)
          : "N/A";
  const globalPorcentaje =
      globalDatos?.porcentaje_altos_global !== undefined
          ? globalDatos.porcentaje_altos_global.toFixed(2)
          : "0";

  const data = {
    labels: categorias.map((cat) => cat.nombre),
    datasets: [
      {
        label: "% Ítems ≥4",
        data: porcentajesAltos,
        backgroundColor: ["#3498db", "#e74c3c", "#9b59b6", "#f1c40f", "#2ecc71"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Porcentaje de Ítems con valor ≥4 por Categoría",
        font: { size: 16, weight: "bold" },
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y + "%";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "% Ítems Altos" },
      },
    },
  };

  return (
      <div className="resultados" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Resultados del Diagnóstico
        </h2>

        <div>
          <p>
            <strong>Intensidad del Estrés:</strong> {resultado.intensidad_estrés}
          </p>
          {resultado.intensidad_estrés_detalle && (
              <p>
                <em>{resultado.intensidad_estrés_detalle}</em>
              </p>
          )}
        </div>

        {categorias.map((cat) => (
            <div key={cat.clave}>
              <p>
                <strong>{cat.nombre}:</strong>{" "}
                {resultado[cat.clave] || "No hay datos disponibles"}
              </p>
            </div>
        ))}

        <div>
          <p>
            <strong>Diagnóstico Global:</strong>{" "}
            {resultado.diagnostico_global || "No hay datos disponibles"}
          </p>
        </div>

        <h3 style={{ marginTop: "20px" }}>Datos Numéricos Adicionales</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
          <tr>
            <td>
              <strong>GLOBAL:</strong>
            </td>
            <td>
              Promedio: {globalPromedio}, %≥4: {globalPorcentaje}%
            </td>
          </tr>
          {categorias.map((cat) => (
              <tr key={cat.clave}>
                <td>
                  <strong>{cat.nombre.toUpperCase()}:</strong>
                </td>
                <td>
                  Promedio: {datos[cat.clave]?.promedio?.toFixed(2) || "N/A"},{" "}
                  %≥4: {datos[cat.clave]?.porcentaje_altos?.toFixed(2) || "0"}%
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <div style={{ width: "90%", height: "300px", margin: "20px auto" }}>
          <Bar data={data} options={options} />
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
              className="btn btn-danger"
              onClick={handleReiniciar}
              style={{ marginRight: "10px" }}
          >
            Reiniciar
          </button>
          <button
              className="btn btn-primary"
              onClick={() => navigate("/informacion")}
          >
            Ver Más Información
          </button>
        </div>
      </div>
  );
}

export default PaginaResultados;
