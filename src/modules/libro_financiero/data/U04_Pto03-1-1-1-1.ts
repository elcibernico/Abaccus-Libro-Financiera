const data = {
  "id": "4.3.1.1.1.1",
  "title": "Rentas temporarias inmediatas, diferidas y anticipadas: deducción de su valor financiero",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Desarrollo del Profesor </b></u><u><b>Ernesto Fransolini</b></u><br/><b>Planteo de la Ecuación Inicial (Actualización individual de cuotas):</b><br/>Partimos de la expresión donde cada cuota variable, en su totalidad, es actualizada al momento cero:<br/> $$V_{n_{a}}=\\frac{c}{(1+i)^{1}}+\\frac{c+r}{(1+i)^{2}}+\\frac{c+2\\cdot r}{(1+i)^{3}}+…+\\frac{c+(n-2)\\cdot r}{(1+i)^{n-1}}+\\frac{c+(n-1)\\cdot r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>Aplicación de la Propiedad Distributiva (Desarme de numeradores):</b><br/>El primer paso analítico consiste en desdoblar los numeradores de cada cuota, separando la cuota base $C$ de sus respectivos incrementos escalonados $r$ , manteniendo el factor de actualización que le corresponde a cada período temporal:
$$V_{n_{a}}=\\frac{c}{(1+i)^{1}}+(\\frac{c}{(1+i)^{2}}+\\frac{r}{(1+i)^{2}})+(\\frac{c}{(1+i)^{3}}+\\frac{2\\cdot r}{(1+i)^{3}})+…+(\\frac{c}{(1+i)^{n-1}}+\\frac{(n-2)\\cdot r}{(1+i)^{n-1}})+(\\frac{c}{(1+i)^{n}}+\\frac{(n-1)\\cdot r}{(1+i)^{n}})$$
$$V_{n_{a}}=\\frac{c}{(1+i)^{1}}+\\frac{c}{(1+i)^{2}}+\\frac{r}{(1+i)^{2}}+\\frac{c}{(1+i)^{3}}+\\frac{2\\cdot r}{(1+i)^{3}}+…+\\frac{c}{(1+i)^{n-1}}+\\frac{(n-2)\\cdot r}{(1+i)^{n-1}}+\\frac{c}{(1+i)^{n}}+\\frac{(n-1)\\cdot r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>Reagrupación por Corrientes Horizontales:</b>

En lugar de sumar los términos cronológicamente (por período), se aplica la propiedad asociativa y conmutativa de la suma para agrupar las fracciones que poseen el mismo numerador, formando sub-series o "corrientes":
- Agrupando todas las $C$ , se forma la primera corriente.
- Agrupando la primera aparición de $r$ en cada período desde $t=2$ , se forma la segunda corriente.
- Agrupando la segunda aparición de $r$ desde $t=3$ , se forma la tercera corriente, y así sucesivamente.
$$V_{n_{a}}=$$
$$(\\frac{c}{(1+i)^{1}}+\\frac{c}{(1+i)^{2}}+\\frac{c}{(1+i)^{3}}+\\frac{c}{(1+i)^{4}}+…+\\frac{c}{(1+i)^{n-1}}+\\frac{c}{(1+i)^{n}}…)\\ =>\\ 1º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{2}}+\\frac{r}{(1+i)^{3}}+\\frac{r}{(1+i)^{4}}+…+\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}}…)\\ =>\\ 2º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{3}}+\\frac{r}{(1+i)^{4}}+…+\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}}…)\\ =>\\ 3º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{4}}+…+\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}}…)\\ =>\\ 4º\\ Corriente$$
$$…$$
$$+((\\frac{r}{(1+i)^{n-1}}+\\frac{r}{(1+i)^{n}})…)\\ =>\\ (n-1)º\\ Corriente$$
$$+(\\frac{r}{(1+i)^{n}})\\ =>\\ Enésima\\ Corriente$$`
    },
    {
      "type": "image",
      "src": "/images/image1.png"
    },
    {
      "type": "text",
      "content": `<b>Sustitución por sus Equivalentes Financieros (El método de </b><b>Fransolini</b><b>):</b>
Llegado a este punto, se valúa cada corchete aplicando los modelos financieros conocidos:

