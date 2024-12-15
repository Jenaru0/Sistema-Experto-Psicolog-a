import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Importación de páginas
import Inicio from "./pages/Inicio";
import Informacion from "./pages/Informacion";
import PaginaCuestionario from "./pages/PaginaCuestionario";
import PaginaResultados from "./pages/PaginaResultados";
import PaginaConcluido from "./pages/PaginaConcluido";
import Formulario from "./pages/Formulario";

// Importación de componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importación de estilos
import "./styles/global.css";
import "./styles/navbar.css"; // Estilos específicos de la Navbar

function App() {
    // Estados para el manejo del usuario, respuestas y formulario
    const [usuario, setUsuario] = useState({ nombre: "", edad: "" });
    const [respuestas, setRespuestas] = useState({});
    const [formularioCompletado, setFormularioCompletado] = useState(false);

    // Función para reiniciar el estado de la aplicación
    const resetState = () => {
        setUsuario({ nombre: "", edad: "" });
        setRespuestas({});
        setFormularioCompletado(false);
    };

    return (
        <Router>
            <div className="main-container">
                {/* Barra de navegación */}
                <Navbar resetState={resetState} />

                <div className="content">
                    <TransitionGroup>
                        {/* Transición de páginas */}
                        <CSSTransition classNames="fade" timeout={300}>
                            <Routes>
                                {/* Rutas principales */}
                                <Route path="/" element={<Inicio />} />
                                <Route path="/informacion" element={<Informacion />} />
                                <Route
                                    path="/formulario"
                                    element={
                                        <Formulario
                                            usuario={usuario}
                                            setUsuario={setUsuario}
                                            onComplete={() => {
                                                window.location.href = "/cuestionario";
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/cuestionario"
                                    element={
                                        <PaginaCuestionario
                                            respuestas={respuestas}
                                            setRespuestas={setRespuestas}
                                            usuario={usuario}
                                            setUsuario={setUsuario}
                                            formularioCompletado={formularioCompletado}
                                            setFormularioCompletado={setFormularioCompletado}
                                        />
                                    }
                                />
                                <Route
                                    path="/resultados"
                                    element={
                                        <PaginaResultados
                                            respuestas={respuestas}
                                            usuario={usuario}
                                            onReiniciar={resetState}
                                        />
                                    }
                                />
                                <Route
                                    path="/concluido"
                                    element={
                                        <PaginaConcluido
                                            respuestas={respuestas}
                                            usuario={usuario}
                                            onReiniciar={resetState}
                                        />
                                    }
                                />
                            </Routes>
                        </CSSTransition>
                    </TransitionGroup>
                </div>

                {/* Pie de página */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
