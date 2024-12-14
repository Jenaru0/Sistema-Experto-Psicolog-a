import React from "react";
import "../styles/concluido.css"; // Usa el archivo CSS actualizado
import { useNavigate } from "react-router-dom";

function PaginaConcluido({ onReiniciar }) {
    const navigate = useNavigate();

    const handleReiniciar = () => {
        onReiniciar(); // Llama a la función para reiniciar el estado
        navigate("/formulario"); // Redirige al formulario inicial
    };

    return (
        <div className="concluido-container">
            <h2>Cuestionario Concluido</h2>
            <p>
                El cuestionario se ha dado por concluido ya que seleccionaste "No" en la
                primera pregunta. Gracias por tu tiempo.
            </p>
            <button className="btn-primary" onClick={handleReiniciar}>
                Reiniciar Cuestionario
            </button>
        </div>
    );
}

export default PaginaConcluido;
