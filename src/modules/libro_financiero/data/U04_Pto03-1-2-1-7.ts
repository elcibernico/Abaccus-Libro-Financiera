const data = {
  "id": "4.3.1.2.1.7",
  "title": "Caso particular: Imposiciones",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Caso particular: Imposiciones.</b>
En este caso, la época de valuación es coincidente con la época final. Es un caso particular de la renta anticipada en el cual se anticipan todos los pagos, o sea ($\\text{a}=n$), por lo que se reemplaza $a$ por $n$ en la fórmula de las rentas anticipadas.
 $\${}^{\\text{a}=n}/{V_{n_{g}}}=S_{n_{g}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{\\text{a}=n}$$
$$S_{n_{g}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)^{n}$$ 
<b>Desarrollo Matemático de la Imposición</b>

Para llegar a la fórmula canónica, en el numerador de la fracción del segundo miembro de la igualdad, puede distribuirse la potencia fraccionaria para el numerador y denominador interno, y luego sacar común denominador $\\left( 1+i \\right)^{n}:$ 
$$1-\\left( \\frac{1+g}{1+i} \\right)^{n}$$ 
<u>Aplicamos la propiedad de la potencia de un cociente</u>
La potencia de una fracción (o cociente) es igual a la potencia del numerador dividida por la potencia del denominador $\\left( \\frac{a}{b} \\right)^{n}=\\frac{a^{n}}{b^{n}}$ 
 $$1-\\frac{\\left( 1+g \\right)^{n}}{\\left( 1+i \\right)^{n}}$$ 
<u>Expresamos el número entero como una fracción</u> (para luego poder buscar un denominador común)
Al tener una resta entre un número entero (1) y una fracción, para poder restar estos dos elementos, necesitamos que ambos tengan el <b>mismo denominador</b>.
Sabemos por las propiedades de las fracciones que cualquier número dividido por sí mismo es igual a 1 (es decir, $1=\\frac{x}{x} ∀ x≠0$)
Y dado que el denominador de nuestra fracción es $\\left( 1+i \\right)^{n}$, podemos reescribir el número 1 usando ese mismo término en el numerador y en el denominador
 $$\\frac{\\left( 1+i \\right)^{n}}{\\left( 1+i \\right)^{n}}-\\frac{\\left( 1+g \\right)^{n}}{\\left( 1+i \\right)^{n}}$$ 
Restamos fracciones con igual denominador
Para sumar o restar fracciones que tienen el mismo denominador, simplemente se suman o restan los numeradores y se mantiene el denominador intacto $\\left( \\frac{A}{C}-\\frac{B}{C}=\\frac{A-B}{C} \\right)$ . Así:
 $$\\frac{\\left( 1+i \\right)^{n}-\\left( 1+g \\right)^{n}}{\\left( 1+i \\right)^{n}}$$ 
Reemplazando esto en nuestra fórmula de imposición:
 $$S_{n_{g}}=c\\cdot \\frac{\\frac{\\left( 1+i \\right)^{n}-\\left( 1+g \\right)^{n}}{\\left( 1+i \\right)^{n}}}{i-g}\\cdot \\left( 1+i \\right)^{n}$$ 
Luego se simplifica el $\\left( 1+i \\right)^{n}$ presente en el denominador de la fracción superior con el factor de capitalización $\\left( 1+i \\right)^{n}$ que multiplica al final, y se llega a la expresión final:
 $$S_{n_{g}}=c\\cdot \\frac{\\frac{\\left( 1+i \\right)^{n}-\\left( 1+g \\right)^{n}}{\\left( 1+i \\right)^{n}}}{\\frac{i-g}{1}}\\cdot \\frac{\\left( 1+i \\right)^{n}}{1}=c\\cdot \\frac{\\left( 1+i \\right)^{n}-\\left( 1+g \\right)^{n}}{\\left( i-g \\right)\\cdot \\left( 1+i \\right)^{n}}\\cdot \\frac{\\left( 1+i \\right)^{n}}{1}$$
$$S_{n_{g}}=c\\cdot \\frac{\\left( 1+i \\right)^{n}-\\left( 1+g \\right)^{n}}{i-g}$$ 
Si fuera con cuotas adelantadas, se agrega como siempre el factor $\\left( 1+i \\right)$ y en la simbología del valor financiero de la renta se agrega el apóstrofo:
 $$S'_{n_{g}}=c\\cdot \\frac{\\left( 1+i \\right)^{n}-\\left( 1+g \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
