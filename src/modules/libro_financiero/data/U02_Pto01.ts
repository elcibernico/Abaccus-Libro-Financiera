// Archivo autogenerado a partir de documentos Word mediante parse_unit_u02_1.py
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto01",
  "title": "Conceptos Básicos de Descuento",
  "Desarrollo": [
  {
    "type": "text",
    "content": "**UNIDAD 2: OPERACIONES FINANCIERAS DE ACTUALIZACIÓN SIMPLE Y COMPUESTA**"
  },
  {
    "type": "text",
    "content": "**Operaciones financieras de actualización o descuento**\n**Introducción**\n\nEn el estudio del Cálculo Financiero, tras haber analizado el proceso de capitalización —donde se proyecta un capital presente hacia el futuro—, es imperativo abordar su operación simétrica y contrapuesta: la **actualización** o **descuento**. En estas operaciones se tiene como dato conocido el valor del capital disponible o exigible en un momento futuro y se determina su equivalente financiero en el presente, o en un momento anterior al de su disponibilidad o exigibilidad, sujeto a la incidencia de la tasa de actualización (ya sea de interés o de descuento) y del tiempo como elementos integrantes de la operación."
  },
  {
    "type": "text",
    "content": "**A. El Sentido Retrospectivo del Tiempo**\n\nA diferencia de la capitalización, donde existe un desplazamiento en el sentido positivo del tiempo (del momento 0 al momento $n$), en la actualización el punto de partida es un valor ubicado en el futuro. Analíticamente, se trata de una función dinámica del capital en la que el tiempo actúa como una variable de antelación. La valoración es siempre anterior a la disponibilidad del capital, lo que define técnicamente el carácter retrospectivo de la operación."
  },
  {
    "type": "text",
    "content": "**B. Nomenclatura Técnica y Simbología**\n\nPara reflejar este cambio de sentido en la operación, se adopta una nomenclatura específica que diferencia claramente los elementos respecto a la capitalización:\n\n**- ****Valor Nominal ($N$):** Representa el valor futuro escrito en el documento u obligación, lo que en el proceso de capitalización se denominaba \"Monto\".\n\n- **Valor Actual o Valor Efectivo ($V$):** Representa la suma líquida que efectivamente se percibe o abona hoy tras realizar la operación de descuento, equivalente al concepto de \"Capital\" de la Unidad 1.\n\n- **Descuento ($D$):** Es la merma, quita o reducción de valor que sufre el capital futuro. Representa el \"costo\" de la espera que se ahorra quien recibe el dinero anticipadamente o la compensación que exige quien adelanta los fondos."
  },
  {
    "type": "text",
    "content": "**C. Identidades Fundamentales**\n\nLa relación matemática entre estos elementos se rige por identidades básicas que demuestran que el Valor Efectivo es siempre el resultado de detraer la quita financiera del valor nominal exigible al vencimiento: $$D = N - V$$ $$V = N - D$$"
  },
  {
    "type": "text",
    "content": "**D. El Concepto de Variación Absoluta**\n\nSi consideramos un capital disponible en un momento $(t + \\Delta t)$ y pretendemos su disponibilidad en un momento anterior $t$, la diferencia entre los valores de los capitales intercambiados representa la **Variación absoluta de la función capital**, conocida financieramente como **Descuento**.\nEs fundamental advertir que, aunque la magnitud de la variación absoluta pueda ser numéricamente igual a la del interés, su interpretación financiera difiere radicalmente debido a que el desplazamiento ocurre en sentido inverso. Esta medida por sí sola suministra poca información, ya que no hace referencia al capital que la originó, lo que requiere el posterior estudio de las variaciones relativas o tasas."
  },
  {
    "type": "text",
    "content": "**E. Fundamento Económico y Equidad Financiera**\n\nLa actualización responde al **Principio de Equidad Financiera**. El valor del capital surge del acuerdo entre dos partes con necesidades distintas: una que posee un derecho futuro y otra que dispone de liquidez presente. La ley financiera aceptada por ambos presupone que los valores $N$ (futuro) y $V$ (presente) son equivalentes entre sí, compensando el sacrificio del consumo postergado. Como señala la doctrina, el descuento representa el \"precio\" que debe pagarse por la disponibilidad inmediata del dinero; un crédito a cobrar en el futuro no vale hoy su valor nominal, sino un valor menor que refleja la preferencia por la liquidez actual."
  },
  {
    "type": "interactive_graphic",
    "title": "Flujo de Actualización vs Capitalización",
    "src": "/simuladores/u02_pto02_flujo_actualizacion_capitalizacion.html",
    "displayMode": "inline",
    "height": "650px"
  }
],
  "Glosario": [
  {
    "type": "text",
    "content": "**Valor Nominal ($N$)**: Capital disponible o exigible en un momento futuro determinado, que actúa como el dato conocido en el proceso de actualización."
  },
  {
    "type": "text",
    "content": "**Valor Actual o Efectivo ($V$)**: Equivalente financiero en el presente de un capital futuro; representa la suma líquida que efectivamente se percibe o abona."
  },
  {
    "type": "text",
    "content": "**Descuento ($D$)**: Quita, merma o reducción de valor que experimenta una disponibilidad futura para lograr su disponibilidad inmediata."
  },
  {
    "type": "text",
    "content": "**Actualización**: Operación financiera inversa a la capitalización que consiste en desplazar un capital desde el futuro hacia el presente bajo una ley de valoración."
  },
  {
    "type": "text",
    "content": "**Tiempo de Antelación ($n$)**: Lapso que media entre la época de actualización (presente o momento anterior) y el vencimiento del capital futuro."
  },
  {
    "type": "text",
    "content": "**Sentido Inverso del Tiempo**: Dirección retrospectiva en el eje temporal en la que se valúan los capitales en una operación de descuento."
  },
  {
    "type": "text",
    "content": "**Variación Absoluta de la Función Capital**: Diferencia cuantitativa entre los valores de capital intercambiados en dos momentos distintos, analizada retrospectivamente como descuento."
  },
  {
    "type": "text",
    "content": "**Equidad Financiera**: Principio según el cual los capitales $N$ (futuro) y $V$ (presente) son equivalentes para las partes bajo una ley de valoración acordada."
  },
  {
    "type": "text",
    "content": "**Época de Actualización**: Momento específico en el tiempo, anterior al vencimiento, donde se desea conocer el valor presente de la obligación."
  },
  {
    "type": "text",
    "content": "**Factor de Actualización**: Coeficiente matemático que, aplicado al Valor Nominal, permite determinar su equivalente financiero en un momento anterior."
  }
],
  "Casos Prácticos": [
  {
    "type": "case",
    "title": "Caso 1: Descuento de un Pagaré Comercial",
    "enunciado": "Una empresa posee un pagaré de un cliente por un valor de \\$100.000 (Valor Nominal \\$N\\$) con vencimiento dentro de 90 días. Ante la necesidad de fondos líquidos, decide descontarlo en una entidad bancaria que, tras aplicar la ley de actualización, le acredita hoy \\$94.000 (Valor Efectivo \\$V\\$).",
    "planteo_solucion": "Cálculo del Descuento ($D$): $$D = N - V = 100.000 - 94.000 = \\$6.000$$.",
    "highlights": "La empresa acepta una merma de \\$6.000 en su disponibilidad futura para obtener liquidez inmediata 90 días antes del vencimiento original.",
    "content": ""
  },
  {
    "type": "case",
    "title": "Caso 2: Operación de E-Check en el Mercado Argentino (Merval/ByMA)",
    "enunciado": "En el mercado financiero argentino actual, las PyMEs descuentan cheques electrónicos (E-Checks) a través de Sociedades de Garantía Recíproca (SGR). Un comerciante descuenta un E-Check de \\$500.000 con vencimiento a 30 días. Tras la negociación y los gastos asociados, recibe un valor neto de \\$475.000.",
    "planteo_solucion": "Identificación de elementos:\n\nValor Nominal ($N$): \\$500.000.\n\nValor Actual ($V$): \\$475.000.\n\nDescuento ($D$): \\$25.000.",
    "highlights": "Contexto Normativo: Bajo la normativa del B.C.R.A., el cálculo de las tasas implícitas en estas operaciones debe realizarse computando días exactos (año calendario de 365 días).",
    "content": ""
  }
],
  "Autoevaluación": [
  {
    "type": "quiz",
    "question": "**En la terminología técnica de las operaciones de descuento, ¿cómo se denomina al capital disponible en el futuro?**",
    "options": [
      "A) Monto.",
      "B) Valor Nominal ($N$).",
      "C) Capital Final"
    ],
    "feedback": "Aunque conceptualmente sea un monto, en las operaciones de actualización se utiliza el término Valor Nominal ($N$) para identificarlo como el dato conocido ubicado en el futuro.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "**¿****Qué caracteriza el desplazamiento del capital en una operación de actualización?**",
    "options": [
      "A) Se desplaza hacia el futuro (sentido positivo).",
      "B) Se desplaza hacia el presente (sentido inverso o retrospectivo).",
      "C) El capital permanece estático en el momento cero."
    ],
    "feedback": "La actualización es la operación inversa a la capitalización precisamente porque el capital se valúa en un momento anterior a su vencimiento.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "**Si una operación de descuento es financieramente equitativa, esto implica que:**",
    "options": [
      "A) $N$ y $V$ son numéricamente iguales.",
      "B) $N$ y $V$ son equivalentes para las partes bajo la ley financiera pactada.",
      "C) No existe descuento en la operación."
    ],
    "feedback": "El principio de equidad financiera establece que, aunque los capitales tengan valores nominales distintos, su valor es equivalente por estar disponibles en momentos diferentes del tiempo.",
    "correctIndex": 1
  }
],
  "Gráficos": []
};

export default data;
