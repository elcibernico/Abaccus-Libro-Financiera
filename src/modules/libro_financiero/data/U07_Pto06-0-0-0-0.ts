const data = {
  "id": "7.6.0.0.0.0",
  "title": "Bonos: Valuación de Bonos (Pricing)",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<h1>7.6: Valuación de Bonos (<i><b>Pricing</b></i>)</h1>`
    },
    {
      "type": "text",
      "content": `<h2>1. Fundamento Teórico de la Valuación</h2>

Aunque los bonos tienen una cotización observable en el mercado según la oferta y la demanda, el proceso de valuación teórica o <i>pricing</i> consiste en determinar el <b>valor intrínseco o teórico</b> que debería tener el instrumento financiero.

<b> </b><b>Principio financiero:</b> El valor de un bono es igual a la suma de los valores actuales (descontados) de todos los flujos de fondos futuros que promete pagar (intereses y devoluciones de capital).

<b> </b><b>Tasa de descuento (</b>$r$<b>):</b> Corresponde a la tasa de rendimiento exigida por el mercado, la cual representa el costo de oportunidad para inversiones de idéntico nivel de riesgo.`
    },
    {
      "type": "text",
      "content": `<h2>2. Valuación de un Bono "Bullet"
<i>(Pago periódico de intereses y amortización íntegra al vencimiento)</i></h2>
En este esquema, el tenedor percibe periódicamente un cupón de interés constante ($VN\\cdot i$) 
y, al finalizar el plazo estipulado ($n$), cobra el último cupón junto con la totalidad del capital nominal ($VN$).

<h3>2.1. Formulación Matemática</h3>
El precio se expresa como la sumatoria de los flujos de interés descontados más el valor actual del reembolso final del capital:
 $$P=\\frac{VN\\cdot i}{\\left( 1+r \\right)^{1}}+\\frac{VN\\cdot i}{\\left( 1+r \\right)^{2}}+\\frac{VN\\cdot i}{\\left( 1+r \\right)^{3}}+⋯+\\frac{VN\\cdot i}{\\left( 1+r \\right)^{n-1}}+\\frac{VN\\cdot i+VN}{\\left( 1+r \\right)^{n}}$$ Para simplificar el cálculo operativo, la corriente periódica y constante de intereses se formula como una renta temporaria inmediata vencida ($a_{n:r}$), adicionando el valor actual del principal al vencimiento:
 $$P=VN\\cdot i\\cdot a_{n:r}+\\frac{VN}{\\left( 1+r \\right)^{n}}$$
$$P=VN\\cdot i\\cdot \\left[ \\frac{1-\\left( 1+r \\right)^{-n}}{r} \\right]+\\frac{VN}{\\left( 1+r \\right)^{n}}$$
<i>Donde:</i>
     $P$: Precio teórico del bono.
     $VN$: Valor Nominal del título.
     $i$: Tasa contractual del cupón de interés por período.
     $r$: Tasa de descuento o costo de oportunidad exigido por el mercado.
     $n$: Número de períodos hasta el vencimiento.

<h3>2.2. Ejemplo de Aplicación</h3>
Una empresa emite bonos bullet con VN = 1.000, a 5 años de plazo, cupones de interés anuales al 10% ($i=0,10$) y una tasa exigida por el mercado del 11% anual ($r=0,11$):
 $$P=\\frac{100}{\\left( 1+0,11 \\right)^{1}}+\\frac{100}{\\left( 1+0,11 \\right)^{2}}+\\frac{100}{\\left( 1+0,11 \\right)^{3}}+\\frac{100}{\\left( 1+0,11 \\right)^{4}}+\\frac{100+1.000}{\\left( 1+0,11 \\right)^{5}}$$
$$P=963,04$$
<b>Interpretación:</b>
Como la tasa de interés contractual ($10%$) es menor que la exigida por el mercado ($11%$), el bono se coloca <b>bajo la par</b> (con descuento). Si la tasa contractual fuera igual a la de mercado ($11%$), cotizaría <b>a la par</b> ($1.000); y si fuese superior, cotizaría <b>sobre </b><b>la par</b> (con prima).`
    },
    {
      "type": "text",
      "content": `<h2>3. Valuación de un Bono "Cupón Cero"
<i>(Sin cupones periódicos y amortización íntegra al vencimiento)</i></h2>
Este bono no realiza pagos intermedios de renta. El inversor únicamente percibe el valor nominal al final del plazo ($n$). Por esta razón, el título se adquiere con descuento (bajo la par) y su rendimiento proviene de la diferencia entre el precio de compra y el valor nominal recibido al final.

<h3>3.1. Formulación Matemática</h3>
Consiste en actualizar financieramente un único flujo de fondos futuro:
$$P=\\frac{VN}{\\left( 1+r \\right)^{n}}$$ 
`
    },
    {
      "type": "text",
      "content": `<h2>4. Valuación de un Bono Amortizable</h2>
<i>(Con devolución periódica de capital e intereses sobre saldo residual)</i>

A diferencia de los casos anteriores, el capital se cancela en cuotas parciales a lo largo de la vida del título.
<b> </b><b>Cálculo de los intereses:</b> Los cupones de renta de cada período no se calculan sobre el valor nominal original, sino sobre el <b>Valor Residual (</b>$VR$<b>)</b>, que es el saldo de capital aún no amortizado.
<b> </b><b>Estructura:</b> Puede adoptar esquemas clásicos (Alemán con amortizaciones constantes, Francés con amortizaciones progresivas) o cronogramas personalizados definidos por el emisor.

4.1. Formulación Matemática General

El precio surge de descontar individualmente cada flujo de caja del período $t$, ($F_{t} = \\text{Int sobre }VR_{t} + \\text{Amortización}_{t}$):
$$P = \\sum_{t=1}^{n} \\frac{\\text{Interés}_{t} + \\text{Amortización}_{t}}{\\left( 1+r \\right)^{t}}$$
 `
    },
    {
      "type": "text",
      "content": `<h2>5. Cuadro Comparativo Resumen de Fórmulas</h2><table className='table-auto w-full border-collapse border border-gray-300 my-4'> <tr> <td className='border border-gray-300 px-4 py-2'><b>Tipo de Bono</b></td> <td className='border border-gray-300 px-4 py-2'><b>Composición de los Flujos de Fondos</b></td> <td className='border border-gray-300 px-4 py-2'><b>Fórmula de Valuación Teórica (P)</b></td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Bullet</b></td> <td className='border border-gray-300 px-4 py-2'>Intereses periódicos constantes + Capital total al vencimiento</td> <td className='border border-gray-300 px-4 py-2'>$$P=VN\\cdot i\\cdot \\left[ \\frac{1-\\left( 1+r \\right)^{-n}}{r} \\right]+\\frac{VN}{\\left( 1+r \\right)^{n}}$$</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Cupón Cero</b></td> <td className='border border-gray-300 px-4 py-2'>Un único cobro de capital al vencimiento</td> <td className='border border-gray-300 px-4 py-2'>$$P=\\frac{VN}{\\left( 1+r \\right)^{n}}$$</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Amortizable</b></td> <td className='border border-gray-300 px-4 py-2'>Cupones de interés sobre $VR$ + Amortizaciones parciales programadas</td> <td className='border border-gray-300 px-4 py-2'>$$P=\\sum_{t=1}^{n}\\frac{VR_{t-1}\\cdot i+\\text{Amortización}_{t}}{\\left( 1+r \\right)^{t}}$$</td> </tr> </table>`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
