const data = {
  "id": "4.3.1.1.1.1",
  "title": "Rentas temporarias inmediatas, diferidas y anticipadas: deducción de su valor financiero",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Desarrollo del Profesor </b></u><u><b>Ernesto Fransolini</b></u><br/><b>Planteo de la Ecuación Inicial (Actualización individual de cuotas):</b><br/>Partimos de la expresión donde cada cuota variable, en su totalidad, es actualizada al momento cero:<br/> $$V_{n_{a}}=\\frac{c}{(1+i)^{1}}+\\frac{c+r}{(1+i)^{2}}+\\frac{c+2\\cdot r}{(1+i)^{3}}+…+\\frac{c+(n-2)\\cdot r}{(1+i)^{n-1}}+\\frac{c+(n-1)\\cdot r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>Aplicación de la Propiedad Distributiva (Desarme de numeradores):</b><br/>El primer paso analítico consiste en desdoblar los numeradores de cada cuota, separando la cuota base $C$ de sus respectivos incrementos escalonados $r$ , manteniendo el factor de actualización que le corresponde a cada período temporal:
$$V_{n_{a}}=\\frac{c}{(1+i)^{1}}+(\\frac{c}{(1+i)^{2}}+\\frac{r}{(1+i)^{2}})+(\\frac{c}{(1+i)^{3}}+\\frac{2\\cdot r}{(1+i)^{3}})+…+(\\frac{c}{(1+i)^{n-1}}+\\frac{(n-2)\\cdot r}{(1+i)^{n-1}})+(\\frac{c}{(1+i)^{n}}+\\frac{(n-1)\\cdot r}{(1+i)^{n}})$$
$$V_{n_{a}}=\\frac{c}{(1+i)^{1}}+\\frac{c}{(1+i)^{2}}+\\frac{r}{(1+i)^{2}}+\\frac{c}{(1+i)^{3}}+\\frac{2\\cdot r}{(1+i)^{3}}+…+\\frac{c}{(1+i)^{n-1}}+\\frac{(n-2)\\cdot r}{(1+i)^{n-1}}+\\frac{c}{(1+i)^{n}}+\\frac{(n-1)\\cdot r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>Reagrupación por Corrientes Horizontales:</b>

En lugar de sumar los términos cronológicamente (por período), se aplica la propiedad asociativa y conmutativa de la suma para agrupar las fracciones que poseen el mismo numerador, formando sub-series o "corrientes":
- Agrupando todas las $C$ , se forma la primera corriente.
- Agrupando la primera aparición de $r$ en cada período desde $t=2$ , se forma la segunda corriente.
- Agrupando la segunda aparición de $r$ desde $t=3$ , se forma la tercera corriente, y así sucesivamente.
$$V_{n_{a}}=$$
$$(\\frac{c}{(1+i)^{1}}+\\frac{c}{(1+i)^{2}}+\\frac{c}{(1+i)^{3}}+\\frac{c}{(1+i)^{4}}+…+\\frac{c}{(1+i)^{n-1}}+\\frac{c}{(1+i)^{n}}…)\\ =>\\ 1º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{2}}+\\frac{r}{(1+i)^{3}}+\\frac{r}{(1+i)^{4}}+…+\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}}…)\\ =>\\ 2º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{3}}+\\frac{r}{(1+i)^{4}}+…+\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}}…)\\ =>\\ 3º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{4}}+…+\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}}…)\\ =>\\ 4º\\ Corriente$$
$$…$$
$$+((\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}})…)\\ =>\\ (n-1)º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{n}})\\ =>\\ Enésima\\ Corriente$$`
    },
    {
      "type": "image",
      "src": "/images/image1.png"
    },
    {
      "type": "text",
      "content": `<b>Sustitución por sus Equivalentes Financieros (El método de </b><b>Fransolini</b><b>):</b>
Llegado a este punto, se valúa cada corchete aplicando los modelos financieros conocidos:

