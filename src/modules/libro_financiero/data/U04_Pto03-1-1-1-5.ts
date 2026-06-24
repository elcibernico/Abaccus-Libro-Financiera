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
  "Casos Prácticos": [],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `¿Con qué factor se desplaza al pasado una renta temporaria anticipada vencida en progresión aritmética?`,
      "options": [
      "A) $(1+i)^{a}$.",
      "B) $(1+i)^{-a}$.",
      "C) $(1+i)^{-(n-",
      "D) }$."
      ],
      "feedback": `Correcto. Como la época inicial es anterior a la época de valuación en $a$ períodos, el conjunto descontado a su inicio debe ser "llevado" hacia adelante (capitalizado) multiplicándolo por $(1+i)^a$.`,
      "correctIndex": 0
    },
    {
      "type": "quiz",
      "question": `Para una renta anticipada en progresión aritmética, si las cuotas fuesen adelantadas, el exponente capitalizador global será:`,
      "options": [
      "A) $a$.",
      "B) $a-1$.",
      "C) $a+1$."
      ],
      "feedback": `Correcto. La combinación de la anticipación de $a$ períodos más el efecto capitalizador propio de las rentas adelantadas (multiplicar por $1+i$) resulta en un exponente global combinado de $a+1$.`,
      "correctIndex": 2
    },
    {
      "type": "quiz",
      "question": `Si el parámetro de anticipación iguala a la cantidad de cuotas ($a = n$) en una renta con progresión aritmética, la fórmula degenera en:`,
      "options": [
      "A) Una renta vitalicia.",
      "B) Un valor actual nulo.",
      "C) El modelo exacto de una Imposición."
      ],
      "feedback": `Correcto. Cuando la época de valuación se traslada $n$ períodos hacia el futuro respecto al inicio, coincide con el momento final, transformándose conceptual y algebraicamente en un valor final o Imposición.`,
      "correctIndex": 2
    },
    {
      "type": "quiz",
      "question": `En una estructura anticipada decreciente ($r < 0$), ¿qué precaución se debe tener en la evaluación de la rentabilidad implícita?`,
      "options": [
      "A) Que el término $-n \\cdot v^n$ anule al gradiente.",
      "B) Comprobar que el último pago descontado no genere rentabilidad negativa.",
      "C) Verificar que el capital base garantice $c_{n} > 0$."
      ],
      "feedback": `Correcto. Como regla de oro en progresiones aritméticas decrecientes, sin importar el desplazamiento temporal ($d$ o $a$), la última cuota siempre debe arrojar un valor pecuniario positivo.`,
      "correctIndex": 2
    }
  ],
  "Gráficos": []
};

export default data;
