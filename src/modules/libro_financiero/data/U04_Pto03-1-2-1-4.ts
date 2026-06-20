const data = {
  "id": "4.3.1.2.1.4",
  "title": "Caso en que la tasa de crecimiento es igual a la tasa de interés (g = i)",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Resolución de Indeterminación Matemática</b>

<b>Caso en que la tasa de crecimiento es igual a la tasa de interés</b><b> (</b>$g=i$<b>)</b>

¿Qué sucede si $\\left( 1+g=1+i \\right)$, es decir, si la tasa de crecimiento $g$ coincide con el valor de la tasa de interés $i$?

En primer lugar, se advierte que las cuotas son crecientes porque se está en el primer caso analizado ($1+g>1$), pero al aplicar la fórmula para obtener el valor financiero de la renta, el denominador $\\left( i-g \\right)$ se vuelve cero, lo que genera una indeterminación del tipo $\\frac{0}{0}$ en el límite.
Fácilmente se resuelve esta indeterminación, volviendo a la ecuación original y reemplazando $\\left( 1+g \\right)$ por $\\left( 1+i \\right)$ en la ecuación inicial, obteniéndose lo siguiente:
 $$V_{n_{g}}=\\frac{c}{1+i}+\\frac{c\\cdot \\left( 1+g \\right)}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+g \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+g \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+g \\right)^{n-1}}{\\left( 1+i \\right)^{n}}$$
$$V_{n_{g}}=\\frac{c}{1+i}+\\frac{c\\cdot \\left( 1+i \\right)}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+i \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+i \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+i \\right)^{n-1}}{\\left( 1+i \\right)^{n}}$$ 
Al aplicar propiedades de potencias y simplificar cada término de la suma, todos los sumandos se reducen de forma idéntica a la constante $\\frac{c}{1+i}$:
 $$V_{n_{g}}=\\frac{c}{1+i}+\\frac{c}{1+i}+\\frac{c}{1+i}+…+\\frac{c}{1+i}+\\frac{c}{1+i}$$ 
Como estamos frente a una sumatoria de $n$ veces el mismo valor, la expresión final resuelta se resume a:
 $$V_{n_{g}}=n\\cdot \\frac{c}{1+i}$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
