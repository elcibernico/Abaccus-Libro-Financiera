const data = {
  "id": "4.3.1.1.1.2",
  "title": "Deducción Analítico-Algebraica de Marcela González",
  "Desarrollo": [
    {
      "type": "text",
      "content": `<u><b>Deducción Analítico-Algebraica de Marcela González</b></u>
A diferencia de la separación gráfica por corrientes, este método puramente algebraico opera directamente sobre la ecuación original de la renta mediante la aplicación de artificios matemáticos, propiedades de las progresiones y factorizaciones sucesivas.`
    },
    {
      "type": "text",
      "content": `<b>1. Planteo de la Ecuación Original (Ecuación 1)</b>
Partimos de la definición del valor actual () como la suma de las cuotas variables actualizadas, donde la época de valuación está ubicada en el momento inicial:
 $$(1) V=\\frac{C}{(1+i)^{1}}+\\frac{C+r}{(1+i)^{2}}+\\frac{C+2r}{(1+i)^{3}}+…+\\frac{C+(n-2)r}{(1+i)^{n-1}}+\\frac{C+(n-1)r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>2. Multiplicación por el factor de capitalización (Ecuación 2)</b>
Para comenzar la descomposición, multiplicamos ambos miembros de la ecuación por el factor $1+i$. Al hacerlo, el exponente del denominador de cada término disminuye en una unidad (lo que equivale a capitalizar todo un período hacia adelante):
 $$V\\cdot (1+i)=\\frac{C}{(1+i)^{1}}\\cdot (1+i)+\\frac{C+r}{(1+i)^{2}}\\cdot (1+i)+\\frac{C+2\\cdot r}{(1+i)^{3}}\\cdot (1+i)$$
$$+…+\\frac{C+(n-2)\\cdot r}{(1+i)^{n-1}}\\cdot (1+i)+\\frac{C+(n-1)\\cdot r}{(1+i)^{n}}\\cdot (1+i)$$
$$$$
$$(2) V(1+i)=C+\\frac{C+r}{(1+i)^{1}}+\\frac{C+2\\cdot r}{(1+i)^{2}}+…+\\frac{C+(n-2)\\cdot r}{(1+i)^{n-2}}+\\frac{C+(n-1)\\cdot r}{(1+i)^{n-1}} $$`
    },
    {
      "type": "text",
      "content": `<b>3. Resta de Ecuaciones y Simplificación</b>
Procedemos a restar miembro a miembro la Ecuación (1) de la Ecuación (2). En el segundo miembro, restamos entre sí las fracciones que poseen exactamente el mismo denominador. Observa cómo la cuota base $C$ se anula en todos los términos centrales, sobreviviendo únicamente la razón $r$:
 $$V(1+i)-V=(C-\\frac{C}{(1+i)^{1}})+(\\frac{C+r}{(1+i)^{1}}-\\frac{C+r}{(1+i)^{2}})+(\\frac{C+2\\cdot r}{(1+i)^{2}}-\\frac{C+2\\cdot r}{(1+i)^{3}})+…+$$
 $$(\\frac{C+(n-2)\\cdot r}{(1+i)^{n-2}}-\\frac{C+(n-2)\\cdot r}{(1+i)^{n-1}})+(\\frac{C+(n-1)\\cdot r}{(1+i)^{n-1}}-\\frac{C+(n-1)\\cdot r}{(1+i)^{n}})$$`
    },
    {
      "type": "text",
      "content": `$$V\\cdot i=C+\\frac{r}{(1+i)^{1}}+\\frac{r}{(1+i)^{2}}+…+\\frac{r}{(1+i)^{n-1}}-\\frac{C+(n-1)r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `[TOOLTIP-INICIO]
Resolución paso a paso de resta de la Ecuación (2) y la Ecuación (1):

<b>Paso 1: Simplificar el lado izquierdo (Primer Miembro)</b>
Empezamos con la expresión de la izquierda:
 $$V(1+i)-V$$ Aplicamos la propiedad distributiva multiplicando la $V$ por los términos dentro del paréntesis:
 $$V+V\\cdot i-V$$ 
Las $V$ positivas y negativas se cancelan entre sí ($V-V=0$), dejándote con el lado izquierdo de la segunda imagen:
 $$V\\cdot i$$
<b>Paso 2: Reagrupar el lado derecho (Segundo Miembro)</b>
La expresión original de la derecha es una suma de corchetes. Si sacamos todos los corchetes y observamos la secuencia, podemos agrupar las fracciones según su denominador común ( $(1+i)^{1}$ , $(1+i)^{2}$ , etc.):
- <b>Término sin denominador:</b> El primer $C$ queda solo.
- <b>Términos con denominador </b> $(1+i)^{1}$ <b>:</b>
 $$-\\frac{C}{(1+i)^{1}}+\\frac{C+r}{(1+i)^{1}}=\\frac{-C+(C+r)}{(1+i)^{1}}$$ 
<b>- Términos con denominador </b> $(1+i)^{2}$ <b>:</b>
 $$-\\frac{C+r}{(1+i)^{2}}+\\frac{C+2\\cdot r}{(1+i)^{2}}=\\frac{-(C+r)+(C+2\\cdot r)}{(1+i)^{2}}$$ 
<b>- </b><b>Términos con denominador </b> $(1+i)^{n-1}$ <b>:</b>
 $$-\\frac{C+(n-2)\\cdot r}{(1+i)^{n-1}}+\\frac{C+(n-1)\\cdot r}{(1+i)^{n-1}}=\\frac{-(C+(n-2)\\cdot r)+(C+(n-1)\\cdot r)}{(1+i)^{n-1}}$$ 
<b>- </b><b>Último término:</b> Al final de toda la serie, el último término negativo queda sin pareja con quien agruparse:
 $$-\\frac{C+(n-1)\\cdot r}{(1+i)^{n}}$$ 
<b>Paso 3: Resolver las restas de cada grupo</b>
Ahora, unificamos los numeradores en cada grupo que armamos en el paso anterior. Al tener el mismo denominador, simplemente restamos o sumamos los numeradores directamente.

<b>Para el denominador </b> $(1+i)^{1}$ <b>:</b>
 $$\\frac{-C+(C+r)}{(1+i)^{1}}=\\frac{-C+C+r}{(1+i)^{1}}=\\frac{r}{(1+i)^{1}}$$ 
<b>Para el denominador </b> $(1+i)^{2}$ <b>:</b>
 $$\\frac{-(C+r)+(C+2\\cdot r)}{(1+i)^{2}}=\\frac{-C-r+C+2r}{(1+i)^{2}}=\\frac{r}{(1+i)^{2}}$$ 
<i>Nota: El signo negativo afecta a todo el numerador</i> $(C+r)$ <i>, por eso queda </i> $-C-r$ 
<b>Para el denominador </b> $(1+i)^{n-1}$ <b>:</b>
 $$\\frac{-(C+(n-2)\\cdot r)+(C+(n-1)\\cdot r)}{(1+i)^{n-1}}=\\frac{-C-nr+2r+C+nr-r}{(1+i)^{n-1}}=\\frac{r}{(1+i)^{n-1}}$$ 
Como se puede apreciar, la diferencia entre los numeradores consecutivos siempre da como resultado una sola $r$ .

<b>Paso 4: Armar la expresión final</b>
Si unimos el lado izquierdo simplificado (Paso 1) con todos los términos resultantes del lado derecho (Paso 3, más los extremos que quedaron sueltos en el Paso 2), obtenemos exactamente la segunda expresión:
 $$V\\cdot i=C+\\frac{r}{(1+i)^{1}}+\\frac{r}{(1+i)^{2}}+…+\\frac{r}{(1+i)^{n-1}}-\\frac{C+(n-1)r}{(1+i)^{n}}$$ [TOOLTIP-FIN]
`
    },
    {
      "type": "text",
      "content": `<b>4. Distribución y Agrupación de Términos</b>
Tomamos el último término de la expresión (2)
 $$-\\frac{C+(n-1)r}{(1+i)^{n}}$$ 
Y distribuimos el factor $(1+i)^{-n}$ :
 $$-\\frac{C+(n-1)r}{(1+i)^{n}}=-\\frac{C}{(1+i)^{n}}-\\frac{(n-1)r}{(1+i)^{n}}$$
Reemplazamos en la ecuación principal
 $$V\\cdot i=C+\\frac{r}{(1+i)^{1}}+\\frac{r}{(1+i)^{2}}+…+\\frac{r}{(1+i)^{n-1}}-\\frac{C}{(1+i)^{n}}-\\frac{(n-1)r}{(1+i)^{n}}$$ 
Reordenamos la ecuación principal acercando los términos que contienen a la variable $C$ y agrupando los términos que contienen a la variable $r$ :
 $$V\\cdot i=C-\\frac{C}{(1+i)^{n}}+\\frac{r}{(1+i)^{1}}+\\frac{r}{(1+i)^{2}}+…+\\frac{r}{(1+i)^{n-1}}-\\frac{(n-1)r}{(1+i)^{n}}$$ 
Sacando factor común $C$ en los primeros dos términos y factor común $r$ en el resto de los términos, a excepción del último:
 $$V\\cdot i=C\\cdot (1-\\frac{1}{(1+i)^{n}})+r\\cdot (\\frac{1}{(1+i)^{1}}+\\frac{1}{(1+i)^{2}}+…+\\frac{1}{(1+i)^{n-1}})-\\frac{(n-1)r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>5. Primer Artificio Matemático (Completar la Progresión Geométrica)</b>
Dentro del corchete que multiplica a $r$ , tenemos una serie geométrica que llega solamente hasta el exponente $(n-1)$ . Para que represente una renta completa de $n$ períodos, debemos sumarle el término faltante $\\frac{1}{(1+i)^{n}}$ y, para no alterar la ecuación, restarlo inmediatamente fuera de la sumatoria:
 $$V\\cdot i=C\\cdot (1-\\frac{1}{(1+i)^{n}})+r\\cdot (\\frac{1}{(1+i)^{1}}+\\frac{1}{(1+i)^{2}}+…+\\frac{1}{(1+i)^{n-1}}+\\frac{1}{(1+i)^{n}}-\\frac{1}{(1+i)^{n}})-\\frac{(n-1)\\cdot r}{(1+i)^{n}}$$
$$V\\cdot i=C\\cdot (1-\\frac{1}{(1+i)^{n}})+r\\cdot (\\frac{1}{(1+i)^{1}}+\\frac{1}{(1+i)^{2}}+…+\\frac{1}{(1+i)^{n-1}}+\\frac{1}{(1+i)^{n}})-r\\cdot \\frac{1}{(1+i)^{n}}-\\frac{(n-1)\\cdot r}{(1+i)^{n}}$$
$$V\\cdot i=C\\cdot (1-\\frac{1}{(1+i)^{n}})+r\\cdot j=1n\\frac{1}{(1+i)^{j}}-\\frac{r}{(1+i)^{n}}-\\frac{(n-1)\\cdot r}{(1+i)^{n}}$$ 
Ahora, agrupamos matemáticamente los dos últimos términos negativos:
 $$-\\frac{r}{(1+i)^{n}}-\\frac{(n-1)\\cdot r}{(1+i)^{n}}=-\\frac{r}{(1+i)^{n}}\\cdot (1+n-1)=-\\frac{n\\cdot r}{(1+i)^{n}}$$
La ecuación queda sintetizada en:
 $$V\\cdot i=C\\cdot (1-\\frac{1}{(1+i)^{n}})+r\\cdot j=1n\\frac{1}{(1+i)^{j}}-\\frac{n\\cdot r}{(1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>6. Sustitución Financiera y División:</b>
Sabemos que la sumatoria central (la del segundo término) es, por definición, el valor actual de una renta unitaria vencida $a_{n;i}$ de cuotas $r$ :
 $$V\\cdot i=C\\cdot (1-\\frac{1}{(1+i)^{n}})+r\\cdot a_{n:i}-\\frac{n\\cdot r}{(1+i)^{n}}$$
$$V\\cdot i=C\\cdot (1-(1+i)^{-n})+r\\cdot a_{n:i}-\\frac{n\\cdot r}{(1+i)^{n}}$$ 
Asimismo, si dividimos todos los términos de la ecuación por la tasa $i$ , obtenemos:
 $$\\frac{V\\cdot i}{i}=C\\cdot (\\frac{1-(1+i)^{-n}}{i})+\\frac{r}{i}\\cdot a_{n:i}-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}$$ 
Como el primer corchete es también igual a $a_{n:i}$ , la fórmula llega al modelo unificado estándar:
 $$V=C\\cdot a_{n;i}+\\frac{r}{i}\\cdot a_{n;i}-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}$$`
    },
    {
      "type": "text",
      "content": `<b>7. Segundo Artificio Matemático </b>
Llegados a este punto, y para alterar la morfología de la fórmula, tomamos exclusivamente el último término 
 $$-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}$$ 
Lo reordenamos:
 $$-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}=-\\frac{n\\cdot r\\cdot (1+i)^{-n}}{i}$$ 
Y sumamos y restamos la expresión $n\\cdot r$ en su numerador:
 $$-\\frac{n\\cdot r\\cdot (1+i)^{-n}}{i}=\\frac{-(n\\cdot r\\cdot (1+i)^{-n})+(n\\cdot r)-(n\\cdot r)}{i}$$
$$-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}=\\frac{-(n\\cdot r\\cdot (1+i)^{-n})+(n\\cdot r)-(n\\cdot r)}{i}=\\frac{+n\\cdot r-n\\cdot r\\cdot (1+i)^{-n}-n\\cdot r}{i}$$
Agrupamos y sacamos factor común $n\\cdot r$ en los primeros dos sumandos del numerador:
 $$-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}=\\frac{+n\\cdot r-n\\cdot r\\cdot (1+i)^{-n}-n\\cdot r}{i}=\\frac{n\\cdot r\\cdot (1-(1+i)^{-n})-n\\cdot r}{i}$$
