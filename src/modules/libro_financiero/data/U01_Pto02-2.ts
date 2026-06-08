// Archivo autogenerado a partir de documentos Word
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U01_Pto02-2",
  "title": "Régimen de Interés Compuesto",
  "Desarrollo": [
    {
      "type": "text",
      "content": `En el régimen de interés compuesto, los intereses se liquidan al final de cada período y se incorporan al capital, siendo generadores de nuevos intereses. El capital crece en progresión geométrica.`
    },
    {
      "type": "text",
      "content": `La fórmula del Monto ($M$) es:

$$M = C \\cdot (1 + i)^n$$

Donde $i$ es la tasa periódica efectiva.`
    },
    {
      "type": "text",
      "content": `### Frecuencia de Capitalización ($m$)

Representa la cantidad de veces que los intereses se capitalizan dentro del período de la tasa nominal ($j$).

* **Enfoque de Proporcionalidad:** Se mantiene constante $j$ y se varía $m$. A medida que $m$ aumenta, el monto final crece asintóticamente.
* **Enfoque de Equivalencia:** Se busca que el monto sea constante ($i$ constante) y se ajusta la tasa nominal $j_{(m)}$ según varíe $m$.`
    },
    {
      "type": "text",
      "content": `### Capitalización Continua

Cuando la frecuencia de capitalización $m$ tiende a infinito ($m \\to \\infty$), se pasa al campo continuo. Fransolini deduce el Monto Máximo mediante el límite del número $e$:

$$\\bar{M} = C \\cdot e^{j \\cdot n}$$

La tasa instantánea de interés (o fuerza del interés $\\delta$), que representa la fuerza del interés en instantes infinitesimales, se relaciona con la tasa efectiva periódica de la siguiente forma:

$$\\delta = \\ln(1 + i)$$

Donde $\\delta$ es la menor de todas las tasas periódicas de interés bajo el enfoque de equivalencia.`
    },
    {
      "type": "interactive_graphic",
      "src": "simple-vs-compuesto",
      "title": "Comparación Funcional: Capitalización Simple vs. Compuesta",
      "displayMode": "inline",
      "height": 450
    }
  ],
  "Glosario": [
    {
      "type": "text",
      "content": `Interés Compuesto: Régimen financiero donde los intereses liquidados periódicamente se acumulan al capital inicial para producir nuevos rendimientos.`
    },
    {
      "type": "text",
      "content": `Frecuencia de Capitalización ($m$): Cantidad de veces que los intereses se liquidan y capitalizan en la unidad de tiempo elegida.`
    },
    {
      "type": "text",
      "content": `Capitalización Continua: Proceso de acumulación donde los intereses se liquidan y capitalizan de manera incesante (frecuencia infinita).`
    },
    {
      "type": "text",
      "content": `Fuerza del Interés ($\\delta$): Tasa instantánea o infinitesimal de interés que rige el crecimiento continuo de un capital.`
    }
  ],
  "Casos Prácticos": [
    {
      "type": "case",
      "content": `### Caso 2: Inversión en Régimen Compuesto con Frecuencia Variable

Un inversor coloca **\\$50.000** a una TNA ($j$) del **24%** durante **1 año** ($n=1$).`,
      "highlights": `Capital colocado: \\$50.000. TNA: 24%.`
    },
    {
      "type": "case",
      "content": `**Resolución bajo diferentes frecuencias de capitalización:**

1. **Capitalización Semestral ($m=2$):**
   $$M = 50.000 \\cdot \\left(1 + \\frac{0,24}{2}\\right)^{1 \\cdot 2} = \\mathbf{\\$62.720}$$

2. **Capitalización Mensual ($m=12$):**
   $$M = 50.000 \\cdot \\left(1 + \\frac{0,24}{12}\\right)^{1 \\cdot 12} = \\mathbf{\\$63.412,09}$$

3. **Capitalización Continua ($m \\to \\infty$):**
   $$M = 50.000 \\cdot e^{0,24 \\cdot 1} = \\mathbf{\\$63.562,46}$$`,
      "highlights": `Se aprecia cómo el monto crece asintóticamente a medida que aumenta la frecuencia de capitalización.`
    }
  ],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `¿Qué ocurre con el monto final bajo el Enfoque de Proporcionalidad si la frecuencia de capitalización tiende a infinito?`,
      "options": [
        "A) Se alcanza el Monto Máximo (Capitalización Continua).",
        "B) El monto final tiende a cero por la licuación de las tasas.",
        "C) El monto final permanece igual que para el régimen de capitalización anual ($m=1$)."
      ],
      "correctIndex": 0,
      "feedback": `¡Correcto! Al aumentar indefinidamente la frecuencia de reinversión ($m \\to \\infty$), el monto final crece asintóticamente hasta el límite matemático regido por la función exponencial de base $e$, conocido como capitalización continua.`
    }
  ],
  "Gráficos": [
    {
      "type": "interactive_graphic",
      "src": "simple-vs-compuesto",
      "title": "Comparación Funcional: Capitalización Simple vs. Compuesta",
      "displayMode": "inline",
      "height": 450
    }
  ]
};

export default data;
