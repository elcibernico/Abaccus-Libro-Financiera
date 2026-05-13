# SOP: Creación de Libro Digital Interactivo de Matemática Financiera

## Objetivo
Transformar contenidos teóricos de Matemática Financiera (provenientes de archivos .docx) en una experiencia web dinámica, interactiva y educativa.

## Entradas
- **Archivos de Origen:** Documentos `.docx` en la carpeta `Unidades/`.
- **Referencia Bibliográfica:** Libro de Ernesto Fransolini.
- **Contexto:** Mercado financiero argentino (UVA, tasas locales, impuestos).

## Salidas
- **Aplicación Web:** SPA/MPA reactiva con soporte para LaTeX.
- **Componentes Interactivos:** Simuladores de tasas, cuadros de amortización, gráficos dinámicos.
- **Contenido Estructurado:** Versión "Esencial" y "Experta" de cada tema.

## Lógica de Procesamiento
1. **Extracción:** Leer archivos `.docx` y convertir a formato Markdown/JSON estructurado.
2. **Enriquecimiento:**
   - Identificar fórmulas y convertirlas a formato LaTeX.
   - Identificar términos técnicos para el glosario interactivo.
   - Insertar placeholders para simuladores y gráficos donde el contenido lo amerite.
3. **Generación de UI:**
   - Renderizar el contenido usando componentes React.
   - Implementar lógica de cálculo financiero para los simuladores.
   - Implementar gráficos interactivos con Chart.js o similar.

## Restricciones y Reglas de Oro
- **LaTeX Obligatorio:** No usar texto plano para fórmulas matemáticas. Usar `$$ ... $$` o similar.
- **Interactividad:** Cada unidad debe tener al menos un elemento interactivo (simulador o gráfico).
- **Dualidad:** Mantener el switch entre Modo Esencial y Modo Experto.
- **Glosario:** Los términos técnicos deben ser consistentes en todo el libro.
- **FILTRADO DE PROMPTS TÉCNICOS (CRÍTICO):** Los documentos fuente suelen incluir instrucciones para la IA (ej: `[PROMPT PARA IA DE CÓDIGO]`, `Concepto Didáctico`, `Lógica del Slider`, `Variables para Programación`). **PROHIBIDO** incluir esta información en la página final.
- **META-TALK DE IA:** Ignorar cualquier texto introductorio de la IA (ej: "Comprendo tu requerimiento...", "A continuación presento...") al procesar las unidades.
- **CONSOLIDACIÓN DE BIBLIOGRAFÍA:** Agrupar todas las referencias bibliográficas en un único bloque al final para mantener la limpieza visual.

## Trampas Conocidas (Memoria Viva)
- *Aún no se han detectado fallos. Se actualizará conforme avance la ejecución.*
