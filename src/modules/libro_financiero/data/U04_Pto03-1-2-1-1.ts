const data = {
  "id": "4.3.1.2.1.1",
  "title": "Ley de Cuotas",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Ley de Cuotas</b></u>
 $$C_{1}+C_{2}+C_{3}+…+C_{n-1}+C_{n}$$
$$C_{1}+\\left[ C_{1}×\\left( 1+g \\right) \\right]+\\left[ C_{2}×\\left( 1+g \\right) \\right]+…+\\left[ C_{n-2}×\\left( 1+g \\right) \\right]+\\left[ C_{n-1}×\\left( 1+g \\right) \\right]$$
$$C_{1}+\\left[ C_{1}×\\left( 1+g \\right) \\right]+\\left[ C_{1}×\\left( 1+g \\right)×\\left( 1+g \\right) \\right]+…+\\underset{n-2\\ veces}{\\left[ C_{1}×\\underbrace{\\left( 1+g \\right)×…×\\left( 1+g \\right)} \\right]}+\\underset{n-1\\ vez}{\\left[ C_{1}×\\underbrace{\\left( 1+g \\right)×…×\\left( 1+g \\right)} \\right]}$$
$$C_{1}+C_{1}×\\left( 1+g \\right)^{1}+C_{1}×\\left( 1+g \\right)^{2}+…+C_{1}×\\left( 1+g \\right)^{n-2}+C_{1}×\\left( 1+g \\right)^{n-1}$$ Por ser inmediata, la época inicial coincide con la época de valuación, por lo que todas las cuotas variables se habrán de actualizar a la época de valuación, en régimen compuesto, a la tasa periódica efectiva de interés $i$.

Se simbolizará $V_{n_{g}}$ a la suma de los valores actuales de las $n$ cuotas variables en ley geométrica.
Planteando la actualización cuota por cuota obtenemos:
 $$V_{n_{g}}=\\frac{c}{1+i}+\\frac{c\\cdot \\left( 1+g \\right)}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+g \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+g \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+g \\right)^{n-1}}{\\left( 1+i \\right)^{n}}$$ Se observa que en el segundo miembro de la igualdad anterior, se tiene la suma de $n$ términos variables en progresión geométrica de razón $q=\\frac{1+g}{1+i}$.
 $$V_{n_{g}}=\\frac{c\\cdot \\left( 1+g \\right)^{0}}{1+i}+\\frac{c\\cdot \\left( 1+g \\right)^{1}}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+g \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+g \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+g \\right)^{n-1}}{\\left( 1+i \\right)^{n}} $$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [
    {
      "type": "text",
      "content": `[Caso] 
Ajuste contractual por inflación con pagos variables vencidos`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Un alquiler comercial se pacta en $36$ cuotas mensuales vencidas. La primera es de $\$40.000$ y las siguientes aumentan un $4\%$ acumulativo ($g=0.04$) para absorber inflación. Si la tasa de descuento financiero es $6\%$ ($i=0.06$) mensual, halla el valor actual del contrato.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Aplicamos renta inmediata en progresión geométrica vencida 12: $$V_{n\rceil g} = c \cdot \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i - g}$$
$$V_{36\rceil g} = 40000 \cdot \frac{1 - \left(\frac{1.04}{1.06}\right)^{36}}{0.06 - 0.04}$$
$$V_{36\rceil g} = 40000 \cdot \frac{1 - 0.98113^{36}}{0.02} = 40000 \cdot \frac{1 - 0.50406}{0.02}$$
$$V_{36\rceil g} = 40000 \cdot 24.797 = \$991.880$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Cuando $g < i$, el término $(\frac{1+g}{1+i})^n$ converge hacia cero, denotando que el efecto del interés domina sobre el del crecimiento 13.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Valuación de leasing con cuotas de progresión geométrica decreciente`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Una máquina se arrienda por $24$ meses con cuotas mensuales adelantadas. La inicial es $\$20.000$ y decrecen un $1\%$ mensual ($g=-0.01$). Si la tasa es del $3\%$ mensual, determine el valor de contado del bien.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Al ser adelantada, se multiplica por $(1+i)$ 13: $$V'<i>{n\</i><i>rceil</i><i> g} = c \</i><i>cdot</i><i> \frac{1 - \</i><i>left</i><i>(\frac{1+g}{1+i}\</i><i>right</i><i>)^n}{i - g} \</i><i>cdot</i><i> (1+i)$$
$$V'</i>{24\rceil g} = 20000 \cdot \frac{1 - \left(\frac{0.99}{1.03}\right)^{24}}{0.03 - (-0.01)} \cdot 1.03$$
$$V'<i>{24\</i><i>rceil</i><i> g} = 20000 \</i><i>cdot</i><i> \frac{1 - 0.96116^{24}}{0.04} \</i><i>cdot</i><i> 1.03$$
$$V'</i>{24\rceil g} = 20000 \cdot \frac{1 - 0.38654}{0.04} \cdot 1.03 = 20000 \cdot 15.3365 \cdot 1.03 = \$315.931,90$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `La tasa $g$ puede ser negativa indicando cuotas decrecientes. Es crucial mantener el signo algebraico en el denominador $i - (-g) = i + g$ 13.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Situación de indiferencia (Tasa igual al Crecimiento) en pagos vencidos`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Una obligación de $\$1.500.000$ se amortizará en $48$ meses con pagos vencidos crecientes geométricamente al $2\%$ mensual. Si la tasa de interés pactada coincide exactamente con la inflación estimada ($i = 0.02$), halle la cuota $c$.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Cuando $i = g$, la fórmula presenta una indeterminación que se resuelve como 14: $$V_{n\rceil g} = n \cdot \frac{c}{1+i}$$
$$1500000 = 48 \cdot \frac{c}{1.02}$$
$$1500000 \cdot 1.02 = 48 \cdot c$$
$$1530000 = 48 \cdot c \rightarrow c = \$31.875$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Cuando el ritmo de actualización iguala al ritmo de crecimiento ($i=g$), el valor presente de cada cuota se vuelve constante, simplificando radicalmente la ecuación 14.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Reestructuración prepagable en caso de indeterminación`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `El valor actual de un contrato a $60$ meses es de $\$5.000.000$, con cuotas adelantadas que crecen al $1.5\%$ mensual y una tasa de interés idéntica ($i=g=0.015$). Determine la cuota inicial $c$.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `En caso de $i=g$ con rentas adelantadas, multiplicamos la fórmula del caso especial por $(1+i)$ 14: $$V'_{n\rceil g} = n \cdot \frac{c}{1+i} \cdot (1+i) = n \cdot c$$
$$5000000 = 60 \cdot c$$
$$c = \frac{5000000}{60} = \$83.333,33$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `¡Un resultado fascinante de la matemática financiera! Cuando $i=g$ y los pagos son adelantados, el valor actual es simplemente el producto algebraico de la cantidad de pagos y la primera cuota.`
    }
  ],
  "Autoevaluación": [
    {
      "type": "text",
      "content": `[Pregunta] En la fórmula del valor actual de una renta inmediata geométrica vencida $V_{n\rceil g} = c \frac{1 - (\frac{1+g}{1+i})^n}{i - g}$, ¿qué sucede cuando la tasa de crecimiento es idéntica a la tasa de interés ($g=i$)?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) Genera un valor infinito. b) Provoca una indeterminación que se salva y resulta en $n \cdot \frac{c}{1+i}$. c) Provoca que el numerador sea siempre negativo.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. La división original tendería a $\frac{0}{0}$. Al salvarse matemáticamente operando las series desde su sumatoria, se verifica que cada pago actualizado aporta exactamente el mismo valor constante $\frac{c}{1+i}$, totalizando $n \cdot \frac{c}{1+i}$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] Si en una renta geométrica el ratio $\frac{1+g}{1+i} < 1$, ¿qué nos indica esto sobre el comportamiento del valor?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) Que la inflación supera al rendimiento del dinero. b) Que el valor actual decrece sin límite. c) Que la tasa de interés $i$ es estrictamente mayor que el crecimiento $g$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Para que la fracción base sea menor a uno, el denominador $(1+i)$ debe superar al numerador $(1+g)$, por ende $i > g$. Esto asegura la convergencia matemática del valor presente.`
    },
    {
      "type": "text",
      "content": `[Pregunta] ¿Qué modificación estructural sufre la fórmula de la progresión geométrica inmediata cuando los pagos son adelantados?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) La tasa del denominador cambia a $i+g$. b) Toda la fórmula se multiplica por el factor $(1+i)$. c) Se resta una cuota $c$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. El modelo de cuotas adelantadas es idéntico al de cuotas vencidas, a excepción de que todos los valores capitalizan un período extra respecto de la época de evaluación, agregando el factor $(1+i)$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] ¿Puede la tasa de crecimiento $g$ adoptar valores negativos en una renta geométrica?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) Sí, indicaría una renta de cuotas decrecientes porcentualmente en el tiempo. b) No, causaría valores nominales negativos al final. c) Sí, pero sólo si el plazo $n$ es menor a $12$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] a`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. $g$ puede estar acotada entre $0$ y $-1$, reflejando una contracción geométrica progresiva sin llegar nunca a generar cuotas de signo negativo, a diferencia de la progresión aritmética.`
    }
  ],
  "Gráficos": []
};

export default data;
