// Archivo autogenerado a partir de documentos Word mediante parse_unit_u02_2_2_1.py
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto02-2-1",
  "title": "Descuento racional compuesto: Definición, características y deducción de fórmulas correspondientes a las distintas formas de actualización.",
  "Desarrollo": [
  {
    "type": "text",
    "content": `**Definición y Características**
El **Descuento Racional Compuesto** ($D_3$) se define como el interés compuesto calculado sobre la suma efectivamente recibida (Valor Actual) trabajando con una tasa periódica efectiva de interés $i$.

A diferencia del régimen simple, en este sistema la actualización implica que la detracción de intereses se realiza sobre el valor capital disponible en cada subperíodo, lo que conlleva una disminución de la base de cálculo a medida que nos alejamos del vencimiento.

Por lo tanto, toda vez que se quiera calcular el costo efectivo en una operación de descuento, deberá plantearse una equivalencia entre un hecho real y un hecho supuesto, a fin de determinar la tasa efectiva de interés $i$ implícita en la operación. 

El hecho real, será que un nominal $N$ se descuenta por $n$ períodos en el régimen que se pacte, en tanto que...
... el hecho supuesto, siempre será que ese mismo nominal $N$ se descuenta por los mismos $n$ períodos...
... pero ahora en régimen racional compuesto con actualización periódica, a la tasa periódica efectiva de interés $i$, que será la incógnita a dilucidar.`
  },
  {
    "type": "text",
    "content": `**Características principales:**
**   -   ****Sentido Retrospectivo:** Es la operación inversa a la capitalización compuesta.
**   -   ****Equivalencia:** Garantiza que si el valor efectivo ($V_3$) se coloca a interés compuesto por el tiempo de antelación ($n$), se obtiene el valor nominal ($N$).
**   -   ****Comportamiento:** El descuento periódico es variable y decreciente a medida que el valor se actualiza hacia el momento cero.`
  },
  {
    "type": "text",
    "content": `**Deducción de Fórmulas**

**1. Basada en la Condición de Racionalidad:** Partimos de la identidad fundamental: $$V_3 \\cdot (1 + i)^n = N$$

**2. Función Valor Actual ($V_3$):** Despejando el valor actual en función del nominal: $$V_3 = \\frac{N}{(1 + i)^n}$$ $$V_3 = N \\cdot (1 + i)^{-n}$$ 

**3. Función Descuento Total ($D_3$):** Por definición, el descuento es la diferencia entre el valor futuro y el presente: $$D_3 = N - V_3$$

En función del Valor Nominal (Sustituyendo $V_3$): $$D_3 = N - V_3$$ $$D_3 = N - N \\cdot (1 + i)^{-n}$$ $$D_3 = N \\cdot [1 - (1 + i)^{-n}]$$

También se puede expresar en función del Valor Efectivo (sustituyendo $N$): $$D_3 = N - V_3$$ $$D_3 = V_3 \\cdot (1 + i)^n - V_3$$ $$D_3 = V_3 \\cdot [(1 + i)^n - 1]$$`
  },
  {
    "type": "text",
    "content": `**Actualización con Tasa Proporcional y Equivalente**

Dependiendo de cómo se pacte la tasa y la frecuencia de actualización ($m$), se presentan las siguientes modalidades:

   **A. Enfoque de Proporcionalidad (Tasa $j$ constante):** Se utiliza una tasa periódica nominal $j$ y se divide por la frecuencia $m$: $$V'_3 = N \\cdot (1 + \\frac{j}{m})^{-n \\cdot m}$$

   **B. Enfoque de Equivalencia (Tasa $i$ constante):** Se busca la tasa subperiódica $i_m$ que mantenga inalterable el valor efectivo:
Asi, siendo: $$i_m = \\frac{j}{m}$$ Luego: $$V_3 = N \\cdot (1 + i(m))^{-n \\cdot m}$$

   **C. Actualización Continua:** Cuando $m$ tiende a infinito, se utiliza la tasa instantánea de interés ($\\delta$): $$\\bar{V}_3 = N \\cdot e^{-\\delta \\cdot n}$$ Siendo $\\delta = \\ln(1 + i)$.`
  },
  {
    "type": "text",
    "content": `**Modalidades de Actualización y Deducción de Fórmulas**`
  },
  {
    "type": "text",
    "content": `**A. Actualización Discontinua Periódica:** Es la modalidad base donde la tasa de interés $i$ coincide con el período de actualización.
Partiendo de la condición de racionalidad: $$V_3 \\cdot (1 + i)^n = N$$

**    - ****Función Valor Actual ($V_3$):** Despejando el valor actual: $$V_3 = N \\cdot (1 + i)^{-n} = \\frac{N}{(1 + i)^n}$$

**    - ****Función Descuento Total ($D_3$):** Por definición, el descuento es la diferencia entre el valor futuro y el presente: $$D_3 = N - V_3$$ Sustituyendo $V_3$ por su equivalente en función de $N$: $$D_3 = N - N \\cdot (1 + i)^{-n}$$ $$D_3 = N \\cdot [1 - (1 + i)^{-n}]$$

También puede expresarse en función del valor efectivo (análoga a la fórmula de interés compuesto): $$D_3 = V_3 \\cdot [(1 + i)^n - 1]$$`
  },
  {
    "type": "text",
    "content": `**B. Actualización Discontinua ****Subperiódica****:** Se presenta cuando se actualiza con una frecuencia $m$ superior a la unidad por período.

**    a) ****Con Tasa Proporcional ($j/m$):** Se utiliza una tasa nominal $j$ y se divide por la frecuencia $m$: $$V'_3 = N \\cdot (1 + \\frac{j}{m})^{-n \\cdot m}$$

**    b) ****Con Tasa Equivalente ($i(m)$):** Se busca mantener constante la tasa periódica efectiva $i$:
Siendo: $$i_m = \\frac{j}{m}$$ Luego: $$V_3 = N \\cdot (1 + i(m))^{-n \\cdot m}$$`
  },
  {
    "type": "text",
    "content": `**C. Actualización Continua:** Cuando la frecuencia de actualización tiende al infinito ($m \\to \\infty$):

**    a) **Con tasa nominal $j$: $\\bar{V}_3 = N \\cdot e^{-j \\cdot n}$

**    b) **Con tasa equivalente (instantánea): $V_3 = N \\cdot e^{-\\delta \\cdot n}$`
  },
  {
    "type": "interactive_graphic",
    "title": "Simulador de Descuento Racional Compuesto",
    "src": "/simuladores/u02_pto02_2_1_descuento_racional_compuesto.html",
    "displayMode": "inline",
    "height": "650px"
  }
],
  "Glosario": [
  {
    "type": "text",
    "content": `**Descuento Racional Compuesto**: Interés compuesto calculado sobre el valor efectivo percibido, permitiendo recomponer el valor nominal al vencimiento.`
  },
  {
    "type": "text",
    "content": `**Valor Nominal ($N$)**: Capital disponible o exigible en un momento futuro determinado.`
  },
  {
    "type": "text",
    "content": `**Valor Actual o Efectivo ($V$)**: Capital equivalente al valor nominal en un momento anterior a su vencimiento.`
  },
  {
    "type": "text",
    "content": `**Tasa Periódica Efectiva de Interés ($i$)**: Tasa vencida que mide el rendimiento o costo por unidad de capital en un período.`
  },
  {
    "type": "text",
    "content": `**Condición de Racionalidad**: Requisito de que el valor actual, capitalizado al vencimiento, reproduzca exactamente el valor nominal ($V \\cdot (1+i)^n = N$).`
  },
  {
    "type": "text",
    "content": `**Actualización**: Proceso financiero de desplazar un capital hacia el pasado en el eje del tiempo.`
  },
  {
    "type": "text",
    "content": `**Tasa Subperiódica Proporcional**: Tasa obtenida al dividir la tasa nominal por la frecuencia de capitalización ($j/m$).`
  },
  {
    "type": "text",
    "content": `**Tasa Subperiódica Equivalente**: Tasa que, aplicada en condiciones de actualización subperiódica, produce el mismo valor actual que la tasa efectiva periódica.`
  },
  {
    "type": "text",
    "content": `**Factor de Actualización Singular ($v$)**: Representa el valor actual de una unidad monetaria a vencer en un período ($v = (1+i)^{-1}$).`
  },
  {
    "type": "text",
    "content": `**Capitalización Continua**: Régimen donde los intereses se reinvierten en periodos infinitesimales ($m \\to \\infty$).`
  }
],
  "Casos Prácticos": [
  {
    "type": "case",
    "title": "Caso 1: Valuación de Documentos a Largo Plazo",
    "enunciado": `Una empresa posee un certificado de deuda por \\$10.000 que vence en 18 meses. Si la tasa de interés de mercado es del \\$4%\\$ mensual efectiva, se desea calcular cuánto percibiría hoy bajo el régimen racional compuesto.`,
    "planteo_solucion": `**Datos:** $N = 10.000$; $i = 0,04$; $n = 18$ meses.
**Resolución:** $$V_3 = 10.000 \\cdot (1 + 0,04)^{-18}$$ $$V_3 = 10.000 \\cdot 0,493628 \\Rightarrow V_3 = $4.936,28$$
**Descuento:** $D_3 = 10.000 - 4.936,28 = $5.063,72\\$.`,
    "highlights": ``,
    "content": ``
  },
  {
    "type": "case",
    "title": "Caso 2: Contexto Argentino (Tasa Proporcional Subperiódica)",
    "enunciado": `Una entidad financiera descuenta un pagaré de \\$200.000 que vence en 6 meses. Se pacta una TNA (tasa nominal anual \\$j\\$) del \\$48%\\$ con actualización mensual. Calcule el valor efectivo.`,
    "planteo_solucion": `**Datos:** $N = 200.000$; $j = 0,48$; $m = 12$; $n = 0,5$ años (o 6 meses).
**Tasa ****subperiódica**** proporcional:** $j/m = 0,48 / 12 = 0,04$ mensual.
**Resolución:** $$V'_3 = 200.000 \\cdot (1 + 0,04)^{-6}$$ $$V'_3 = 200.000 \\cdot 0,790314 \\Rightarrow V'_3 = $158.062,80$$ El costo financiero efectivo de la operación es el $4%$ mensual.`,
    "highlights": ``,
    "content": ``
  },
  {
    "type": "case",
    "title": "Caso 3: Contexto del Mercado Financiero Argentino (Flujos de Inversión)",
    "enunciado": `En el mercado argentino actual, un inversor analiza comprar un título que promete un pago único de \\$50.000 dentro de 2 años. Debido al riesgo y la inflación, exige una tasa de rentabilidad (TNA con capitalización mensual) del $60%$. Calcule el valor actual utilizando una tasa proporcional.`,
    "planteo_solucion": `**Datos:** $N = 50.000$; $n = 2$ años; $m = 12$; $j = 0,60$.
**Tasa ****subperiódica**** proporcional:** $j/m = 0,60 / 12 = 0,05$ mensual.
**Resolución:** $$V'_3 = 50.000 \\cdot (1 + 0,05)^{-(2 \\cdot 12)}$$ $$V'_3 = 50.000 \\cdot (1,05)^{-24}$$ $$V'_3 = 50.000 \\cdot 0,31006 \\Rightarrow V'_3 = $15.503,42$$ El inversor debería pagar hoy \\$15.503,42 para obtener su rendimiento deseado.`,
    "highlights": ``,
    "content": ``
  }
],
  "Autoevaluación": [
  {
    "type": "quiz",
    "question": `¿Cuál es la principal diferencia entre el Descuento Racional Simple ($D_2$) y el Compuesto ($D_3$)?`,
    "options": [
      "A) El $D_2$ se calcula sobre el nominal y el $D_3$ sobre el valor actual",
      "B) El $D_3$ aplica la capitalización de intereses sobre el valor actual de cada periodo, mientras que el $D_2$ lo hace de forma lineal",
      "C) No hay diferencia matemática, solo de nomenclatura"
    ],
    "feedback": `Según Fransolini, el descuento racional compuesto aplica el interés compuesto sobre la suma efectivamente recibida, lo que genera una curva de actualización no lineal.`,
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": `Si la tasa de interés ($i$) aumenta, ¿qué sucede con el Valor Actual ($V_3$)?`,
    "options": [
      "A) Aumenta proporcionalmente",
      "B) Disminuye, siguiendo una función decreciente y cóncava",
      "C) Permanece igual"
    ],
    "feedback": `López Dumrauf demuestra mediante la primera derivada que la función es decreciente respecto a la tasa de interés ($\\partial V/\\partial i < 0$).`,
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": `Bajo el enfoque de equivalencia, si aumentamos la frecuencia de actualización ($m$) manteniendo la tasa efectiva ($i$) constante, ¿qué sucede con el Valor Actual ($V_3$)?`,
    "options": [
      "A) Aumenta",
      "B) Disminuye",
      "C) Se mantiene inalterable"
    ],
    "feedback": `Por definición de tasas equivalentes, si la tasa efectiva es constante, el valor actual debe permanecer inalterable sin importar cuántas veces se actualice en el periodo.`,
    "correctIndex": 2
  }
],
  "Gráficos": []
};

export default data;
