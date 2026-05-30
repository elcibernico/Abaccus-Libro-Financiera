// Archivo autogenerado a partir de documentos Word mediante parse_unit_u02_1_3.py
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto02-1-3",
  "title": "Equivalencia entre Interés y Descuento Simple",
  "Desarrollo": [
  {
    "type": "text",
    "content": "**Relación de Equivalencia en Régimen Simple**\n\nPara establecer la equivalencia entre la tasa de interés ($j$) y la tasa de descuento ($f$) en el régimen simple, partimos de la igualdad de sus valores efectivos ($V$) para un mismo valor nominal ($N$) y un mismo plazo ($n$).\n\nEn el **Descuento Comercial Simple**, el valor efectivo es: $$V_1 = N \\cdot (1 - f \\cdot n)$$\n\nEn el **Descuento Racional Simple**, el valor efectivo es: $$V_2 = \\frac{N}{1 + j \\cdot n}$$"
  },
  {
    "type": "text",
    "content": "Igualando $V_1 = V_2$ y simplificando el valor nominal $N$: $$1 - f \\cdot n = \\frac{1}{1 + j \\cdot n}$$"
  },
  {
    "type": "text",
    "content": "**A. Obtención de $f$ en función de $j$**\nRealizando el despeje correspondiente de la igualdad anterior: $$f \\cdot n = 1 - \\frac{1}{1 + j \\cdot n} = \\frac{1 + j \\cdot n - 1}{1 + j \\cdot n}$$ $$f = \\frac{j}{1 + j \\cdot n}$$"
  },
  {
    "type": "text",
    "content": "**B. Obtención de $j$ en función de $f$**\nPartiendo nuevamente de la igualdad de valores efectivos: $$1 + j \\cdot n = \\frac{1}{1 - f \\cdot n}$$ $$j \\cdot n = \\frac{1}{1 - f \\cdot n} - 1 = \\frac{1 - (1 - f \\cdot n)}{1 - f \\cdot n}$$ $$j = \\frac{f}{1 - f \\cdot n}$$"
  },
  {
    "type": "text",
    "content": "**Conclusión fundamental**: A diferencia del régimen compuesto, en el régimen simple la relación de equivalencia entre ambas tasas **depende del tiempo de la operación ($n$)**. Para un mismo valor de $n$, se verifica siempre que $j > f$, ya que la tasa de interés se aplica sobre una base menor (el valor actual) para generar el mismo descuento absoluto."
  },
  {
    "type": "interactive_graphic",
    "title": "Tasas Equivalentes en Régimen Simple",
    "src": "/simuladores/u02_pto02_1_3_simulador_tasas_equivalentes.html",
    "displayMode": "inline",
    "height": "650px"
  }
],
  "Glosario": [
  {
    "type": "text",
    "content": "**Equivalencia financiera**: Principio que establece que dos capitales con distintos vencimientos tienen el mismo valor cuando, al ser valorados en un mismo momento bajo una misma ley, sus cuantías coinciden."
  },
  {
    "type": "text",
    "content": "**Tasa nominal de interés ($j$)**: Coeficiente de proporcionalidad que define el interés generado por una unidad de capital en un período bajo régimen simple."
  },
  {
    "type": "text",
    "content": "**Tasa nominal de descuento ($f$)**: Porcentaje aplicado sobre el valor nominal de un capital futuro para determinar la quema o merma por su disponibilidad inmediata."
  },
  {
    "type": "text",
    "content": "**Valor Nominal ($N$)**: Monto escrito o valor futuro de un documento que será exigible al vencimiento de la operación."
  },
  {
    "type": "text",
    "content": "**Valor Efectivo ($V$)**: Cantidad de dinero que se percibe o entrega efectivamente hoy tras aplicar un descuento al valor futuro."
  },
  {
    "type": "text",
    "content": "**Descuento Comercial Simple**: Régimen donde el descuento se calcula siempre sobre el valor nominal del documento utilizando una tasa adelantada."
  },
  {
    "type": "text",
    "content": "**Descuento Racional Simple**: Régimen donde el interés (descuento) se calcula sobre el valor efectivamente recibido (valor actual) utilizando una tasa vencida."
  },
  {
    "type": "text",
    "content": "**Racionalidad**: Condición que exige que el valor efectivo, colocado a la tasa de interés pactada, reproduzca exactamente el valor nominal al vencimiento."
  },
  {
    "type": "text",
    "content": "**Irracionalidad financiera**: Característica del descuento comercial simple donde no se logra recomponer el valor nominal original al reinvertir el valor efectivo a la misma tasa."
  },
  {
    "type": "text",
    "content": "**Horizonte temporal ($n$)**: Número de períodos de tiempo que se anticipa la disponibilidad de un capital futuro."
  }
],
  "Casos Prácticos": [
  {
    "type": "case",
    "title": "Caso 1: Cálculo de Tasa Equivalente",
    "enunciado": "Una empresa desea descontar un pagaré de \\$50.000 que vence en 120 días. La entidad financiera ofrece una tasa de descuento comercial (\\$f\\$) del 4% mensual. Se desea determinar cuál debería ser la tasa de interés nominal (\\$j\\$) equivalente para una operación de descuento racional que arroje el mismo valor efectivo.",
    "planteo_solucion": "**Resolución**:\nDatos: $f = 0,04$; $n = 4$ meses (120 días).\nFórmula: $j = \\frac{f}{1 - f \\cdot n}$\nCálculo: $j = \\frac{0,04}{1 - 0,04 \\cdot 4} = \\frac{0,04}{0,84} = 0,047619$\n**Resultado**: La tasa de interés mensual equivalente es del **4,7619%**.",
    "highlights": "",
    "content": ""
  },
  {
    "type": "case",
    "title": "Caso 2: Contexto del Mercado Financiero Argentino",
    "enunciado": "En el mercado de descuento de cheques de pago diferido (CPD) en Argentina, es común que las entidades operen con tasas directas. Si un banco aplica una tasa de descuento ($f$) nominal anual del 60% para un cheque con vencimiento a 30 días, calcule el costo financiero real expresado como tasa de interés ($j$) mensual.",
    "planteo_solucion": "**Resolución**:\nDatos: \\$TNA_{descuento} = 60% \\Rightarrow f = 0,60 / 12 = 0,05\\$ mensual; $n = 1$ mes.\nFórmula: $j = \\frac{f}{1 - f \\cdot n}$\nCálculo: $j = \\frac{0,05}{1 - 0,05 \\cdot 1} = \\frac{0,05}{0,95} = 0,05263$\n**Resultado**: Mientras que la tasa de descuento \"anunciada\" es del 5% mensual, el costo real o tasa de interés que paga el cliente sobre el dinero que efectivamente recibe es del **5,263% mensual**.",
    "highlights": "",
    "content": ""
  }
],
  "Autoevaluación": [
  {
    "type": "quiz",
    "question": "En el régimen simple de actualización, ¿de qué variable depende principalmente la relación de equivalencia entre $j$ y $f$?",
    "options": [
      "A) Del capital inicial",
      "B) Del plazo de la operación ($n$)",
      "C) Únicamente de la cuantía de la tasa"
    ],
    "feedback": "Según Fransolini, a diferencia del interés compuesto, en el régimen simple la equivalencia se ve afectada por el tiempo de antelación.\n\n**Explicación matemática**\n\nComo vimos en los puntos anteriores, la fórmula que relaciona a la tasa de descuento ($f$) con la tasa de interés ($j$) en el régimen simple es:\n$$f = \\frac{j}{1 + j \\cdot n}$$\nA partir de esta igualdad, podemos analizar por qué las otras opciones son incorrectas:\n**No depende del capital inicial (Opción a):** El capital ni siquiera aparece en la fórmula de equivalencia. Las tasas equivalentes se calculan independientemente del monto de dinero que se vaya a invertir o descontar.\n**No depende únicamente de la tasa (Opción c):** Si fijamos una tasa $j$, el valor de $f$ cambiará obligatoriamente cada vez que cambie el tiempo ($n$).\nPor lo tanto, en el régimen simple, la variable que define y altera la relación de equivalencia entre ambas tasas es **el plazo de la operación ($n$)**. Esta es una característica clave del interés simple, a diferencia del régimen compuesto, donde la equivalencia entre tasas es independiente del plazo total de la operación.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "Si se mantiene constante la tasa de interés ($j$), ¿qué sucede con la tasa de descuento ($f$) equivalente si aumenta el plazo de la operación?",
    "options": [
      "A) Aumenta",
      "B) Disminuye",
      "C) Permanece constante"
    ],
    "feedback": "Según López Dumrauf, dado que el denominador en $f = \\frac{j}{1 + j \\cdot n}$ aumenta con $n$, la tasa de descuento equivalente debe ser menor para mantener la misma equivalencia sobre un valor nominal constante.\n\n**Explicación matemática**\n\nPartiendo de la relación de equivalencia en el régimen simple:\n\n$$j - f = j \\cdot f \\cdot n$$\n\nSi queremos ver qué le pasa a la tasa de descuento ($f$), lo ideal es despejarla en función de la tasa de interés ($j$) y del tiempo ($n$):\n     1. Pasamos los términos con $f$ al mismo lado de la ecuación:\n$$j = f + j \\cdot f \\cdot n$$\n     2. Sacamos factor común $f$:\n$$j = f \\cdot (1 + j \\cdot n)$$\n     3. Despejamos $f$:\n$$f = \\frac{j}{1 + j \\cdot n}$$\n\nAnálisis de la situación\nSi miramos la fórmula final y asumimos que la tasa de interés ($j$) se mantiene constante:\n     Al aumentar el plazo ($n$), el denominador $(1 + j \\cdot n)$ se hace cada vez más grande.\n     Como el numerador ($j$) es un valor fijo, dividirlo por un número cada vez mayor hace que el resultado final de la fracción sea más chico.\n\nPor lo tanto, si el plazo de la operación aumenta, la tasa de descuento ($f$) equivalente disminuye.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "Matemáticamente, en una relación de equivalencia bajo régimen simple, siempre se cumple que",
    "options": [
      "A) $f > j$",
      "B) $j = f$",
      "C) $j > f$"
    ],
    "feedback": "La tasa vencida ($j$) es siempre mayor que la adelantada ($f$) porque se aplica sobre el capital disponible hoy (valor efectivo), que es una base de cálculo menor que el valor nominal.\n\n**Explicación matemática**\n\nEn el contexto del cálculo financiero bajo el **régimen simple** (interés simple y descuento comercial), las variables representan:\n     - $j$: Tasa nominal de interés.\n     - $f$: Tasa nominal de descuento.\n\nPara que exista una **relación de equivalencia** entre una tasa de interés y una tasa de descuento aplicadas a un mismo período de tiempo $n$, el valor actual obtenido mediante el descuento debe ser igual al capital inicial que generaría ese mismo valor final mediante el interés.\n\nLa ecuación fundamental de equivalencia para un período de tiempo $n$ es:\n$$(1 + j \\cdot n)(1 - f \\cdot n) = 1$$\n\nSi desarrollamos algebraicamente este producto:\n\n$$1 - f \\cdot n + j \\cdot n - j \\cdot f \\cdot n^2 = 1$$\n\nRestamos $1$ en ambos lados y agrupamos los términos con $n$:\n\n$$(j - f) \\cdot n = j \\cdot f \\cdot n^2$$\n\nDividiendo ambos lados por $n$ (ya que el tiempo $n > 0$):\n\n$$j - f = j \\cdot f \\cdot n$$\n\nDado que las tasas nominales ($j$ y $f$) y el tiempo ($n$) son siempre valores positivos, el producto $j \\cdot f \\cdot n$ será mayor que cero ($> 0$). Por lo tanto:\n\n$$j - f > 0 \\implies j > f$$\n\nEsto demuestra que, bajo el régimen simple, la tasa nominal de interés ($j$) **siempre debe ser mayor** que la tasa nominal de descuento ($f$) para que ambas operaciones sean financieramente equivalentes.",
    "correctIndex": 2
  }
],
  "Gráficos": []
};

export default data;
