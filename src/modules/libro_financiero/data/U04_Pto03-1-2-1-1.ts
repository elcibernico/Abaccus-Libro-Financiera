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
 $$V_{n_{g}}=\\frac{c}{1+i}+\\frac{c\\cdot \\left( 1+g \\right)}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+g \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+g \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+g \\right)^{n-1}}{\\left( 1+i \\right)^{n}}$$ 
Se observa que en el segundo miembro de la igualdad anterior, se tiene la suma de $n$ términos variables en progresión geométrica de razón $q=\\frac{1+g}{1+i}$.
 $$V_{n_{g}}=\\frac{c\\cdot \\left( 1+g \\right)^{0}}{\\left(1+i\\right)^{1}}+\\frac{c\\cdot \\left( 1+g \\right)^{1}}{\\left( 1+i \\right)^{2}}+\\frac{c\\cdot \\left( 1+g \\right)^{2}}{\\left( 1+i \\right)^{3}}+…+\\frac{c\\cdot \\left( 1+g \\right)^{n-2}}{\\left( 1+i \\right)^{n-1}}+\\frac{c\\cdot \\left( 1+g \\right)^{n-1}}{\\left( 1+i \\right)^{n}} $$`
    },
    {
      "type": "interactive_graphic",
      "title": "Esquema Temporal y Actualización de Cuotas",
      "src": "/simuladores/u04_pto03_1_2_1_1_esquema_temporal_y_actualizacion_de_cuotas_renta_geometrica.html",
      "displayMode": "inline",
      "height": "550px"
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `En la fórmula del valor actual de una renta inmediata geométrica vencida $V_{n\\rceil g} = c \\frac{1 - (\\frac{1+g}{1+i})^n}{i - g}$, ¿qué sucede cuando la tasa de crecimiento es idéntica a la tasa de interés ($g=i$)?`,
      "options": [
      "A) Genera un valor infinito.",
      "B) Provoca una indeterminación que se salva y resulta en $n \\cdot \\frac{c}{1+i}$.",
      "C) Provoca que el numerador sea siempre negativo."
      ],
      "feedback": `Correcto. La división original tendería a $\\frac{0}{0}$. Al salvarse matemáticamente operando las series desde su sumatoria, se verifica que cada pago actualizado aporta exactamente el mismo valor constante $\\frac{c}{1+i}$, totalizando $n \\cdot \\frac{c}{1+i}$.`,
      "correctIndex": 1
    },
    {
      "type": "quiz",
      "question": `Si en una renta geométrica el ratio $\\frac{1+g}{1+i} < 1$, ¿qué nos indica esto sobre el comportamiento del valor?`,
      "options": [
      "A) Que la inflación supera al rendimiento del dinero.",
      "B) Que el valor actual decrece sin límite.",
      "C) Que la tasa de interés $i$ es estrictamente mayor que el crecimiento $g$."
      ],
      "feedback": `Correcto. Para que la fracción base sea menor a uno, el denominador $(1+i)$ debe superar al numerador $(1+g)$, por ende $i > g$. Esto asegura la convergencia matemática del valor presente.`,
      "correctIndex": 2
    },
    {
      "type": "quiz",
      "question": `¿Qué modificación estructural sufre la fórmula de la progresión geométrica inmediata cuando los pagos son adelantados?`,
      "options": [
      "A) La tasa del denominador cambia a $i+g$.",
      "B) Toda la fórmula se multiplica por el factor $(1+i)$.",
      "C) Se resta una cuota $c$."
      ],
      "feedback": `Correcto. El modelo de cuotas adelantadas es idéntico al de cuotas vencidas, a excepción de que todos los valores capitalizan un período extra respecto de la época de evaluación, agregando el factor $(1+i)$.`,
      "correctIndex": 1
    },
    {
      "type": "quiz",
      "question": `¿Puede la tasa de crecimiento $g$ adoptar valores negativos en una renta geométrica?`,
      "options": [
      "A) Sí, indicaría una renta de cuotas decrecientes porcentualmente en el tiempo.",
      "B) No, causaría valores nominales negativos al final.",
      "C) Sí, pero sólo si el plazo $n$ es menor a $12$."
      ],
      "feedback": `Correcto. $g$ puede estar acotada entre $0$ y $-1$, reflejando una contracción geométrica progresiva sin llegar nunca a generar cuotas de signo negativo, a diferencia de la progresión aritmética.`,
      "correctIndex": 0
    }
  ],
  "Gráficos": []
};

export default data;
