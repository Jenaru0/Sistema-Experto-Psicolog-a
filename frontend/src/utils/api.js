import axios from "axios";

// URL del backend (configurada desde .env o un valor predeterminado)
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";

/**
 * Enviar respuestas del cuestionario al backend para obtener el diagnóstico.
 * @param {Object} datos - Los datos enviados deben incluir `usuario` y `respuestas`.
 * @returns {Object} - Respuesta del backend con el diagnóstico o detalles del error.
 */
export async function enviarRespuestas(datos) {
  try {
    console.log("[INFO] Enviando datos al backend:", datos); // Log para depuración

    // Verificar que los datos tengan la estructura correcta
    if (!datos || !datos.usuario || !datos.respuestas) {
      throw new Error("La estructura de los datos es inválida. Falta 'usuario' o 'respuestas'.");
    }

    // Realizar la solicitud POST al backend
    const response = await axios.post(`${API_URL}/api/diagnostico`, datos);

    // Log de la respuesta exitosa del backend
    console.log("[INFO] Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Error del servidor (respuesta con código de error)
      console.error("[ERROR] Respuesta del servidor con error:", error.response.data);
      return {
        error: true,
        mensaje: error.response.data.mensaje || "Error en el servidor.",
        detalles: error.response.data.detalles || null,
      };
    } else if (error.request) {
      // Sin respuesta del servidor
      console.error("[ERROR] No se recibió respuesta del servidor:", error.request);
      return {
        error: true,
        mensaje: "No se pudo conectar al servidor. Verifica tu conexión.",
      };
    } else {
      // Otros errores (configuración de Axios o excepciones inesperadas)
      console.error("[ERROR] Error al configurar la solicitud:", error.message);
      return {
        error: true,
        mensaje: "Ocurrió un error inesperado. Intenta de nuevo.",
      };
    }
  }
}

/**
 * Verificar la conectividad con el backend.
 * @returns {boolean} - `true` si el backend está disponible, `false` en caso contrario.
 */
export async function verificarConexion() {
  try {
    console.log("[INFO] Verificando conectividad con el backend...");

    const response = await axios.get(`${API_URL}/api/status`);
    console.log("[INFO] El backend está disponible.");
    return response.status === 200;
  } catch (error) {
    console.error("[ERROR] No se pudo verificar la conexión con el backend:", error.message);
    return false;
  }
}

/**
 * Método auxiliar para manejar errores y mostrar logs detallados.
 * @param {Error} error - Objeto de error recibido de Axios o cualquier otro.
 */
export function manejarErrores(error) {
  if (error.response) {
    console.error("[ERROR] Respuesta del servidor con error:", error.response.data);
    console.error("Detalles:", error.response.data.detalles || "Sin detalles adicionales.");
  } else if (error.request) {
    console.error("[ERROR] No se recibió respuesta del servidor. Verifica tu conexión.");
  } else {
    console.error("[ERROR] Error inesperado:", error.message);
  }
}
