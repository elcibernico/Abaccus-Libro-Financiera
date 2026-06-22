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
  "Casos Prácticos": [],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `¿Qué multiplicador externo corresponde a la fórmula del valor de una renta anticipada en progresión geométrica y pagos vencidos?`,
      "options": [
      "A) $(1+i)^a$.",
      "B) $(1+i)^{a+1}$.",
      "C) $(1+i)^{-a}$."
      ],
      "feedback": `Correcto. La anticipación requiere capitalizar todo el bloque ya consolidado en $t_{inicial}$ para desplazarlo hacia el futuro por $a$ intervalos, multiplicando la estructura por $(1+i)^a$.`,
      "correctIndex": 0
    },
    {
      "type": "quiz",
      "question": `Para una renta anticipada prepagable (adelantada) en crecimiento geométrico, el exponente capitalizador que se adiciona a la base temporal es:`,
      "options": [
      "A) $a$.",
      "B) $a+1$.",
      "C) $a-1$."
      ],
      "feedback": `Correcto. El factor de ajuste unifica la capitalización proveniente de la anticipación de la renta $(1+i)^a$ con la originada por la calidad prepagable de la cuota $(1+i)^1$, deviniendo en $a+1$.`,
      "correctIndex": 1
    },
    {
      "type": "quiz",
      "question": `¿Cómo impacta un $g < 0$ sostenido (decrecimiento continuo) sobre el factor $(1+g)^n$ a la hora de valuar la renta anticipada?`,
      "options": [
      "A) El factor asume valores negativos alterando el signo de la ecuación.",
      "B) El factor colapsa a infinito.",
      "C) El factor decae asintóticamente a cero limitando el flujo total."
      ],
      "feedback": `Correcto. Como $1+g$ será una fracción menor a $1$ (por ejemplo, $0.98$), al elevarse a potencias altas decae, atenuando el impacto de los pagos distantes en la sumatoria de la renta sin volverlos negativos.`,
      "correctIndex": 2
    },
    {
      "type": "quiz",
      "question": `En una imposición geométrica (caso especial de renta anticipada con $a=n$), ¿qué sucede matemáticamente con el valor final si $i = g$?`,
      "options": [
      "A) El valor final es nulo.",
      "B) El valor se simplifica y crece aritméticamente dependiendo sólo del núcleo de $c \cdot n$.",
      "C) El valor es incalculable."
      ],
      "feedback": `Correcto. Si salvamos la indeterminación para el valor final cuando $i=g$, la estructura completa colapsa a la sumatoria directa ponderada de los nominales capitalizados que se simplifican iterativamente en sus tasas.`,
      "correctIndex": 1
    }
  ],
  "Gráficos": []
};

export default data;
