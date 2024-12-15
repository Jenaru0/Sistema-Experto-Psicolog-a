import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "../styles/navbar.css"; // Asegúrate de que este archivo contiene el CSS completo de arriba

function Navbar({ resetState }) {
    const location = useLocation();

    // Determinar si el enlace "Cuestionario" debe estar activo
    const isCuestionarioActive = ["/formulario", "/cuestionario", "/resultados"].some(path =>
        location.pathname.startsWith(path)
    );

    return (
        <nav className="navbar">
            {/* Logo y marca */}
            <NavLink className="navbar-brand" to="/" onClick={resetState}>
                <FaHeartbeat />
                Sistema Experto
            </NavLink>

            {/* Opciones del menú */}
            <ul className="navbar-nav">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        end
                    >
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/informacion"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Información
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/formulario"
                        className={isCuestionarioActive ? "nav-link active" : "nav-link"}
                    >
                        Cuestionario
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
