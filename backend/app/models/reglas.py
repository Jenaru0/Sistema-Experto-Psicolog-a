def evaluar_respuestas(respuestas):
    """
    Procesa las respuestas proporcionadas y genera un diagnóstico basado en las categorías
    y dimensiones del estrés académico.
    """

    # Filtro inicial
    filtro_valor = respuestas.get('filtro')
    if filtro_valor is None or filtro_valor == 1:
        return {
            "mensaje": "No procede el cuestionario; no hubo momentos de preocupación o nerviosismo o faltan datos."
        }

    # Evaluar intensidad del estrés
    intensidad = respuestas.get('intensidad')
    if intensidad is None:
        return {"mensaje": "Faltan datos sobre la intensidad del estrés."}

    if intensidad >= 4:
        nivel_intensidad = "Alta"
        nivel_intensidad_detalle = "Nivel muy alto de preocupación. Se recomienda atención inmediata y estrategias de alivio."
    elif intensidad == 3:
        nivel_intensidad = "Moderada"
        nivel_intensidad_detalle = "Nivel medio de preocupación. Conviene tomar medidas preventivas para que no aumente."
    else:
        nivel_intensidad = "Baja"
        nivel_intensidad_detalle = "Nivel bajo de estrés. La situación es manejable con hábitos saludables."

    # Categorías de evaluación
    factores_estresores = [
        'competencia_companeros', 'sobrecarga_tareas', 'personalidad_profesor',
        'evaluaciones_profesor', 'tipo_trabajo_profesor', 'no_entender_temas',
        'participacion_clase', 'tiempo_limitado'
    ]

    reacciones_fisicas = [
        'trastorno_sueno', 'fatiga_cronica', 'dolor_cabeza', 'problemas_digestivos',
        'conductas_nerviosas', 'somnolencia'
    ]

    reacciones_psicologicas = [
        'inquietud', 'depresion_tristeza', 'ansiedad_angustia',
        'problemas_concentracion', 'agresividad_irritabilidad'
    ]

    reacciones_comportamentales = [
        'conflictos', 'aislamiento', 'desgano_escolar', 'cambio_alimentos'
    ]

    estrategias_afrontamiento = [
        'asertividad', 'plan_ejecucion', 'religiosidad',
        'elogios', 'busqueda_informacion', 'ventilacion_confidencias'
    ]

    # Funciones auxiliares
    def valores_validos(lista):
        return [respuestas[i] for i in lista if i in respuestas and respuestas[i] is not None]

    def conteo_mayor_igual(valores, umbral):
        return sum(1 for v in valores if v >= umbral)

    def promedio_val(valores):
        return sum(valores) / len(valores) if valores else 0

    def porcentaje_altos_val(valores, umbral=4):
        if not valores:
            return 0
        c = conteo_mayor_igual(valores, umbral)
        return (c / len(valores)) * 100

    def analiza_categoria(lista, nombre):
        vals = valores_validos(lista)
        if not vals:
            return {
                "texto": f"No se han contestado ítems en {nombre}, no hay datos suficientes.",
                "promedio": 0,
                "porcentaje_altos": 0
            }

        prom = promedio_val(vals)
        porc = porcentaje_altos_val(vals, 4)
        altos = conteo_mayor_igual(vals, 4)

        # Evaluación de la categoría
        if nombre == "Factores Estresores":
            texto = "Existen múltiples factores muy estresantes. Se sugiere reorganizar la carga académica y aplicar técnicas de gestión del tiempo." if altos >= 3 else "Bajo estrés externo. Las condiciones académicas no generan mucha presión."
        elif nombre == "Reacciones Físicas":
            texto = "Se observan fuertes reacciones físicas al estrés. Se recomienda atención médica o cambios en hábitos." if altos >= 3 else "Impacto físico bajo, sin molestias significativas."
        elif nombre == "Reacciones Psicológicas":
            texto = "Estrés emocional elevado, ansiedad/depresión presentes. Apoyo psicológico o técnicas de relajación recomendadas." if altos >= 2 else "Leves síntomas psicológicos presentes. Mantener equilibrio entre estudio y ocio."
        elif nombre == "Reacciones Comportamentales":
            texto = "Conductas negativas frecuentes (aislamiento, conflictos). Buscar apoyo social y tutorías." if altos >= 2 else "Algunas conductas negativas ocasionales. Atenderlas pronto para evitar empeoramiento."
        elif nombre == "Estrategias de Afrontamiento":
            texto = "Varias estrategias positivas en uso. Mantener y reforzar estas habilidades." if altos >= 3 else "Faltan estrategias efectivas. Considerar asesoría psicológica para desarrollar resiliencia."

        return {"texto": texto, "promedio": prom, "porcentaje_altos": porc}

    # Análisis por categorías
    cat_factores = analiza_categoria(factores_estresores, "Factores Estresores")
    cat_fisicas = analiza_categoria(reacciones_fisicas, "Reacciones Físicas")
    cat_psico = analiza_categoria(reacciones_psicologicas, "Reacciones Psicológicas")
    cat_comport = analiza_categoria(reacciones_comportamentales, "Reacciones Comportamentales")
    cat_afront = analiza_categoria(estrategias_afrontamiento, "Estrategias de Afrontamiento")

    # Diagnóstico global
    todos = factores_estresores + reacciones_fisicas + reacciones_psicologicas + reacciones_comportamentales + estrategias_afrontamiento + ['intensidad']
    vals_todos = valores_validos(todos)
    prom_global = promedio_val(vals_todos)
    porc_global = porcentaje_altos_val(vals_todos, 4)

    return {
        "intensidad_estrés": nivel_intensidad,
        "intensidad_estrés_detalle": nivel_intensidad_detalle,
        "factores_estresores": cat_factores["texto"],
        "reacciones_fisicas": cat_fisicas["texto"],
        "reacciones_psicologicas": cat_psico["texto"],
        "reacciones_comportamentales": cat_comport["texto"],
        "estrategias_afrontamiento": cat_afront["texto"],
        "diagnostico_global": "Estrés académico severo." if porc_global >= 50 else "Estrés académico moderado." if porc_global >= 25 else "Estrés académico bajo.",
        "datos_numericos": {
            "factores_estresores": cat_factores,
            "reacciones_fisicas": cat_fisicas,
            "reacciones_psicologicas": cat_psico,
            "reacciones_comportamentales": cat_comport,
            "estrategias_afrontamiento": cat_afront,
            "global": {"promedio": prom_global, "porcentaje_altos_global": porc_global}
        }
    }
