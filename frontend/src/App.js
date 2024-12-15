import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación de páginas
import Inicio from "./pages/Inicio";
import Formulario from "./pages/Formulario";
import PaginaCuestionario from "./pages/PaginaCuestionario";
import PaginaResultados from "./pages/PaginaResultados";
import PaginaConcluido from "./pages/PaginaConcluido";
import PaginaInformacion from "./pages/Informacion"; // Nueva página añadida

// Importación de componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importación de estilos
import "./styles/global.css";

function App() {
    // Estado global para el usuario y las respuestas
    const [usuario, setUsuario] = useState({ nombre: "", edad: "" });
    const [respuestas, setRespuestas] = useState({});

    // Función para reiniciar el estado
    const resetState = () => {
        console.log("[INFO] Reiniciando estado global...");
        setUsuario({ nombre: "", edad: "" });
        setRespuestas({});
    };

    // Validaciones y logs para depuración
    const validarUsuario = () => {
        if (!usuario.nombre?.trim() || !usuario.edad) {
            return false;
        }
        return true;
    };

    return (
        <Router>
            <div className="main-container">
                {/* Barra de navegación */}
                <Navbar resetState={resetState} />

                {/* Contenido principal */}
                <div className="content">
                    <Routes>
                        {/* Página de inicio */}
                        <Route path="/" element={<Inicio />} />

                        {/* Página de formulario */}
                        <Route
                            path="/formulario"
                            element={
                                <Formulario
                                    usuario={usuario}
                                    setUsuario={setUsuario}
                                />
                            }
                        />

                        {/* Página de cuestionario */}
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

                        {/* Página de resultados */}
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

                        {/* Página de conclusión */}
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

                        {/* Página de información */}
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
                </div>

                {/* Pie de página */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
