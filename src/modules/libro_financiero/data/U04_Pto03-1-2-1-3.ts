const data = {
  "id": "4.3.1.2.1.3",
  "title": "Valores que puede tomar la razón (1 + g)",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<b>Valores que puede tomar la razón </b>$\\left( 1+g \\right)$<b>:</b>

Si $1+g>1$
<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 12px; margin-left: 0; color: #d1d5db;"><i>Cuotas Crecientes. En este caso la tasa de crecimiento $g$ es positiva.</i></blockquote>
Si $1+g=1$
<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 12px; margin-left: 0; color: #d1d5db;"><i>Cuotas Constantes y se obtiene la fórmula particular de las rentas temporarias inmediatas con cuotas constantes. En este caso la tasa de crecimiento/decrecimiento $g$ es nula.</i></blockquote>
Si $0<1+g<1$
<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 12px; margin-left: 0; color: #d1d5db;"><i>Cuotas Decrecientes. En este caso la tasa de decrecimiento $g$ es negativa (es estrictamente mayor al 0% y estrictamente menor al 100%, en valores absolutos).</i></blockquote>
Si $1+g=0$
<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 12px; margin-left: 0; color: #d1d5db;"><i>Solo existiría la primera cuota, dado que las siguientes se anulan, por lo que no se está en presencia de una renta. En este caso, el valor de $g$ sería del 100% negativo (-1), pero no es un valor factible que la tasa de crecimiento/decrecimiento $g$ pueda asumir válidamente.</i></blockquote>
Si $1+g<0$
<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 12px; margin-left: 0; color: #d1d5db;"><i>Cuotas de Signos Alternados, lo cual no es factible porque contradice el concepto de rentas. En este caso, el valor de $g$ sería negativo y superior al 100%, pero no es un valor factible que la tasa de crecimiento/decrecimiento $g$ pueda asumir válidamente.</i></blockquote>

`
    },
    {
      "type": "text",
      "content": `<b>Determinación de Cuota de un período cualquiera $k$</b>

Si cada cuota de cada período es igual a la anterior MULTIPLICADA una razón ($1+g$), entonces podemos verificar lo siguiente:
$$C_{2}=C_{1}\\cdot(1+g)$$
$$C_{3}=C_{2}\\cdot(1+g)$$
$$C_{4}=C_{3}\\cdot(1+g)$$
Pero si en la expresión de la tercera cuota $C_{3}$ sustituimos a $C_{2}$ por su equivalente $C_{1}\\cdot(1+g)$ , obtenemos lo siguiente:
$$C_{3}=C_{2}\\cdot(1+g)=\\left[\\ C_{1}\\cdot(1+g)\\ \\right] \\cdot(1+g)$$
Utilizando los corchetes, reorganizamos los factores...
$$C_{3}=C_{1}\\cdot \\left[ \\ (1+g)\\cdot(1+g) \\ \\right]$$
Aplicando la propiedad "<i>producto de potencia de igual base - se suman los exponentes</i>"
$$C_{3}=C_{1}\\cdot(1+g)^{2}$$
Luego, reperimos la operatoria para determinar la cuarta cuota $C_{4}$. O sea, sustituimos a $C_{3}$ por su equivalente $C_{1}\\cdot(1+g)^{2}$ , obtenemos lo siguiente:
$$C_{4}=C_{3}\\cdot(1+g)=\\left[ \\ C_{1}\\cdot(1+g)^{2}\\ \\right]\\cdot(1+g)$$
Utilizando los corchetes, reorganizamos los factores y aplicamos la propiedad "<i>producto de potencia de igual base - se suman los exponentes</i>"
$$C_{3}=C_{1}\\cdot \\left[ \\ (1+g)^{2}\\cdot(1+g) \\ \\right]=C_{1}\\cdot(1+g)^{3}$$
Generalizando, podemos determinar así la fórmula para calcular la cuota de un período cualquiera $k$
$$C_{k}=C_{k-1}\\cdot(1+g)$$
$$C_{k}=C_{1}\\cdot(1+g)^{k-1}$$


`
    }

  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
