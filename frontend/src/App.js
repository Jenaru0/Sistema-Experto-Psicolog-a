import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Inicio from "./pages/Inicio";
import Informacion from "./pages/Informacion";
import PaginaCuestionario from "./pages/PaginaCuestionario";
import PaginaResultados from "./pages/PaginaResultados";
import Formulario from "./pages/Formulario";
import PaginaConcluido from "./pages/PaginaConcluido"; // Nueva página importada

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./styles/global.css"; // Global styles
import "./styles/navbar.css"; // Navbar styles

function App() {
    const [usuario, setUsuario] = useState({ nombre: "", edad: "" });
    const [respuestas, setRespuestas] = useState({});
    const [formularioCompletado, setFormularioCompletado] = useState(false);

    const resetState = () => {
        setUsuario({ nombre: "", edad: "" });
        setRespuestas({});
        setFormularioCompletado(false);
    };

    return (
        <Router>
            <div className="main-container">
                <Navbar resetState={resetState} />

                <div className="content">
                    <TransitionGroup>
                        <CSSTransition classNames="fade" timeout={300}>
                            <Routes>
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
                                        <PaginaConcluido onReiniciar={resetState} /> // Ruta añadida
                                    }
                                />
                            </Routes>
                        </CSSTransition>
                    </TransitionGroup>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
