const data = {
  "id": "4.3.1.1.1",
  "title": "Rentas temporarias inmediatas, diferidas y anticipadas: deducción de su valor financiero",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Rentas temporarias inmediatas con cuotas variables en progresión aritmética.</b>`
    },
    {
      "type": "text",
      "content": `A continuación, se presenta el esquema temporal de una renta temporaria inmediata con cuotas variables en ley aritmética, cuya primera cuota es $C$ y la razón que vincula las cuotas $r$ .

Por ser inmediata, la época inicial coincide con la época de valuación, por lo que todas las cuotas variables se habrán de actualizar a la época de valuación, en régimen compuesto, a la tasa periódica efectiva de interés $i$.

El ejemplo típico de estas rentas está dado por el sistema alemán de amortización que se verá en el Capítulo 6, en el cual los intereses y también las cuotas siguen una ley aritmética decreciente.`
    },
    {
      "type": "text",
      "content": `Se simbolizará $V_{n_{a}}$ a la suma de los valores actuales de las $n$ cuotas variables en ley aritmética.
$$V_{n_{a}}=\\frac{c}{(1+i)^{1}}+\\frac{c+r}{(1+i)^{2}}+\\frac{c+2\\cdot r}{(1+i)^{3}}+…+\\frac{c+(n-2)\\cdot r}{(1+i)^{n-1}}+\\frac{c+(n-1)\\cdot r}{(1+i)^{n}}$$`
    },
    {
      "type": "interactive_graphic",
      "title": "Simulación Interactiva",
      "src": "/simuladores/u04_esquema_temporal_actualizacion_de_cuotas.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `A fin de determinar su valor financiero, resulta conveniente descomponer la renta con cuotas variables en distintas corrientes que serán valuadas en el momento inicial, y luego sumarlas.`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
