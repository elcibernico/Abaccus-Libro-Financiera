const data = {
  "id": "1.2.1",
  "title": "Régimen de Interés Simple",
  "Desarrollo": [
    {
      "type": "text",
      "content": `En este régimen, los intereses se liquidan de una sola vez al vencimiento y recién en ese momento se incorporan al capital productivo. Como se calculan siempre sobre el capital inicial ($C$), el interés de cada período resulta constante.`
    },
    {
      "type": "text",
      "content": `La fórmula del Monto ($M$) a interés simple es: $$M = C \cdot (1 + j \cdot n)$$ Donde $j$ representa la tasa periódica nominal.`
    },
    {
      "type": "text",
      "content": `Relación Analítica de Fransolini (Comercial vs. Exacto): Para comprender la diferencia entre el interés comercial (base 360 días) y el calendario (base 365 días), Fransolini realiza la siguiente deducción: $$I_{Comercial} = \frac{C \cdot j \cdot n}{360} \quad ; \quad I_{Calendario} = \frac{C \cdot j \cdot n}{365}$$ Dividiendo ambas expresiones: $$\frac{I_{Comercial}}{I_{Calendario}} = \frac{\frac{C \cdot j \cdot n}{360}}{\frac{C \cdot j \cdot n}{365}} = \frac{365}{360} = \frac{73}{72} \approx 1,01388...$$ Esta deducción demuestra que el interés comercial es siempre un 1,38% más elevado que el calendario para iguales condiciones de capital, tasa y tiempo.`
    },
    {
      "type": "text",
      "content": `Tasa Periódica Efectiva en Interés Simple: Si los intereses no se retiran periódicamente, el capital productivo real aumenta. Fransolini demuestra que la tasa periódica efectiva ($i_k$) resulta ser variable y decreciente, ya que el interés constante se distribuye sobre una base de capital acumulado cada vez mayor. La relación para un período $k$ es: $$i_k = \frac{j}{1 + j \cdot (k - 1)}$$ Consecuentemente: $j = i_1 > i_2 > i_3 > \dots > i_n$.`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [
    {
      "type": "case",
      "title": "Caso 1: Capitalización Simple a Tasas Variables",
      "enunciado": `Se coloca un capital de \\$10.000 durante 180 días con las siguientes tasas por tramos:
- Primeros 30 días: $j_1 = 2\%$ por 30 días.
- Siguientes 60 días: $j_2 = 2{,}5\%$ por 30 días.
- Últimos 90 días: $j_3 = 15\%$ por 180 días.
¿Cuál es el Monto final?`,
      "planteo_solucion": `<b>Homogeneización de períodos respecto a cada tasa:</b>
$n_1 = 1$ (30/30)
$n_2 = 2$ (60/30)
$n_3 = 0{,}5$ (90/180)

<b>Aplicando la fórmula general de sumatoria de tasas:</b>
$$M = C \cdot (1 + j_1 n_1 + j_2 n_2 + j_3 n_3)$$
$$M = 10.000 \cdot (1 + 0{,}02 \cdot 1 + 0{,}025 \cdot 2 + 0{,}15 \cdot 0{,}5)$$
$$M = 10.000 \cdot (1 + 0{,}02 + 0{,}05 + 0{,}075)$$
$$M = 10.000 \cdot 1{,}145 = \$11.450$$`,
      "highlights": ""
    }
  ],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `¿Cuál es la relación numérica exacta entre el interés comercial y el calendario según Fransolini?`,
      "options": [
        "$360 / 365$",
        "$73 / 72$",
        "$1 / 360$"
      ],
      "correctIndex": 1,
      "feedback": `Como demuestra Fransolini, al dividir las fórmulas de interés la relación resulta $365/360$, que simplificado es $73/72$, indicando que el método comercial es un 1,38% más caro.`
    },
    {
      "type": "quiz",
      "question": `En el interés simple, si los intereses devengados NO se retiran, la tasa efectiva de cada período es:`,
      "options": [
        "Constante e igual a la nominal",
        "Variable y decreciente",
        "Variable y creciente"
      ],
      "correctIndex": 1,
      "feedback": `El interés liquidado es constante pero el capital productivo real aumenta, lo que provoca que la relación $I/C$ disminuya en cada subperíodo. La tasa efectiva es variable y decreciente.`
    }
  ],
  "Gráficos": []
};

export default data;
