const data = {
  "id": "7.7.0.0.0.0",
  "title": "Bonos: Medidas de Rendimiento de la Inversión en Bonos",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<h1>7.7: Medidas de Rendimiento de la Inversión en Bonos</h1>`
    },
    {
      "type": "text",
      "content": `<h2>1. Fuentes de Ganancia en la Inversión en Bonos</h2>
La rentabilidad total que genera un bono proviene de dos fuentes económicas fundamentales:

1. <b>Renta o Interés (</b><i><b>Coupon Yield</b></i><b>):</b>
Es el flujo de efectivo periódico que percibe el inversor por el cobro de los cupones de interés, de acuerdo con las condiciones pactadas en la emisión.

2. <b>Ganancia (o Pérdida) de Capital (</b><i><b>Capital Gain / Lost Yield</b></i><b>):</b>
Se genera por la diferencia entre el precio de venta (o valor de rescate) del título y su precio de adquisición original. Si el precio de salida es mayor al de compra, existe ganancia de capital; si es menor, se incurre en una pérdida de capital.

Formulación de la Rentabilidad por Ganancia de Capital ($R_{GC}$)
Relaciona el diferencial de precios respecto al desembolso inicial:

$$R_{GC}=\\frac{P_{1}-P_{0}}{P_{0}}$$
<i>Donde:</i>
     $P_{0}$: Precio de compra o adquisición del bono.
     $P_{1}$: Precio de venta del título al cabo de un período.`
    },
    {
      "type": "text",
      "content": `<h2>2. Medidas de Rendimiento: Corriente vs. Al Vencimiento</h2>
Para evaluar cuánto rinde un bono, coexisten en el análisis financiero dos métricas esenciales con distinto grado de profundidad:`
    },
    {
      "type": "interactive_graphic",
      "title": "2. Medidas de Rendimiento: Corriente vs. Al Vencimiento",
      "src": "/simuladores/u07_medidas_de_rendimiento.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<h3>2.1. Rendimiento Corriente (<i><b>Current Yield</b></i> -$R_{CTE}$)</h3>
Relaciona el cupón de interés del período corriente con el precio actual de mercado del título.

Formulación Matemática
$$R_{CTE}=\\frac{VR\\cdot i}{P}$$
<i>Donde:</i>
     $VR$: Valor Residual del bono (en bonos <i>bullet</i>, coincide con el Valor Nominal).
     $i$: Tasa contractual del cupón.
     $P$: Precio actual de cotización del título.

<b>Limitación conceptual:</b>
Es una medida de rentabilidad <u><b>incompleta</b></u>. Solo toma en cuenta el flujo periódico de renta, ignorando las ganancias o pérdidas de capital derivadas de las variaciones del precio, así como la ganancia generada por la reinversión de los cupones a lo largo de la vida del bono.

<h3>2.2. Rendimiento al Vencimiento (<i><b>Yield to Maturity</b></i> -$TIR$)</h3>
Es la <b>Tasa Interna de Retorno (TIR)</b> implícita del bono. Representa la tasa de interés que iguala el precio de mercado con el valor actual de la totalidad de sus flujos futuros.

<b>Alcance:</b>
Es una medida <b>completa</b>, ya que computa simultáneamente:
          1. Todos los cupones de interés periódicos.
          2. Las ganancias o pérdidas de capital al vencimiento.
          3. El rendimiento derivado de la reinversión de los cupones y amortizaciones intermedias.

<b>Los Dos Supuestos Críticos de la TIR (Rendimiento Prometido):</b>
La TIR representa un rendimiento <i>prometido</i>, el cual se materializará de forma exacta únicamente si se cumplen dos condiciones estrictas:
          <b>a)</b> El inversor conserva el bono hasta su vencimiento final.
          <b>b)</b> Todos los cupones de interés y amortizaciones cobrados se logran reinvertir exactamente a la misma tasa TIR hasta el final de la vida del título.`
    },
    {
      "type": "text",
      "content": `<h2>3. Relación entre Cotización, TIR, Rendimiento Corriente y Tasa Cupón</h2>
El rendimiento total esperado de un bono equivale a la suma del Rendimiento Corriente y la Rentabilidad por Ganancia (o Pérdida) de Capital, lo que conforma la TIR:
 $$TIR=R_{CTE}+R_{GC}$$
Dependiendo del precio de cotización del título respecto a su valor nominal, se verifica la siguiente jerarquía de rendimientos:`
    },
    {
      "type": "text",
      "content": `<table className='table-auto w-full border-collapse border border-gray-300 my-4'> <tr> <td className='border border-gray-300 px-4 py-2'><b>Tipo de Cotización</b></td> <td className='border border-gray-300 px-4 py-2'><b>Relación de Magnitudes</b></td> <td className='border border-gray-300 px-4 py-2'><b>Comportamiento del Rendimiento de Capital (</b>$R_{GC}$<b>)</b></td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>A la par</b> ($P=VN$)</td> <td className='border border-gray-300 px-4 py-2'>$$TIR=R_{CTE}=i$$</td> <td className='border border-gray-300 px-4 py-2'>$R_{GC}=0$ (Sin ganancias ni pérdidas de capital)</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Bajo la par</b> ($P<VN$)</td> <td className='border border-gray-300 px-4 py-2'>$$TIR>R_{CTE}>i$$</td> <td className='border border-gray-300 px-4 py-2'>$R_{GC}>0$ (Ganancia de capital positiva que amplía la TIR)</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Sobre la par</b> ($P>VN$)</td> <td className='border border-gray-300 px-4 py-2'>$$TIR<R_{CTE}<i$$</td> <td className='border border-gray-300 px-4 py-2'>$R_{GC}<0$ (Pérdida de capital que reduce la TIR)</td> </tr> </table>`
    },
    {
      "type": "text",
      "content": `<h2>4. Tasa de Rendimiento Total (<i><b>Total Return</b></i> -$TRT$)</h2>
En títulos de largo plazo y con cupones significativos, la reinversión de intereses constituye una porción sustancial del rendimiento global. Como el supuesto de reinvertir a la misma TIR suele ser poco realista, surge la <b>Tasa de Rendimiento Total</b> como una metodología superadora que incorpora una tasa de reinversión explícita acorde a las expectativas de mercado del inversor.

Mecánica de Cálculo

Se calcula el valor acumulado final de todos los flujos intermedios capitalizados a la tasa de reinversión esperada, y se determina la tasa efectiva que hace crecer el precio inicial de compra hasta dicho monto final:

$$\\text{Precio de compra} \\cdot \\left( 1+TRT \\right)^{n} = \\text{Flujo de fondos al final del horizonte de inversión}$$

$$\\text{Tasa de Rendimiento Total} = \\left( \\frac{\\text{Flujo de fondos al final del horizonte de inversión}}{\\text{Precio de compra}} \\right)^{\\frac{1}{n}} - 1$$`
    },
    {
      "type": "text",
      "content": `<h2>5. Evolución del Precio en el Tiempo (<i><b>Time Path of a Bond</b></i>)
Convergencia del precio de un bono.</h2>
Con el transcurso del tiempo y a medida que se aproxima la fecha de amortización final, el precio de mercado del bono <b>converge necesariamente a su valor par</b> (suponiendo ausencia de riesgo de default y tasas de mercado constantes):

          <b>Bonos bajo la par (con descuento):</b>
Su precio aumenta paulatinamente a lo largo del tiempo, ya que los flujos futuros sufren un menor descuento por la menor incidencia del interés compuesto.

          <b>Bonos sobre la par (con premio):</b>
Su precio disminuye gradualmente a lo largo del tiempo, debido a que van restando menos cupones con tasas superiores a la exigida por el mercado.

          <b>Bonos a la par:</b>
Mantienen su precio constante e igual al valor nominal a lo largo de toda su vida.`
    },
    {
      "type": "image",
      "src": "/images/image1.png"
    },
    {
      "type": "interactive_graphic",
      "title": "Simulador Integral de Valuación y Rendimiento de Bonos",
      "src": "/simuladores/u07_simulador_valuacion_rendimiento_bonos.html",
      "displayMode": "inline",
      "height": "1100px"
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
