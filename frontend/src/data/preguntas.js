const preguntas = [
  {
    key: "filtro",
    texto: "¿Has tenido momentos de preocupación o nerviosismo?",
    tipo: "filtro", // Indica que es la pregunta filtro
  },
  {
    key: "intensidad",
    texto: "Señala tu nivel de preocupación o nerviosismo",
    escala: [1, 2, 3, 4, 5], // Escala específica para esta pregunta
    tipo: "intensidad", // Clasificación específica
  },
  {
    key: "competencia_companeros",
    texto: "La competencia con los compañeros del grupo.",
    tipo: "estresor", // Clasificación como factor estresor
  },
  {
    key: "sobrecarga_tareas",
    texto: "Sobrecarga de tareas y trabajos escolares.",
    tipo: "estresor",
  },
  {
    key: "personalidad_profesor",
    texto: "La personalidad y el carácter del profesor.",
    tipo: "estresor",
  },
  {
    key: "evaluaciones_profesor",
    texto:
        "Las evaluaciones de los profesores (exámenes, ensayos, trabajos de investigación, etc.).",
    tipo: "estresor",
  },
  {
    key: "tipo_trabajo_profesor",
    texto:
        "El tipo de trabajo que te piden los profesores (consulta de temas, fichas de trabajo, ensayos, mapas conceptuales, etc.).",
    tipo: "estresor",
  },
  {
    key: "no_entender_temas",
    texto: "No entender los temas que se abordan en la clase.",
    tipo: "estresor",
  },
  {
    key: "participacion_clase",
    texto: "Participación en clase (responder a preguntas, exposiciones, etc.).",
    tipo: "estresor",
  },
  { key: "tiempo_limitado", texto: "Tiempo limitado para hacer el trabajo.", tipo: "estresor" },

  {
    key: "trastorno_sueno",
    texto: "Trastornos en el sueño (insomnio o pesadillas)",
    tipo: "reaccion_fisica", // Clasificación como reacción física
  },
  { key: "fatiga_cronica", texto: "Fatiga crónica (cansancio permanente).", tipo: "reaccion_fisica" },
  { key: "dolor_cabeza", texto: "Dolores de cabeza o migrañas.", tipo: "reaccion_fisica" },
  {
    key: "problemas_digestivos",
    texto: "Problemas de digestión, dolor abdominal o diarrea.",
    tipo: "reaccion_fisica",
  },
  {
    key: "conductas_nerviosas",
    texto: "Rascarse, morderse las uñas, frotarse, etc.",
    tipo: "reaccion_fisica",
  },
  { key: "somnolencia", texto: "Somnolencia o mayor necesidad de dormir.", tipo: "reaccion_fisica" },

  {
    key: "inquietud",
    texto: "Inquietud (incapacidad de relajarse y estar tranquilo).",
    tipo: "reaccion_psicologica", // Clasificación como reacción psicológica
  },
  {
    key: "depresion_tristeza",
    texto: "Sentimientos de depresión y tristeza (decaído).",
    tipo: "reaccion_psicologica",
  },
  { key: "ansiedad_angustia", texto: "Ansiedad, angustia o desesperación.", tipo: "reaccion_psicologica" },
  { key: "problemas_concentracion", texto: "Problemas de concentración.", tipo: "reaccion_psicologica" },
  {
    key: "agresividad_irritabilidad",
    texto: "Sentimiento de agresividad o aumento de irritabilidad.",
    tipo: "reaccion_psicologica",
  },

  {
    key: "conflictos",
    texto: "Conflictos o tendencia a polemizar o discutir.",
    tipo: "reaccion_comportamental", // Clasificación como reacción comportamental
  },
  { key: "aislamiento", texto: "Aislamiento de los demás.", tipo: "reaccion_comportamental" },
  { key: "desgano_escolar", texto: "Desgano para realizar labores escolares.", tipo: "reaccion_comportamental" },
  {
    key: "cambio_alimentos",
    texto: "Aumento o reducción del consumo de alimentos.",
    tipo: "reaccion_comportamental",
  },

  {
    key: "asertividad",
    texto:
        "Habilidad asertiva (defender nuestras preferencias, ideas o sentimientos sin dañar a otros).",
    tipo: "estrategia_afrontamiento", // Clasificación como estrategia de afrontamiento
  },
  {
    key: "plan_ejecucion",
    texto: "Elaboración de un plan y ejecución de sus tareas.",
    tipo: "estrategia_afrontamiento",
  },
  {
    key: "religiosidad",
    texto: "La religiosidad (oraciones o asistencia a misa).",
    tipo: "estrategia_afrontamiento",
  },
  { key: "elogios", texto: "Elogios a sí mismo.", tipo: "estrategia_afrontamiento" },
  { key: "busqueda_informacion", texto: "Búsqueda de información.", tipo: "estrategia_afrontamiento" },
  {
    key: "ventilacion_confidencias",
    texto: "Ventilación y confidencias (verbalización de la situación).",
    tipo: "estrategia_afrontamiento",
  },
];

export default preguntas;
