const data = {
  "id": "4.3.1.2.1.6",
  "title": "Rentas temporarias anticipadas con cuotas variables en progresión geométrica",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Rentas temporarias anticipadas con cuotas variables en progresión geométrica.</b>

Por ser anticipada, la época inicial es anterior a la época de valuación. Se simbolizará \${}^{\\text{a}}/{V_{n_{g}}}$ al valor actual de $n$ términos de renta variables en ley geométrica, de los cuales $\\text{a}$ términos han sido anticipados a la época de valuación.
Para obtener el valor financiero correspondiente a esta renta, simplemente se aplicará el factor de anticipación al valor actual de la renta temporaria inmediata variable en ley geométrica.
 $\${}^{\\text{a}}/{V_{n_{g}}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{\\text{a}}$$
Si fuera con cuotas adelantadas, se agrega como siempre el factor $\\left( 1+i \\right)$ y en la simbología del valor financiero de la renta se agrega el apóstrofo:
$\${}^{\\text{a}}/{V'_{n_{g}}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{\\text{a}}\\cdot \\left( 1+i \\right)$$ 
Si se quiere se puede aplicar producto de potencias de igual base, lo que permite concluir que una renta temporaria anticipada por $\\text{a}$ períodos con cuotas adelantadas variables en ley geométrica, equivale a una renta temporaria anticipada por $\\left( \\text{a}+1 \\right)$ períodos con cuotas vencidas variables en ley geométrica, es decir, la anticipación es por un período más:
 $\${}^{\\text{a}}/{V'_{n_{g}}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{\\text{a}+1}$$`
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
      "content": `Capitalización de preinversión minera vencida`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Una mina producirá por $60$ meses. Rendimientos mensuales vencidos decrecientes al $1.5\%$ mensual ($g=-0.015$). El primer pago es $\$200.000$. Determine el valor de toda la serie en el momento $-8$ ($a=8$). Tasa $2\%$ mensual.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Renta anticipada vencida 16: $$<i>{a/}V</i>{n\rceil g} = c \cdot \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i - g} \cdot (1+i)^a$$
$$<i>{8/}V</i>{60\rceil g} = 200000 \cdot \frac{1 - \left(\frac{0.985}{1.02}\right)^{60}}{0.02 - (-0.015)} \cdot 1.02^8$$
$$<i>{8/}V</i>{60\rceil g} = 200000 \cdot \frac{1 - 0.96568^{60}}{0.035} \cdot 1.17165$$
$$<i>{8/}V</i>{60\rceil g} = 200000 \cdot 25.0487 \cdot 1.17165 = \$5.869.664,57$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Valuar reservas no extraídas en períodos previos al de maduración ("preinversión") utiliza rentas anticipadas, reflejando el costo de oportunidad del capital en espera.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Valuación de leasing de flotas en mercado de expansión pre-pagable`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Se arriendan vehículos por $24$ meses. Pagos mensuales adelantados que crecen $1\%$ mensual. Primer pago $\$45.000$. Al $1.5\%$ mensual, determine el valor consolidado de este contrato $5$ meses antes ($a=5$).`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `Renta anticipada adelantada 16: $$<i>{a/}V'</i>{n\rceil g} = c \cdot \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i - g} \cdot (1+i)^{a+1}$$
$$<i>{5/}V'</i>{24\rceil g} = 45000 \cdot \frac{1 - \left(\frac{1.01}{1.015}\right)^{24}}{0.015 - 0.01} \cdot 1.015^6$$
$$<i>{5/}V'</i>{24\rceil g} = 45000 \cdot \frac{1 - 0.99507^{24}}{0.005} \cdot 1.09344$$
$$<i>{5/}V'</i>{24\rceil g} = 45000 \cdot 22.386 \cdot 1.09344 = \$1.101.503,66$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Al anticipar una renta prepagable, el efecto combinado genera un impulso de capitalización reflejado en el exponente $(a+1)$.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Reconstitución del flujo de fondos de patentes`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Un inventor cederá sus regalías por $36$ meses. El flujo será vencido, creciente al $3\%$ mensual, valuado $10$ meses antes de su inicio en $\$2.500.000$ ($a=10$). A una tasa del $4\%$ mensual, halla la primera regalía esperada.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `$$<i>{a</i><i>/}V</i>{n\rceil g} = c \cdot \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i - g} \cdot (1+i)^a$$
$$2500000 = c \cdot \frac{1 - \left(\frac{1.03}{1.04}\right)^{36}}{0.04 - 0.03} \cdot 1.04^{10}$$
$$2500000 = c \cdot 29.5699 \cdot 1.48024$$
$$2500000 = 43.7705 \cdot c \rightarrow c = \$57.116,09$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Este enfoque es clave en la estructuración de capital de riesgo para startups y derechos de propiedad intelectual, calculando la rentabilidad futura esperada.`
    },
    {
      "type": "text",
      "content": `[Caso]`
    },
    {
      "type": "text",
      "content": `Blindaje financiero por pre-compra de energía ($i=g$)`
    },
    {
      "type": "text",
      "content": `[Enunciado]`
    },
    {
      "type": "text",
      "content": `Se adquiere energía eólica a futuro. Pagos mensuales adelantados por $48$ meses creciendo al $2\%$ mensual. Tasa descuento $2\%$ mensual. Si la valoración efectuada $6$ meses previos ($a=6$) dio $\$10.000.000$, halle el canon inicial.`
    },
    {
      "type": "text",
      "content": `[Solución]`
    },
    {
      "type": "text",
      "content": `En rentas adelantadas anticipadas con $i=g$, el factor interno es $n \cdot c$, multiplicado por el desplazamiento $(1+i)^a$: $$<i>{a</i><i>/}V</i><i>'</i>{n\rceil g} = n \cdot c \cdot (1+i)^a$$
$$10000000 = 48 \cdot c \cdot 1.02^6$$
$$10000000 = 48 \cdot c \cdot 1.12616$$
$$10000000 = 54.0558 \cdot c \rightarrow c = \$184.993,91$$`
    },
    {
      "type": "text",
      "content": `[Highlights]`
    },
    {
      "type": "text",
      "content": `Cuando se cruzan la inflación controlada ($g$) con la tasa neutra de mercado ($i$) y además existen distorsiones adelantadas/anticipadas, el modelo matemático revela una transparencia estructural absoluta en el multiplicador.`
    }
  ],
  "Autoevaluación": [
    {
      "type": "text",
      "content": `[Pregunta] ¿Qué multiplicador externo corresponde a la fórmula del valor de una renta anticipada en progresión geométrica y pagos vencidos?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $(1+i)^a$. b) $(1+i)^{a+1}$. c) $(1+i)^{-a}$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] a`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. La anticipación requiere capitalizar todo el bloque ya consolidado en $t_{inicial}$ para desplazarlo hacia el futuro por $a$ intervalos, multiplicando la estructura por $(1+i)^a$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] Para una renta anticipada prepagable (adelantada) en crecimiento geométrico, el exponente capitalizador que se adiciona a la base temporal es:`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $a$. b) $a+1$. c) $a-1$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. El factor de ajuste unifica la capitalización proveniente de la anticipación de la renta $(1+i)^a$ con la originada por la calidad prepagable de la cuota $(1+i)^1$, deviniendo en $a+1$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] ¿Cómo impacta un $g < 0$ sostenido (decrecimiento continuo) sobre el factor $(1+g)^n$ a la hora de valuar la renta anticipada?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) El factor asume valores negativos alterando el signo de la ecuación. b) El factor colapsa a infinito. c) El factor decae asintóticamente a cero limitando el flujo total.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Como $1+g$ será una fracción menor a $1$ (por ejemplo, $0.98$), al elevarse a potencias altas decae, atenuando el impacto de los pagos distantes en la sumatoria de la renta sin volverlos negativos.`
    },
    {
      "type": "text",
      "content": `[Pregunta] En una imposición geométrica (caso especial de renta anticipada con $a=n$), ¿qué sucede matemáticamente con el valor final si $i = g$?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) El valor final es nulo. b) El valor se simplifica y crece aritméticamente dependiendo sólo del núcleo de $c \cdot n$. c) El valor es incalculable.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] b`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Si salvamos la indeterminación para el valor final cuando $i=g$, la estructura completa colapsa a la sumatoria directa ponderada de los nominales capitalizados que se simplifican iterativamente en sus tasas.`
    }
  ],
  "Gráficos": []
};

export default data;
