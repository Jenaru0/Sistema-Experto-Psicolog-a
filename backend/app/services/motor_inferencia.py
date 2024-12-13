# motor_inferencia.py
from ..models.reglas import evaluar_respuestas

def aplicar_inferencia(respuestas):
    """
    Aplica la lógica del sistema experto a las respuestas del cuestionario.
    Las respuestas deben incluir:
    - filtro (Si/No)
    - intensidad (1 a 5)
    - Ítems de factores estresores
    - Ítems de reacciones físicas, psicológicas, comportamentales
    - Ítems de estrategias de afrontamiento
    """
    diagnostico = evaluar_respuestas(respuestas)
    return diagnostico
