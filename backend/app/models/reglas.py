def evaluar_respuestas(respuestas):
    # Filtro
    filtro_valor = respuestas.get('filtro')
    if filtro_valor is None or filtro_valor == 1:
        return {
            "mensaje": "No procede el cuestionario; no hubo momentos de preocupación o nerviosismo o faltan datos."
        }

    intensidad = respuestas.get('intensidad')
    if intensidad is None:
        return {"mensaje": "Faltan datos sobre la intensidad del estrés."}
    else:
        if intensidad >= 4:
            nivel_intensidad = "Alta"
            nivel_intensidad_detalle = ("Nivel muy alto de preocupación, se recomienda atención inmediata y estrategias de alivio.")
        elif intensidad == 3:
            nivel_intensidad = "Moderada"
            nivel_intensidad_detalle = ("Nivel medio de preocupación, conviene tomar medidas preventivas para que no aumente.")
        else:
            nivel_intensidad = "Baja"
            nivel_intensidad_detalle = ("Nivel bajo de estrés, la situación es manejable con hábitos saludables.")

    # Categorías
    factores_estresores = [
        'competencia_companeros', 'sobrecarga_tareas', 'personalidad_profesor',
        'evaluaciones_profesor', 'tipo_trabajo_profesor', 'no_entender_temas',
        'participacion_clase', 'tiempo_limitado', 'otra_estresor'
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

    def valores_validos(lista):
        # Devuelve solo los valores de ítems que están presentes en respuestas
        return [respuestas[i] for i in lista if i in respuestas]

    def conteo_mayor_igual(valores, umbral):
        return sum(1 for v in valores if v >= umbral)

    def promedio_val(valores):
        return sum(valores)/len(valores) if valores else 0

    def porcentaje_altos_val(valores, umbral=4):
        if not valores:
            return 0
        c = conteo_mayor_igual(valores, umbral)
        return (c/len(valores))*100

    def analiza_categoria(lista, nombre):
        vals = valores_validos(lista)
        if not vals:
            return {
                "texto": f"No se han contestado ítems en {nombre}, no hay datos suficientes.",
                "promedio": 0,
                "porcentaje_altos": 0
            }

        prom = promedio_val(vals)
        porc = porcentaje_altos_val(vals,4)
        altos = conteo_mayor_igual(vals,4)

        # Descripción según el resultado
        if nombre == "Factores Estresores":
            if altos >= 3:
                texto = ("Existen múltiples factores muy estresantes, se sugiere reorganizar "
                         "la carga académica y aplicar técnicas de gestión del tiempo.")
            elif all(v < 3 for v in vals):
                texto = ("Bajo estrés externo, las condiciones académicas no generan mucha presión.")
            elif all(v == 3 for v in vals):
                texto = ("Estrés moderado por factores externos, conviene ajustes organizativos.")
            else:
                texto = ("Hay variabilidad en los estresores. Identificar los más críticos y abordarlos ayudaría.")
        elif nombre == "Reacciones Físicas":
            if altos >= 3:
                texto = ("Se observan fuertes reacciones físicas al estrés, se recomienda atención médica o cambios en hábitos.")
            elif all(v < 3 for v in vals):
                texto = ("Impacto físico bajo, sin molestias significativas.")
            elif all(v == 3 for v in vals):
                texto = ("Impacto físico moderado, hábitos saludables o ejercicio podrían mejorar el bienestar.")
            else:
                texto = ("Algunas molestias físicas aparecen ocasionalmente, vigilar y mejorar rutinas de descanso.")
        elif nombre == "Reacciones Psicológicas":
            if altos >= 2:
                texto = ("Estrés emocional elevado, ansiedad/depresión presentes. Apoyo psicológico o técnicas de relajación recomendadas.")
            elif all(v == 3 for v in vals):
                texto = ("Estrés psicológico moderado, algo de inquietud o dificultad para concentrarse.")
            else:
                texto = ("Leves síntomas psicológicos presentes, mantener equilibrio entre estudio y ocio.")
        elif nombre == "Reacciones Comportamentales":
            if altos >= 2:
                texto = ("Conductas negativas frecuentes (aislamiento, conflictos). Buscar apoyo social y tutorías.")
            elif all(v == 3 for v in vals):
                texto = ("Nivel moderado de reacciones conductuales, algunos ajustes en rutinas podrían ayudar.")
            else:
                texto = ("Algunas conductas negativas ocasionales, atenderlas pronto para evitar empeoramiento.")
        elif nombre == "Estrategias de Afrontamiento":
            if all(v <= 2 for v in vals):
                texto = ("Faltan estrategias efectivas, considerar asesoría psicológica para desarrollar resiliencia.")
            elif altos >= 3:
                texto = ("Varias estrategias positivas en uso, mantener y reforzar estas habilidades.")
            elif all(v == 3 for v in vals):
                texto = ("Estrategias moderadas, mejorar habilidades afrontamiento con formación específica.")
            else:
                texto = ("Algunas estrategias presentes, pero insuficientes. Fortalecerlas con ayuda profesional.")

        return {
            "texto": texto,
            "promedio": prom,
            "porcentaje_altos": porc
        }

    # Analizar cada categoría
    cat_factores = analiza_categoria(factores_estresores, "Factores Estresores")
    cat_fisicas = analiza_categoria(reacciones_fisicas, "Reacciones Físicas")
    cat_psico = analiza_categoria(reacciones_psicologicas, "Reacciones Psicológicas")
    cat_comport = analiza_categoria(reacciones_comportamentales, "Reacciones Comportamentales")
    cat_afront = analiza_categoria(estrategias_afrontamiento, "Estrategias de Afrontamiento")

    # Diagnóstico global
    # Considerar todos los ítems respondidos
    todos = factores_estresores + reacciones_fisicas + reacciones_psicologicas + reacciones_comportamentales + estrategias_afrontamiento + ['intensidad']
    vals_todos = [respuestas[i] for i in todos if i in respuestas]
    if not vals_todos:
        diagnostico_global = "No se han contestado ítems suficientes para un diagnóstico global."
        porc_global = 0
    else:
        porc_global = porcentaje_altos_val(vals_todos,4)
        if porc_global >= 50:
            diagnostico_global = ("Estrés académico severo: se recomienda atención inmediata, reorganización y apoyo profesional.")
        elif porc_global >= 25:
            diagnostico_global = ("Estrés académico moderado: tomar medidas preventivas, ajustar rutinas y fortalecer afrontamiento.")
        else:
            diagnostico_global = ("Estrés académico bajo: situación manejable, mantener hábitos y prevenir incrementos futuros.")

    datos_numericos = {
        "factores_estresores": {
            "promedio": cat_factores["promedio"],
            "porcentaje_altos": cat_factores["porcentaje_altos"]
        },
        "reacciones_fisicas": {
            "promedio": cat_fisicas["promedio"],
            "porcentaje_altos": cat_fisicas["porcentaje_altos"]
        },
        "reacciones_psicologicas": {
            "promedio": cat_psico["promedio"],
            "porcentaje_altos": cat_psico["porcentaje_altos"]
        },
        "reacciones_comportamentales": {
            "promedio": cat_comport["promedio"],
            "porcentaje_altos": cat_comport["porcentaje_altos"]
        },
        "estrategias_afrontamiento": {
            "promedio": cat_afront["promedio"],
            "porcentaje_altos": cat_afront["porcentaje_altos"]
        },
        "global": {
            "porcentaje_altos_global": porc_global
        }
    }

    resultado = {
        "intensidad_estrés": nivel_intensidad,
        "intensidad_estrés_detalle": nivel_intensidad_detalle,
        "factores_estresores": cat_factores["texto"],
        "reacciones_fisicas": cat_fisicas["texto"],
        "reacciones_psicologicas": cat_psico["texto"],
        "reacciones_comportamentales": cat_comport["texto"],
        "estrategias_afrontamiento": cat_afront["texto"],
        "diagnostico_global": diagnostico_global,
        "datos_numericos": datos_numericos
    }

    return resultado
