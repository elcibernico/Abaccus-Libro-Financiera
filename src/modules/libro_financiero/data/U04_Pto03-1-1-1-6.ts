const data = {
  "id": "4.3.1.1.1.6",
  "title": "Imposiciones con cuotas variables",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Imposiciones con cuotas variables</b>.

Una imposición es una renta en la cual el objetivo principal es la formación de un capital final y su época de valuación coincide exactamente con su Época Final. 
Podemos abordar a las imposiciones como un <b>caso particular de las rentas anticipadas</b> en el cual todas las cuotas se anticipan a la época de valuación, es decir, el número de cuotas anticipadas “$\\text{a}$” es exactamente igual al total de cuotas “$n$” $\\left( \\text{a}=n \\right)$.
`
    },
    {
      "type": "text",
      "content": `<u><b>Caso particular: Imposiciones con cuotas variables en progresión aritmética</b></u>

En este escenario, buscamos determinar el valor final (o monto) reunido tras depositar $n$ cuotas que varían sumando o restando una razón constante $r$.
`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción para cuotas vencidas (</b></u>$S_{n_{a}}$<u><b>)</b></u>

Partimos de la fórmula general de una renta temporaria anticipada con cuotas variables en progresión aritmética, valuada al momento de la época de valuación:
 $\${}^{\\text{a}}/{V_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{\\text{a}}$$
Como en una imposición todos los pagos están anticipados a la época final de valuación, reemplazamos la variable “$\\text{a}$” por “$n$” en el factor de capitalización:
 $\${}^{\\text{a}=n}/{V_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{n}$$ <b>Artilugio matemático explícito:</b> Para simplificar esta expresión, aplicamos la propiedad distributiva del factor $\\left( 1+i \\right)^{n}$ hacia el interior del corchete.
1. Al multiplicar el primer término, sabemos por las relaciones entre factores plurales que $a_{n:i}\\cdot \\left( 1+i \\right)^{n}=s_{n:i}$.
2. Al multiplicar el segundo término, el factor $\\frac{1}{\\left( 1+i \\right)^{n}}$ se anula directamente con $\\left( 1+i \\right)^{n}$, quedando simplemente $1$.

Aplicando estos pasos algebraicos, obtenemos la fórmula definitiva para las imposiciones con cuotas vencidas variables en progresión aritmética:
 $$S_{n_{a}}=\\left( C+\\frac{r}{i} \\right)\\cdot s_{n:i}-\\frac{r}{i}\\cdot n$$`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción para cuotas adelantadas (</b></u>$S'_{n_{a}}$<u><b>)</b></u>

Si las cuotas se depositan al inicio de cada período (adelantadas), el principio de equivalencia establece que basta con multiplicar el valor financiero de la renta vencida por el factor de capitalización $\\left( 1+i \\right)$. 
Añadiendo el apóstrofo a la simbología, la fórmula resulta:
 $$S'_{n_{a}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot s_{n:i}-\\frac{r}{i}\\cdot n \\right]\\cdot \\left( 1+i \\right)$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