Separamos el denominador para ambas partes:
 $$-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}=\\frac{n\\cdot r\\cdot (1-(1+i)^{-n})-n\\cdot r}{i}=n\\cdot r\\cdot (\\frac{1-(1+i)^{-n}}{i})-\\frac{n\\cdot r}{i}$$
Como el corchete es exactamente el factor $a_{n;i}$ , el término negativo original queda descompuesto en:
 $$-\\frac{n\\cdot r}{i\\cdot (1+i)^{n}}=n\\cdot r\\cdot (\\frac{1-(1+i)^{-n}}{i})-\\frac{n\\cdot r}{i}=n\\cdot r\\cdot a_{n:i}-\\frac{n\\cdot r}{i}$$`
    },
    {
      "type": "text",
      "content": `<b>8. Fórmula Alternativa Final</b>
Sustituimos esta nueva descomposición en nuestra ecuación de $V$ :
 $$V=C\\cdot a_{n:i}+\\frac{r}{i}\\cdot a_{n:i}+n\\cdot r\\cdot a_{n:i}-\\frac{n\\cdot r}{i}$$
Finalmente, extrayendo factor común $a_{n;i}$ en los tres primeros términos, arribamos a la fórmula final y alternativa de $V_{n_{a}}$
$$V_{n_{a}}=(C+\\frac{r}{i}+n\\cdot r)\\cdot a_{n:i}-\\frac{n\\cdot r}{i}$$`
    },
    {
      "type": "text",
      "content": `<u><b>Comprobación de Fórmulas de los profesores Ernesto Fransolini y Marcela González</b></u>