1º Corriente: representa el valor actual de una renta temporaria inmediata constante de $n$ períodos de cuota $C$ , cuyo valor es exactamente $c\\cdot a_{n:i}$ .
2º Corriente: representa una renta temporaria de $(n-1)$ períodos diferida por 1 período de cuota $r$ . Su valor se obtiene restando dos rentas perpetuas diferidas: una diferida por 1 período menos otra diferida por $n$ períodos, es decir: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
3º Corriente: representa es una renta temporaria de $(n-2)$ períodos diferida por 2 períodos, que equivale a la diferencia: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
4º Corriente: representa es una renta temporaria de $(n-3)$ períodos diferida por 3 períodos, que equivale a la diferencia: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
(n-1)º Corriente: representa es una renta temporaria de $(2)$ períodos diferida por $n-(n-1)$ períodos, que equivale a la diferencia: $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$.
Enésima Corriente: Un caso particular a analizar lo constituye la última corriente, que en realidad corresponde al valor de una única cuota vencida (por lo que no se trataría de una renta) cuyo valor es 𝑟 ( $\\frac{r}{(1+i)^{n}}$ ).
De todas formas, el valor actual de ese único pago efectivizado al final del período 𝑛, también puede obtenerse por diferencia entre dos rentas perpetuas diferidas: la primera con época inicial al final del período $(𝑛 − 1)$ y la segunda con momento de inicio al final del período 𝑛 , representa es una renta temporaria de $(2)$ períodos diferida por $n-(n-1)$ períodos, que equivale a la diferencia:
$$(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-1)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$$`
    },
    {
      "type": "interactive_graphic",
      "title": "Simulación Interactiva",
      "src": "/simuladores/u04_resta_de_perpetuidades.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<b>Ecuación Final por Descomposición:</b><br/>Reemplazando sistemáticamente cada sumatoria agrupada entre corchetes por su correspondiente deducción teórica a través de la diferencia de rentas perpetuas diferidas, arribamos a la gran expresión matricial:<br/> $$V_{n_{a}}=c\\cdot a_{n:i}+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+…+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})+(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$$ $$V_{n_{a}}=c\\cdot a_{n:i}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$ <br/>Reagrupando términos POSITIVOS y NEGATIVOS<br/> $$V_{n_{a}}=c\\cdot a_{n:i}$$ $$+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}$$ $$-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-…-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>El Artificio Matemático (Completando la serie)</b> 
Si observamos detenidamente la expresión anterior, los términos positivos de la progresión $\\frac{1}{(1+i)^{t}}$ llegan solamente hasta el exponente $(n-1)$ .A fin de obtener $n$ términos y completar la primera corriente de sumandos hasta la potencia n-ésima, se hace el artificio matemático de sumar y restar el término faltante $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$ al final de la ecuación, o sea:
$$V_{n_{a}}=c\\cdot a_{n:i}$$ $$+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}$$ $$-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-…-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$ $$+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}$$
Y volvemos a reagrupar términos POSITIVOS y NEGATIVOS.
Planeamos nuevamente las corrientes:
$$V_{n_{a}}=c\\cdot a_{n:i}$$
$$(+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{2}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{3}}+…+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{(n-2)}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n-1}}+\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})\\ =>\\ 1º\\ Corriente$$
$$(-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-…-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})\\ =>\\ 2º\\ Corriente$$`
    },
    {
      "type": "text",
      "content": `<b>Sustitución Final de las Corrientes</b>
Procedemos a valuar financieramente el contenido de estos dos nuevos grandes corchetes:

1º Corriente: Se observa que se obtiene de la misma, el valor actual de una renta temporaria inmediata de $n$ períodos, cuya cuota constante vencida es exactamente $\\frac{r}{i}$ ; y por consiguiente, su valor financiero global es igual a $(\\frac{r}{i}\\cdot a_{n:i})$.

2º Corriente: En esta corriente se pueden observar $n$ términos de una constante cuyo valor es $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}})$ ; por lo tanto, la suma de todos ellos es simplemente igual a $(\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n)$.

En consecuencia, reemplazando las expresiones de las dos corrientes de sumandos en la ecuación principal, nos queda lo siguiente:
$$V_{n_{a}}=c\\cdot a_{n:i}+\\frac{r}{i}\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$`
    },
    {
      "type": "text",
      "content": `<b>Factorización y Fórmula Unificada</b>
Finalmente, aplicando álgebra básica, se saca factor común $a_{n:i}$ en los dos primeros términos, llegándose así a la expresión final de la fórmula de una renta temporaria inmediata variable en progresión aritmética con cuotas vencidas:
$$V_{n_{a}}=(c\\cdot a_{n:i}+\\frac{r}{i}\\cdot a_{n:i})-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$ $$V_{n_{a}}=(c+\\frac{r}{i})\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
