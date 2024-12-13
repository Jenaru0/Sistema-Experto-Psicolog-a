# inferencia.py
from flask import Blueprint, request, jsonify
from ..services.motor_inferencia import aplicar_inferencia

bp = Blueprint('inferencia', __name__)

@bp.route('/diagnostico', methods=['POST'])
def diagnostico():
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "No se proporcionaron datos"}), 400
    diagnostico = aplicar_inferencia(datos)
    return jsonify({"diagnostico": diagnostico}), 200
