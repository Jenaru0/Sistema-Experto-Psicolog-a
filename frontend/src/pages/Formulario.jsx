import React from "react";
import "../styles/formulario.css";

function Formulario({ usuario, setUsuario, onComplete }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario.nombre && usuario.edad >= 0) {
      onComplete();
    } else {
      alert(
          "Por favor, completa tu nombre y asegura que la edad sea 0 o mayor."
      );
    }
  };

  const handleEdadChange = (e) => {
    const edad = parseInt(e.target.value, 10);
    setUsuario({ ...usuario, edad: isNaN(edad) || edad < 0 ? "" : edad });
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
            <div className="form-group">
              <input
                  type="text"
                  placeholder="Nombre"
                  value={usuario.nombre}
                  onChange={(e) =>
                      setUsuario({ ...usuario, nombre: e.target.value })
                  }
                  className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                  type="number"
                  placeholder="Edad"
                  value={usuario.edad}
                  onChange={handleEdadChange}
                  className="form-control"
              />
            </div>
            <button type="submit" className="btn-primary">
              Iniciar
            </button>
          </form>
        </div>
      </div>
  );
}

export default Formulario;
