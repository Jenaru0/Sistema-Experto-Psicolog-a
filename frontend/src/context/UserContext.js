import React, { createContext, useState } from "react";

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState({ nombre: "", edad: "" });
    const [respuestas, setRespuestas] = useState({});

    return (
        <UserContext.Provider value={{ usuario, setUsuario, respuestas, setRespuestas }}>
            {children}
        </UserContext.Provider>
    );
}
