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
  "Casos Prácticos": [],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `Para una renta diferida en progresión geométrica vencida, el factor multiplicador de todo el corchete de pagos es:`,
      "options": [
      "A) $(1+i)^{-n}$.",
      "B) $(1+i)^d$.",
      "C) $(1+i)^{-d}$."
      ],
      "feedback": `Correcto. Para el diferimiento de $d$ períodos en modalidad vencida, el bloque de la renta debe retrotraerse en la línea de tiempo usando el factor de actualización compuesto clásico $(1+i)^{-d}$.`,
      "correctIndex": 2
    },
    {
      "type": "quiz",
      "question": `Cuando una renta en progresión geométrica combina cuotas adelantadas y un diferimiento $d$, ¿cuál es el factor de ajuste global aplicado sobre el núcleo del modelo?`,
      "options": [
      "A) $(1+i)^{-d}$.",
      "B) $(1+i)^{-(d-1)}$.",
      "C) $(1+i)^{-(d+1)}$."
      ],
      "feedback": `Correcto. Como se evidenció en la teoría, este tipo de operaciones equivale financieramente a diferir una renta vencida por un período menos, resultando el factor final en $-(d-1)$.`,
      "correctIndex": 1
    },
    {
      "type": "quiz",
      "question": `En una situación de indiferencia donde $i=g$, para una obligación diferida adelantada, la ecuación de valuación final sería:`,
      "options": [
      "A) $n \\cdot c \\cdot (1+i)^{-d}$.",
      "B) $n \\cdot c \\cdot (1+i)^{-(d-1)}$.",
      "C) $\\frac{c}{n} \\cdot (1+i)^{-d}$."
      ],
      "feedback": `Correcto. El núcleo es $n \\cdot c$ (por la combinación del $i=g$ en adelantadas que simplifica el denominador $1+i$ con el factor $(1+i)$ de prepago), y a eso se le adosa el descuento diferido $-(d-1)$.`,
      "correctIndex": 1
    },
    {
      "type": "quiz",
      "question": `¿A qué equivale la renta geométrica diferida adelantada según los principios de la cátedra?`,
      "options": [
      "A) A una renta adelantada multiplicada por la tasa.",
      "B) A una renta inmediata con $n-d$ períodos.",
      "C) A una renta temporaria diferida por $(d-1)$ períodos con cuotas vencidas."
      ],
      "feedback": `Correcto. Algebraicamente, es posible deducir que la anticipación intrínseca de la cuota adelantada consume un período de gracia del diferimiento formal.`,
      "correctIndex": 2
    }
  ],
  "Gráficos": []
};

export default data;
