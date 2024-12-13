import React from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";
import "../styles/cards.css";

function Inicio() {
  return (
      <div>
        {/* Hero Section */}
        <div className="hero">
          <h1>Sistema de Evaluación del Estrés Académico</h1>
          <p>
            Identifica tus niveles de estrés académico y recibe recomendaciones
            personalizadas para mejorar tu bienestar emocional y tu rendimiento
            académico.
          </p>
          <Link to="/formulario" className="btn">
            Iniciar Evaluación
          </Link>
        </div>

        {/* Cards Section */}
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Identifica tus Estresores</h5>
              <p className="card-text">
                Conoce cuáles son los factores que más te generan estrés académico.
              </p>
              <Link to="/estresores" className="btn">Leer Más</Link>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recibe Recomendaciones</h5>
              <p className="card-text">
                Obtén estrategias prácticas para manejar mejor el estrés.
              </p>
              <Link to="/recomendaciones" className="btn">Explorar</Link>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Evalúa tu Progreso</h5>
              <p className="card-text">
                Realiza seguimientos periódicos para evaluar cambios en tu nivel
                de estrés.
              </p>
              <Link to="/progreso" className="btn">Evaluar</Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Inicio;
