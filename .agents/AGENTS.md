# Reglas del Proyecto: Libro Financiera

## Protocolo Obligatorio para Ingesta de Documentos (.docx)

Cada vez que el usuario solicite parsear un archivo `.docx` (ej: "parseá el archivo U04-Pto_03-1-1-1-3.docx"), el agente DEBE realizar los siguientes pasos de control de calidad sin necesidad de recordatorios:

1. **Inspección del XML de Origen**:
   - Analizar la estructura del XML nativo del documento `word/document.xml`.
   - Identificar si hay saltos de línea manuales (`<w:br/>`) dentro de los párrafos.
   - Detectar si hay texto normal (como aclaraciones, notas u oraciones) anidado por error dentro de los bloques de ecuaciones matemáticas (`<ns2:oMath>` o `<ns2:oMathPara>`).

2. **Doble Escape de LaTeX en Archivos TypeScript (`.ts`)**:
   - En los archivos `.ts` generados, asegurar que **todas** las barras diagonales inversas de las fórmulas de LaTeX estén escritas con doble escape (`\\` en lugar de `\`), por ejemplo: `\\Rightarrow`, `\\text{}`, `\\frac{}{}`, `\\left`, `\\right`, `\\cdot`.
   - Si se escribe con barra simple (`\`), JavaScript/TypeScript interpretará secuencias de escape (como `\r` para retorno de carro o `\t` para tabulación), rompiendo la renderización de KaTeX en el frontend.

3. **Formateo Seguro de KaTeX**:
   - Asegurar que todo texto alfabético dentro de una ecuación de LaTeX esté envuelto en el comando `\text{}` (ej: `\\text{¡¡¡ABSURDO FINANCIERO!!!}`).
   - Reemplazar caracteres especiales incompatibles con KaTeX (como `‼`) por caracteres estándar o comandos equivalentes.

4. **Consolidación Estructural de Bloques**:
   - Agrupar los títulos o encabezados secundarios con sus respectivos párrafos y fórmulas en el mismo bloque de `Desarrollo` para evitar la creación de tarjetas/cajas vacías u huérfanas en el frontend.

5. **Validación de Integridad**:
   - Hacer un cotejo línea por línea del archivo `.ts` generado contra el `.docx` original para certificar que no falten oraciones, aclaraciones o líneas completas de texto.

## Protocolo de Calidad de Código Frontend

6. **Evitar styled-jsx anidados**:
   - En Next.js, **nunca** definas etiquetas `<style jsx>` dentro de bloques condicionales u otros elementos hijos anidados en el árbol JSX. Todos los estilos de styled-jsx deben declararse en la raíz del componente (o combinarse en un único bloque de estilo al final del archivo).

7. **Verificación Obligatoria en Localhost**:
   - Antes de dar por finalizada una tarea frontend, el agente debe ejecutar el compilador (`npx tsc --noEmit`) y, si es posible, corroborar la correcta compilación del servidor de desarrollo local para evitar errores de renderizado en caliente en el navegador (como elementos rotos o problemas de hidratación).