Partimos de la expresión $V_{n_{a}}$ de la profesora Marcela González
 $$V_{n_{a}}=(C+\\frac{r}{i}+n\\cdot r)\\cdot a_{n:i}-\\frac{n\\cdot r}{i}$$

<b>Paso 1: Distribuir el factor </b> $a_{n;i}$ 
Vamos a separar el término $n\\cdot r$ del resto dentro del paréntesis y distribuimos $a_{n;i}$ :
 $$V_{n_{a}}=(C+\\frac{r}{i})\\cdot a_{n:i}+(n\\cdot r)\\cdot a_{n:i}-\\frac{n\\cdot r}{i}$$ 
Como se puede notar, la primera parte $(C+\\frac{r}{i})\\cdot a_{n:i}$ ya quedó idéntica a la expresión final que buscamos (la del Profesor Ernesto Fransolini). Ahora nos enfocamos en simplificar los dos términos restantes.

<b>Paso 2: Sacar factor común</b>
Tomamos los dos últimos términos y sacamos factor común $n\\cdot r$ :
 $$n\\cdot r(a_{n:i}-\\frac{1}{i})$$ 

<b>Paso 3: Sustituir la fórmula de </b> $a_{n:i}$ 
Recordemos la fórmula estándar del valor actual de una renta cierta, temporaria y vencida:
 $$a_{n:i}=\\frac{1-(1+i)^{-n}}{i}$$ Reemplazamos esta definición dentro del paréntesis que armamos en el paso anterior:
 $$a_{n:i}-\\frac{1}{i}=\\frac{1-(1+i)^{-n}}{i}-\\frac{1}{i}$$ 

