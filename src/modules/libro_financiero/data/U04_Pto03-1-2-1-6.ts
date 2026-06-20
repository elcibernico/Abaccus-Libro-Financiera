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
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
