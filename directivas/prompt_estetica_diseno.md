# PROMPT REUTILIZABLE: Estética y Sistema de Diseño basado en Logo de la Organización

> **Instrucción:** Copiá y pegá todo lo que está debajo de la línea divisoria en cualquier conversación con una IA para que diseñe tu aplicación web con una estética profesional y coherente.

---

## Prompt para copiar y pegar:

```
Voy a pedirte que diseñes la estética completa de una aplicación web. Pero antes de empezar a escribir código, necesito que hagas lo siguiente:

## PASO PREVIO OBLIGATORIO: Pedime el logo

Antes de definir cualquier color, paleta o estilo, PEDIME QUE TE SUBA EL LOGO DE LA ORGANIZACIÓN para la cual voy a hacer este proyecto. No avances sin él.

Una vez que te lo suba, hacé dos cosas:

### A) Análisis de COLORES:
Analizá los colores predominantes del logo y construí toda la paleta de colores de la aplicación en base a esos colores. Esto incluye:
- Color primario (el color más representativo del logo)
- Color secundario (un tono complementario derivado del logo)
- Color de acento (para llamados a la atención, botones, highlights)
- Variantes claras y oscuras de cada color para el modo claro y oscuro

Los colores los definís vos directamente en base al logo. No me los consultes, aplicalos con criterio profesional.

### B) Análisis de TIPOGRAFÍA:
Si el logo contiene texto/letras, analizá la tipografía que usa el logo e identificá qué fuente es o cuál es la fuente web (de Google Fonts) más similar.

Luego, ANTES de escribir cualquier código, presentame **3 versiones visuales de tipografía** para que yo elija cuál me gusta más. Mostrámelas con un ejemplo visual (puede ser una captura, un mockup, o un bloque de texto con cada fuente aplicada) para que pueda compararlas fácilmente. Las 3 opciones son:

1. **Versión "Inter":** Usando la fuente Inter de Google Fonts (limpia, moderna, muy usada en dashboards).
2. **Versión "Calibri":** Usando la fuente Calibri (o su equivalente web más cercana, como 'Carlito' de Google Fonts, ya que Calibri no está en Google Fonts).
3. **Versión "Logo":** Usando la fuente que detectaste en el logo (o la más parecida disponible en Google Fonts). Debe ser limpia, legible y profesional.

Esperá mi selección antes de avanzar. Una vez que elija, usá esa fuente en todo el proyecto.

Si el logo NO tiene texto, saltá el paso B y usá Inter por defecto.

---

## SISTEMA DE DISEÑO - Especificaciones Estéticas

### Filosofía general:
La aplicación debe verse **premium, corporativa y moderna**. Debe causar una primera impresión de profesionalismo y sofisticación. Nada debe verse "básico" ni "de template genérico".

### Modo Claro y Oscuro:
La app DEBE soportar ambos modos. El modo oscuro debe ser el predeterminado. Implementá un botón toggle con íconos de sol (☀️) y luna (🌙) para alternar.

#### Modo Oscuro (por defecto):
- Fondo principal: gris muy oscuro/azulado (rango #111827 a #0f172a, ajustar según la paleta del logo)
- Fondo de tarjetas/cards: gris oscuro (rango #1f2937 a #1e293b)
- Texto principal: blanco suave (#f9fafb)
- Bordes: gris medio (#374151)
- Hover en elementos: gris medio (#374151)

#### Modo Claro:
- Fondo principal: gris muy claro (#f3f4f6)
- Fondo de tarjetas/cards: blanco puro (#ffffff)
- Texto principal: gris muy oscuro (#1f2937)
- Bordes: gris claro (#e5e7eb)
- Hover en elementos: gris casi blanco (#f9fafb)

### Tipografía:
- La fuente se define según la versión que yo haya elegido en el paso previo.
- Importarla desde Google Fonts.
- Pesos usados: 400 (normal), 500 (medium), 600 (semibold), 700 (bold).
- Fallback siempre a system-ui, sans-serif.

### Variables CSS (Custom Properties):
Definir TODAS las propiedades visuales como variables CSS en `:root` y sobreescribirlas en `[data-theme='dark']`. Ejemplo de estructura:

```css
:root {
  --bg-color: #f3f4f6;
  --text-color: #1f2937;
  --card-bg: #ffffff;
  --primary-color: /* DERIVADO DEL LOGO */;
  --secondary-color: /* DERIVADO DEL LOGO */;
  --border-color: #e5e7eb;
  --hover-color: #f9fafb;
  --accent-color: /* DERIVADO DEL LOGO */;
  --font-family: /* FUENTE ELEGIDA */, system-ui, sans-serif;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

[data-theme='dark'] {
  --bg-color: #111827;
  --text-color: #f9fafb;
  --card-bg: #1f2937;
  --primary-color: /* VERSIÓN CLARA DEL COLOR DEL LOGO PARA QUE RESALTE EN FONDO OSCURO */;
  --secondary-color: /* AJUSTADO PARA MODO OSCURO */;
  --border-color: #374151;
  --hover-color: #374151;
  --accent-color: /* VERSIÓN CLARA DEL ACENTO */;
}
```

### Tarjetas / Cards / Secciones:
- Border-radius: 1rem (16px) para secciones grandes, 0.75rem para elementos medianos, 0.375rem para botones/inputs.
- Box-shadow: usar las variables --shadow-sm, --shadow-md, --shadow-lg según la jerarquía.
- Border: 1px solid var(--border-color) en todas las cards.
- Padding interno: 1.5rem.
- Hover en cards interactivas: translateY(-2px) + shadow-lg.

### Botones:
- Botones primarios: fondo con --primary-color, texto blanco, border-radius 0.375rem a 0.5rem, font-weight 600.
- Botones secundarios/toggle: fondo --bg-color, borde --border-color, texto --text-color.
- Estado activo (.active): fondo --primary-color, texto blanco, borde --primary-color.
- Transiciones en hover: 0.2s a 0.3s ease.

### Tablas:
- Ancho completo (width: 100%).
- border-collapse: collapse.
- Celdas con padding: 0.75rem 1rem.
- Encabezados: font-weight 600, opacity 0.8, fondo --hover-color.
- Filas con hover: background-color --hover-color.
- Separador entre filas: border-bottom 1px solid --border-color.

### Inputs y Selects:
- Padding: 0.5rem a 0.6rem.
- Border-radius: 0.375rem.
- Border: 1px solid --border-color.
- Background: --bg-color.
- Color: --text-color.
- Focus: outline none, border-color --primary-color, box-shadow sutil azul (0 0 0 2px rgba del primary con 0.2 de opacidad).

### Animaciones y Micro-interacciones:
- Usar framer-motion para animaciones de entrada/salida de componentes (fade in, slide, scale).
- Dropdowns: animación de entrada con opacity 0→1 y translateY -10→0.
- Modales: overlay con backdrop-filter: blur(4px) y background rgba(0,0,0,0.5). Contenido con scale 0.9→1 en entrada.
- Todas las transiciones CSS deben usar la variable --transition (all 0.3s ease).

### Modales:
- Overlay a pantalla completa con blur de fondo.
- Card centrada: max-width 500px, width 90%, border-radius 1rem.
- Botón de cierre: ícono X, bordes redondeados, hover con fondo --hover-color.

### Layout General:
- Usar flexbox como sistema de layout principal.
- La app debe ser un flex container vertical (flex-direction: column, min-height: 100vh).
- El contenido principal (main) debe tener flex: 1 para empujar el footer abajo.
- Padding del contenido: 2rem en desktop, 1rem en móvil.
- Gap entre secciones: 2rem.

### Grids responsivos:
- Usar CSS Grid con `grid-template-columns: repeat(auto-fit, minmax(Xpx, 1fr))` para layouts que se adaptan automáticamente.
- Filtros: minmax(200px, 1fr).
- KPI cards: minmax(250px, 1fr).
- En móvil (max-width: 768px): forzar grid-template-columns: 1fr.

### Scrollbar personalizado (opcional pero recomendado):
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-color); }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--primary-color); }
```

### Breakpoints de responsividad:
- Mobile: max-width 768px
- Tablet: max-width 1024px
- Desktop: por defecto

---

## RESUMEN DEL FLUJO ANTES DE CODEAR

1. Pedime el logo de la organización.
2. Analizá colores → definí la paleta (sin consultarme, usá tu criterio).
3. Si el logo tiene texto → analizá la fuente → mostrámelas 3 versiones de tipografía (Inter, Calibri/Carlito, y la del logo).
4. Esperá que yo elija la tipografía.
5. Recién ahí empezá a construir la aplicación.

Recordá: los colores en modo oscuro suelen ser versiones más claras/saturadas de los del modo claro, para que resalten sobre fondos oscuros.
```

