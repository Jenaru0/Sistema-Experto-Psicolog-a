from ..models.reglas import evaluar_respuestas
from ..db import guardar_usuario, guardar_respuestas

def aplicar_inferencia(respuestas):
    """
    Aplica la lógica del sistema experto a las respuestas del cuestionario.
    Valida los datos y genera un diagnóstico basado en las respuestas.
    """
    # Validación de datos
    errores = validar_respuestas(respuestas)
    if errores:
        return {
            "error": True,
            "mensaje": "Respuestas incompletas o inválidas.",
            "detalles": errores
        }

    # Evaluar las respuestas
    try:
        diagnostico = evaluar_respuestas(respuestas)
        return {
            "error": False,
            "diagnostico": diagnostico
        }
    except Exception as e:
        return {
            "error": True,
            "mensaje": "Ocurrió un error al evaluar las respuestas.",
            "detalles": str(e)
        }


def procesar_datos_usuario_y_guardar(usuario, respuestas):
    """
    Procesa y guarda los datos de un usuario y sus respuestas en la base de datos.
    """
    # Guardar el usuario
    usuario_id = guardar_usuario(usuario["nombre"], usuario["edad"])
    if not usuario_id:
        return {
            "error": True,
            "mensaje": "No se pudo guardar el usuario en la base de datos."
        }

    # Guardar respuestas
    if not guardar_respuestas(usuario_id, respuestas):
        return {
            "error": True,
            "mensaje": "No se pudieron guardar las respuestas en la base de datos."
        }

    return {"error": False, "mensaje": "Datos guardados correctamente en la base de datos."}


def validar_respuestas(respuestas):
    """
    Verifica que las respuestas incluyan los campos necesarios y sean válidas.
    """
    # Campos obligatorios
    campos_obligatorios = ['filtro', 'intensidad']

    # Categorías con sus respectivos campos
    categorias = {
        "factores_estresores": [
            'competencia_companeros', 'sobrecarga_tareas', 'personalidad_profesor',
            'evaluaciones_profesor', 'tipo_trabajo_profesor', 'no_entender_temas',
            'participacion_clase', 'tiempo_limitado'
        ],
        "reacciones_fisicas": [
            'trastorno_sueno', 'fatiga_cronica', 'dolor_cabeza', 'problemas_digestivos',
            'conductas_nerviosas', 'somnolencia'
        ],
        "reacciones_psicologicas": [
            'inquietud', 'depresion_tristeza', 'ansiedad_angustia',
            'problemas_concentracion', 'agresividad_irritabilidad'
        ],
        "reacciones_comportamentales": [
            'conflictos', 'aislamiento', 'desgano_escolar', 'cambio_alimentos'
        ],
        "estrategias_afrontamiento": [
            'asertividad', 'plan_ejecucion', 'religiosidad',
            'elogios', 'busqueda_informacion', 'ventilacion_confidencias'
        ]
    }

    errores = []

    # Validar campos obligatorios
    for campo in campos_obligatorios:
        if campo not in respuestas or respuestas[campo] is None:
            errores.append(f"El campo obligatorio '{campo}' falta o es inválido.")

    # Validar rango de intensidad
    if 'intensidad' in respuestas:
        intensidad = respuestas['intensidad']
        if not isinstance(intensidad, int) or not (1 <= intensidad <= 5):
            errores.append("El campo 'intensidad' debe ser un entero entre 1 y 5.")

    # Validar categorías
    for categoria, campos in categorias.items():
        for campo in campos:
            if campo in respuestas:
                valor = respuestas[campo]
                if not isinstance(valor, int) or not (1 <= valor <= 5):
                    errores.append(f"El campo '{campo}' en la categoría '{categoria}' debe ser un entero entre 1 y 5.")
            else:
                errores.append(f"El campo '{campo}' de la categoría '{categoria}' no está presente en las respuestas.")

    # Si no hay errores, devolver una lista vacía
    return errores
