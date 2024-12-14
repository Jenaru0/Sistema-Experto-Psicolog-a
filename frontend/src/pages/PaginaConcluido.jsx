import React from "react";
import "../styles/concluido.css"; // Crea un archivo CSS si necesitas estilos específicos
import { useNavigate } from "react-router-dom";

function PaginaConcluido({ onReiniciar }) {
    const navigate = useNavigate();

    const handleReiniciar = () => {
        onReiniciar(); // Llama a la función para reiniciar el estado
        navigate("/formulario"); // Redirige al formulario inicial
    };

    return (
        <div
            className="concluido-container"
            style={{
                textAlign: "center",
                padding: "20px",
                maxWidth: "600px",
                margin: "50px auto",
                lineHeight: "1.6",
            }}
        >
            <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
                Cuestionario Concluido
            </h2>
            <p style={{ marginBottom: "30px", fontSize: "18px" }}>
                El cuestionario se ha dado por concluido ya que seleccionaste "No" en la
                primera pregunta. Gracias por tu tiempo.
            </p>
            <button
                className="btn btn-primary"
                onClick={handleReiniciar}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Reiniciar Cuestionario
            </button>
        </div>
    );
}

export default PaginaConcluido;
