const data = {
  "id": "4.3.1.1.1.4",
  "title": "Rentas temporarias diferidas con cuotas variables en progresión aritmética",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Rentas temporarias diferidas con cuotas variables en progresión aritmética</b></u>

En las rentas diferidas, la característica fundamental radica en que la época inicial ($EI$) es posterior a la época de valuación ($EV$).
Para este modelo, se simbolizará con \${}^{-d}/{V_{n_{a}}}$ al valor actual de $n$ términos de renta variables en ley aritmética, cuyo primer término se abona al final del primer período de la renta, pero después de transcurridos $d$ períodos de diferimiento.
`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción del valor financiero (Cuotas Vencidas)</b></u>

Para obtener el valor financiero correspondiente a esta renta en la verdadera época de valuación (el momento 0), debemos calcular primero el valor actual de la renta como si fuera inmediata (valuada en la época inicial de la renta) y luego actualizar ese monto resultante por los $d$ períodos de gracia o diferimiento.

Sabiendo que el valor financiero de la renta temporaria inmediata variable en progresión aritmética es:
 $$V_{n_{a}}=\\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n$$ 
Simplemente aplicamos el factor de actualización singular (o factor de diferimiento) equivalente a $\\left( 1+i \\right)^{-d}$. 

Multiplicando la ecuación base por este factor, obtenemos la fórmula general para las cuotas vencidas:
 $\${}^{-d}/{V_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{-d}$$`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción del valor financiero (Cuotas Adelantadas)</b></u>

Si las cuotas fuesen adelantadas o prepagables, sabemos por el principio de equivalencia que todo valor financiero de una renta adelantada equivale al de su respectiva renta vencida multiplicado por el factor de capitalización $\\left( 1+i \\right)$.

Para expresar este valor temporal y simbolizarlo como \${}^{-d}/{V'_{n_{a}}}$, multiplicamos la fórmula anterior por $\\left( 1+i \\right)$:
 $\${}^{-d}/{V'_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{-d}\\cdot \\left( 1+i \\right)$$ 
<b>Artilugio matemático:</b> Al tener un producto de potencias de igual base en el extremo derecho de la ecuación ($\\left( 1+i \\right)^{-d}\\cdot \\left( 1+i \\right)^{1}$), aplicamos la propiedad algebraica que indica que se deben sumar los exponentes: $-d+1=-\\left( d-1 \\right)$.
El modelo matemáticamente simplificado queda expresado como:
 $\${}^{-d}/{V'_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{-\\left( d-1 \\right)}$$ <b>Conclusión:</b> Una renta temporaria diferida por $d$ períodos con cuotas adelantadas variables en ley aritmética equivale financieramente a una renta temporaria diferida por $\\left( d-1 \\right)$ períodos con cuotas vencidas bajo la misma ley. Es decir, el esfuerzo de diferimiento se reduce en exactamente un período.
`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [
    {
      "type": "text",
      "content": `[Caso] 
Valuación de financiamiento agrícola con gracia
[Enunciado]
Un agricultor financia un tractor. Pagará $10$ cuotas semestrales vencidas que crecen aritméticamente en $\$3.000$. La primera cuota será de $\$25.000$ y se abonará recién al final del tercer semestre (período de diferimiento $d=2$). La tasa es del $8\%$ efectivo semestral. ¿Cuál es el precio de contado?
[Solución]
Empleamos la renta diferida en progresión aritmética vencida 10: $$<i>{-d/}V</i>{n\rceil a} = \left(c + \frac{r}{i}) \cdot a_{n\rceil i} - \frac{r}{i} \cdot (1+i)^{-n} \cdot n \right \cdot (1+i)^{-d}$$
$$<i>{-2/}V</i>{10\rceil a} = \left(25000 + \frac{3000}{0.08}) \cdot \frac{1 - 1.08^{-10}}{0.08} - \frac{3000}{0.08} \cdot 1.08^{-10} \cdot 10 \right \cdot 1.08^{-2}$$
$$<i>{-2/}V</i>{10\rceil a} = \left(25000 + 37500) \cdot 6.71008 - 37500 \cdot 0.46319 \cdot 10 \right \cdot 0.85734$$
$$<i>{-2/}V</i>{10\rceil a} = \left419380 - 173696.25 \right \cdot 0.85734 = \$210.635,17$$
[Highlights]
Al ser diferida vencida, el factor de descuento aplica exactamente por $d$ períodos, trasladando el bloque valuado en $t=d$ al momento $t=0$.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Franquicia comercial diferida y prepagable
[Enunciado]
Se adquiere el derecho de uso de una marca. Se abonarán $18$ pagos mensuales adelantados decrecientes aritméticamente en $\$800$, siendo el primero de $\$15.000$. El primer pago se efectivizará al iniciar el quinto mes (diferimiento $d=4$). Tasa del $3\%$ mensual. Calcule el valor actual.
[Solución]
Usamos el modelo de renta aritmética diferida con cuotas adelantadas 10: $$<i>{-d/}V'</i>{n\rceil a} = \left(c + \frac{r}{i}) \cdot a_{n\rceil i} - \frac{r}{i} \cdot (1+i)^{-n} \cdot n \right \cdot (1+i)^{-(d-1)}$$ Aquí $d=4$, por lo que el factor es $(1+i)^{-3}$: $$<i>{-4/}V'</i>{18\rceil a} = \left(15000 - \frac{800}{0.03}) \cdot \frac{1 - 1.03^{-18}}{0.03} - \frac{-800}{0.03} \cdot 1.03^{-18} \cdot 18 \right \cdot 1.03^{-3}$$
$$<i>{-4/}V'</i>{18\rceil a} = \left(15000 - 26666.67) \cdot 13.7535 + 26666.67 \cdot 0.58739 \cdot 18 \right \cdot 0.91514$$
$$<i>{-4/}V'</i>{18\rceil a} = \left-160455.51 + 281944.97 \right \cdot 0.91514 = \$111.180,18$$
[Highlights]
En las rentas diferidas y adelantadas, el diferimiento efectivo se reduce en un período $(d-1)$ 10, porque la primera cuota prepagable ya se sitúa al inicio del período evaluado.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Ingeniería inversa sobre renta diferida para determinar base
[Enunciado]
Un pasivo se valuó en $\$500.000$ hoy. Se estableció un plan de $15$ cuotas vencidas que crecen aritméticamente en $\$2.500$, con un plazo de gracia de $5$ meses sin pagos (se empieza a pagar en el mes 6, $d=5$). Si la tasa es del $2\%$ mensual, halle $c$.
[Solución]
Igualamos el valor actual y despejamos $c$: $$<i>{-d/}V</i>{n\rceil a} = \left(c + \frac{r}{i}) \cdot a_{n\rceil i} - \frac{r}{i} \cdot n \cdot v^n \right \cdot (1+i)^{-d}$$
$$500000 = \left(c + \frac{2500}{0.02}) \cdot 12.84926 - \frac{2500}{0.02} \cdot 15 \cdot 1.02^{-15} \right \cdot 1.02^{-5}$$
$$500000 = \left(c + 125000) \cdot 12.84926 - 125000 \cdot 15 \cdot 0.74301 \right \cdot 0.90573$$
$$552040.89 = 12.84926 \cdot c + 1606157.50 - 1393143.75$$
$$339027.14 = 12.84926 \cdot c \rightarrow c = \$26.384,95$$
[Highlights]
Descontar el valor del pasivo al momento de finalización de la gracia agiliza el cálculo matemático en lugar de arrastrar el factor de diferimiento en cada término.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Ajuste del gradiente de decrecimiento por restricción presupuestaria diferida
[Enunciado]
Una deuda de $\$1.000.000$ será cancelada en $24$ pagos mensuales adelantados, con $3$ meses de gracia completa ($d=3$, inicio del pago al arrancar el cuarto mes). La cuota base $c$ es $\$60.000$. Al $1.5\%$ mensual, determine el valor de $r$ requerido para amortizar la deuda exacta.
[Solución]
En la fórmula diferida adelantada, el exponente es $-(d-1) = -2$: $$<i>{-3/}V'</i>{24\rceil a} = \leftc \cdot a_{24\rceil 0.015} + \frac{r}{i} (a_{24\rceil 0.015} - 24 \cdot 1.015^{-24}) \right \cdot 1.015^{-2}$$
$$1000000 = \left60000 \cdot 20.0304 + \frac{r}{0.015} \cdot (20.0304 - 24 \cdot 0.69954) \right \cdot 0.97066$$
$$1030278.36 = 1201824 + 66.6667 \cdot r \cdot (20.0304 - 16.78896)$$
$$-171545.64 = 66.6667 \cdot r \cdot 3.24144$$
$$r = \frac{-171545.64}{216.096} = -\$793,84$$
[Highlights]
La combinación de cuotas adelantadas y diferimiento es donde ocurren más errores. Recordar que "pagos adelantados diferidos por d" se actualizan por $d-1$ 10.
`
    }
  ],
  "Autoevaluación": [
    {
      "type": "text",
      "content": `[Pregunta] En el modelo de una renta temporaria diferida vencida en progresión aritmética, ¿cuál es el factor de desplazamiento temporal correcto?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $(1+i)^{-(d-1)}$. b) $(1+i)^{d}$. c) $(1+i)^{-d}$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Como la renta es vencida y diferida, el bloque entero de cuotas valuado a su inicio ficticio se descuenta al presente multiplicándolo exactamente por $(1+i)^{-d}$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] ¿Cuál es el exponente de actualización para una renta diferida con cuotas adelantadas en progresión aritmética?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $-d$. b) $-(d-1)$. c) $d+1$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Al tratarse de cuotas adelantadas (prepagables), la primera cuota ya está ubicada al inicio del bloque de pagos, por lo que el diferimiento efectivo respecto del momento de valuación se acorta a $d-1$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] El principio de equivalencia financiera dicta que un conjunto diferido en progresión aritmética adelantada tiene un factor equivalente a:`
    },
    {
      "type": "text",
      "content": `[Opciones] a) Una renta vencida diferida por $d-1$ períodos. b) Una renta vencida capitalizada por $d$ períodos. c) Una imposición multiplicada por $v^n$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] a`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. La matemática financiera demuestra que diferir una renta adelantada por $d$ equivale conceptual y numéricamente a diferir la misma renta, pero vencida, por un período menos ($d-1$).`
    },
    {
      "type": "text",
      "content": `[Pregunta] Si en una fórmula diferida el término $\frac{r}{i}$ multiplica a todo el bloque, ¿qué concepto subyacente de la cuota se está capturando?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) El fondo amortizante. b) El límite infinito de la razón $r$. c) La cuota base $c$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. La fracción $\frac{r}{i}$ representa matemáticamente el valor de una perpetuidad cuya cuota constante fuera la razón de la progresión, utilizada como artificio para modelar el gradiente finito.`
    }
  ],
  "Gráficos": []
};

export default data;
