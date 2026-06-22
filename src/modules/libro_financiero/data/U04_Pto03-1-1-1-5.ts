const data = {
  "id": "4.3.1.1.1.5",
  "title": "Rentas temporarias anticipadas con cuotas variables en progresión aritmética",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Rentas temporarias anticipadas con cuotas variables en progresión aritmética</b></u>

En las rentas anticipadas, la época inicial ($EI$) se ubica de forma anterior a la época de valuación ($EV$). Es un escenario mixto característico de los planes de ahorro previo.
Se simbolizará \${}^{\\text{a}}/{V_{n_{a}}}$ al valor actual de $n$ términos de renta variables en ley aritmética, de los cuales exactamente “$\\text{a}$” términos han sido anticipados a la verdadera época de valuación.
`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción del valor financiero (Cuotas Vencidas)</b></u>

Nuevamente partimos de la "renta madre" (inmediata). Dado que el origen de la renta se encuentra desplazado hacia atrás en el tiempo respecto a nuestra época de valuación, el valor equivalente calculado en la época inicial ($V_{n_{a}}$) debe ser proyectado hacia adelante (capitalizado) por la cantidad de períodos de anticipación “$\\text{a}$”

Multiplicamos el modelo inmediato base por el factor de capitalización simple $\\left( 1+i \\right)^{\\text{a}}$:
 $\${}^{\\text{a}}/{V_{n_{a}}}=V_{n_{a}}\\cdot \\left( 1+i \\right)^{\\text{a}}$$
$\${}^{\\text{a}}/{V_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{\\text{a}}$$`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción del valor financiero (Cuotas Adelantadas)</b></u>

Si la operación establece cuotas pagaderas al inicio de cada período (adelantadas), la simbología añade un apóstrofo: \${}^{\\text{a}}/{V'_{n_{a}}}$. De igual forma que antes, debemos afectar a toda la expresión base de las vencidas por el factor $\\left( 1+i \\right)$:
 $\${}^{\\text{a}}/{V'_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{\\text{a}}\\cdot \\left( 1+i \\right)$$`
    },
    {
      "type": "text",
      "content": `<b>Artilugio matemático:</b> Aplicando de nuevo la propiedad del producto de potencias de igual base, procedemos a sumar los exponentes de los factores de desplazamiento ($\\left( 1+i \\right)^{\\text{a}}\\cdot \\left( 1+i \\right)^{1}$), dando como resultado final “$\\text{\\text{a}}+1$”.

La fórmula definitiva se condensa de la siguiente manera:
 $\${}^{\\text{a}}/{V'_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{\\text{a}+1}$$
<b>Conclusión:</b> 
Se demuestra que una renta temporaria anticipada por “$\\text{a}$” períodos con cuotas adelantadas variables en progresión aritmética equivale financieramente a la misma renta con cuotas vencidas, pero cuya anticipación total abarca $\\left( \\text{a}+1 \\right)$ períodos. Dicho de otro modo, la anticipación efectiva es de un período más.
`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [
    {
      "type": "text",
      "content": `[Caso] 
Capitalización pre-contractual vencida
[Enunciado]
Un comprador se compromete a $12$ pagos trimestrales vencidos que crecen aritméticamente en $\$1.000$, partiendo de $\$15.000$. Sin embargo, se estipula que el valor del bien se define capitalizando esta serie por $2$ trimestres antes del inicio de pagos (renta anticipada, $a=2$). Tasa del $5\%$ trimestral.
[Solución]
Aplicamos la renta anticipada en progresión aritmética vencida 11: $$<i>{a/}V</i>{n\rceil a} = \left(c + \frac{r}{i}) \cdot a_{n\rceil i} - \frac{r}{i} \cdot n \cdot (1+i)^{-n} \right \cdot (1+i)^a$$
$$<i>{2/}V</i>{12\rceil a} = \left(15000 + \frac{1000}{0.05}) \cdot \frac{1 - 1.05^{-12}}{0.05} - \frac{1000}{0.05} \cdot 12 \cdot 1.05^{-12} \right \cdot 1.05^2$$
$$<i>{2/}V</i>{12\rceil a} = \left(15000 + 20000) \cdot 8.86325 - 20000 \cdot 12 \cdot 0.55683 \right \cdot 1.1025$$
$$<i>{2/}V</i>{12\rceil a} = \left310213.75 - 133639.20 \right \cdot 1.1025 = \$194.673,44$$
[Highlights]
Cuando la renta se anticipa, el conjunto entero de los valores descontados se desplaza capitalizándolo por $a$ períodos usando $(1+i)^a$ 11.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Consolidación anticipada con cuotas adelantadas
[Enunciado]
Una persona depositará $36$ cuotas mensuales adelantadas decrecientes en $\$200$ empezando en $\$12.000$. Al $2\%$ mensual, desea saber cuál sería el valor del ahorro si lo retirara $4$ meses después de la época inicial ($a=4$).
[Solución]
Renta anticipada con cuotas adelantadas, multiplicada por $(1+i)^{a+1}$ 11: $$<i>{a/}V'</i>{n\rceil a} = \left(c + \frac{r}{i}) \cdot a_{n\rceil i} - \frac{r}{i} \cdot n \cdot v^n \right \cdot (1+i)^{a+1}$$
$$<i>{4/}V'</i>{36\rceil a} = \left(12000 - \frac{200}{0.02}) \cdot a_{36\rceil 0.02} - \frac{-200}{0.02} \cdot 36 \cdot 1.02^{-36} \right \cdot 1.02^5$$
$$<i>{4/}V'</i>{36\rceil a} = \left(12000 - 10000) \cdot 25.4888 + 10000 \cdot 36 \cdot 0.49022 \right \cdot 1.10408$$
$$<i>{4/}V'</i>{36\rceil a} = \left50977.60 + 176479.20 \right \cdot 1.10408 = \$251.127,15$$
[Highlights]
Esta variante es teóricamente la más potente, sumando el efecto adelantado y la anticipación pura, lo que eleva el factor a $a+1$.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Despeje de base de ahorro en pre-capitalización
[Enunciado]
Se desea obtener un valor financiero anticipado en $5$ meses de $\$800.000$ (es decir, valuado en $t=-5$). Se constituirán $20$ pagos mensuales vencidos crecientes en $\$500$ al $3\%$ mensual. Determine el aporte inicial $c$.
[Solución]
Usamos la ecuación vencida anticipada: $$<i>{a/}V</i>{n\rceil a} = \left(c + \frac{r}{i}) \cdot a_{n\rceil i} - \frac{r}{i} \cdot n \cdot (1+i)^{-n} \right \cdot (1+i)^a$$
$$800000 = \left(c + \frac{500}{0.03}) \cdot 14.87747 - \frac{500}{0.03} \cdot 20 \cdot 1.03^{-20} \right \cdot 1.03^5$$
$$800000 = \left(c + 16666.67) \cdot 14.87747 - 16666.67 \cdot 20 \cdot 0.55367 \right \cdot 1.15927$$
$$690089.45 = 14.87747 \cdot c + 247957.83 - 184556.66$$
$$626688.28 = 14.87747 \cdot c \rightarrow c = \$42.123,31$$
[Highlights]
Nuevamente, pasar el factor $(1+i)^a$ dividiendo agiliza drásticamente el proceso algebraico para no contaminar la constante $c$.
`
    },
    {
      "type": "text",
      "content": `[Caso]
Rentabilidad sobre anticipación decreciente límite
[Enunciado]
Se valuó una cartera en $t=-2$ ($a=2$) en $\$2.000.000$. Comprende $24$ cobros mensuales adelantados partiendo de $\$150.000$ con decremento aritmético. Si la tasa es del $2.5\%$ mensual, determine $r$.
[Solución]
La fórmula para adelantada anticipada 11: $$<i>{a/}V'</i>{n\rceil a} = \leftc \cdot a_{n\rceil i} + \frac{r}{i} (a_{n\rceil i} - n v^n) \right \cdot (1+i)^{a+1}$$
$$2000000 = \left150000 \cdot 17.88499 + \frac{r}{0.025} (17.88499 - 24 \cdot 0.55287) \right \cdot 1.025^3$$
$$2000000 = \left2682748.5 + 40 \cdot r \cdot (17.88499 - 13.26888) \right \cdot 1.07689$$
$$1857199.90 = 2682748.5 + 184.6444 \cdot r$$
$$-825548.60 = 184.6444 \cdot r \rightarrow r = -\$4.471,02$$
[Highlights]
Evaluar rentas pre-pagables en escenarios descontados negativamente en la escala temporal requiere dominio de la posición de los capitales. La cuota final verifica positividad: $150000 - 23 \cdot 4471.02 > 0$.
`
    }
  ],
  "Autoevaluación": [
    {
      "type": "text",
      "content": `[Pregunta] ¿Con qué factor se desplaza al pasado una renta temporaria anticipada vencida en progresión aritmética?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $(1+i)^{a}$. b) $(1+i)^{-a}$. c) $(1+i)^{-(n-a)}$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] a`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Como la época inicial es anterior a la época de valuación en $a$ períodos, el conjunto descontado a su inicio debe ser "llevado" hacia adelante (capitalizado) multiplicándolo por $(1+i)^a$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] Para una renta anticipada en progresión aritmética, si las cuotas fuesen adelantadas, el exponente capitalizador global será:`
    },
    {
      "type": "text",
      "content": `[Opciones] a) $a$. b) $a-1$. c) $a+1$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. La combinación de la anticipación de $a$ períodos más el efecto capitalizador propio de las rentas adelantadas (multiplicar por $1+i$) resulta en un exponente global combinado de $a+1$.`
    },
    {
      "type": "text",
      "content": `[Pregunta] Si el parámetro de anticipación iguala a la cantidad de cuotas ($a = n$) en una renta con progresión aritmética, la fórmula degenera en:`
    },
    {
      "type": "text",
      "content": `[Opciones] a) Una renta vitalicia. b) Un valor actual nulo. c) El modelo exacto de una Imposición.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Cuando la época de valuación se traslada $n$ períodos hacia el futuro respecto al inicio, coincide con el momento final, transformándose conceptual y algebraicamente en un valor final o Imposición.`
    },
    {
      "type": "text",
      "content": `[Pregunta] En una estructura anticipada decreciente ($r < 0$), ¿qué precaución se debe tener en la evaluación de la rentabilidad implícita?`
    },
    {
      "type": "text",
      "content": `[Opciones] a) Que el término $-n \cdot v^n$ anule al gradiente. b) Comprobar que el último pago descontado no genere rentabilidad negativa. c) Verificar que el capital base garantice $c_{n} > 0$.`
    },
    {
      "type": "text",
      "content": `[Respuesta Correcta] c`
    },
    {
      "type": "text",
      "content": `[Feedback] Correcto. Como regla de oro en progresiones aritméticas decrecientes, sin importar el desplazamiento temporal ($d$ o $a$), la última cuota siempre debe arrojar un valor pecuniario positivo.`
    }
  ],
  "Gráficos": []
};

export default data;
