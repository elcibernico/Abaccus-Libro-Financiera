// Archivo autogenerado a partir de documentos Word mediante parse_unit_u02_1_2.py
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto02-1-2",
  "title": "Descuento Racional Simple",
  "Desarrollo": [
  {
    "type": "text",
    "content": "**Descuento Racional Simple**"
  },
  {
    "type": "text",
    "content": "**Definición y Concepto**\n\nEl **Descuento Racional Simple** (también llamado matemático o real) se define como el interés simple calculado sobre la suma efectivamente recibida (Valor Actual $V$) aplicando la tasa periódica nominal de interés $j$. A diferencia del descuento comercial, este régimen es **racional** porque respeta la lógica de que el interés debe devengarse sobre el capital del que se dispone realmente durante el período de antelación."
  },
  {
    "type": "text",
    "content": "**Condición de Racionalidad**\n\nPara que este descuento sea válido, se debe verificar que si el valor efectivo $V$ se coloca en un régimen de interés simple durante el tiempo $n$ a la tasa $j$, se obtenga al final el valor nominal $N$: $$V \\cdot (1 + j \\cdot n) = N$$"
  },
  {
    "type": "text",
    "content": "**Deducción de Fórmulas**\n\nA partir de la condición de racionalidad, podemos deducir las expresiones fundamentales:\n**1. Valor Actual ($V$):** Despejando $V$ de la identidad fundamental: $$V = \\frac{N}{1 + j \\cdot n} = N \\cdot (1 + j \\cdot n)^{-1}$$\n**2. Descuento Total ($D$):** Por definición, el descuento es la diferencia entre el nominal y el valor actual ($D = N - V$). Podemos expresarlo de dos formas:\n- **En función del Valor Efectivo ($V$):** Sustituyendo $N$ por su equivalente capitalizado: $$D = V \\cdot (1 + j \\cdot n) - V \\implies D = V \\cdot j \\cdot n$$ *El descuento racional simple es el interés simple calculado sobre el valor efectivo.*\n*- ***En función del Valor Nominal ($N$):** Sustituyendo $V$ en la definición de descuento: $$D = N - \\frac{N}{1 + j \\cdot n} \\implies D = \\frac{N \\cdot j \\cdot n}{1 + j \\cdot n}$$"
  },
  {
    "type": "text",
    "content": "Desarrollo matemático paso a paso para obtener la fórmula del **Descuento Racional Simple ($D$)** en función del **Valor Nominal ($N$)**, partiendo de la identidad fundamental del descuento. \n\n**Deducción Paso a Paso**\n\n**1. Definición inicial de Descuento ($D$):** El descuento se define como la diferencia entre el capital futuro (Valor Nominal) y el capital presente (Valor Actual o Efectivo): $$D = N - V$$\n\n**2. Sustitución del Valor Actual ($V$):** En el régimen racional simple, el valor actual se despeja de la condición de racionalidad ($N = V \\cdot (1 + j \\cdot n)$). Por lo tanto, sustituimos $V$ por su expresión equivalente: $$V = \\frac{N}{1 + j \\cdot n}$$ Al integrar esto en la fórmula inicial, obtenemos: $$D = N - \\frac{N}{1 + j \\cdot n}$$\n\n**3. Búsqueda de común denominador:** Para realizar la resta de los términos, tomamos como común denominador la expresión $(1 + j \\cdot n)$: $$D = \\frac{N \\cdot (1 + j \\cdot n) - N}{1 + j \\cdot n}$$\n\n**4. Aplicación de la propiedad distributiva:** Multiplicamos el Valor Nominal ($N$) por los términos dentro del paréntesis en el numerador: $$D = \\frac{N + N \\cdot j \\cdot n - N}{1 + j \\cdot n}$$\n\n**5. Simplificación de términos:** Observamos que en el numerador conviven un término $N$ positivo y un término $N$ negativo, los cuales se anulan entre sí: $$D = \\frac{\\cancel{N} + N \\cdot j \\cdot n - \\cancel{N}}{1 + j \\cdot n}$$\n\n**6. Función resultante:** Tras la simplificación, arribamos a la fórmula final del descuento racional simple expresada exclusivamente en términos del valor nominal, la tasa y el tiempo: $$D = \\frac{N \\cdot j \\cdot n}{1 + j \\cdot n}$$\n\n**Análisis Didáctico de la Fórmula**\n**     ****Numerador ($N \\cdot j \\cdot n$):** Representa el interés simple calculado sobre el valor nominal. Si el descuento fuera comercial, esta sería la fórmula final.\n**     ****Denominador ($1 + j \\cdot n$):** Actúa como un factor de corrección. Al dividir el interés nominal por este factor, se logra que el descuento se calcule, en última instancia, sobre el valor efectivo $V$ y no sobre el nominal $N$, cumpliendo así con la premisa de **racionalidad**."
  },
  {
    "type": "text",
    "content": "**Características Principales**\n**- **El **descuento periódico** es constante e igual a $V \\cdot j$\n- Es la ley de actualización **conjugada** del interés simple.\n- A diferencia del descuento comercial, el valor actual nunca puede ser negativo, ya que la función es asintótica al eje del tiempo."
  },
  {
    "type": "interactive_graphic",
    "title": "Evolución del Valor Actual y Descuento Racional",
    "src": "/simuladores/u02_pto02_1_2_evolucion_valor_actual.html",
    "displayMode": "inline",
    "height": "650px"
  }
],
  "Glosario": [
  {
    "type": "text",
    "content": "**Actualización**: Proceso financiero que consiste en valuar un capital futuro en un momento anterior en el tiempo."
  },
  {
    "type": "text",
    "content": "**Descuento Racional**: Régimen donde los intereses se calculan sobre el capital efectivamente recibido (valor actual) y no sobre el valor nominal."
  },
  {
    "type": "text",
    "content": "**Valor Nominal ($N$)**: Monto de capital escrito en un documento, disponible solo al momento de su vencimiento."
  },
  {
    "type": "text",
    "content": "**Valor Actual ($V$)**: Capital equivalente hoy de una suma futura; es el importe neto recibido tras descontar los intereses."
  },
  {
    "type": "text",
    "content": "**Tasa Nominal Vencida ($j$)**: Tasa de interés simple aplicada en operaciones de actualización racional."
  },
  {
    "type": "text",
    "content": "**Racionalidad**: Condición que exige que el valor actual, capitalizado a la misma tasa y plazo, reproduzca exactamente el valor nominal."
  },
  {
    "type": "text",
    "content": "**Reversibilidad**: Propiedad de las leyes racionales que permite volver al capital original mediante la operación inversa (capitalización)."
  },
  {
    "type": "text",
    "content": "**Descuento Periódico**: Interés generado en una unidad de tiempo; en el régimen racional simple es constante respecto al valor actual."
  },
  {
    "type": "text",
    "content": "**Factor de Actualización**: Expresión matemática $(1 + j \\cdot n)^{-1}$ que permite hallar el valor presente de un nominal."
  },
  {
    "type": "text",
    "content": "**Leyes Conjugadas**: Relación entre una ley de capitalización y una de actualización cuando sus factores son recíprocos."
  }
],
  "Casos Prácticos": [
  {
    "type": "case",
    "title": "Caso 1: Descuento de un documento estándar",
    "enunciado": "Se desea conocer el valor efectivo de un pagaré con valor nominal de \\$15.000 que vence en 4 meses, si se le aplica una tasa de interés del \\$3%\\$ mensual bajo el régimen racional simple.",
    "planteo_solucion": "**Datos:** $N = 15.000$; $n = 4$ meses; $j = 0,03$.\n**Resolución:** $$V = \\frac{15.000}{1 + 0,03 \\cdot 4} = \\frac{15.000}{1,12} = 13.392,86$$ $$D = 15.000 - 13.392,86 = 1.607,14$$",
    "highlights": "",
    "content": ""
  },
  {
    "type": "case",
    "title": "Caso 2: Mercado Financiero Argentino (E-cheq)",
    "enunciado": "Una PYME argentina descuenta un E-cheq en la bolsa (MAV) con valor nominal de \\$500.000 que vence en 60 días. Se pacta una TNA de interés del \\$45%\\$. Se utiliza el régimen racional simple para el cálculo (año de 365 días).",
    "planteo_solucion": "**Datos:** $N = 500.000$; $n = 60/365$; $j = 0,45$ (anual).\n**Resolución:** $$V = \\frac{500.000}{1 + 0,45 \\cdot \\frac{60}{365}} = \\frac{500.000}{1,07397} = 465.561,37$$ El descuento realizado (intereses cedidos por la PYME) es de \\$34.438,63.",
    "highlights": "",
    "content": ""
  }
],
  "Autoevaluación": [
  {
    "type": "quiz",
    "question": "¿Cuál es la base de cálculo para determinar el descuento en el régimen racional simple?",
    "options": [
      "A) El Valor Nominal",
      "B) El Valor Actual o Efectivo",
      "C) El interés acumulado"
    ],
    "feedback": "Según Fransolini, el descuento racional se calcula sobre la suma efectivamente recibida, siendo análogo al capital inicial en el interés simple.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "¿Qué sucede con el Valor Actual ($V$) en este régimen si el tiempo de antelación ($n$) tiende a infinito?",
    "options": [
      "A) Se vuelve negativo",
      "B) Tiende a cero de forma asintótica",
      "C) Se mantiene constante"
    ],
    "feedback": "López Dumrauf explica que, al estar el tiempo en el denominador $(1+jn)$, la función es decreciente y su límite es cero, pero nunca toma valores negativos.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "¿Por qué se considera que esta ley es \"racional\"?",
    "options": [
      "A) Porque utiliza tasas nominales anuales",
      "B) Porque permite recuperar el Valor Nominal capitalizando el Valor Actual",
      "C) Porque el descuento es siempre igual al interés comercial"
    ],
    "feedback": "La racionalidad implica reversibilidad: el valor efectivo colocado a interés simple por el mismo plazo y tasa reproduce el nominal.",
    "correctIndex": 1
  }
],
  "Gráficos": []
};

export default data;
