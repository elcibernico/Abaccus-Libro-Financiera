const data = {
  "id": "4.3.1.2.1.5",
  "title": "Rentas temporarias diferidas con cuotas variables en progresión geométrica",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Rentas temporarias diferidas con cuotas variables en progresión geométrica.</b>

Por ser diferida, la época inicial es posterior a la época de valuación. Se simbolizará \${}^{-d}/{V_{n_{g}}}$ al valor actual de $n$ términos de renta variables en ley geométrica, cuyo primer término se abona al final del primer período, después de transcurridos $d$ períodos.
Para obtener el valor financiero correspondiente a esta renta, simplemente se aplicará el factor de diferimiento al valor actual de la renta temporaria inmediata variable en ley geométrica.
 $\${}^{-d}/{V_{n_{g}}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{-d}$$ Si fuera con cuotas adelantadas, se agrega como siempre el factor $\\left( 1+i \\right)$ y en la simbología del valor financiero de la renta se agrega el apóstrofo:
 $\${}^{-d}/{V'_{n_{g}}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{-d}\\cdot \\left( 1+i \\right)$$ 
Si se quiere se puede aplicar producto de potencias de igual base, lo que permite concluir que una renta temporaria diferida por $d$ períodos con cuotas adelantadas variables en ley geométrica, equivale a una renta temporaria diferida por $\\left( d-1 \\right)$ períodos con cuotas vencidas variables en ley geométrica, es decir, el diferimiento es por un período menos:
 $\${}^{-d}/{V_{n_{g}}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{-\\left( d-1 \\right)}$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Valuación de canon por concesión pública diferida`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Un municipio concesiona un terreno. El locatario abonará $120$ cuotas mensuales vencidas que crecerán un $0.5\%$ mensual, partiendo de $\$10.000$. El primer pago se efectuará al final del mes $12$ ($d=11$). Tasa de mercado: $1.2\%$ mensual. Determine el valor de la concesión.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Renta geométrica diferida vencida 15: $$<i>{-d/}V</i>{n\rceil g} = c \cdot \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i - g} \cdot (1+i)^{-d}$$
$$<i>{-11/}V</i>{120\rceil g} = 10000 \cdot \frac{1 - \left(\frac{1.005}{1.012}\right)^{120}}{0.012 - 0.005} \cdot 1.012^{-11}$$
$$<i>{-11/}V</i>{120\rceil g} = 10000 \cdot \frac{1 - 0.99308^{120}}{0.007} \cdot 0.87697$$
$$<i>{-11/}V</i>{120\rceil g} = 10000 \cdot 80.8142 \cdot 0.87697 = \$708.716,21$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Las concesiones a largo plazo a menudo contienen períodos de gracia de la obra. El diferimiento puro actualiza toda la corriente geométrica en un solo bloque.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Compra de licencia de software con gracia parcial prepagable`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Una licencia se paga en $36$ meses. Cuotas mensuales adelantadas que crecen un $2.5\%$ mensual. Primera cuota: $\$5.000$. Se acuerda no abonar durante los $4$ primeros meses (el pago inicia el mes $5$, $d=4$). Tasa: $4\%$ mensual. Halle su valor financiero.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Diferida adelantada requiere exponente $-(d-1)$ 15: $$<i>{-d/}V'</i>{n\rceil g} = c \cdot \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i - g} \cdot (1+i)^{-(d-1)}$$
$$<i>{-4/}V'</i>{36\rceil g} = 5000 \cdot \frac{1 - \left(\frac{1.025}{1.04}\right)^{36}}{0.04 - 0.025} \cdot 1.04^{-3}$$
$$<i>{-4/}V'</i>{36\rceil g} = 5000 \cdot \frac{1 - 0.98557^{36}}{0.015} \cdot 0.88899$$
$$<i>{-4/}V'</i>{36\rceil g} = 5000 \cdot 27.1352 \cdot 0.88899 = \$120.615,22$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Cuando el prepago interactúa con el diferimiento, la primera cuota cae sobre el inicio del mes 5, lo que en tiempo vencido equivale al final del mes 4.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Rescate de cartera de créditos en crecimiento geométrico`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Un banco cede una cartera de $48$ pagos mensuales vencidos, crecientes al $2\%$ mensual. Se pagarán luego de $6$ meses de gracia ($d=6$). El valor cedido hoy es $\$1.000.000$. Tasa $3\%$ mensual. Determine el primer pago $c$.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Despejamos de la fórmula 15: $$<i>{-d</i><i>/}V</i>{n\rceil g} = c \cdot \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i - g} \cdot (1+i)^{-d}$$
$$1000000 = c \cdot \frac{1 - \left(\frac{1.02}{1.03}\right)^{48}}{0.03 - 0.02} \cdot 1.03^{-6}$$
$$1000000 = c \cdot 37.6033 \cdot 0.83748$$
$$1000000 = c \cdot 31.4920 \rightarrow c = \$31.754,09$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `La venta de carteras diferidas exige modelizar la corriente del flujo sin distorsión temporal. El descuento compuesto absorbe el riesgo del diferimiento.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Indiferencia financiera en pasivo diferido`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Para una deuda que se pagará en $24$ meses con pagos adelantados y gracia de $3$ meses (inicio en mes $4$, $d=3$), se fijó $i=g=0.03$. Si el valor actual de la obligación es $\$750.000$, determine el valor del pago inicial.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Empleamos la variante para $i=g$ en diferidas adelantadas: $$<i>{-d</i><i>/}V</i><i>'</i>{n\rceil g} = n \cdot c \cdot (1+i)^{-(d-1)}$$
$$750000 = 24 \cdot c \cdot 1.03^{-2}$$
$$750000 = 24 \cdot c \cdot 0.94259$$
$$750000 = 22.62216 \cdot c \rightarrow c = \$33.153,33$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Incluso con la complejidad del diferimiento, cuando $i=g$ la reducción algebraica demuestra la consistencia del teorema de equivalencia del interés compuesto.`
    }
  ],
  "Autoevaluación": [
    {
      "type": "text",
      "content": `[Pregunta] Para una renta diferida en progresión geométrica vencida, el factor multiplicador de todo el corchete de pagos es:`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $(1+i)^{-n}$. b) $(1+i)^d$. c) $(1+i)^{-d}$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Para el diferimiento de $d$ períodos en modalidad vencida, el bloque de la renta debe retrotraerse en la línea de tiempo usando el factor de actualización compuesto clásico $(1+i)^{-d}$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] Cuando una renta en progresión geométrica combina cuotas adelantadas y un diferimiento $d$, ¿cuál es el factor de ajuste global aplicado sobre el núcleo del modelo?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $(1+i)^{-d}$. b) $(1+i)^{-(d-1)}$. c) $(1+i)^{-(d+1)}$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Como se evidenció en la teoría, este tipo de operaciones equivale financieramente a diferir una renta vencida por un período menos, resultando el factor final en $-(d-1)$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] En una situación de indiferencia donde $i=g$, para una obligación diferida adelantada, la ecuación de valuación final sería:`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $n \cdot c \cdot (1+i)^{-d}$. b) $n \cdot c \cdot (1+i)^{-(d-1)}$. c) $\frac{c}{n} \cdot (1+i)^{-d}$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. El núcleo es $n \cdot c$ (por la combinación del $i=g$ en adelantadas que simplifica el denominador $1+i$ con el factor $(1+i)$ de prepago), y a eso se le adosa el descuento diferido $-(d-1)$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] ¿A qué equivale la renta geométrica diferida adelantada según los principios de la cátedra?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) A una renta adelantada multiplicada por la tasa. b) A una renta inmediata con $n-d$ períodos. c) A una renta temporaria diferida por $(d-1)$ períodos con cuotas vencidas.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Algebraicamente, es posible deducir que la anticipación intrínseca de la cuota adelantada consume un período de gracia del diferimiento formal.`
    }
  ],
  "Gráficos": []
};

export default data;
