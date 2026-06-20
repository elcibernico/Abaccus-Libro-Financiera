const data = {
  "id": "4.3.1.1.1.5",
  "title": "Punto 4.3.1.1.1.5",
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
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
