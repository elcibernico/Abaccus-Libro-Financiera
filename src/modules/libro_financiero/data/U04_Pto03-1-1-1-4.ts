const data = {
  "id": "4.3.1.1.1.4",
  "title": "Punto 4.3.1.1.1.4",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Rentas temporarias diferidas con cuotas variables en progresión aritmética</b></u>

En las rentas diferidas, la característica fundamental radica en que la época inicial ($EI$) es posterior a la época de valuación ($EV$).
Para este modelo, se simbolizará con \${}^{-d}/{V_{n_{a}}}$ al valor actual de $n$ términos de renta variables en ley aritmética, cuyo primer término se abona al final del primer período de la renta, pero después de transcurridos $d$ períodos de diferimiento.
`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción del valor financiero (Cuotas Vencidas)</b></u>

Para obtener el valor financiero correspondiente a esta renta en la verdadera época de valuación (el momento 0), debemos calcular primero el valor actual de la renta como si fuera inmediata (valuada en la época inicial de la renta) y luego actualizar ese monto resultante por los $d$ períodos de gracia o diferimiento.

Sabiendo que el valor financiero de la renta temporaria inmediata variable en progresión aritmética es:
 $$V_{n_{a}}=\\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n$$ 
Simplemente aplicamos el factor de actualización singular (o factor de diferimiento) equivalente a $\\left( 1+i \\right)^{-d}$. 

Multiplicando la ecuación base por este factor, obtenemos la fórmula general para las cuotas vencidas:
 $\${}^{-d}/{V_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{-d}$$`
    },
    {
      "type": "text",
      "content": `<u><b>Deducción del valor financiero (Cuotas Adelantadas)</b></u>

Si las cuotas fuesen adelantadas o prepagables, sabemos por el principio de equivalencia que todo valor financiero de una renta adelantada equivale al de su respectiva renta vencida multiplicado por el factor de capitalización $\\left( 1+i \\right)$.

Para expresar este valor temporal y simbolizarlo como \${}^{-d}/{V'_{n_{a}}}$, multiplicamos la fórmula anterior por $\\left( 1+i \\right)$:
 $\${}^{-d}/{V'_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{-d}\\cdot \\left( 1+i \\right)$$ 
<b>Artilugio matemático:</b> Al tener un producto de potencias de igual base en el extremo derecho de la ecuación ($\\left( 1+i \\right)^{-d}\\cdot \\left( 1+i \\right)^{1}$), aplicamos la propiedad algebraica que indica que se deben sumar los exponentes: $-d+1=-\\left( d-1 \\right)$.
El modelo matemáticamente simplificado queda expresado como:
 $\${}^{-d}/{V'_{n_{a}}}=\\left[ \\left( C+\\frac{r}{i} \\right)\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{\\left( 1+i \\right)^{n}}\\cdot n \\right]\\cdot \\left( 1+i \\right)^{-\\left( d-1 \\right)}$$ <b>Conclusión:</b> Una renta temporaria diferida por $d$ períodos con cuotas adelantadas variables en ley aritmética equivale financieramente a una renta temporaria diferida por $\\left( d-1 \\right)$ períodos con cuotas vencidas bajo la misma ley. Es decir, el esfuerzo de diferimiento se reduce en exactamente un período.
`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
