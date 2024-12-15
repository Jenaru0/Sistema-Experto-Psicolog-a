from flask import Flask, request, jsonify
from flask_cors import CORS
from app.services.motor_inferencia import aplicar_inferencia
from app.db import init_database, guardar_usuario, guardar_respuestas  # Importar funciones de base de datos

app = Flask(__name__)
CORS(app)  # Habilitar CORS para solicitudes desde el frontend

@app.route('/api/diagnostico', methods=['POST'])
def diagnostico():
    try:
        # Obtener datos del frontend
        datos = request.get_json()
        print("[DEBUG] Datos recibidos del frontend:", datos)

        if not datos:
            return jsonify({"error": True, "mensaje": "No se enviaron datos."}), 400

        usuario = datos.get("usuario")
        respuestas = datos.get("respuestas")

        # Validar datos del usuario y respuestas
        if not usuario or not respuestas:
            return jsonify({
                "error": True,
                "mensaje": "Faltan datos requeridos.",
                "detalles": "Incluye 'usuario' y 'respuestas' en el cuerpo de la solicitud."
            }), 400

        if not usuario.get("nombre") or not isinstance(usuario.get("edad"), int):
            return jsonify({
                "error": True,
                "mensaje": "Datos del usuario inválidos.",
                "detalles": "Se requiere un 'nombre' y una 'edad' válida."
            }), 400

        # Guardar usuario en la base de datos
        print("[DEBUG] Guardando usuario en la base de datos...")
        usuario_id = guardar_usuario(usuario["nombre"], usuario["edad"])
        if not usuario_id:
            return jsonify({
                "error": True,
                "mensaje": "No se pudo guardar el usuario en la base de datos."
            }), 500

        print(f"[INFO] Usuario guardado con ID: {usuario_id}")

        # Guardar respuestas en la base de datos
        print("[DEBUG] Guardando respuestas en la base de datos...")
        if not guardar_respuestas(usuario_id, respuestas):
            return jsonify({
                "error": True,
                "mensaje": "No se pudieron guardar las respuestas en la base de datos."
            }), 500

        print("[INFO] Respuestas guardadas exitosamente.")

        # Procesar inferencia
        print("[DEBUG] Procesando inferencia...")
        resultado = aplicar_inferencia(respuestas)
        print("[DEBUG] Resultado del procesamiento:", resultado)

        # Manejo de errores en la inferencia
        if "error" in resultado and resultado["error"]:
            return jsonify({
                "error": True,
                "mensaje": resultado.get("mensaje", "Error al procesar inferencia."),
                "detalles": resultado.get("detalles", "Error desconocido.")
            }), 422

        # Respuesta exitosa con diagnóstico
        return jsonify({"usuario": usuario, "diagnostico": resultado["diagnostico"]}), 200

    except Exception as e:
        # Manejo de errores inesperados
        print("[ERROR] Error inesperado:", str(e))
        return jsonify({"error": True, "mensaje": "Error en el servidor.", "detalles": str(e)}), 500


if __name__ == '__main__':
    # Inicializar la base de datos al arrancar el servidor
    print("[INFO] Inicializando la base de datos...")
    init_database()
    print("[INFO] Base de datos inicializada. Iniciando el servidor...")
    app.run(host='127.0.0.1', port=5000, debug=True)
