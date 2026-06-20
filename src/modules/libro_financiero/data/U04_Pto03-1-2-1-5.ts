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
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
