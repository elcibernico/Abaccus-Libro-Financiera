const data = {
  "id": "4.3.1.2.1.2",
  "title": "Rentas temporarias inmediatas con cuotas variables en progresión geométrica",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Desarrollo Matemático de la Fórmula</b>

Conviene aplicar la fórmula de la suma de los términos de una progresión geométrica, preferentemente utilizable para razones menores a la unidad (si bien, no necesariamente éste es el caso), la que se obtiene multiplicando por $\\left( -1 \\right)$ en el numerador y denominador de la fórmula tradicional:
 $$S=a_{1}\\cdot \\frac{1-q^{n}}{1-q}$$ Donde $a_{1}$ es el primer término de la progresión, $n$ es la cantidad de términos y $q$ es la razón de la progresión. Reemplazando por nuestros componentes financieros ($a_{1}=\\frac{c}{1+i}$ y $q=\\frac{1+g}{1+i}$):
 $$V_{n_{g}}=\\frac{c}{1+i}\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{1-\\frac{1+g}{1+i}}$$ Para operar algebraicamente el denominador, buscamos el común denominador $\\left( 1+i \\right)$:
 $$1-\\frac{1+g}{1+i}=\\frac{\\left( 1+i \\right)-1\\cdot \\left( 1+g \\right)}{1+i}=\\frac{\\left( 1+i \\right)-\\left( 1+g \\right)}{1+i}=\\frac{1+i-1-g}{1+i}=\\frac{i-g}{1+i}$$ Sustituyendo esta expresión en el denominador general:
 $$V_{n_{g}}=\\frac{c}{1+i}\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{\\frac{i-g}{1+i}}$$ 
Al dividir por la fracción del denominador, es equivalente a multiplicar por su inversa, lo cual nos permite cancelar el factor $\\left( 1+i \\right)$ del término $a_{1}$:
 $$V_{n_{g}}=\\frac{c}{1+i}\\cdot \\frac{\\frac{1}{1}}{\\frac{i-g}{1+i}}\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{1}$$
$$V_{n_{g}}=\\frac{c}{1+i}\\cdot \\frac{1+i}{i-g}\\cdot \\frac{1\\left. -\\left( \\frac{1+g}{1+i} \\right)^{n} \\right.}{1}$$ Llegando de este modo a la expresión final:
 $$V_{n_{g}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}$$ Si fuera con cuotas adelantadas, se agrega como siempre el factor $\\left( 1+i \\right)$ y en la simbología del valor financiero de la renta se agrega el apóstrofo:
 $$V'_{n_{g}}=c\\cdot \\frac{1-\\left( \\frac{1+g}{1+i} \\right)^{n}}{i-g}\\cdot \\left( 1+i \\right)$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
