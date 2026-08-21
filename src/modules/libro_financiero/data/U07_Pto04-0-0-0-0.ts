const data = {
  "id": "7.4.0.0.0.0",
  "title": "Bonos: Valor Residual, Valor Técnico y Valor Paridad",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<h1>7.4: Valor Residual, Valor Técnico y Valor Paridad</h1>`
    },
    {
      "type": "text",
      "content": `<h2>1. Esquema de Integración Conceptual</h2>

Para comprender la valuación y cotización de un título de deuda, se deben articular tres conceptos secuenciales que van desde el capital adeudado hasta su comparación con el mercado:

`
    },
    {
      "type": "interactive_graphic",
      "title": "1. Esquema de Integración Conceptual",
      "src": "/simuladores/u07_integracion_conceptual_vr_vt_paridad.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<h2>2. Valor Residual ($VR$)</h2>

<h3>2.1. Concepto y Función</h3>
El <b>Valor Residual</b> representa la fracción o porción del capital del título que <b>aún no ha sido amortizada</b> por el emisor a una fecha determinada.
 - <b>Relevancia operativa:</b> Constituye la base de cálculo matemática sobre la cual se liquida el servicio periódico de intereses en los bonos amortizables.

<h3>2.2. Comportamiento según el Tipo de Bono</h3>

<b>Bonos Bullet y Cupón Cero:</b> Como no devuelven capital en cuotas intermedias, el valor residual coincide con el valor nominal original durante toda la vida del título ($VR = VN$).

<b>Bonos Amortizables:</b> El valor residual va disminuyendo a medida que se cobran las amortizaciones periódicas.

<h3>2.3. Formulación Matemática</h3>

En un momento $k$ cualquiera, el valor residual surge de restar al valor nominal la totalidad de las cuotas de capital amortizadas hasta esa fecha:
$$VR_{k} = VN - T_{k}$$
<i>Donde:</i>
$VR_{k}$: Valor residual al momento $k$.
$VN$: Valor nominal del título.
$T_{k}$: Total de amortizaciones de capital acumuladas y pagadas hasta el momento $k$.`
    },
    {
      "type": "text",
      "content": `<h2>3. Valor Técnico ($VT$)</h2>

<h3>3.1. Concepto</h3>

El <b>Valor Técnico</b> es el valor intrínseco o teórico que debería tener el bono a una fecha determinada, de acuerdo estrictamente con las condiciones contractuales del prospecto de emisión, <b>sin considerar las fuerzas de oferta y demanda del mercado</b>.

Surge de sumar al capital adeudado ($VR$) los intereses que se fueron generando día a día desde el último cobro de cupón y que aún no se han percibido (<i>intereses corridos</i>).

<h3>3.2. Intereses del Cupón Corrido ($I_{c}$)</h3>

Son los intereses devengados proporcionalmente a favor del tenedor desde la fecha de vencimiento del último cupón pagado hasta la fecha de valuación.`
    },
    {
      "type": "interactive_graphic",
      "title": "3.2. Esquema Temporal: Intereses del Cupón Corrido",
      "src": "/simuladores/u07_intereses_cupon_corrido.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<h3>3.3. Formulación Matemática</h3>
$$VT = VR + I_{c}$$
Donde los intereses corridos se calculan de forma proporcional según el plazo transcurrido:
$$I_{c} = VR \\cdot i \\cdot \\left( \\frac{\\text{días transcurridos desde el vencimiento del último cupón de intereses}}{\\text{total de días del cupón actual de intereses}} \\right)$$
<i>Donde:</i>
$VT$: Valor técnico del bono.
$VR$: Valor residual a la fecha de valuación.
$I_{c}$: Intereses devengados o corridos.
$i$: Tasa contractual de interés aplicable al período del cupón.`
    },
    {
      "type": "text",
      "content": `<h2>4. Valor Paridad ($\\text{Paridad}$)</h2>

<h3>4.1. Concepto y Función</h3>

La <b>Paridad</b> es la relación porcentual existente entre el <b>Precio de Cotización ($PC$)</b> real de mercado de un bono y su <b>Valor Técnico ($VT$)</b>. Permite determinar con precisión si el mercado está pagando un premio, exigiendo un descuento o cotizando en equilibrio respecto a los derechos económicos acumulados por el título.

<h3>4.2. Formulación Matemática</h3>
$$\\text{Paridad} = \\frac{PC}{VT} \\cdot 100$$
<i>Donde:</i>
$PC$: Precio de cotización de mercado del bono.
$VT$: Valor técnico del título a esa misma fecha.
`
    },
    {
      "type": "interactive_graphic",
      "title": "4.3. Los Tres Escenarios de Cotización",
      "src": "/simuladores/u07_escenarios_cotizacion_paridad.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `

<b>Sobre la par ($\\text{Paridad} > 100\\%$):</b>
El precio de mercado es superior al valor técnico ($PC > VT$).
El mercado convalida una prima por el título; la tasa de rendimiento efectiva obtenida ($\\text{TIR}$) será <b>inferior</b> a la tasa contractual del bono.

<b>A la par ($\\text{Paridad} = 100\\%$):</b>
El precio de cotización coincide exactamente con su valor técnico ($PC = VT$).
En este punto de equilibrio, la tasa de rendimiento esperada ($\\text{TIR}$) coincide de forma idéntica con la <b>tasa contractual</b> ($i$).

<b>Bajo la par ($\\text{Paridad} < 100\\%$):</b>
El precio de cotización es inferior al valor técnico ($PC < VT$).
El título se negocia con descuento; la tasa de rendimiento efectiva ($\\text{TIR}$) resultará <b>superior</b> a la tasa contractual del bono.`
    },
    {
      "type": "text",
      "content": `<h2>5. Cuadro Comparativo de Síntesis</h2><table className='table-auto w-full border-collapse border border-gray-300 my-4'> <tr> <td className='border border-gray-300 px-4 py-2'><b>Magnitud</b></td> <td className='border border-gray-300 px-4 py-2'><b>Definición Breve</b></td> <td className='border border-gray-300 px-4 py-2'><b>Elementos que la Componen</b></td> <td className='border border-gray-300 px-4 py-2'><b>Dependencia del Mercado</b></td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Valor Residual ($VR$)</b></td> <td className='border border-gray-300 px-4 py-2'>Capital pendiente de amortización.</td> <td className='border border-gray-300 px-4 py-2'>$VN - \\text{Amortizaciones acumuladas}$</td> <td className='border border-gray-300 px-4 py-2'><b>Nula</b> (Contractual)</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Valor Técnico ($VT$)</b></td> <td className='border border-gray-300 px-4 py-2'>Valor teórico/intrínseco al día de hoy.</td> <td className='border border-gray-300 px-4 py-2'>$VR + \\text{Intereses corridos } (I_c)$</td> <td className='border border-gray-300 px-4 py-2'><b>Nula</b> (Contractual)</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Valor Paridad ($\\%$)</b></td> <td className='border border-gray-300 px-4 py-2'>Ratio entre cotización y valor técnico.</td> <td className='border border-gray-300 px-4 py-2'>$(PC / VT) \\cdot 100$</td> <td className='border border-gray-300 px-4 py-2'><b>Total</b> (Depende de $PC$)</td> </tr> </table>`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
