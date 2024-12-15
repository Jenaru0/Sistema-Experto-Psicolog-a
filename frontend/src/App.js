import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Importación de páginas
import Inicio from "./pages/Inicio";
import Formulario from "./pages/Formulario";
import PaginaCuestionario from "./pages/PaginaCuestionario";
import PaginaResultados from "./pages/PaginaResultados";
import PaginaConcluido from "./pages/PaginaConcluido";
import PaginaInformacion from "./pages/Informacion";

// Importación de componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importación de estilos
import "./styles/global.css";
import "./styles/transitions.css";

function AnimatedRoutes({ usuario, setUsuario, respuestas, setRespuestas, resetState, validarUsuario }) {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} timeout={500} classNames="fade">
                <Routes location={location}>
                    <Route path="/" element={<Inicio />} />

                    <Route
                        path="/formulario"
                        element={
                            <Formulario
                                usuario={usuario}
                                setUsuario={setUsuario}
                            />
                        }
                    />

                    <Route
                        path="/cuestionario"
                        element={
                            validarUsuario() ? (
                                <PaginaCuestionario
                                    usuario={usuario}
                                    respuestas={respuestas}
                                    setRespuestas={setRespuestas}
                                />
                            ) : (
                                <Formulario
                                    usuario={usuario}
                                    setUsuario={setUsuario}
                                />
                            )
                        }
                    />

                    <Route
                        path="/resultados"
                        element={
                            validarUsuario() ? (
                                <PaginaResultados
                                    respuestas={respuestas}
                                    usuario={usuario}
                                    onReiniciar={resetState}
                                />
                            ) : (
                                <Formulario
                                    usuario={usuario}
                                    setUsuario={setUsuario}
                                />
                            )
                        }
                    />

                    <Route
                        path="/concluido"
                        element={
                            validarUsuario() ? (
                                <PaginaConcluido
                                    usuario={usuario}
                                    onReiniciar={resetState}
                                />
                            ) : (
                                <Formulario
                                    usuario={usuario}
                                    setUsuario={setUsuario}
                                />
                            )
                        }
                    />

                    <Route
                        path="/informacion"
                        element={
                            <PaginaInformacion
                                usuario={usuario}
                                onReiniciar={resetState}
                            />
                        }
                    />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

function App() {
    const [usuario, setUsuario] = useState({ nombre: "", edad: "" });
    const [respuestas, setRespuestas] = useState({});

    const resetState = () => {
        console.log("[INFO] Reiniciando estado global...");
        setUsuario({ nombre: "", edad: "" });
        setRespuestas({});
    };

    const validarUsuario = () => {
        if (!usuario.nombre?.trim() || !usuario.edad) {
            return false;
        }
        return true;
    };

    return (
        <Router>
            <div className="main-container">
                <Navbar resetState={resetState} />

                <div className="content">
                    <AnimatedRoutes
                        usuario={usuario}
                        setUsuario={setUsuario}
                        respuestas={respuestas}
                        setRespuestas={setRespuestas}
                        resetState={resetState}
                        validarUsuario={validarUsuario}
                    />
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
