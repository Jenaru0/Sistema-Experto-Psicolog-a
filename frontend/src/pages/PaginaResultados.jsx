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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PaginaResultados({ onReiniciar }) {
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataStr = params.get("data");

    if (!dataStr) {
      console.warn("No se encontró el parámetro 'data' en la URL");
      return;
    }

    console.log("Valor de dataStr sin decodificar:", dataStr);

    try {
      const diag = JSON.parse(decodeURIComponent(dataStr));
      console.log("Resultado desde backend:", diag);
      if (diag && diag.diagnostico) {
        setResultado(diag.diagnostico);
      } else {
        console.warn("El objeto recibido no tiene la clave 'diagnostico'");
      }
    } catch (error) {
      console.error("Error decodificando o parseando el JSON:", error);
    }
  }, [navigate]);

  const handleReiniciar = () => {
    onReiniciar();
    navigate("/formulario");
  };

  if (!resultado) {
    return (
      <div className="resultados">
        <h2>No hay resultados que mostrar</h2>
      </div>
    );
  }

  const datos = resultado.datos_numericos || {};

  const categorias = [
    "Factores Estresores",
    "Reacciones Físicas",
    "Reacciones Psicológicas",
    "Reacciones Comportamentales",
    "Estrategias de Afrontamiento",
  ];
  const porcentajesAltos = [
    datos.factores_estresores?.porcentaje_altos || 0,
    datos.reacciones_fisicas?.porcentaje_altos || 0,
    datos.reacciones_psicologicas?.porcentaje_altos || 0,
    datos.reacciones_comportamentales?.porcentaje_altos || 0,
    datos.estrategias_afrontamiento?.porcentaje_altos || 0,
  ];

  const data = {
    labels: categorias,
    datasets: [
      {
        label: "% Ítems ≥4",
        data: porcentajesAltos,
        backgroundColor: [
          "#3498db", // Factores Estresores
          "#e74c3c", // Reacciones Físicas
          "#9b59b6", // Reacciones Psicológicas
          "#f1c40f", // Reacciones Comportamentales
          "#2ecc71", // Estrategias de Afrontamiento
        ],
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
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        display: false,
      },
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
        title: {
          display: true,
          text: "% Ítems Altos",
        },
      },
    },
  };

  const sectionStyle = {
    marginBottom: "20px",
  };
  const titleStyle = {
    marginBottom: "10px",
    color: "#2980b9",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };
  const thTdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
    fontSize: "0.95rem",
  };
  const categoryTitleStyle = {
    fontWeight: "bold",
  };

  return (
    <div
      className="resultados"
      style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Resultados del Diagnóstico
      </h2>

      <div style={sectionStyle}>
        <p>
          <strong>Intensidad del Estrés:</strong> {resultado.intensidad_estrés}
        </p>
        {resultado.intensidad_estrés_detalle && (
          <p>
            <em>{resultado.intensidad_estrés_detalle}</em>
          </p>
        )}
      </div>

      <div style={sectionStyle}>
        <p>
          <strong>Factores Estresores:</strong> {resultado.factores_estresores}
        </p>
        <p>
          <strong>Reacciones Físicas:</strong> {resultado.reacciones_fisicas}
        </p>
        <p>
          <strong>Reacciones Psicológicas:</strong>{" "}
          {resultado.reacciones_psicologicas}
        </p>
        <p>
          <strong>Reacciones Comportamentales:</strong>{" "}
          {resultado.reacciones_comportamentales}
        </p>
        <p>
          <strong>Estrategias de Afrontamiento:</strong>{" "}
          {resultado.estrategias_afrontamiento}
        </p>
        <p>
          <strong>Diagnóstico Global:</strong> {resultado.diagnostico_global}
        </p>
      </div>

      {datos && (
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Datos Numéricos Adicionales</h3>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={{ ...thTdStyle, ...categoryTitleStyle }}>
                  Factores Estresores:
                </td>
                <td style={thTdStyle}>
                  Promedio: {datos.factores_estresores.promedio?.toFixed(2)},
                  %≥4: {datos.factores_estresores.porcentaje_altos?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td style={{ ...thTdStyle, ...categoryTitleStyle }}>
                  Reacciones Físicas:
                </td>
                <td style={thTdStyle}>
                  Promedio: {datos.reacciones_fisicas.promedio?.toFixed(2)},
                  %≥4: {datos.reacciones_fisicas.porcentaje_altos?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td style={{ ...thTdStyle, ...categoryTitleStyle }}>
                  Reacciones Psicológicas:
                </td>
                <td style={thTdStyle}>
                  Promedio: {datos.reacciones_psicologicas.promedio?.toFixed(2)}
                  , %≥4:{" "}
                  {datos.reacciones_psicologicas.porcentaje_altos?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td style={{ ...thTdStyle, ...categoryTitleStyle }}>
                  Reacciones Comportamentales:
                </td>
                <td style={thTdStyle}>
                  Promedio:{" "}
                  {datos.reacciones_comportamentales.promedio?.toFixed(2)}, %≥4:{" "}
                  {datos.reacciones_comportamentales.porcentaje_altos?.toFixed(
                    2
                  )}
                  %
                </td>
              </tr>
              <tr>
                <td style={{ ...thTdStyle, ...categoryTitleStyle }}>
                  Estrategias de Afrontamiento:
                </td>
                <td style={thTdStyle}>
                  Promedio:{" "}
                  {datos.estrategias_afrontamiento.promedio?.toFixed(2)}, %≥4:{" "}
                  {datos.estrategias_afrontamiento.porcentaje_altos?.toFixed(2)}
                  %
                </td>
              </tr>
              <tr>
                <td style={{ ...thTdStyle, ...categoryTitleStyle }}>Global:</td>
                <td style={thTdStyle}>
                  %≥4 Items Global:{" "}
                  {datos.global.porcentaje_altos_global?.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div style={{ width: "90%", height: "300px", margin: "20px auto" }}>
        <Bar data={data} options={options} />
      </div>

      <div
        className="botones-container"
        style={{ marginTop: "30px", textAlign: "center" }}
      >
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