1º Corriente: representa el valor actual de una renta temporaria inmediata constante de $n$ períodos de cuota $C$ , cuyo valor es exactamente $c\\cdot a_{n:i}$ .
2º Corriente: representa una renta temporaria de $(n-1)$ períodos diferida por 1 período de cuota $r$ . Su valor se obtiene restando dos rentas perpetuas diferidas: una diferida por 1 período menos otra diferida por $n$ períodos, es decir: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
3º Corriente: representa es una renta temporaria de $(n-2)$ períodos diferida por 2 períodos, que equivale a la diferencia: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
4º Corriente: representa es una renta temporaria de $(n-3)$ períodos diferida por 3 períodos, que equivale a la diferencia: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
(n-1)º Corriente: representa es una renta temporaria de $(2)$ períodos diferida por $n-(n-1)$ períodos, que equivale a la diferencia: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
Enésima Corriente: Un caso particular a analizar lo constituye la última corriente, que en realidad corresponde al valor de una única cuota vencida (por lo que no se trataría de una renta) cuyo valor es 𝑟 ( $\\frac{r}{(1+i)^{n}}$ ).
De todas formas, el valor actual de ese único pago efectivizado al final del período 𝑛, también puede obtenerse por diferencia entre dos rentas perpetuas diferidas: la primera con época inicial al final del período $(𝑛 − 1)$ y la segunda con momento de inicio al final del período 𝑛 , representa es una renta temporaria de $(2)$ períodos diferida por $n-(n-1)$ períodos, que equivale a la diferencia:
$$(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-1)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$$`
    },
    {
      "type": "interactive_graphic",
      "title": "Simulación Interactiva",
      "src": "/simuladores/u04_resta_de_perpetuidades.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<b>Ecuación Final por Descomposición:</b><br/>Reemplazando sistemáticamente cada sumatoria agrupada entre corchetes por su correspondiente deducción teórica a través de la diferencia de rentas perpetuas diferidas, arribamos a la gran expresión matricial:<br/> $$V_{n_{a}}=c\\cdot a_{n:i}+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+…+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$$ $$V_{n_{a}}=c\\cdot a_{n:i}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$ <br/>Reagrupando términos POSITIVOS y NEGATIVOS<br/> $$V_{n_{a}}=c\\cdot a_{n:i}$$ $$+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}$$ $$-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-…-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>El Artificio Matemático (Completando la serie)</b> 
Si observamos detenidamente la expresión anterior, los términos positivos de la progresión $\\frac{1}{(1+i)^{t}}$ llegan solamente hasta el exponente $(n-1)$ .A fin de obtener $n$ términos y completar la primera corriente de sumandos hasta la potencia n-ésima, se hace el artificio matemático de sumar y restar el término faltante $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$ al final de la ecuación, o sea:
$$V_{n_{a}}=c\\cdot a_{n:i}$$ $$+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}$$ $$-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-…-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$ $$+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$
Y volvemos a reagrupar términos POSITIVOS y NEGATIVOS.
Planeamos nuevamente las corrientes:
$$V_{n_{a}}=c\\cdot a_{n:i}$$
$$(+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})\\ =>\\ 1º\\ Corriente$$
$$(-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-…-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})\\ =>\\ 2º\\ Corriente$$`
    },
    {
      "type": "text",
      "content": `<b>Sustitución Final de las Corrientes</b>
Procedemos a valuar financieramente el contenido de estos dos nuevos grandes corchetes:

1º Corriente: Se observa que se obtiene de la misma, el valor actual de una renta temporaria inmediata de $n$ períodos, cuya cuota constante vencida es exactamente $\\frac{r}{i}$ ; y por consiguiente, su valor financiero global es igual a $(\\frac{r}{i}\\cdot a_{n:i})$.

2º Corriente: En esta corriente se pueden observar $n$ términos de una constante cuyo valor es $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$ ; por lo tanto, la suma de todos ellos es simplemente igual a $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n)$.

En consecuencia, reemplazando las expresiones de las dos corrientes de sumandos en la ecuación principal, nos queda lo siguiente:
$$V_{n_{a}}=c\\cdot a_{n:i}+\\frac{r}{i}\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$`
    },
    {
      "type": "text",
      "content": `<b>Factorización y Fórmula Unificada</b>
Finalmente, aplicando álgebra básica, se saca factor común $a_{n:i}$ en los dos primeros términos, llegándose así a la expresión final de la fórmula de una renta temporaria inmediata variable en progresión aritmética con cuotas vencidas:
$$V_{n_{a}}=(c\\cdot a_{n:i}+\\frac{r}{i}\\cdot a_{n:i})-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$ $$V_{n_{a}}=(c+\\frac{r}{i})\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [
    {
      "type": "text",
      "content": `[Caso]
Determinación del valor actual de un plan de pagos creciente`
    },
    {
      "type": "text",
      "content": `[Enunciado]
Una empresa adquiere maquinaria vial y acuerda cancelarla en $12$ cuotas mensuales vencidas que aumentan en progresión aritmética. La primera cuota es de $\$50.000$ y la razón de crecimiento es de $\$2.000$ por mes. Si la tasa de financiación es del $3\%$ efectivo mensual, determine el valor de contado de la maquinaria.
[Solución]
Aplicamos el modelo de renta temporaria inmediata vencida en progresión aritmética: $$V_{n\rceil a} = (c + \frac{r}{i}) \cdot \frac{1 - (1+i)^{-n}}{i} - \frac{r}{i} \cdot (1+i)^{-n} \cdot n$$ Sustituyendo los datos ($c = 50000$, $r = 2000$, $n = 12$, $i = 0.03$): $$V_{12\rceil a} = (50000 + \frac{2000}{0.03}) \cdot \frac{1 - (1.03)^{-12}}{0.03} - \frac{2000}{0.03} \cdot (1.03)^{-12} \cdot 12$$
$$V_{12\rceil a} = (50000 + 66666.67) \cdot 9.9540 - 66666.67 \cdot 0.70138 \cdot 12$$
$$V_{12\rceil a} = 116666.67 \cdot 9.9540 - 561103.88 = 1161300 - 561103.88 = \$600.196,12$$
[Highlights]
En este tipo de rentas, la fracción $\frac{r}{i}$ representa la perpetuidad de la variación. Al restar el último término, descontamos el efecto de perpetuidad limitándolo a las $n$ cuotas.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Valuación de pasivo con cuotas decrecientes y pago a inicio de mes
[Enunciado]
Un deudor propone cancelar una obligación mediante $24$ cuotas mensuales adelantadas. La cuota inicial es de $\$30.000$ y decrece $\$500$ cada mes. La tasa de interés acordada es del $2.5\%$ mensual. Calcule el valor actual de la deuda.
[Solución]
Utilizamos el modelo de renta inmediata en progresión aritmética con cuota adelantada, multiplicando el modelo vencido por $(1+i)$: $$V'<i>{n\</i><i>rceil</i><i> a} = \</i><i>left</i><i>(c + \frac{r}{i}) \</i><i>cdot</i><i> \frac{1 - (1+i)^{-n}}{i} - \frac{r}{i} \</i><i>cdot</i><i> (1+i)^{-n} \</i><i>cdot</i><i> n \</i><i>right</i><i> \</i><i>cdot</i><i> (1+i)$$ Con $c = 30000$, $r = -500$, $n = 24$, $i = 0.025$: $$V'</i>{24\rceil a} = \left(30000 + \frac{-500}{0.025}) \cdot \frac{1 - 1.025^{-24}}{0.025} - \frac{-500}{0.025} \cdot 1.025^{-24} \cdot 24 \right \cdot 1.025$$
$$V'<i>{24\</i><i>rceil</i><i> a} = \</i><i>left</i><i>(30000 - 20000) \</i><i>cdot</i><i> 17.88499 + 20000 \</i><i>cdot</i><i> 0.55287 \</i><i>cdot</i><i> 24 \</i><i>right</i><i> \</i><i>cdot</i><i> 1.025$$
$$V'</i>{24\rceil a} = \left178849.90 + 265377.60 \right \cdot 1.025 = \$455.333,19$$
[Highlights]
Cuando $r < 0$, las cuotas decrecen. Es fundamental advertir que la última cuota ($c + (n-1)r$) debe ser siempre mayor que cero, de lo contrario financieramente el planteo sería un absurdo .
`
    },
    {
      "type": "text",
      "content": `[Caso]
Determinación de la cuota base en un arreglo extrajudicial
[Enunciado]
Se desea cancelar un pasivo exigible de $\$1.500.000$ en $36$ meses con pagos vencidos en progresión aritmética. Si se estableció que los pagos aumentarán a razón de $\$1.500$ mensuales y la tasa de interés es del $4\%$ mensual, halle el valor de la primera cuota $c$.
[Solución]
Partimos del valor actual conocido y despejamos $c$: $$V_{n\rceil a} = (c + \frac{r}{i}) \cdot a_{n\rceil i} - \frac{r}{i} \cdot (1+i)^{-n} \cdot n$$
$$1500000 = (c + \frac{1500}{0.04}) \cdot 18.9082 - \frac{1500}{0.04} \cdot 1.04^{-36} \cdot 36$$
$$1500000 = (c + 37500) \cdot 18.9082 - 37500 \cdot 0.24366 \cdot 36$$
$$1500000 = 18.9082 \cdot c + 709057.50 - 328941$$
$$1119883.50 = 18.9082 \cdot c$$
$$c = \$59.227,40$$
[Highlights]
El despeje del primer término $c$ requiere agrupar previamente las constantes de capitalización y actualización. Es un problema clásico de reestructuración de pasivos complejos.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Cálculo del límite de la razón de variabilidad para rentas prepagables
[Enunciado]
Un prestamista otorga $\$800.000$ a amortizar en $20$ cuotas mensuales adelantadas que decrecen aritméticamente. La primera cuota se fijó en $\$60.000$ y la tasa de interés es del $2\%$ mensual. Encuentre la razón de decrecimiento $r$ e indique si la renta es financieramente válida.
[Solución]
Despejamos $r$ de la fórmula adelantada: $$V'_{n\rceil a} = \leftc \cdot a_{n\rceil i} + \frac{r}{i} \cdot (a_{n\rceil i} - n \cdot (1+i)^{-n}) \right \cdot (1+i)$$
$$800000 = \left60000 \cdot 16.3514 + \frac{r}{0.02} \cdot (16.3514 - 20 \cdot 0.67297) \right \cdot 1.02$$
$$784313.73 = 981084 + 50 \cdot r \cdot (16.3514 - 13.4594)$$
$$-196770.27 = 50 \cdot r \cdot 2.8920$$
$$r = \frac{-196770.27}{144.60} = -\$1.360,79$$ Verificamos validez (última cuota positiva): $c + (n-1)r = 60000 + 19 \cdot (-1360.79) = 34144.99 > 0$. Es válida.
[Highlights]
Este planteo desafía la estructuración algebraica y requiere aislar analíticamente el componente $r$ de dos términos diferentes. Comprobar la validez del último pago es vital.
`
    }
  ],
  "Autoevaluación": [
    {
      "type": "text",
      "content": `[Pregunta] ¿Cuál de los siguientes términos representa algebraicamente el descuento del efecto perpetuo en la fórmula del valor actual de una renta inmediata vencida en progresión aritmética?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $\frac{r}{i} \cdot a_{n\rceil i}$. b) $-\frac{r}{i} \cdot v^n \cdot n$. c) $(c + \frac{r}{i})$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Al aislar la perpetuidad $\frac{r}{i}$, se le debe restar su valor residual a partir del período $n$, expresado en el término $-\frac{r}{i} \cdot v^n \cdot n$, para limitarlo estrictamente al plazo temporal del contrato.`
    },
    {
      "type": "text",
      "content": `[Pregunta] Si evaluamos una renta en progresión aritmética inmediata, ¿por qué factor debe multiplicarse el modelo vencido para adaptarlo a cuotas adelantadas?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $(1+i)^{-1}$. b) $v^n$. c) $(1+i)$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Como todos los pagos se adelantan un período en el eje temporal respecto a la época de valuación, todos sus valores actuales resultan capitalizados por un período, es decir multiplicados por $(1+i)$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] En una progresión aritmética donde $r < 0$ (cuotas decrecientes), ¿cuál es la restricción financiera insoslayable para la validez del modelo?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) La cuota inicial debe ser igual a cero. b) El plazo $n$ debe tender a infinito. c) La última cuota $c_{n}$ debe ser estrictamente positiva.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Si la última cuota arrojara un valor negativo o cero, el comportamiento de la renta carecería de sentido financiero o constituiría un absurdo, por lo que $c + (n-1)r > 0$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] ¿Qué componente permite diferenciar el valor actual de una amortización con cuotas aritméticamente variables del modelo de una imposición?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) La inclusión de la suma de cuotas unitarias $s_{n\rceil i}$. b) La época de valuación seleccionada en el eje temporal. c) Que la progresión aritmética solo opera con tasas efectivas.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. El valor de la amortización sitúa la época de valuación en el momento inicial ($t=0$), mientras que la imposición lo hace coincidir con la época final ($t=n$).`
    }
  ],
  "Gráficos": []
};

export default data;
