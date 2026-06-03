// Archivo autogenerado a partir de documentos Word
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto02-1-1",
  "title": "Descuento Comercial Simple (DCS)",
  "Desarrollo": [
    {
        "type": "text",
        "content": "**Descuento Comercial Simple**"
    },
    {
        "type": "text",
        "content": "**Definición y Características**\nEl descuento comercial simple (o bancario) se define como el interés simple calculado sobre el **Valor Nominal** del documento, aplicando una **tasa adelantada** ($f$). En este régimen, el descuento es directamente proporcional al capital futuro, a la tasa aplicada y al tiempo de la operación.\n\nSus características principales son:\n- El descuento periódico es **constante** ($N \\cdot f$), siempre que la tasa no varíe.\n- Se lo considera **irracional o irreversible**, ya que no existe equivalencia entre la operación de actualización y la de capitalización simple a la misma tasa.\n- La tasa efectiva de descuento de cada período es **variable y creciente**, dado que el descuento absoluto se mantiene pero el valor sobre el que impacta (Valor Actual) es cada vez menor."
    },
    {
        "type": "text",
        "content": "**Deducción de Fórmulas**\nPartiendo de un razonamiento de proporcionalidad simple:\n    1) Si para $1$ peso de nominal, en 1 período, el descuento es $f$.\n    2) Para $N$ pesos de nominal, en 1 período, el descuento es $N \\cdot f$.\n    3) Para $N$ pesos de nominal, en $n$ períodos, el descuento total ($D_1$) es: $$D_1 = N \\cdot f \\cdot n$$\n\nEl **Valor Actual ($V_1$)** se obtiene restando el descuento al valor nominal: $$V_1 = N - D_1$$ $$V_1 = N - (N \\cdot f \\cdot n)$$ Sacando factor común $N$: $$V_1 = N \\cdot (1 - f \\cdot n)$$"
    },
    {
        "type": "text",
        "content": "**Límite de Aplicabilidad**\nPara que la operación tenga sentido financiero, el valor efectivo debe ser estrictamente positivo ($V_1 > 0$). Esto impone una restricción sobre el plazo ($n$) y la tasa ($f$): $$V_1 = N \\cdot (1 - f \\cdot n) > 0$$ Si $N$ = 1 $$1 \\cdot (1 - f \\cdot n) > 0$$ $$1 - f \\cdot n > 0 \\Rightarrow 1 > f \\cdot n$$ De aquí derivamos las restricciones:\n- **Para el tiempo:** $n < \\frac{1}{f}$\n- **Para la tasa:** $f < \\frac{1}{n}$"
    },
    {
        "type": "interactive_graphic",
        "title": "Dinámica del Valor Actual y Límite de Aplicabilidad",
        "src": "/simuladores/u02-pto02-1-1-dinamica-valor-actual.html",
        "displayMode": "inline",
        "height": "650px"
    },
    {
        "type": "interactive_graphic",
        "title": "Irracionalidad del Descuento Comercial Simple",
        "src": "/simuladores/u02-pto02-1-1-irracionalidad-descuento.html",
        "displayMode": "inline",
        "height": "650px"
    }
],
  "Glosario": [
    {
        "type": "text",
        "content": "**Descuento Comercial Simple (DCS)**: Régimen financiero donde el descuento se calcula aplicando la tasa de descuento adelantada sobre el Valor Nominal del documento durante el tiempo restante hasta su vencimiento."
    },
    {
        "type": "text",
        "content": "**Valor Nominal ($N$)**: El valor escrito en el documento de crédito que se hará efectivo al vencimiento de la operación."
    },
    {
        "type": "text",
        "content": "**Valor Actual ($V$)**: El valor neto de un capital a una fecha anterior a la de su vencimiento; representa el dinero efectivamente recibido después de deducir el descuento."
    },
    {
        "type": "text",
        "content": "**Límite de Aplicabilidad**: Condición matemática ($n < 1/f$) obligatoria en el Descuento Comercial Simple para evitar que el Valor Actual resulte nulo o negativo, lo cual carece de sentido económico."
    },
    {
        "type": "text",
        "content": "**Reversibilidad / Racionalidad**: Propiedad según la cual colocar el Valor Actual a la misma tasa y por el mismo tiempo permite reconstruir exactamente el Valor Nominal original. El DCS no cumple esta propiedad."
    }
],
  "Casos Prácticos": [
    {
        "type": "case",
        "title": "Caso 1: Cálculo Estándar",
        "enunciado": "Una empresa posee un documento de \\$50.000 que vence en 4 meses. Decide descontarlo en una entidad financiera que aplica una tasa de descuento comercial simple del 4% mensual.\n\n* **Descuento comercial calculado:** $D_1 = 50.000 \\cdot 0,04 \\cdot 4 = \\$8.000\n* **Valor actual neto recibido:** $V_1 = 50.000 \\cdot (1 - 0,04 \\cdot 4) = \\$42.000",
        "planteo_solucion": "",
        "highlights": "DCS estándar: Descuento sobre el valor nominal.",
        "content": "Análisis: Nótese que el descuento de cada mes es constante (\\$2.000 mensuales) debido a que la base de cálculo es siempre el Valor Nominal (\\$50.000) y no varía con el transcurso del tiempo."
    },
    {
        "type": "case",
        "title": "Caso 2: Mercado Financiero Argentino (Descuento de Cheques)",
        "enunciado": "Una PyME argentina necesita liquidez inmediata y acude a una \"Sociedad de Garantía Recíproca\" (SGR) para descontar un cheque de pago diferido por \\$1.000.000 con vencimiento en 60 días. La entidad aplica una Tasa Nominal Anual (TNA) de descuento del 60%. Considerando un año comercial de 360 días:\n\n* **Adecuación de la tasa:** $f = \\frac{0,60}{360} \\cdot 60 = 0,10$ (tasa adelantada efectiva para 60 días)\n* **Cálculo del Descuento:** $D_1 = 1.000.000 \\cdot 0,10 = \\$100.000\n* **Valor recibido por la PyME:** $V_1 = 1.000.000 - 100.000 = \\$900.000",
        "planteo_solucion": "",
        "highlights": "Aplicación de TNA de descuento en plazos cortos.",
        "content": "Análisis: Verificación del límite de aplicabilidad de la operación:\n$n (60 \\text{ días}) < \\frac{1}{f_{\\text{diaria}}} \\Rightarrow 60 < \\frac{1}{0,60/360} \\Rightarrow 60 < 600$.\nComo el plazo de anticipación (60 días) es menor al límite teórico de aplicabilidad (600 días), la operación es financieramente viable y aplicable."
    }
],
  "Autoevaluación": [
    {
        "type": "quiz",
        "question": "Si aumentamos el tiempo de antelación en una operación de descuento comercial simple, ¿qué sucede con el descuento periódico?",
        "options": [
            "A) Aumenta proporcionalmente.",
            "B) Disminuye porque el Valor Actual es menor.",
            "C) Permanece constante."
        ],
        "feedback": "Correcto (C). Según Fransolini, como el descuento siempre se calcula sobre el Valor Nominal ($N$), el cual es constante, el descuento de cada período ($N \\cdot f$) no varía durante la operación.",
        "correctIndex": 2
    },
    {
        "type": "quiz",
        "question": "¿Cuál es la condición necesaria para que una operación de descuento comercial simple sea aplicable?",
        "options": [
            "A) Que la tasa sea mayor al tiempo.",
            "B) Que el tiempo de anticipación sea menor a la inversa de la tasa ($n < 1/f$).",
            "C) Que el Valor Nominal sea igual al Valor Actual."
        ],
        "feedback": "Correcto (B). Si el tiempo es igual o mayor a $1/f$, el Valor Actual resultante sería cero o negativo, lo cual constituye un absurdo financiero.",
        "correctIndex": 1
    },
    {
        "type": "quiz",
        "question": "Se dice que el descuento comercial simple es \"irracional\" porque:",
        "options": [
            "A) La tasa es demasiado elevada para el mercado.",
            "B) Al colocar el Valor Actual a interés simple por el mismo tiempo y tasa, se obtiene un monto menor al Nominal original.",
            "C) El tiempo de la operación suele ser muy corto."
        ],
        "feedback": "Correcto (B). Según la bibliografía obligatoria (Fransolini y González), este régimen no cumple con la condición de reversibilidad o racionalidad, ya que el capital final obtenido no recompone el nominal inicial.",
        "correctIndex": 1
    }
],
  "Gráficos": []
};

export default data;