<b>Paso 4: Operar y simplificar</b>
Como ambas fracciones tienen el mismo denominador ( $i$ ), podemos restar los numeradores directamente:
 $$=\\frac{1-(1+i)^{-n}-1}{i}$$ 
Los unos se cancelan mutuamente ( $1-1=0$ ), dejando:
 $$=\\frac{-(1+i)^{-n}}{i}$$ Expresando la potencia negativa como positiva en el denominador, obtenemos:
 $$=-\\frac{1}{i\\cdot (1+i)^{n}}$$ 

<b>Paso 5: Reconstruir la expresión</b>
Ahora multiplicamos este resultado por el factor común $n\\cdot r$ que habíamos dejado afuera en el Paso 2:
 $$n\\cdot r(-\\frac{1}{i\\cdot (1+i)^{n}})=-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$ 
Finalmente, unimos esta segunda parte simplificada con la primera parte de la ecuación, llegando exactamente a tu segunda imagen:
 $$V_{n_{a}}=(C+\\frac{r}{i})\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n$$ 
Nuevamente, si se tratase de una renta de cuotas adelantadas, sencillamente le entregamos a la ecuación (fórmula) el factor de cuota adelantada $(1+i)$ y en la simbología del valor financiero de la renta, agregamos el apóstrofo $V'_{n_{a}}$ . Así:
 $$V'_{n_{a}}=\\left[(C+\\frac{r}{i})\\cdot a_{n:i}-\\frac{r}{i}\\cdot \\frac{1}{(1+i)^{n}}\\cdot n\\right]\\cdot (1+i)$$`
    }
  ],
  "Glosario": [],
  "Casos Prácticos": [],
  "Autoevaluación": [],
  "Gráficos": []
};

export default data;
