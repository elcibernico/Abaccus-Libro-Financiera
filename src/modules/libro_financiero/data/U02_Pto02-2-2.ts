// Archivo autogenerado a partir de documentos Word mediante parse_unit_u02_2_2_2.py
import { TopicData } from '@/types';

const data: TopicData = {
  "id": "U02_Pto02-2-2",
  "title": "Descuento comercial compuesto: Definición, características, modalidades de actualización. Deducción de la fórmula del valor efectivo con actualización discontinua periódica (para tasa constante). Tasa periódica \"efectiva\" de descuento. Tasa efectiva de descuento en caso de actualización periódica. Fórmula general del Valor Efectivo en Régimen de Descuento Comercial Compuesto con actualización discontinua periódica (caso de tasas variables en cada período).",
  "Desarrollo": [
  {
    "type": "text",
    "content": `<h3>Descuento Comercial Compuesto ($D_4$)</h3>`
  },
  {
    "type": "text",
    "content": `<p><strong>Definición</strong>

El <strong>Descuento Comercial Compuesto</strong> se define como el régimen de actualización donde el descuento de cada período se calcula aplicando una tasa periódica de descuento sobre el valor nominal actualizado al final de dicho período. A diferencia del régimen comercial simple, aquí existe un "descuento sobre el descuento", lo que genera una base de cálculo decreciente a medida que el análisis retrocede desde el vencimiento hacia el presente.</p>`
  },
  {
    "type": "text",
    "content": `<p><strong>Características fundamentales:</strong>

<strong>    - Sentido Retrospectivo:</strong> La operación se analiza desde el momento de vencimiento ($n$) hacia el momento de valoración (0).
<strong>    - Descuento Periódico Variable:</strong> Dado que la tasa se aplica sobre un capital que disminuye en cada paso retrospectivo, el importe absoluto del descuento es variable y decreciente en progresión geométrica.
<strong>    - Irracionalidad Financiera:</strong> Se considera un régimen "no racional" o irreversible, ya que si el valor efectivo obtenido se capitaliza a la misma tasa de interés por el mismo plazo, no se recompone el valor nominal original.
<strong>    - Límite de Aplicabilidad:</strong> A diferencia del régimen simple, el valor efectivo en el descuento compuesto nunca llega a ser nulo ni negativo para valores finitos del tiempo, ya que la función es asintótica al eje de las abscisas.</p>`
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
    "content": `<p><strong>Modalidades de Actualización</strong>
Dependiendo de la frecuencia con la que se detrae el interés del capital, se distinguen tres modalidades principales:
<strong>    1) Actualización Discontinua Periódica ($m=1$):</strong> El período de la tasa coincide con el intervalo de actualización.
<strong>    2) Actualización Discontinua Subperiódica ($1 < m < \\infty$):</strong> Se realizan múltiples actualizaciones dentro del período de la tasa utilizando una tasa subperiódica proporcional o equivalente.
<strong>    3) Actualización Continua ($m \\to \\infty$):</strong> La detracción del interés se produce de forma instantánea, momento a momento.</p>`
  },
  {
    "type": "text",
    "content": `<p><strong>Variaciones de la Función Capital (Sentido Retrospectivo)</strong>

Para un aprendizaje más didáctico, analizaremos cómo se comporta el capital cuando nos desplazamos del futuro hacia el presente:

<strong>Variación Absoluta (Descuento)</strong>

Representa la quita, merma o reducción de valor que experimenta una disponibilidad futura si se pretende lograr su disponibilidad inmediata. Se simboliza como $D_4$ y es la diferencia entre el Valor Nominal ($N$) y el Valor Efectivo ($V_4$): $$D_4 = N - V_4$$

<strong>Variación Relativa (Tasa Efectiva de Descuento)</strong>

Esta medida es fundamental porque relaciona el descuento absoluto con el capital que lo generó (el Valor Nominal). Indica cuánto disminuyó cada unidad monetaria descontada durante el tiempo de la operación. Se simboliza como $d$: $$d = \\frac{D_4}{N}$$

<strong>Variación Relativa Media (Tasa Nominal de Descuento)</strong>

Es una medida proporcional del descuento efectivo para una unidad de tiempo. Permite obtener un "promedio" del descuento por cada intervalo (día, mes, año). Se simboliza como $f$: $$f = \\frac{d}{n}$$Esta tasa $f$ es la que normalmente se utiliza en la práctica comercial y bancaria como referencia anual.</p>`
  },
  {
    "type": "text",
    "content": `<h4><strong>Deducción de la Fórmula del Valor Efectivo ($V_4$)</strong></h4>`
  },
  {
    "type": "text",
    "content": `<strong>(1) Caso de Actualización Discontinua Periódica (Tasa Constante)</strong>

Consideremos un capital con Valor Nominal $N$ que vence en $n$ períodos. Sea $f$ la tasa periódica nominal pactada. Para hallar el valor efectivo ($V_4$), realizamos la marcha retrospectiva período a período:

<table><thead><tr><th>Período</th><th>Valor efectivo al final del período</th><th>Descuento del período</th><th>Valor efectivo al inicio del período</th></tr></thead><tbody>
<!-- Fila n --><tr>
<td>$n$</td>
<td>$N$</td>
<td>$N \\cdot f$</td>
<td>$N - N \\cdot f = N \\cdot (1 - f)$</td>
</tr><!-- Fila n-1 --><tr>
<td>$n - 1$</td>
<td>$N \\cdot (1 - f)$</td>
<td>$N \\cdot (1 - f) \\cdot f$</td>
<td>$N \\cdot (1 - f) - N \\cdot (1 - f) \\cdot f =$ <br />
$N \\cdot (1 - f) \\cdot (1 - f) = N \\cdot (1 - f)^2$</td>
</tr><!-- Fila n-2 --><tr>
	<td>$n - 2$</td>
	<td>$N \\cdot (1 - f)^2$</td>
	<td>$N \\cdot (1 - f)^2 \\cdot f$</td>
	<td>$N \\cdot (1 - f)^2 - N \\cdot (1 - f)^2 \\cdot f =$ <br />
	    $N \\cdot (1 - f)^2 \\cdot (1 - f) = N \\cdot (1 - f)^3$</td>
</tr><!-- Fila de puntos suspensivos --><tr>
	<td>$\\dots$</td>
	<td>$\\dots$</td>
	<td>$\\dots$</td>
	<td>$\\dots$</td>
</tr><!-- Fila 1 --><tr>
	<td>1</td>
	<td>$N \\cdot (1 - f)^{n-1}$</td>
	<td>$N \\cdot (1 - f)^{n-1} \\cdot f$</td>
	<td>$N \\cdot (1 - f)^{n-1} - N \\cdot (1 - f)^{n-1} \\cdot f =$ <br />
            $N \\cdot (1 - f)^{n-1} \\cdot (1 - f) \\Rightarrow$ <br />
            $V_4 = N \\cdot (1 - f)^n$</td>
</tr></tbody></table>

<strong>- Generalización para $n$ períodos:</strong> Siguiendo la recurrencia, al llegar al momento inicial ($0$), la fórmula del valor efectivo es: $$V_4 = N \\cdot (1 - f)^n$$
O bien:$$V_4 = N \\cdot (1 - d)^n$$`
  },
  {
    "type": "text",
    "content": `<p><strong>Relación entre Tasa Nominal ($f$) y Efectiva ($d$):</strong>
Partiendo de $$D_4=N-V_4$$ $$D_4=N-N\\cdot(1-f)^n$$ 
Si consideramos $N=1$ y $n=1$, entonces $$d = 1 - (1 - f)^1 = f$$ Por lo tanto, la fórmula definitiva se expresa habitualmente como: $$V_4 = N \\cdot (1 - d)^n$$</p>`
  },
  {
    "type": "text",
    "content": `<p><strong>(2) Caso de Actualización Discontinua Subperiódica</strong>

Cuando la actualización ocurre $m$ veces por período, se utiliza la tasa subperiódica proporcional $f/m$ y el tiempo total se expresa en subperíodos ($n \\cdot m$): $$V'_4 = N \\cdot \\left(1 - \\frac{f}{m}\\right)^{n \\cdot m}$$</p>`
  },
  {
    "type": "text",
    "content": `<p><strong>(3) Caso de Actualización Continua</strong>

Partiendo de la actualización subperiódica y aplicando el límite cuando la frecuencia $m$ tiende a infinito.
En primer lugar, nos vamos a valer del <i>límite notable<i/> que define al número de Euler ($e$): $$\\lim_{x \\to \\pm\\infty} \\left(1 + \\frac{1}{x}\\right)^x = e$$
Partimos entonces de la siguiente expresión: $$\\bar{V}4 = \\lim_{m \\to \\infty} N \\cdot \\left(1 - \\frac{f}{m}\\right)^{n \\cdot m}$$
Como el valor nominal o futuro $N$ es una constante que no depende de la variable del límite ($m$), podemos extraerlo multiplicando fuera del límite:$$\\bar{V}_4 = N \\cdot \\lim_{m \\to \\infty} \\left(1 - \\frac{f}{m}\\right)^{n \\cdot m}$$
Queremos que el término dentro del paréntesis tenga la forma $\\left(1 + \\frac{1}{x}\\right)$. Para ello, transformamos la resta en una suma y reescribimos la fracción $-\\frac{f}{m}$ como el inverso de su recíproco:$$-\\frac{f}{m} = \\frac{1}{-\\frac{m}{f}}$$
Sustituyendo esto en el paréntesis, nos queda:$$\\left(1 - \\frac{f}{m}\\right) = \\left(1 + \\frac{1}{-m/f}\\right)$$
Necesitamos que el exponente que está fuera sea exactamente igual al denominador que acabamos de crear, es decir, $-m/f$. Para no alterar la igualdad, multiplicamos y dividimos el exponente original ($n \\cdot m$) por $-f$:$$n \\cdot m = m \\cdot n \\cdot \\frac{-f}{-f} = \\left(-\\frac{m}{f}\\right) \\cdot (-f \\cdot n)$$
Recordando la propiedad de los exponentes $a^{b \\cdot c} = (a^b)^c$, separamos el exponente en una estructura interna y otra externa:$$\\left(1 + \\frac{1}{-m/f}\\right)^{n \\cdot m} = \\left[ \\left(1 + \\frac{1}{-m/f}\\right)^{-m/f} \\right]^{-f \\cdot n}$$
Dado que el exponente externo ($-f \\cdot n$) es constante respecto a $m$, la propiedad de los límites nos permite introducir el límite dentro del corchete: $\\lim [g(m)]^k = [\\lim g(m)]^k$.
Afectando todo esto a la ecuación, obtenemos formalmente la segunda expresión:$$\\bar{V}_4 = N \\cdot \\left[ \\lim_{m \\to \\infty} \\left( 1 + \\frac{1}{-m/f} \\right)^{-m/f} \\right]^{-f \\cdot n}$$
Resultando en la fórmula de actualización continua: $$\\bar{V}_4 = N \\cdot e^{-f \\cdot n}$$ Esta modalidad arroja el <strong>Valor Efectivo Máximo</strong> posible para una tasa nominal dada.</p>`
  },
  {
    "type": "text",
    "content": `<h4>La <strong>Tasa Periódica "Efectiva" de Descuento ($d$)</strong> constituye la medida fundamental de la quita o merma que sufre un capital unitario nominal por su anticipación en el tiempo bajo el régimen de interés compuesto.</h4>`
  },
  {
    "type": "text",
    "content": `<p><strong>1. Definición y Naturaleza de la Tasa Efectiva de Descuento</strong>

La tasa "efectiva" de descuento se define como el descuento que sufre un valor Nominal de \\$1 que se descuenta por un período completo, independientemente de la modalidad o la frecuencia con la que se realice la actualización.

Sus características principales son:
<strong>   a) Periodicidad:</strong> Refiere al impacto financiero en una unidad de tiempo determinada (mes, año, etc.).
<strong>   b) Sentido:</strong> Es una tasa <strong>adelantada</strong> (se detrae del valor nominal al inicio de la operación).
<strong>   c) Régimen:</strong> Opera exclusivamente en el <strong>régimen compuesto</strong> (Descuento Comercial Compuesto o $D_4$), donde la base de cálculo es el capital ya actualizado.
<strong>   d) Función didáctica:</strong> Aunque permite comparar la conveniencia entre diversas fuentes de financiación, <u><i>no determina el verdadero costo efectivo de una operación; para ello, se debe recurrir a la tasa efectiva de interés ($i$) implícita.</i></u></p>`
  },
  {
    "type": "text",
    "content": `<p><strong>Relación según las Modalidades de Actualización</strong>

La tasa efectiva $d$ asume diferentes expresiones matemáticas dependiendo de cómo se distribuya el descuento en el tiempo (Enfoque de Proporcionalidad):

<strong>(A) Actualización Discontinua Periódica ($m=1$)</strong>

En este caso, la frecuencia de actualización coincide con el período de la tasa enunciada ($f$). Demostramos que la tasa nominal pactada es numéricamente idéntica a la tasa efectiva. $$N\\cdot (1-d)^n = N\\cdot \\left(1 - \\frac{f}{m}\\right)^{n\\cdot m}$$ Si $m=1$ $$N\\cdot (1-d)^n = N\\cdot \\left(1 - \\frac{f}{1}\\right)^{n\\cdot 1}$$ $$N\\cdot (1-d)^n = N\\cdot (1-f)^n $$ $$d = f$$
<strong>(B) Actualización Discontinua Subperiódica ($1 < m < \\infty$)</strong>

Cuando se actualiza $m$ veces dentro de un período utilizando una tasa subperiódica proporcional $\\frac{f}{m}$, el descuento total de \\$1 nominal al cabo de un período (que define a $d$) se obtiene mediante la siguiente deducción,: $$N\\cdot (1-d)^n = N\\cdot \\left(1 - \\frac{f}{m}\\right)^{n\\cdot m}$$ $$d = 1-\\left(1 - \\frac{f}{m}\\right)^m$$
(C) Actualización Continua ($m \\to \\infty$)

Representa el caso límite donde el interés se detrae instante a instante. Bajo esta modalidad, se obtiene la Tasa Periódica Efectiva Mínima de Descuento:
$$N\\cdot (1-d)^n = N\\cdot e^{-f\\cdot n}$$ $$\\bar{d} = 1 - e^{-f}$$</p>`
  },
  {
    "type": "text",
    "content": `<p><strong>Variación de la Función Capital y Tasa Efectiva</strong>

Desde un enfoque didáctico, <b><i>"la tasa efectiva $d$"</b></i> es la expresión de la <strong><u>Variación Relativa</u></strong> de la función capital en sentido retrospectivo,. Mientras que el <b><i>"descuento ($D_4$)"</b></i> es la <u>variación absoluta</u> ($N - V_4$).
La tasa $d$ mide cuánto disminuye cada unidad monetaria descontada en relación al capital nominal que la generó ($d = D_4 / N$).

En el régimen comercial compuesto con tasas efectivas constantes, se observan dos comportamientos clave:
    1) El descuento periódico (variación absoluta) es <strong>decreciente</strong>, ya que la tasa se aplica sobre capitales actualizados cada vez menores.
    2) La quita por cada unidad de moneda (variación relativa o tasa $d$) resulta <strong>constante</strong> para cada período acordado.</p>`
  },
  {
    "type": "text",
    "content": `<p><strong>Interpretación Financiera Crítica</strong>

Es fundamental destacar que la tasa efectiva de descuento no es una "verdadera" tasa de rendimiento o costo en términos de capitalización, ya que es una tasa adelantada. El Descuento Comercial (tanto simple como compuesto) es <strong>irracional o irreversible</strong>,. Esto significa que si se coloca el Valor Efectivo ($V_4$) obtenido a una tasa de interés ($i$) numéricamente igual a $d$, no se logra recomponer el Valor Nominal ($N$) original.</p>`
  },
  {
    "type": "text",
    "content": `<p>La <strong>Fórmula General del Valor Efectivo ($V_4$)</strong> en el régimen de <strong>Descuento Comercial Compuesto</strong> con actualización discontinua periódica se aplica cuando las tasas de descuento varían en cada uno de los períodos que dura la operación.
A continuación, se presenta el desarrollo técnico y la deducción de este modelo matemático bajo los lineamientos de la cátedra.</p>`
  },
  {
    "type": "text",
    "content": `<p><strong>Concepto y Características</strong>

En el régimen de descuento comercial compuesto, la característica distintiva es que el descuento de cada período se calcula sobre el capital ya actualizado al final de dicho intervalo. Cuando las tasas son variables ($d_1, d_2, \\dots, d_n$), ya no es posible simplificar la expresión mediante una potencia, sino que se debe aplicar un producto de factores de actualización singulares distintos para cada período.
Este modelo es particularmente apropiado para contextos de volatilidad financiera o cuando las condiciones contractuales estipulan ajustes en el costo del dinero a lo largo del tiempo.</p>`
  },
  {
    "type": "text",
    "content": `Vamos a deducir la fórmula para realizar este cálculo... pero antes veámoslo con ejemplos numéricos para luego poder interpretar mejor el desarrollo matemático... `
  },
  {
    "type": "interactive_graphic",
    "title": "Simulador de Descuentos Sucesivos y Tasas Variables (Cascada)",
    "src": "/simuladores/u02_pto02_2_2_deduccion_tasas_variables.html",
    "displayMode": "inline",
    "height": "650px"
  },
  {
    "type": "text",
    "content": `<p><strong>Deducción de la Fórmula mediante Marcha Retrospectiva</strong>

Para deducir la fórmula, se utiliza un análisis retrospectivo que parte del <strong>Valor Nominal ($N$)</strong> ubicado en el momento del vencimiento ($n$) y retrocede período a período hasta el momento actual (0).
    <strong>Paso 1: Del vencimiento ($n$) al final del período previo ($n-1$):</strong> El capital al final es $N$. Se aplica la tasa de descuento vigente para ese último tramo, $d_n$. $$V_{n-1} = N - (N \\cdot d_n) = N \\cdot (1 - d_n)$$ 
    <strong>Paso 2: Del momento ($n-1$) al momento ($n-2$):</strong> La nueva base de cálculo es $V_{n-1}$. Se aplica la tasa $d_{n-1}$: $$V_{n-2} = V_{n-1} - (V_{n-1} \\cdot d_{n-1}) = V_{n-1} \\cdot (1 - d_{n-1})$$ Sustituyendo $V_{n-1}$ por su expresión anterior: $$V_{n-2} = [N \\cdot (1 - d_n)] \\cdot (1 - d_{n-1})$$
    <strong>Paso 3: Generalización hasta el momento inicial ($t=0$):</strong> Repitiendo este procedimiento para los $n$ períodos de la operación, cada período aporta su propio factor de actualización singular $(1 - d_j)$. El valor efectivo final ($V_4$) al inicio de la operación es el producto del Valor Nominal por cada uno de estos factores: $$V_4 = N \\cdot (1 - d_n) \\cdot (1 - d_{n-1}) \\cdot \\dots \\cdot (1 - d_1)$$
Utilizando la notación de productoria para una expresión más sintética: $$V_4 = N \\cdot \\prod_{j=1}^{n} (1 - d_j)$$
Donde:
- $V_4$: Valor Efectivo percibido hoy.
- $N$: Valor Nominal del documento.
- $d_j$: Tasa efectiva de descuento vigente en el período $j$.</p>`
  }
],
  "Glosario": [],
  "Casos Prácticos": [
  {
    "type": "case",
    "title": "Caso 1: Valor Efectivo con Tasa Constante y Variaciones del Capital",
    "enunciado": `Este concepto analiza la actualización de un capital único bajo una tasa efectiva de descuento que no varía durante el plazo de la operación.
<strong>Ejemplo Técnico:</strong> Se desea conocer el Valor Efectivo ($V_4$) de un documento con valor nominal de \\$100.000 que vence en 4 meses, si se aplica una tasa efectiva mensual de descuento del \\$5%\\$.`,
    "planteo_solucion": `Datos: $N = 100.000$; $n = 4$; $d = 0,05$.
Cálculo: $$V_4 = 100.000 \\cdot (1 - 0,05)^4$$ $$V_4 = 100.000 \\cdot (0,95)^4 = 100.000 \\cdot 0,814506 = 81.450,60$$
Variación Absoluta (Descuento): $D = 100.000 - 81.450,60 = 18.549,40$.`,
    "highlights": `Ejemplo Mercado Argentino (E-cheq): En el mercado argentino actual, las PyMEs suelen descontar E-cheqs (cheques de pago diferido electrónicos) en plataformas de negociación. Una empresa descuenta un E-cheq de \\$500.000 con vencimiento en 60 días (2 meses). Dada la política monetaria vigente y las tasas de referencia del BCRA, la entidad financiera aplica una tasa de descuento comercial compuesta con una tasa efectiva mensual ($d$) del $6,5%$.
<strong>Datos:</strong> $N = 500.000$; $n = 2$; $d = 0,065$.
<strong>Cálculo del Valor Neto:</strong> $$V_4 = 500.000 \\cdot (1 - 0,065)^2 = 500.000 \\cdot 0,874225 = 437.112,50$$
<strong>Análisis:</strong> El descuento total sufrido es de \\$62.887,50. Nótese que bajo este régimen, el descuento del segundo mes es menor al del primero en términos absolutos, ya que se aplica sobre una base ya actualizada.`,
    "content": ``
  },
  {
    "type": "case",
    "title": "Caso 2: Valor Efectivo con Tasas Variables",
    "enunciado": `Este modelo es fundamental cuando las condiciones del mercado o el perfil de riesgo del emisor cambian durante el tiempo que dura la operación.
<strong>Ejemplo Técnico:</strong> Se descuenta un documento de \\$50.000 que vence en 3 meses. Las tasas mensuales pactadas son: \\$4%\\$ para el primer mes, \\$5%\\$ para el segundo y \\$6%\\$ para el tercero.`,
    "planteo_solucion": `Cálculo: $$V_4 = 50.000 \\cdot (1 - 0,06) \\cdot (1 - 0,05) \\cdot (1 - 0,04)$$ $$V_4 = 50.000 \\cdot (0,94 \\cdot 0,95 \\cdot 0,96) = 50.000 \\cdot 0,85728 = 42.864$$
Resultado: El valor efectivo recibido es \\$42.864.

<strong>Ejemplo Mercado Argentino (Financiamiento de Exportaciones):</strong> Un exportador argentino descuenta una letra de cambio de \\$200.000 a 90 días (3 meses). Debido a las elevadas expectativas de inflación y la volatilidad de las tasas de interés de corto plazo, el banco establece un esquema de tasas crecientes para los meses sucesivos de antelación: $d_1 = 7%$, $d_2 = 8%$ y $d_3 = 9%$.

Deducción mediante Marcha Retrospectiva: $$V_4 = 200.000 \\cdot (1 - 0,09) \\cdot (1 - 0,08) \\cdot (1 - 0,07)$$ $$V_4 = 200.000 \\cdot (0,91 \\cdot 0,92 \\cdot 0,93) = 200.000 \\cdot 0,778604 = 155.720,80$$`,
    "highlights": `Análisis Crítico: El descuento total es de \\$44.279,20. Este caso ilustra cómo el producto de los factores de actualización captura el impacto acumulativo de las tasas de mercado en un contexto de inestabilidad.`,
    "content": ``
  }
],
  "Autoevaluación": [
  {
    "type": "quiz",
    "question": `En el Descuento Comercial Compuesto, ¿cuál es el comportamiento del importe absoluto del descuento en cada período a medida que retrocedemos hacia el presente?`,
    "options": [
      "A) Es constante en todos los períodos",
      "B) Es variable y creciente en progresión geométrica",
      "C) Es variable y decreciente en progresión geométrica"
    ],
    "feedback": `Según <strong>Ernesto Fransolini</strong>, en este régimen la tasa se aplica sobre un capital que disminuye en cada paso retrospectivo, lo que hace que el importe absoluto del descuento sea variable y decreciente. Si seleccionaste la opción A, recuerda que esa es una característica del interés simple, no del compuesto.`,
    "correctIndex": 2
  },
  {
    "type": "quiz",
    "question": `Si una operación de actualización se realiza con una frecuencia subperiódica ($1 < m < \\infty$), ¿cómo se define la relación entre la tasa nominal de descuento ($f$) y la tasa periódica efectiva ($d$)?`,
    "options": [
      "A) $d = f / m$",
      "B) $d = 1 - (1 - f/m)^m$",
      "C) $d = 1 - e^{-f}$"
    ],
    "feedback": `Según la deducción presentada en la bibliografía de <strong>Fransolini</strong>, la tasa efectiva $d$ es el descuento total de un capital nominal unitario al cabo de un período completo, lo cual se obtiene restando a la unidad el factor de actualización subperiódico elevado a la potencia $m$. La opción C corresponde únicamente al caso de actualización continua.`,
    "correctIndex": 1
  },
  {
    "type": "quiz",
    "question": `¿Por qué se afirma que el régimen de Descuento Comercial Compuesto es "irracional" o "no racional"?`,
    "options": [
      "A) Porque el valor efectivo puede ser negativo para plazos muy largos",
      "B) Porque no permite recomponer el Valor Nominal si se capitaliza el Valor Efectivo a una tasa de interés igual a la de descuento",
      "C) Porque utiliza tasas variables en lugar de tasas fijas"
    ],
    "feedback": `Según <strong>Ernesto Fransolini</strong> y <strong>Marcela González</strong>, este régimen es "no racional" debido a su falta de reversibilidad financiera; al ser tasas adelantadas, si se coloca el Valor Efectivo ($V$) a una tasa de interés ($i$) numéricamente igual a $d$, no se logra volver al Valor Nominal ($N$) original. La opción A es incorrecta porque, a diferencia del descuento simple, el valor compuesto es asintótico y nunca llega a ser nulo o negativo.`,
    "correctIndex": 1
  }
],
  "Gráficos": []
};

export default data;
