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
    # Validación de datos
    errores = validar_respuestas(respuestas)
    if errores:
        return {"error": "Respuestas incompletas o inválidas", "detalles": errores}

    # Evaluar las respuestas
    diagnostico = evaluar_respuestas(respuestas)
    return diagnostico

def validar_respuestas(respuestas):
    """
    Verifica que las respuestas incluyan los campos necesarios y sean válidas.
    """
    campos_obligatorios = ['filtro', 'intensidad']
    errores = []

    # Verificar campos obligatorios
    for campo in campos_obligatorios:
        if campo not in respuestas or respuestas[campo] is None:
            errores.append(f"El campo '{campo}' es obligatorio y falta.")

    # Validar rango de intensidad
    if 'intensidad' in respuestas:
        intensidad = respuestas['intensidad']
        if not isinstance(intensidad, int) or not (1 <= intensidad <= 5):
            errores.append("El campo 'intensidad' debe ser un entero entre 1 y 5.")

    # Opcional: validar otras respuestas según el modelo
    # Aquí puedes añadir validaciones adicionales si es necesario.

    return errores
