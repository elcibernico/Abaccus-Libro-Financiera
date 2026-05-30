const data = {
  "id": "1.2.2",
  "title": "Régimen de Interés Compuesto",
  "Desarrollo": [
    {
      "type": "text",
      "content": `En el régimen de interés compuesto, los intereses se liquidan al final de cada período y se incorporan al capital, siendo generadores de nuevos intereses. El capital crece en progresión geométrica.`
    },
    {
      "type": "text",
      "content": `La fórmula del Monto ($M$) es: $$M = C \cdot (1 + i)^n$$ Donde $i$ es la tasa periódica efectiva.`
    },
    {
      "type": "text",
      "content": `Frecuencia de Capitalización ($m$): Representa la cantidad de veces que los intereses se capitalizan dentro del período de la tasa nominal ($j$).
- Enfoque de Proporcionalidad: Se mantiene constante $j$ y se varía $m$. A medida que $m$ aumenta, el monto final crece asintóticamente.
- Enfoque de Equivalencia: Se busca que el monto sea constante ($i$ constante) y se ajusta la tasa nominal $j_{(m)}$ según varíe $m$.`
    },
    {
      "type": "text",
      "content": `Capitalización Continua: Cuando la frecuencia de capitalización $m$ tiende a infinito ($m \to \infty$), se pasa al campo continuo. Fransolini deduce el Monto Máximo mediante el límite del número $e$: $$\bar{M} = C \cdot e^{j \cdot n}$$ La tasa instantánea de interés ($\delta$), que representa la fuerza del interés en instantes infinitesimales, se relaciona con la tasa efectiva periódica de la siguiente forma: $$\delta = \ln(1 + i)$$ Donde $\delta$ es la menor de todas las tasas periódicas de interés bajo el enfoque de equivalencia.`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [
    {
      "type": "case",
      "title": `Caso 1: Inversión en Régimen Compuesto con Frecuencia Variable`,
      "enunciado": `Un inversor coloca \\$50.000 a una TNA ($j$) del $24\%$ durante 1 año ($n=1$). Calcular el monto final bajo tres frecuencias de capitalización: semestral, mensual y continua.`,
      "planteo_solucion": `<b>Capitalización Semestral ($m=2$):</b>
$$M = 50.000 \cdot \left(1 + \frac{0{,}24}{2}\right)^{1 \cdot 2} = 50.000 \cdot (1{,}12)^2 = \$62.720$$

<b>Capitalización Mensual ($m=12$):</b>
$$M = 50.000 \cdot \left(1 + \frac{0{,}24}{12}\right)^{1 \cdot 12} = 50.000 \cdot (1{,}02)^{12} \approx \$63.412$$

<b>Capitalización Continua ($m \to \infty$):</b>
$$\bar{M} = 50.000 \cdot e^{0{,}24 \cdot 1} \approx \$63.562$$`,
      "highlights": `A mayor frecuencia de capitalización, mayor monto final. La capitalización continua representa el <b>límite máximo teórico</b> al que puede llegar el monto bajo el enfoque de proporcionalidad.`
    }
  ],
  "Autoevaluación": [
    {
      "type": "quiz",
      "question": `¿Qué ocurre con el monto final bajo el Enfoque de Proporcionalidad si la frecuencia $m$ tiende a infinito?`,
      "options": [
        `Se alcanza el Monto Máximo (Capitalización Continua)`,
        "El monto tiende a cero",
        `El monto permanece igual al régimen periódico ($m=1$)`
      ],
      "correctIndex": 0,
      "feedback": `Al aumentar la frecuencia de reinversión de intereses, el monto crece hasta su límite físico-matemático definido por la base $e$: $\bar{M} = C \cdot e^{j \cdot n}$.`
    }
  ],
  "Gráficos": []
};

export default data;
