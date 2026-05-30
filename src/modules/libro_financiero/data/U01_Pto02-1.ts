// Archivo autogenerado a partir de documentos Word
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U01_Pto02-1",
  "title": "Régimen de Interés Simple",
  "Desarrollo": [
    {
      "type": "text",
      "content": "En el régimen de interés simple, los intereses se liquidan de una sola vez al vencimiento y recién en ese momento se incorporan al capital productivo. Como se calculan siempre sobre el capital inicial ($C$), el interés de cada período resulta constante."
    },
    {
      "type": "text",
      "content": "La fórmula del Monto ($M$) a interés simple es:\n\n$$M = C \\cdot (1 + j \\cdot n)$$\n\nDonde $j$ representa la tasa periódica nominal."
    },
    {
      "type": "text",
      "content": "### Relación Analítica de Fransolini (Comercial vs. Exacto)\n\nPara comprender la diferencia entre el interés comercial (base 360 días) y el calendario o exacto (base 365 días), Fransolini realiza la siguiente deducción:\n\n$$I_{Comercial} = \\frac{C \\cdot j \\cdot n}{360} \\quad ; \\quad I_{Calendario} = \\frac{C \\cdot j \\cdot n}{365}$$\n\nDividiendo ambas expresiones:\n\n$$\\frac{I_{Comercial}}{I_{Calendario}} = \\frac{\\frac{C \\cdot j \\cdot n}{360}}{\\frac{C \\cdot j \\cdot n}{365}} = \\frac{365}{360} = \\frac{73}{72} \\approx 1,01388...$$\n\nEsta deducción demuestra que el interés comercial es siempre un $1,38\\%$ más elevado que el calendario para iguales condiciones de capital, tasa y tiempo."
    },
    {
      "type": "text",
      "content": "### Tasa Periódica Efectiva en Interés Simple\n\nSi los intereses no se retiran periódicamente, el capital productivo real aumenta. Fransolini demuestra que la tasa periódica efectiva ($i_k$) resulta ser variable y decreciente, ya que el interés constante se distribuye sobre una base de capital acumulado cada vez mayor. La relación para un período $k$ es:\n\n$$i_k = \\frac{j}{1 + j \\cdot (k - 1)}$$\n\nConsecuentemente: $j = i_1 > i_2 > i_3 > \\dots > i_n$."
    }
  ],
  "Glosario": [
    {
      "type": "text",
      "content": "Interés Simple: Régimen financiero donde los intereses devengados no se acumulan al capital para generar nuevos intereses, calculándose siempre sobre la base inicial."
    },
    {
      "type": "text",
      "content": "Interés Comercial: Cálculo de intereses basado en el año comercial de 360 días, resultando ligeramente superior al interés exacto."
    },
    {
      "type": "text",
      "content": "Interés Exacto o Calendario: Cálculo de intereses basado en el año civil o calendario de 365 días (o 366 si es bisiesto)."
    },
    {
      "type": "text",
      "content": "Tasa Periódica Efectiva: Tasa de rendimiento real obtenida en un período determinado cuando se evalúa el rendimiento sobre el capital acumulado al inicio de dicho subperíodo."
    }
  ],
  "Casos Prácticos": [
    {
      "type": "case",
      "content": "### Caso 1: Capitalización Simple a Tasas Variables (Caso 1.3 Fransolini)\n\nSe coloca un capital de **\\$10.000** durante **180 días**.\n\n* **Primeros 30 días:** $j_1 = 2\\%$ ($0,02$) por 30 días.\n* **Siguientes 60 días:** $j_2 = 2,5\\%$ ($0,025$) por 30 días.\n* **Últimos 90 días:** $j_3 = 15\\%$ ($0,15$) por 180 días.",
      "highlights": "Capital inicial $C = 10.000$, Plazo total $180$ días."
    },
    {
      "type": "case",
      "content": "**Resolución:**\n\n1. Homogeneización de $n_k$ respecto a sus tasas:\n   * $n_1 = 1$ (un período de 30 días)\n   * $n_2 = 60 / 30 = 2$ (dos períodos de 30 días)\n   * $n_3 = 90 / 180 = 0,5$ (medio período de 180 días)\n\n2. Aplicación de la fórmula general de sumatoria de tasas:\n   $$M = 10.000 \\cdot (1 + 0,02 \\cdot 1 + 0,025 \\cdot 2 + 0,15 \\cdot 0,5)$$\n   $$M = 10.000 \\cdot (1 + 0,02 + 0,05 + 0,075)$$\n   $$M = 10.000 \\cdot 1,145$$\n\n**Resultado:** $M = \\mathbf{\\\\$11.450}$",
      "highlights": "Monto Final obtenido: \\$11.450"
    }
  ],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": "¿Cuál es la relación numérica exacta entre el interés comercial y el calendario según la deducción de Fransolini?",
      "options": [
        "A) $360 / 365$",
        "B) $73 / 72$",
        "C) $1 / 360$"
      ],
      "correctIndex": 1,
      "feedback": "¡Correcto! Como demuestra Fransolini, al dividir las fórmulas de interés comercial y calendario, la relación se invierte a $365/360$, lo que simplificado resulta en $73/72$, indicando un interés comercial $1,38\\%$ superior."
    },
    {
      "type": "quiz",
      "question": "En el régimen de interés simple, si los intereses devengados NO se retiran periódicamente, ¿cómo se comporta la tasa periódica efectiva?",
      "options": [
        "A) Permanece constante e igual a la tasa nominal periódica.",
        "B) Es variable y decreciente en cada período subsiguiente.",
        "C) Es variable y creciente a medida que transcurre el tiempo."
      ],
      "correctIndex": 1,
      "feedback": "¡Correcto! Dado que el interés liquidado en cada período es constante pero la base de capital acumulado es cada vez mayor, la relación del interés obtenido sobre la base acumulada ($i_k$) disminuye en cada subperíodo."
    }
  ],
  "Gráficos": []
};

export default data;
