from flask import Blueprint, request, jsonify
from ..services.motor_inferencia import aplicar_inferencia, procesar_datos_usuario_y_guardar

bp = Blueprint('inferencia', __name__)

@bp.route('/diagnostico', methods=['POST'])
def diagnostico():
    """
    Endpoint para procesar las respuestas del cuestionario y devolver un diagnóstico.
    """
    try:
        # Obtener datos de la solicitud
        datos = request.get_json()
        print("Datos recibidos del frontend:", datos)  # Log para depuración

        # Validar que los datos sean proporcionados
        if not datos:
            return jsonify({
                "error": True,
                "mensaje": "No se proporcionaron datos en la solicitud."
            }), 400

        # Separar usuario y respuestas
        usuario = datos.get("usuario")
        respuestas = datos.get("respuestas")

        # Validar que usuario y respuestas existan
        if not usuario or not respuestas:
            return jsonify({
                "error": True,
                "mensaje": "Faltan datos requeridos.",
                "detalles": "Debe incluir 'usuario' y 'respuestas' en el cuerpo de la solicitud."
            }), 400

        # Validar los datos del usuario
        nombre = usuario.get("nombre")
        edad = usuario.get("edad")

        if not nombre or not isinstance(nombre, str) or not nombre.strip():
            return jsonify({
                "error": True,
                "mensaje": "Datos del usuario incompletos o inválidos.",
                "detalles": "El 'nombre' debe ser una cadena de texto no vacía."
            }), 400

        if not isinstance(edad, int) or edad <= 0:
            return jsonify({
                "error": True,
                "mensaje": "Datos del usuario incompletos o inválidos.",
                "detalles": "La 'edad' debe ser un número entero positivo."
            }), 400

        # Validar las respuestas (deben ser un diccionario con claves específicas)
        if not isinstance(respuestas, dict) or len(respuestas) == 0:
            return jsonify({
                "error": True,
                "mensaje": "Respuestas inválidas.",
                "detalles": "Las respuestas deben ser un objeto JSON con las claves y valores correspondientes."
            }), 400

        # Verificar que todas las preguntas tengan respuestas
        preguntas_faltantes = [
            clave for clave in respuestas.keys() if respuestas[clave] is None
        ]
        if preguntas_faltantes:
            return jsonify({
                "error": True,
                "mensaje": "Faltan respuestas para algunas preguntas.",
                "detalles": f"Respuestas faltantes: {preguntas_faltantes}"
            }), 400

        # Guardar usuario y respuestas en la base de datos
        guardado = procesar_datos_usuario_y_guardar(usuario, respuestas)
        if guardado["error"]:
            return jsonify({
                "error": True,
                "mensaje": "Error al guardar los datos en la base de datos.",
                "detalles": guardado.get("mensaje", "Error desconocido.")
            }), 500

        # Aplicar lógica del sistema experto
        resultado = aplicar_inferencia(respuestas)

        # Si hay errores en las respuestas
        if "error" in resultado:
            return jsonify({
                "error": True,
                "mensaje": "Validación fallida.",
                "detalles": resultado.get("detalles", "Error desconocido en la inferencia.")
            }), 422  # Unprocessable Entity

        # Respuesta exitosa
        return jsonify({
            "usuario": usuario,
            "diagnostico": resultado["diagnostico"]
        }), 200

    except Exception as e:
        # Manejo de errores inesperados
        print("Error inesperado:", str(e))  # Log para depuración
        return jsonify({
            "error": True,
            "mensaje": "Error interno del servidor.",
            "detalles": str(e)
        }), 500
