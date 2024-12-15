import React, { useState } from "react";
import "../styles/formulario.css";
import { useNavigate } from "react-router-dom";

function Formulario({ usuario, setUsuario }) {
  const navigate = useNavigate();

  // Estado para manejar errores en los campos
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEdad, setErrorEdad] = useState("");

  /**
   * Maneja el envío del formulario, asegurándose de que los datos sean válidos.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    let valid = true;

    // Validar nombre
    if (!usuario.nombre.trim()) {
      setErrorNombre("Por favor, ingresa tu nombre.");
      valid = false;
    } else {
      setErrorNombre("");
    }

    // Validar edad
    if (!usuario.edad || usuario.edad <= 0) {
      setErrorEdad("Por favor, ingresa una edad válida (mayor a 0).");
      valid = false;
    } else {
      setErrorEdad("");
    }

    // Redirigir al cuestionario si los datos son válidos
    if (valid) {
      console.log("Redirigiendo al cuestionario con usuario:", usuario);
      navigate("/cuestionario");
    }
  };

  /**
   * Maneja los cambios en el campo de la edad, asegurando que solo números válidos sean aceptados.
   */
  const handleEdadChange = (e) => {
    const edad = parseInt(e.target.value, 10);
    setUsuario({ ...usuario, edad: isNaN(edad) || edad <= 0 ? "" : edad });
    setErrorEdad(""); // Limpiar error al cambiar la edad
  };

  /**
   * Maneja los cambios en el campo del nombre.
   */
  const handleNombreChange = (e) => {
    setUsuario({ ...usuario, nombre: e.target.value });
    setErrorNombre(""); // Limpiar error al cambiar el nombre
  };

  return (
      <div className="formulario-container">
        <div className="formulario">
          <h2>Completa tus datos</h2>
          <p className="formulario-descripcion">
            Ayúdanos a personalizar tu experiencia respondiendo estas preguntas
            básicas.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Campo para el nombre */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={usuario.nombre}
                  onChange={handleNombreChange}
                  className={`form-control ${errorNombre ? "input-error" : ""}`}
                  required
              />
              {errorNombre && <p className="error-mensaje">{errorNombre}</p>}
            </div>

            {/* Campo para la edad */}
            <div className="form-group">
              <label htmlFor="edad">Edad:</label>
              <input
                  id="edad"
                  type="number"
                  placeholder="Edad"
                  value={usuario.edad}
                  onChange={handleEdadChange}
                  className={`form-control ${errorEdad ? "input-error" : ""}`}
                  required
              />
              {errorEdad && <p className="error-mensaje">{errorEdad}</p>}
            </div>

            {/* Botón para enviar */}
            <button type="submit" className="btn-primary">
              Iniciar
            </button>
          </form>
        </div>
      </div>
  );
}

export default Formulario;
