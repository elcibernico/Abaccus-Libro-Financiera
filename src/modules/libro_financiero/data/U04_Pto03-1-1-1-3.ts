const data = {
  "id": "4.3.1.1.1.3",
  "title": "Valores que puede tomar la razón",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Valores que puede tomar la razón </b></u>$r$
- Si $r>0⇒$ cuotas crecientes.
- Si $r=0⇒$ cuotas constantes y se obtiene la fórmula particular de las rentas temporarias inmediatas con cuotas constantes.
- La razón $r$ puede ser negativa, en cuyo caso las cuotas son decrecientes`
    },
    {
      "type": "text",
      "content": `<u><b>Restricción cuando la razón </b></u>$r$<u><b> es negativa</b></u>
Si tomamos en consideración que las cuotas deben ser positivas, en los casos de razones $r$ negativas, puede suceder (desde el punto de vista estricto) que alguna cuota resulte negativa. 
Por ejemplo: Renta de cuotas variables en progresión aritmética, cuya primera cuota es de $1.000 y disminuyen a razón de $400. En este caso sucedería lo siguiente:
 $$C_{1}=1.000$$
$$C_{2}=1.000-400=600$$
$$C_{3}=600-400=200$$
$$C_{4}=200-400=-200 \\Rightarrow \\text{¡¡¡ABSURDO FINANCIERO!!!}$$
Esto “absurdo” es lo mismo que decir: <i>“el acreedor paga dinero en lugar de cobrarlo”</i>

Es por esto que decimos que las cuotas deben ser siempre positivas.
Entonces, en los casos de Rentas con Cuotas Variables en Progresión Aritmética con Razón Negativa (rentas de cuotas decrecientes), si se verifica que la última cuota es positiva, las anteriores también lo serán. Por consiguiente:
 $$c_{n}=c+\\left( n-1 \\right)\\cdot r>0$$
$$\\left( n-1 \\right)\\cdot r>-c$$
$$r>-\\frac{c}{n-1}$$`
    },
    {
      "type": "text",
      "content": `<u><b>Determinación de la Cuota de un período cualquiera</b></u>

Si cada cuota es igual a la anterior MÁS una constante ($r$), entonces podemos verificar lo siguiente:
 $$C_{2}=C_{1}+r$$
$$C_{3}=C_{2}+r$$
$$C_{4}=C_{3}+r$$
Pero si en la expresión de la tercera cuota $C_{3}$ sustituimos a $C_{2}$ por su equivalente $C_{1}+r$ , obtenemos lo siguiente:
 $$C_{3}=C_{2}+r=\\left( C_{1}+r \\right)+r=C_{1}+r+r$$
$$C_{3}=C_{1}+r+r=C_{1}+2\\cdot r$$
si en la expresión de la cuarta cuota $C_{4}$ sustituimos a $C_{3}$ por su equivalente $C_{1}+r+r$ , obtenemos lo siguiente:
 $$C_{4}=C_{3}+r=\\left( C_{1}+r+r \\right)+r=C_{1}+r+r+r$$
$$C_{4}=C_{1}+3\\cdot r$$
Como podemos observar, el valor que multiplica a la razón $r$ , siempre es una unidad menor al período de la cuota.
Así, generalizando, podemos determinar la formula para calcular la cuota de un período cualquiera:
 $$C_{k}=C_{1}+\\left( k-1 \\right)\\cdot r$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
