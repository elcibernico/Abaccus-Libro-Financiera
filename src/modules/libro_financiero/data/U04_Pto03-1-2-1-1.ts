const data = {
  "id": "4.3.1.2.1.1",
  "title": "Ley de Cuotas",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Ley de Cuotas</b></u>
 $$C_{1}+C_{2}+C_{3}+…+C_{n-1}+C_{n}$$
$$C_{1}+\\left[ C_{1}×\\left( 1+g \\right) \\right]+\\left[ C_{2}×\\left( 1+g \\right) \\right]+…+\\left[ C_{n-2}×\\left( 1+g \\right) \\right]+\\left[ C_{n-1}×\\left( 1+g \\right) \\right]$$
$$C_{1}+\\left[ C_{1}×\\left( 1+g \\right) \\right]+\\left[ C_{1}×\\left( 1+g \\right)×\\left( 1+g \\right) \\right]+…+\\underset{n-2\\ veces}{\\left[ C_{1}×\\underbrace{\\left( 1+g \\right)×…×\\left( 1+g \\right)} \\right]}+\\underset{n-1\\ vez}{\\left[ C_{1}×\\underbrace{\\left( 1+g \\right)×…×\\left( 1+g \\right)} \\right]}$$
$$C_{1}+C_{1}×\\left( 1+g \\right)^{1}+C_{1}×\\left( 1+g \\right)^{2}+…+C_{1}×\\left( 1+g \\right)^{n-2}+C_{1}×\\left( 1+g \\right)^{n-1}$$ Por ser inmediata, la época inicial coincide con la época de valuación, por lo que todas las cuotas variables se habrán de actualizar a la época de valuación, en régimen compuesto, a la tasa periódica efectiva de interés $i$.

Se simbolizará $V_{n_{g}}$ a la suma de los valores actuales de las $n$ cuotas variables en ley geométrica.
Planteando la actualización cuota por cuota obtenemos:
 $$V_{n_{g}}=\\frac{c}{1+i}+\\frac{c\\cdot \\left( 1+g \\right)}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+g \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+g \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+g \\right)^{n-1}}{\\left( 1+i \\right)^{n}}$$ Se observa que en el segundo miembro de la igualdad anterior, se tiene la suma de $n$ términos variables en progresión geométrica de razón $q=\\frac{1+g}{1+i}$.
 $$V_{n_{g}}=\\frac{c\\cdot \\left( 1+g \\right)^{0}}{1+i}+\\frac{c\\cdot \\left( 1+g \\right)^{1}}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+g \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+g \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+g \\right)^{n-1}}{\\left( 1+i \\right)^{n}} $$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
