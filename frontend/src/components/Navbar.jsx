import React from "react";
import { NavLink } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "../styles/navbar.css"; // Asegúrate de que este archivo contiene el CSS completo de arriba

function Navbar({ resetState }) {
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
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Cuestionario
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
