// Archivo autogenerado a partir de documentos Word mediante parse_unit_u02_2_2_2.py
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto02-2-2",
  "title": "Descuento comercial compuesto: Definición, características, modalidades de actualización. Deducción de la fórmula del valor efectivo con actualización discontinua periódica (para tasa constante). Tasa periódica \"efectiva\" de descuento. Tasa efectiva de descuento en caso de actualización periódica. Fórmula general del Valor Efectivo en Régimen de Descuento Comercial Compuesto con actualización discontinua periódica (caso de tasas variables en cada período).",
  "Desarrollo": [
  {
    "type": "text",
    "content": "<h3>Descuento Comercial Compuesto ($D_4$)</h3>"
  },
  {
    "type": "text",
    "content": "<p><strong>Definición</strong>\n\nEl <strong>Descuento Comercial Compuesto</strong> se define como el régimen de actualización donde el descuento de cada período se calcula aplicando una tasa periódica de descuento sobre el valor nominal actualizado al final de dicho período. A diferencia del régimen comercial simple, aquí existe un \"descuento sobre el descuento\", lo que genera una base de cálculo decreciente a medida que el análisis retrocede desde el vencimiento hacia el presente.</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Características fundamentales:</strong>\n\n<strong>    - Sentido Retrospectivo:</strong> La operación se analiza desde el momento de vencimiento ($n$) hacia el momento de valoración (0).\n<strong>    - Descuento Periódico Variable:</strong> Dado que la tasa se aplica sobre un capital que disminuye en cada paso retrospectivo, el importe absoluto del descuento es variable y decreciente en progresión geométrica.\n<strong>    - Irracionalidad Financiera:</strong> Se considera un régimen \"no racional\" o irreversible, ya que si el valor efectivo obtenido se capitaliza a la misma tasa de interés por el mismo plazo, no se recompone el valor nominal original.\n<strong>    - Límite de Aplicabilidad:</strong> A diferencia del régimen simple, el valor efectivo en el descuento compuesto nunca llega a ser nulo ni negativo para valores finitos del tiempo, ya que la función es asintótica al eje de las abscisas.</p>"
  },
  {
    "type": "interactive_graphic",
    "title": "Simulador de la Marcha Retrospectiva del Capital",
    "src": "/simuladores/u02_pto02_2_marcha_retrospectiva_capital.html",
    "displayMode": "inline",
    "height": "650px"
  },
  {
    "type": "text",
    "content": "<p><strong>Modalidades de Actualización</strong>\nDependiendo de la frecuencia con la que se detrae el interés del capital, se distinguen tres modalidades principales:\n<strong>    1) Actualización Discontinua Periódica ($m=1$):</strong> El período de la tasa coincide con el intervalo de actualización.\n<strong>    2) Actualización Discontinua Subperiódica ($1 < m < \\infty$):</strong> Se realizan múltiples actualizaciones dentro del período de la tasa utilizando una tasa subperiódica proporcional o equivalente.\n<strong>    3) Actualización Continua ($m \\to \\infty$):</strong> La detracción del interés se produce de forma instantánea, momento a momento.</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Variaciones de la Función Capital (Sentido Retrospectivo)</strong>\n\nPara un aprendizaje más didáctico, analizaremos cómo se comporta el capital cuando nos desplazamos del futuro hacia el presente:\n\n<strong>Variación Absoluta (Descuento)</strong>\n\nRepresenta la quita, merma o reducción de valor que experimenta una disponibilidad futura si se pretende lograr su disponibilidad inmediata. Se simboliza como $D$ y es la diferencia entre el Valor Nominal ($N$) y el Valor Efectivo ($V$): $$D = N - V$$\n\n<strong>Variación Relativa (Tasa Efectiva de Descuento)</strong>\n\nEsta medida es fundamental porque relaciona el descuento absoluto con el capital que lo generó (el Valor Nominal). Indica cuánto disminuyó cada unidad monetaria descontada durante el tiempo de la operación. Se simboliza como $d$: $$d = \\frac{D}{N}$$\n\n<strong>Variación Relativa Media (Tasa Nominal de Descuento)</strong>\n\nEs una medida proporcional del descuento efectivo para una unidad de tiempo. Permite obtener un \"promedio\" del descuento por cada intervalo (día, mes, año). Se simboliza como $f$: $$f = \\frac{d}{n}$$Esta tasa $f$ es la que normalmente se utiliza en la práctica comercial y bancaria como referencia anual.</p>"
  },
  {
    "type": "text",
    "content": "<h4><strong>Deducción de la Fórmula del Valor Efectivo ($V_4$)</strong></h4>"
  },
  {
    "type": "text",
    "content": "<p><strong>(1) Caso de Actualización Discontinua Periódica (Tasa Constante)</strong>\n\nConsideremos un capital con Valor Nominal $N$ que vence en $n$ períodos. Sea $f$ la tasa periódica nominal pactada. Para hallar el valor efectivo ($V_4$), realizamos la marcha retrospectiva período a período:\n<strong>    - En el período $n$ (último período antes del vencimiento):</strong> El capital al final es $N$. El descuento es $N \\cdot f$. El valor al inicio del período $n$ es: $$V_{n-1} = N - (N \\cdot f) = N \\cdot (1 - f)$$\n<strong>    - En el período $n-1$:</strong> La nueva base de cálculo es $V_{n-1}$. El descuento es $V_{n-1} \\cdot f$. El valor al inicio del período $n-1$ es: $$V_{n-2} = V_{n-1} - (V_{n-1} \\cdot f) = V_{n-1} \\cdot (1 - f)$$ Sustituyendo $V_{n-1}$: $$V_{n-2} = [N \\cdot (1 - f)] \\cdot (1 - f) = N \\cdot (1 - f)^2$$\n<strong>    - Generalización para $n$ períodos:</strong> Siguiendo la recurrencia, al llegar al momento inicial ($0$), la fórmula del valor efectivo es: $$V_4 = N \\cdot (1 - f)^n$$</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Relación entre Tasa Nominal ($f$) y Efectiva ($d$):</strong> Se demuestra que en la actualización periódica ($n=1$), si $N=1$, el descuento $D_4$ coincide con la tasa efectiva $d$. $$d = 1 - (1 - f)^1 = f$$ Por lo tanto, la fórmula definitiva se expresa habitualmente como: $$V_4 = N \\cdot (1 - d)^n$$</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>(2) Caso de Actualización Discontinua Subperiódica</strong>\n\nCuando la actualización ocurre $m$ veces por período, se utiliza la tasa subperiódica proporcional $f/m$ y el tiempo total se expresa en subperíodos ($n \\cdot m$): $$V'_4 = N \\cdot \\left(1 - \\frac{f}{m}\\right)^{n \\cdot m}$$</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>(3) Caso de Actualización Continua</strong>\n\nPartiendo de la actualización subperiódica y aplicando el límite cuando la frecuencia $m$ tiende a infinito: $$\\bar{V}4 = \\lim{m \\to \\infty} N \\cdot \\left(1 - \\frac{f}{m}\\right)^{n \\cdot m}$$ Operando matemáticamente para introducir el número $e$: $$\\bar{V}4 = N \\cdot \\left[ \\lim{m \\to \\infty} \\left( 1 + \\frac{1}{-m/f} \\right)^{-m/f} \\right]^{-f \\cdot n}$$ Resultando en la fórmula de actualización continua: $$\\bar{V}_4 = N \\cdot e^{-f \\cdot n}$$ Esta modalidad arroja el <strong>Valor Efectivo Máximo</strong> posible para una tasa nominal dada.</p>"
  },
  {
    "type": "text",
    "content": "<h4>La <strong>Tasa Periódica \"Efectiva\" de Descuento ($d$)</strong> constituye la medida fundamental de la quita o merma que sufre un capital unitario nominal por su anticipación en el tiempo bajo el régimen de interés compuesto.</h4>"
  },
  {
    "type": "text",
    "content": "<p><strong>1. Definición y Naturaleza de la Tasa Efectiva de Descuento</strong>\n\nLa tasa \"efectiva\" de descuento se define como el descuento que sufre un valor nominal de \\$1 que se descuenta por un período completo, independientemente de la modalidad o la frecuencia con la que se realice la actualización.\n\nSus características principales son:\n<strong>   a) Periodicidad:</strong> Refiere al impacto financiero en una unidad de tiempo determinada (mes, año, etc.).\n<strong>   b) Sentido:</strong> Es una tasa <strong>adelantada</strong> (se detrae del valor nominal al inicio de la operación).\n<strong>   c) Régimen:</strong> Opera exclusivamente en el <strong>régimen compuesto</strong> (Descuento Comercial Compuesto o $D_4$), donde la base de cálculo es el capital ya actualizado.\n<strong>   d) Función didáctica:</strong> Aunque permite comparar la conveniencia entre diversas fuentes de financiación, no determina el verdadero costo efectivo de una operación; para ello, se debe recurrir a la tasa efectiva de interés ($i$) implícita.</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Relación según las Modalidades de Actualización</strong>\n\nLa tasa efectiva $d$ asume diferentes expresiones matemáticas dependiendo de cómo se distribuya el descuento en el tiempo (Enfoque de Proporcionalidad):\n\n<strong>(A) Actualización Discontinua Periódica ($m=1$)</strong>\n\nEn este caso, la frecuencia de actualización coincide con el período de la tasa enunciada ($f$). Fransolini demuestra que la tasa nominal pactada es numéricamente idéntica a la tasa efectiva,. $$d = f$$\n<strong>(B) Actualización Discontinua Subperiódica ($1 < m < \\infty$)</strong>\n\nCuando se actualiza $m$ veces dentro de un período utilizando una tasa subperiódica proporcional $f/m$, el descuento total de \\$1 nominal al cabo de un período (que define a \\$d\\$) se obtiene mediante la siguiente deducción,: $$d = 1 - \\left(1 - \\frac{f}{m}\\right)^m$$\n\n(C) Actualización Continua ($m \\to \\infty$)\n\nRepresenta el caso límite donde el interés se detrae instante a instante. Bajo esta modalidad, se obtiene la Tasa Periódica Efectiva Mínima de Descuento:\n$$\\bar{d} = 1 - e^{-f}$$</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Variación de la Función Capital y Tasa Efectiva</strong>\n\nDesde un enfoque didáctico, la tasa efectiva $d$ es la expresión de la <strong>Variación Relativa</strong> de la función capital en sentido retrospectivo,. Mientras que el descuento ($D$) es la variación absoluta ($N - V$), la tasa $d$ mide cuánto disminuye cada unidad monetaria descontada en relación al capital nominal que la generó ($d = D / N$).\nEn el régimen comercial compuesto con tasas efectivas constantes, se observan dos comportamientos clave:\n    1) El descuento periódico (variación absoluta) es <strong>decreciente</strong>, ya que la tasa se aplica sobre capitales actualizados cada vez menores.\n    2) La quita por cada unidad de moneda (variación relativa o tasa $d$) resulta <strong>constante</strong> para cada período acordado.</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Interpretación Financiera Crítica</strong>\n\nEs fundamental destacar que la tasa efectiva de descuento no es una \"verdadera\" tasa de rendimiento o costo en términos de capitalización, ya que es una tasa adelantada. El Descuento Comercial (tanto simple como compuesto) es <strong>irracional o irreversible</strong>,. Esto significa que si se coloca el Valor Efectivo ($V$) obtenido a una tasa de interés ($i$) numéricamente igual a $d$, no se logra recomponer el Valor Nominal ($N$) original.</p>"
  },
  {
    "type": "text",
    "content": "<p>La <strong>Fórmula General del Valor Efectivo ($V_4$)</strong> en el régimen de <strong>Descuento Comercial Compuesto</strong> con actualización discontinua periódica se aplica cuando las tasas de descuento varían en cada uno de los períodos que dura la operación.\nA continuación, se presenta el desarrollo técnico y la deducción de este modelo matemático bajo los lineamientos de la cátedra.</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Concepto y Características</strong>\n\nEn el régimen de descuento comercial compuesto, la característica distintiva es que el descuento de cada período se calcula sobre el capital ya actualizado al final de dicho intervalo. Cuando las tasas son variables ($d_1, d_2, \\dots, d_n$), ya no es posible simplificar la expresión mediante una potencia, sino que se debe aplicar un producto de factores de actualización singulares distintos para cada período.\nEste modelo es particularmente apropiado para contextos de volatilidad financiera o cuando las condiciones contractuales estipulan ajustes en el costo del dinero a lo largo del tiempo.</p>"
  },
  {
    "type": "text",
    "content": "<p><strong>Deducción de la Fórmula mediante Marcha Retrospectiva</strong>\n\nPara deducir la fórmula, se utiliza un análisis retrospectivo que parte del <strong>Valor Nominal ($N$)</strong> ubicado en el momento del vencimiento ($n$) y retrocede período a período hasta el momento actual ($0$).\n    <strong>Paso 1: Del vencimiento ($n$) al final del período previo ($n-1$):</strong> El capital al final es $N$. Se aplica la tasa de descuento vigente para ese último tramo, $d_n$. $$V_{n-1} = N - (N \\cdot d_n) = N \\cdot (1 - d_n)$$ \n    <strong>Paso 2: Del momento ($n-1$) al momento ($n-2$):</strong> La nueva base de cálculo es $V_{n-1}$. Se aplica la tasa $d_{n-1}$: $$V_{n-2} = V_{n-1} - (V_{n-1} \\cdot d_{n-1}) = V_{n-1} \\cdot (1 - d_{n-1})$$ Sustituyendo $V_{n-1}$ por su expresión anterior: $$V_{n-2} = [N \\cdot (1 - d_n)] \\cdot (1 - d_{n-1})$$\n    <strong>Paso 3: Generalización hasta el momento inicial ($t=0$):</strong> Repitiendo este procedimiento para los $n$ períodos de la operación, cada período aporta su propio factor de actualización singular $(1 - d_j)$. El valor efectivo final ($V_4$) al inicio de la operación es el producto del Valor Nominal por cada uno de estos factores: $$V_4 = N \\cdot (1 - d_n) \\cdot (1 - d_{n-1}) \\cdot \\dots \\cdot (1 - d_1)$$\nUtilizando la notación de productoria para una expresión más sintética: $$V_4 = N \\cdot \\prod_{j=1}^{n} (1 - d_j)$$\nDonde:\n- $V_4$: Valor Efectivo percibido hoy.\n- $N$: Valor Nominal del documento.\n- $d_j$: Tasa efectiva de descuento vigente en el período $j$.</p>"
  },
  {
    "type": "interactive_graphic",
    "title": "Simulador de Descuentos Sucesivos y Tasas Variables (Cascada)",
    "src": "/simuladores/u02_pto02_2_2_deduccion_tasas_variables.html",
    "displayMode": "inline",
    "height": "650px"
  }
],
  "Glosario": [],
  "Casos Prácticos": [
  {
    "type": "case",
    "title": "Caso 1: Valor Efectivo con Tasa Constante y Variaciones del Capital",
    "enunciado": "Este concepto analiza la actualización de un capital único bajo una tasa efectiva de descuento que no varía durante el plazo de la operación.\n<strong>Ejemplo Técnico:</strong> Se desea conocer el Valor Efectivo ($V_4$) de un documento con valor nominal de \\$100.000 que vence en 4 meses, si se aplica una tasa efectiva mensual de descuento del \\$5%\\$.",
    "planteo_solucion": "Datos: $N = 100.000$; $n = 4$; $d = 0,05$.\nCálculo: $$V_4 = 100.000 \\cdot (1 - 0,05)^4$$ $$V_4 = 100.000 \\cdot (0,95)^4 = 100.000 \\cdot 0,814506 = 81.450,60$$\nVariación Absoluta (Descuento): $D = 100.000 - 81.450,60 = 18.549,40$.",
    "highlights": "Ejemplo Mercado Argentino (E-cheq): En el mercado argentino actual, las PyMEs suelen descontar E-cheqs (cheques de pago diferido electrónicos) en plataformas de negociación. Una empresa descuenta un E-cheq de \\$500.000 con vencimiento en 60 días (2 meses). Dada la política monetaria vigente y las tasas de referencia del BCRA, la entidad financiera aplica una tasa de descuento comercial compuesta con una tasa efectiva mensual ($d$) del $6,5%$.\n<strong>Datos:</strong> $N = 500.000$; $n = 2$; $d = 0,065$.\n<strong>Cálculo del Valor Neto:</strong> $$V_4 = 500.000 \\cdot (1 - 0,065)^2 = 500.000 \\cdot 0,874225 = 437.112,50$$\n<strong>Análisis:</strong> El descuento total sufrido es de \\$62.887,50. Nótese que bajo este régimen, el descuento del segundo mes es menor al del primero en términos absolutos, ya que se aplica sobre una base ya actualizada.",
    "content": ""
  },
  {
    "type": "case",
    "title": "Caso 2: Valor Efectivo con Tasas Variables",
    "enunciado": "Este modelo es fundamental cuando las condiciones del mercado o el perfil de riesgo del emisor cambian durante el tiempo que dura la operación.\n<strong>Ejemplo Técnico:</strong> Se descuenta un documento de \\$50.000 que vence en 3 meses. Las tasas mensuales pactadas son: \\$4%\\$ para el primer mes, \\$5%\\$ para el segundo y \\$6%\\$ para el tercero.",
    "planteo_solucion": "Cálculo: $$V_4 = 50.000 \\cdot (1 - 0,06) \\cdot (1 - 0,05) \\cdot (1 - 0,04)$$ $$V_4 = 50.000 \\cdot (0,94 \\cdot 0,95 \\cdot 0,96) = 50.000 \\cdot 0,85728 = 42.864$$\nResultado: El valor efectivo recibido es \\$42.864.\n\n<strong>Ejemplo Mercado Argentino (Financiamiento de Exportaciones):</strong> Un exportador argentino descuenta una letra de cambio de \\$200.000 a 90 días (3 meses). Debido a las elevadas expectativas de inflación y la volatilidad de las tasas de interés de corto plazo, el banco establece un esquema de tasas crecientes para los meses sucesivos de antelación: $d_1 = 7%$, $d_2 = 8%$ y $d_3 = 9%$.\n\nDeducción mediante Marcha Retrospectiva: $$V_4 = 200.000 \\cdot (1 - 0,09) \\cdot (1 - 0,08) \\cdot (1 - 0,07)$$ $$V_4 = 200.000 \\cdot (0,91 \\cdot 0,92 \\cdot 0,93) = 200.000 \\cdot 0,778604 = 155.720,80$$",
    "highlights": "Análisis Crítico: El descuento total es de \\$44.279,20. Este caso ilustra cómo el producto de los factores de actualización captura el impacto acumulativo de las tasas de mercado en un contexto de inestabilidad.",
    "content": ""
  }
],
  "Autoevaluación": [
  {
    "type": "quiz",
    "question": "En el Descuento Comercial Compuesto, ¿cuál es el comportamiento del importe absoluto del descuento en cada período a medida que retrocedemos hacia el presente?",
    "options": [
      "A) Es constante en todos los períodos",
      "B) Es variable y creciente en progresión geométrica",
      "C) Es variable y decreciente en progresión geométrica"
    ],
    "feedback": "Según <strong>Ernesto Fransolini</strong>, en este régimen la tasa se aplica sobre un capital que disminuye en cada paso retrospectivo, lo que hace que el importe absoluto del descuento sea variable y decreciente. Si seleccionaste la opción A, recuerda que esa es una característica del interés simple, no del compuesto.",
    "correctIndex": 2
  },
  {
    "type": "quiz",
    "question": "Si una operación de actualización se realiza con una frecuencia subperiódica ($1 < m < \\infty$), ¿cómo se define la relación entre la tasa nominal de descuento ($f$) y la tasa periódica efectiva ($d$)?",
    "options": [
      "A) $d = f / m$",
      "B) $d = 1 - (1 - f/m)^m$",
      "C) $d = 1 - e^{-f}$"
    ],
    "feedback": "Según la deducción presentada en la bibliografía de <strong>Fransolini</strong>, la tasa efectiva $d$ es el descuento total de un capital nominal unitario al cabo de un período completo, lo cual se obtiene restando a la unidad el factor de actualización subperiódico elevado a la potencia $m$. La opción C corresponde únicamente al caso de actualización continua.",
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": "¿Por qué se afirma que el régimen de Descuento Comercial Compuesto es \"irracional\" o \"no racional\"?",
    "options": [
      "A) Porque el valor efectivo puede ser negativo para plazos muy largos",
      "B) Porque no permite recomponer el Valor Nominal si se capitaliza el Valor Efectivo a una tasa de interés igual a la de descuento",
      "C) Porque utiliza tasas variables en lugar de tasas fijas"
    ],
    "feedback": "Según <strong>Ernesto Fransolini</strong> y <strong>Marcela González</strong>, este régimen es \"no racional\" debido a su falta de reversibilidad financiera; al ser tasas adelantadas, si se coloca el Valor Efectivo ($V$) a una tasa de interés ($i$) numéricamente igual a $d$, no se logra volver al Valor Nominal ($N$) original. La opción A es incorrecta porque, a diferencia del descuento simple, el valor compuesto es asintótico y nunca llega a ser nulo o negativo.",
    "correctIndex": 1
  }
],
  "Gráficos": []
};

export default data;
