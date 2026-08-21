const data = {
  "id": "7.3.0.0.0.0",
  "title": "Bonos: Modalidades de Reembolso",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<H1>Modalidades de Reembolso del Capital</H1>`
    },
    {
      "type": "text",
      "content": `<H2>1. Introducción al Reembolso de Bonos</H2>

El prospecto de emisión de un título de deuda define la forma, las fechas y los montos en que el ente emisor devolverá el capital prestado (<i>principal</i>) y abonará las rentas (<i>intereses</i>).
De acuerdo con la estructura del flujo de fondos, el autor clasifica las modalidades de reembolso en tres grandes categorías:

`
    },
    {
      "type": "interactive_graphic",
      "title": "Esquema: Modalidades de Reembolso",
      "src": "/simuladores/u07_modalidades_de_reembolso.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<H2>2. Modalidad de Pago Íntegro del Principal al Vencimiento con Servicio Periódico de Intereses
(Bono <i>Bullet</i>)</H2>

<H3>2.1. Concepto y Funcionamiento</H3>

<b>Compromiso del emisor:</b>
Pagar cupones de interés periódicos y reintegrar el 100% del valor nominal ($VN$) en un <b>único pago al vencimiento</b> ($n$).

<b>Servicio de interés periódico:</b>
Como no hay cancelaciones intermedias de capital, la base de cálculo de los intereses permanece inalterable a lo largo de toda la vida del bono. Si la duración de los períodos es uniforme, el importe de cada cupón de interés es constante:
$$\\text{Cupón de Interés}_t = VN \\cdot i$$
<i>Donde:</i>
     $VN$: Valor Nominal del título.
     $i$: Tasa de interés contractual por período.

<b>Equivalencia financiera:</b> Su flujo de fondos es equivalente al del prestamista en el <b>sistema de amortización americano</b>.`
    },
    {
      "type": "interactive_graphic",
      "title": "2.2. Esquema Temporal (Bono Bullet)",
      "src": "/simuladores/u07_esquema_temporal_bono_bullet.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<H2>3. Modalidad de Pago Íntegro del Principal al Vencimiento sin Pago de Intereses
(Bono Cupón Cero)</H2>

<H3>3.1. Concepto y Rendimiento Implícito</H3>

<b>Compromiso del emisor:</b> No abona cupones periódicos de interés explícito ni fija una tasa contractual. El emisor se compromete exclusivamente a restituir la totalidad del capital nominal ($VN$) al final del plazo fijado.
<i> </i><b>Mecanismo de ganancia:</b> Para que resulte atractivo al inversor, el título se coloca y cotiza siempre con descuento (<b>bajo </b><b>la par</b>).
<i> </i><b>Rendimiento:</b> Surge implícitamente de la diferencia entre el valor de compra descontado ($P_0 < VN$) y el valor nominal total percibido al vencimiento ($VN$).`
    },
    {
      "type": "interactive_graphic",
      "title": "3.2. Esquema Temporal (Cupón Cero)",
      "src": "/simuladores/u07_esquema_temporal_cupon_cero.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<H2>4. Modalidad de Pago Periódico del Principal y de los Intereses
(Bonos Amortizables)</H2>

<H3>4.1. Concepto General y Regla de Cálculo de Intereses</H3>

<b>Mecánica:</b> El capital nominal se devuelve de manera fraccionada a lo largo del tiempo, en fechas preestablecidas, hasta su total extinción.

<b>Regla fundamental de intereses:</b> Los cupones de interés periódico se calculan siempre sobre el <b>Valor Residual ($VR$)</b> del título (el capital adeudado que aún no fue amortizado):
$$\\text{Cupón de Interés}_t = VR_{t-1} \\cdot i$$
<i>Donde:</i>
<i> </i>$VR_{t-1}$: Saldo de capital no amortizado al inicio del período $t$.

<H3>4.2. Variantes de Amortización Periódica</H3>

<H4>1. Sistema Alemán (Restitución Periódica Constante del Principal)</H4>
<i>- </i>Las cuotas de amortización del capital son <b>iguales y constantes</b> en cada período.
<i>- </i>Los intereses son decrecientes, ya que se calculan sobre un valor residual que disminuye a paso constante.
$$\\text{Amortización de Capital}_t = \\text{Constante} = \\frac{VN}{n}$$`
    },
    {
      "type": "interactive_graphic",
      "title": "Línea Temporal: Sistema Alemán",
      "src": "/simuladores/u07_sistema_aleman.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<H4>2. Sistema Francés (Restitución Periódica Progresiva del Principal)</H4>
<i>- </i>La porción destinada a devolver capital es <b>creciente o progresiva</b> período a período.
<i>- </i>La porción destinada a pagar intereses es <b>decreciente </b> período a período.
<i>- </i>La suma de Interés + Amortización conforma una cuota de servicio total uniforme en el tiempo.`
    },
    {
      "type": "interactive_graphic",
      "title": "Línea Temporal: Sistema Francés",
      "src": "/simuladores/u07_sistema_frances.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<H3>3. Otras Modalidades (Planes a Medida / Cronogramas Especiales)</H3>
<i> -</i><i>></i><i> </i>El emisor diseña un esquema propio que no responde a un sistema financiero clásico.
<i> -> </i><b>Ejemplo del texto:</b> Pago periódico de intereses sobre el saldo de deuda ($VR$) durante toda la vida del título, y cancelación del capital distribuido exclusivamente en los <b>últimos tres períodos</b> en porcentajes variables (períodos $n-2$, $n-1$ y $n$).`
    },
    {
      "type": "interactive_graphic",
      "title": "Línea Temporal: Otras Modalidades",
      "src": "/simuladores/u07_otras_modalidades.html",
      "displayMode": "inline",
      "height": "550px"
    },
    {
      "type": "text",
      "content": `<H2>5. Cuadro Comparativo de Síntesis</H2><table className='table-auto w-full border-collapse border border-gray-300 my-4'> <tr> <td className='border border-gray-300 px-4 py-2'><b>Modalidad</b></td> <td className='border border-gray-300 px-4 py-2'><b>Pago de Intereses</b></td> <td className='border border-gray-300 px-4 py-2'><b>Devolución del Capital</b></td> <td className='border border-gray-300 px-4 py-2'><b>Sistema Equivalente</b></td> <td className='border border-gray-300 px-4 py-2'><b>Base de Interés</b></td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Bono Bullet</b></td> <td className='border border-gray-300 px-4 py-2'>Periódico y constante</td> <td className='border border-gray-300 px-4 py-2'>$100\\%$ al vencimiento ($n$)</td> <td className='border border-gray-300 px-4 py-2'>Sistema Americano</td> <td className='border border-gray-300 px-4 py-2'>Valor Nominal ($VN$)</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Cupón Cero</b></td> <td className='border border-gray-300 px-4 py-2'>Sin cupones (implícito por descuento)</td> <td className='border border-gray-300 px-4 py-2'>$100\\%$ al vencimiento ($n$)</td> <td className='border border-gray-300 px-4 py-2'>Descuento / Cero cupón</td> <td className='border border-gray-300 px-4 py-2'>No aplica</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Amortizable Alemán</b></td> <td className='border border-gray-300 px-4 py-2'>Periódico y decreciente</td> <td className='border border-gray-300 px-4 py-2'>Cuotas periódicas constantes</td> <td className='border border-gray-300 px-4 py-2'>Sistema Alemán</td> <td className='border border-gray-300 px-4 py-2'>Valor Residual ($VR_t$)</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Amortizable Francés</b></td> <td className='border border-gray-300 px-4 py-2'>Periódico y decreciente</td> <td className='border border-gray-300 px-4 py-2'>Cuotas periódicas progresivas</td> <td className='border border-gray-300 px-4 py-2'>Sistema Francés</td> <td className='border border-gray-300 px-4 py-2'>Valor Residual ($VR_t$)</td> </tr> <tr> <td className='border border-gray-300 px-4 py-2'><b>Programas a </b><b>Medida</b></td> <td className='border border-gray-300 px-4 py-2'>Periódico sobre saldo</td> <td className='border border-gray-300 px-4 py-2'>Según cronograma (ej. últimos períodos)</td> <td className='border border-gray-300 px-4 py-2'>Plan personalizado</td> <td className='border border-gray-300 px-4 py-2'>Valor Residual ($VR_t$)</td> </tr> </table>`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
