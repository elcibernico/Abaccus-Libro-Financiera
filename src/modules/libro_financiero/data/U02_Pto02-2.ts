// Archivo autogenerado a partir de documentos Word mediante parse_unit_u02_2_2.py
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto02-2",
  "title": "Regímenes que operan en interés compuesto.",
  "Desarrollo": [
  {
    "type": "text",
    "content": "**Introducción a los Regímenes de Interés Compuesto**\n\nActualizar un capital bajo el régimen de interés compuesto no es simplemente aplicar una resta al valor futuro; es un proceso de **valoración retrospectiva** donde se asume que el dinero tiene una capacidad productiva que se \"desactiva\" a medida que lo traemos al presente.\n\nEn este régimen, la actualización tiene el efecto financiero inverso a la capitalización: implica la detracción del importe descontado del valor nominal, lo que conlleva una disminución sistemática de la base sobre la cual se aplica la tasa en el siguiente período de antelación."
  },
  {
    "type": "text",
    "content": "**La Lógica de la Base Variable**\n\nA diferencia del régimen simple —donde el descuento puede ser constante si se calcula sobre el nominal—, en el régimen compuesto el descuento es **variable y decreciente** período a período. Esto sucede porque:\n    1) Si usamos tasa de interés ($i$), el descuento se calcula sobre un **Valor Actual** que se hace más pequeño a medida que retrocedemos más en el tiempo.\n    2) Si usamos tasa de descuento ($d$), cada actualización se aplica sobre un **Valor Nominal residual** ya disminuido por el descuento del período anterior."
  },
  {
    "type": "text",
    "content": "**El Principio de Equidad en la Actualización**\n\nLa esencia de estos regímenes es el cumplimiento del **principio de equidad financiera**. En el interés compuesto, la actualización garantiza que el inversor o la entidad financiera sea indiferente entre recibir el Valor Actual hoy ($V$) o el Valor Nominal ($N$) en el futuro, ya que $V$ tiene la capacidad de regenerar a $N$ mediante la capitalización de sus propios intereses."
  }
],
  "Glosario": [
  {
    "type": "text",
    "content": "**Actualización Compuesta**: Operación financiera que determina el valor actual de un capital futuro restando los intereses de manera acumulativa y exponencial."
  },
  {
    "type": "text",
    "content": "**Base Variable**: Característica del régimen compuesto donde los intereses o descuentos se calculan sobre una base (capital o valor nominal residual) que cambia período a período."
  },
  {
    "type": "text",
    "content": "**Descuento de Intereses**: Acción de detraer los intereses de un capital futuro para hallar su valor equivalente en el presente."
  },
  {
    "type": "text",
    "content": "**Valor Nominal ($N$)**: El valor escrito de un documento de crédito o capital futuro que es exigible a la fecha de su vencimiento."
  },
  {
    "type": "text",
    "content": "**Valor Efectivo ($V$)**: La cuantía de dinero que se recibe o entrega en el momento actual tras deducir el descuento del valor nominal."
  },
  {
    "type": "text",
    "content": "**Equivalencia Financiera**: Principio por el cual dos o más capitales con diferentes vencimientos resultan indiferentes para un sujeto a una tasa y ley financiera dadas."
  },
  {
    "type": "text",
    "content": "**Plazo de Antelación ($n$)**: Tiempo que transcurre entre el momento de la actualización (hoy) y la fecha de vencimiento del capital futuro."
  },
  {
    "type": "text",
    "content": "**Factor de Actualización**: La expresión matemática que multiplica al capital futuro para determinar su valor actual equivalente."
  },
  {
    "type": "text",
    "content": "**Descuento Decreciente**: Fenómeno del descuento compuesto donde la quita absoluta de cada período es menor a la del período posterior al retroceder en el tiempo."
  },
  {
    "type": "text",
    "content": "**Actualización Discontinua**: Proceso de descuento realizado en intervalos de tiempo discretos o separados (mensual, semestral, anual, etc.)."
  }
],
  "Casos Prácticos": [
  {
    "type": "case",
    "title": "Caso 1: La visión del \"ahorro de intereses\"",
    "enunciado": "Un inversor tiene un documento de \\$1.000.000 que vence en 2 años. Si la tasa es del 10% anual, el régimen compuesto asume que el \"sacrificio\" de esperar el segundo año es mayor que el del primero. Por ello, al traer el capital del año 2 al año 1, la quita es mayor que al traerlo del año 1 al momento 0.",
    "planteo_solucion": "**Datos del escenario:**\n**Valor Nominal (Valor en el Año 2):** \\$1.000.000\n**Tasa de descuento anual:** 10% (0,10)\n**Tiempo total:** 2 años\n\nPara demostrar por qué la quita (el descuento) es mayor en el segundo año que en el primero bajo el régimen compuesto, debemos actualizar el capital período por período hacia el presente.\n\n**Paso 1: Traer el capital del Año 2 al Año 1**\n\nPara conocer el valor del documento en el Año 1, le descontamos un año de intereses al valor final utilizando la fórmula de actualización:\n\n$$V_1 = \\frac{V_2}{1 + i} = \\frac{1.000.000}{1 + 0,10} = 909.090,91$$\n\nLa **primera quita** (que representa el \"sacrificio\" de esperar ese segundo año) es la diferencia entre el valor del documento al momento de su vencimiento y su valor un año antes:\n\n$$Quita_{Año 2 \\to 1} = 1.000.000 - 909.090,91 = 90.909,09$$\n\n**Paso 2: Traer el capital del Año 1 al momento 0 (Hoy)**\n\nAhora, tomamos el valor del Año 1 y lo actualizamos al presente para obtener el Valor Actual o Inicial:\n\n$$V_0 = \\frac{V_1}{1 + i} = \\frac{909.090,91}{1 + 0,10} = 826.446,28$$\n\nLa **segunda quita** (el \"sacrificio\" de esperar el primer año) es la diferencia entre el valor en el Año 1 y el valor en el momento inicial:\n\n$$Quita_{Año 1 \\to 0} = 909.090,91 - 826.446,28 = 82.644,63$$",
    "highlights": "**Concepto clave:** La base sobre la cual se \"ahorran\" intereses se reduce a medida que nos acercamos al hoy, reflejando la realidad de los mercados donde los intereses se reinvierten.\nAl comparar ambos períodos, la matemática confirma el enunciado inicial:\n     Quita al traer del Año 2 al Año 1: **\\$90.909,09**\n     Quita al traer del Año 1 al Año 0: **\\$82.644,63**\n\nEs evidente que el sacrificio monetario es superior en el tramo final del documento. Esto se debe a un **concepto clave: la base sobre la cual se \"ahorran\" intereses se reduce a medida que nos acercamos al hoy, reflejando la realidad de los mercados donde los intereses se reinvierten**. En el descuento compuesto, los intereses del último año se calcularon sobre un capital acumulado mayor (\\$909.090,91) que los del primer año (\\$826.446,28). Por lo tanto, al viajar hacia atrás en el tiempo para descontar el documento, cada vez que restamos un período estamos \"limpiando\" los intereses de una base de capital cada vez más pequeña.",
    "content": ""
  },
  {
    "type": "case",
    "title": "Caso 2: Mercado Argentino - La tasa implícita en la inflación",
    "enunciado": "En la economía argentina, cuando se analiza la pérdida de poder adquisitivo (desvalorización monetaria), se opera bajo una lógica de actualización compuesta. Si la inflación mensual es del 10%, el valor de un peso \"adelantado\" un mes no cae linealmente, sino que se actualiza exponencialmente. Un capital de \\$100 dentro de 3 meses no vale \\$70 hoy ($100 - 30$ de quita simple), sino que su valor se detrae sobre bases cada vez menores, resultando en un valor actual mayor que en el régimen simple.",
    "planteo_solucion": "**Datos del escenario:**\n**Valor Futuro (Capital en el Mes 3):** \\$100\n**Tasa de inflación mensual:** 10% (0,10)\n**Tiempo total:** 3 meses\n\nPara entender por qué el valor actual es mayor en el régimen compuesto frente al simple, vamos a actualizar el capital mes a mes hacia el presente y calcular la \"quita\" por desvalorización en cada paso.\n\n**Paso 1: Traer el capital del Mes 3 al Mes 2**\n\nDescontamos un mes de inflación al valor futuro:\n\n$$V_2 = \\frac{V_3}{1 + i} = \\frac{100}{1 + 0,10} = 90,91$$\n\nLa **primera quita** (pérdida de poder adquisitivo del último mes) es:\n\n$$Quita_{Mes 3 \\to 2} = 100 - 90,91 = 9,09$$\n\n**Paso 2: Traer el capital del Mes 2 al Mes 1**\n\nTomamos ese nuevo valor y le descontamos el efecto inflacionario del segundo mes:\n\n$$V_1 = \\frac{V_2}{1 + i} = \\frac{90,91}{1 + 0,10} = 82,64$$\n\nLa **segunda quita** se calcula sobre una base menor:\n\n$$Quita_{Mes 2 \\to 1} = 90,91 - 82,64 = 8,27$$\n\n**Paso 3: Traer el capital del Mes 1 al momento 0 (Hoy)**\n\nFinalmente, actualizamos el valor para obtener el poder adquisitivo real al día de hoy:\n\n$$V_0 = \\frac{V_1}{1 + i} = \\frac{82,64}{1 + 0,10} = 75,13$$\n\nLa **tercera quita** (la del primer mes transcurrido) es aún menor:\n\n$$Quita_{Mes 1 \\to 0} = 82,64 - 75,13 = 7,51$$",
    "highlights": "**Concepto clave:** En contextos inflacionarios, el poder adquisitivo no cae de forma lineal, sino exponencial. Al traer dinero del futuro al presente mediante actualización compuesta, **la tasa de inflación se aplica sobre bases cada vez menores** a medida que nos acercamos al hoy.\n\nSi sumamos las quitas del régimen compuesto (\\$9,09 + 8,27 + 7,51), la desvalorización total es de **\\$24,87**. Por lo tanto, el valor hoy de esos \\$100 a recibir en 3 meses es de **\\$75,13**.\nSi utilizáramos un **régimen lineal o simple**, la quita sería siempre de \\$10 por mes (el 10% fijo sobre los \\$100 originales), acumulando una pérdida de \\$30 y dejando un valor actual de solo **\\$70**.\n\n**Resultado:** Esto provoca que la \"quita\" de valor sea decreciente hacia el presente, resultando en un Valor Actual (\\$75,13) matemáticamente superior al que arrojaría un cálculo de descuento simple (\\$70). La actualización compuesta refleja con exactitud que el \"interés sobre interés\" (o en este caso, la inflación sobre la inflación) erosiona el capital de manera acumulativa, no aditiva.",
    "content": ""
  }
],
  "Autoevaluación": [
  {
    "type": "quiz",
    "question": "¿Por qué se dice que el descuento compuesto es \"decreciente\" en términos absolutos?",
    "options": [
      "A) Porque la tasa de interés disminuye con el tiempo",
      "B) Porque se aplica sobre una base (capital) que se reduce a medida que actualizamos más períodos",
      "C) Porque es menos oneroso que el descuento simple"
    ],
    "feedback": "Tal como indica Fransolini, la disminución de la base de cálculo conlleva que el descuento de cada período sea menor al del período anterior en sentido retrospectivo.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "En una operación de actualización compuesta, el Valor Actual ($V$)",
    "options": [
      "A) Es siempre mayor que el Valor Nominal ($N$)",
      "B) Es equivalente financiero del Valor Nominal ($N$) al momento cero",
      "C) No guarda relación con la capitalización"
    ],
    "feedback": "La actualización es la operación inversa a la capitalización; por ende, $V$ capitalizado debe reproducir a $N$ para que exista equilibrio.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "¿Cuál es la principal diferencia filosófica entre el régimen simple y el compuesto al actualizar?",
    "options": [
      "A) El simple no usa tasas",
      "B) El compuesto asume que los intereses/descuentos no ganados también habrían generado rendimientos",
      "C) No hay diferencia, son resultados iguales"
    ],
    "feedback": "La actualización compuesta reconoce que el ahorro de intereses de cada período se reintegra al capital para seguir \"ahorrando\" en los períodos anteriores.",
    "correctIndex": 1
  }
],
  "Gráficos": []
};

export default data;
