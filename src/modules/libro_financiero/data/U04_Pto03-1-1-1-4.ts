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
  "Casos Prácticos": [],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `En el modelo de una renta temporaria diferida vencida en progresión aritmética, ¿cuál es el factor de desplazamiento temporal correcto?`,
      "options": [
      "A) $(1+i)^{-(d-1)}$.",
      "B) $(1+i)^{d}$.",
      "C) $(1+i)^{-d}$."
      ],
      "feedback": `Correcto. Como la renta es vencida y diferida, el bloque entero de cuotas valuado a su inicio ficticio se descuenta al presente multiplicándolo exactamente por $(1+i)^{-d}$.`,
      "correctIndex": 2
    },
    {
      "type": "quiz",
      "question": `¿Cuál es el exponente de actualización para una renta diferida con cuotas adelantadas en progresión aritmética?`,
      "options": [
      "A) $-d$.",
      "B) $-(d-1)$.",
      "C) $d+1$."
      ],
      "feedback": `Correcto. Al tratarse de cuotas adelantadas (prepagables), la primera cuota ya está ubicada al inicio del bloque de pagos, por lo que el diferimiento efectivo respecto del momento de valuación se acorta a $d-1$.`,
      "correctIndex": 1
    },
    {
      "type": "quiz",
      "question": `El principio de equivalencia financiera dicta que un conjunto diferido en progresión aritmética adelantada tiene un factor equivalente a:`,
      "options": [
      "A) Una renta vencida diferida por $d-1$ períodos.",
      "B) Una renta vencida capitalizada por $d$ períodos.",
      "C) Una imposición multiplicada por $v^n$."
      ],
      "feedback": `Correcto. La matemática financiera demuestra que diferir una renta adelantada por $d$ equivale conceptual y numéricamente a diferir la misma renta, pero vencida, por un período menos ($d-1$).`,
      "correctIndex": 0
    },
    {
      "type": "quiz",
      "question": `Si en una fórmula diferida el término $\\frac{r}{i}$ multiplica a todo el bloque, ¿qué concepto subyacente de la cuota se está capturando?`,
      "options": [
      "A) El fondo amortizante.",
      "B) El límite infinito de la razón $r$.",
      "C) La cuota base $c$."
      ],
      "feedback": `Correcto. La fracción $\\frac{r}{i}$ representa matemáticamente el valor de una perpetuidad cuya cuota constante fuera la razón de la progresión, utilizada como artificio para modelar el gradiente finito.`,
      "correctIndex": 1
    }
  ],
  "Gráficos": []
};

export default data;
