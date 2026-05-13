# PROMPT REUTILIZABLE: Header, Footer y TitleTag con Administración Centralizada

> **Instrucción:** Copiá y pegá todo lo que está debajo de la línea divisoria en cualquier conversación con una IA para que te construya el sistema completo.

---

## Prompt para copiar y pegar:

```
Necesito que construyas el Header, el Footer y el TitleTag (título e ícono de la pestaña del navegador) de mi aplicación web siguiendo estas especificaciones exactas:

---

## 1. ARCHIVO DE CONFIGURACIÓN CENTRALIZADO (config.json)

Creá un archivo llamado `config.json` en la carpeta `src/` del proyecto. TODA la información textual, URLs de imágenes/logos y configuraciones del header, footer y titletag deben vivir en este archivo. La aplicación debe leer este archivo al cargar y nunca tener textos o URLs hardcodeados en el código del componente.

La estructura del archivo debe ser exactamente esta:

```json
{
  "header": {
    "titleLine1": "[TÍTULO PRINCIPAL - la línea más grande y prominente]",
    "titleLine2": "[SUBTÍTULO - tamaño intermedio, color del primary del tema]",
    "titleLine3": "[TERCERA LÍNEA - la más pequeña, con leve opacidad]",
    "logoDarkModeUrl": "[URL del logo para modo oscuro]",
    "logoLightModeUrl": "[URL del logo para modo claro]"
  },
  "footer": {
    "authorName": "[Nombre del autor]",
    "whatsappPhone": "[Número de WhatsApp con código de país, sin + ni espacios. Ej: 5493416177623]",
    "showExtraReference": true,
    "extraReferenceText": "[Texto de la referencia adicional]",
    "extraReferenceLogoLightUrl": "[URL del logo de la referencia para modo claro]",
    "extraReferenceLogoDarkUrl": "[URL del logo de la referencia para modo oscuro]"
  },
  "titletag": {
    "title": "[Texto que aparece en la pestaña del navegador]",
    "faviconLightModeUrl": "[URL del favicon para modo claro]",
    "faviconDarkModeUrl": "[URL del favicon para modo oscuro]"
  }
}
```

**Nota sobre las URLs de imágenes/logos:**
Las URLs pueden provenir de cualquier fuente accesible públicamente. Un ejemplo típico es un repositorio de GitHub, donde la URL cruda (raw) tiene este formato:
`https://raw.githubusercontent.com/{usuario}/{repositorio}/main/{ruta}/{nombre-archivo}.png`

Ejemplo real:
`https://raw.githubusercontent.com/elcibernico/ImagesLogos/main/Logos-ADSF/ADSF-Logo-Sin-Texto.png`

También podés usar URLs de cualquier otro hosting de imágenes, CDN, o incluso archivos locales del proyecto (en la carpeta `public/`).

Yo te voy a dar los valores específicos para cada campo. Vos solo armá la estructura y conectala.

---

## 2. HEADER - Especificaciones

### Estructura visual:
- A la IZQUIERDA: Logo de la organización + 3 líneas de texto apiladas verticalmente.
- A la DERECHA: Botones de navegación + botón de alternancia de tema (sol/luna para claro/oscuro).

### Logo:
- La imagen debe cambiar automáticamente según el tema activo (claro u oscuro), tomando la URL desde config.json.
- Tamaño base: 80px de alto. Se reduce a 50px cuando se hace scroll.

### Títulos (3 líneas jerárquicas):
- **Línea 1 (titleLine1):** font-size 1.5rem, font-weight 700 (negrita), color del texto principal del tema.
- **Línea 2 (titleLine2):** font-size 1.1rem, font-weight 600, color primario del tema (el color de acento, no el del texto base).
- **Línea 3 (titleLine3):** font-size 0.95rem, font-weight 500, color del texto principal con opacity 0.8.

### Comportamiento al hacer scroll:
- El header debe ser `position: sticky; top: 0;` para que quede fijo arriba.
- Al hacer scroll hacia abajo (más de 20px), el header debe achicarse con una transición suave (0.3s):
  - El padding se reduce.
  - El logo se achica de 80px a 50px.
  - Las líneas 2 y 3 desaparecen progresivamente (max-height: 0, opacity: 0).
  - Solo quedan visibles el logo reducido y la línea 1 (título principal), también reducida a font-size 1.2rem.
- Al volver arriba, todo se restaura suavemente.

### Responsividad (móvil):
- En pantallas menores a 768px, el header se reorganiza en columna centrada.
- Los títulos reducen su tamaño proporcionalmente.

---

## 3. FOOTER - Especificaciones

### Estructura visual (todo centrado horizontalmente en una sola línea):
- **Nombre del autor:** en negrita (font-weight 700), font-size 1.125rem.
- **Ícono de WhatsApp:** inmediatamente a la derecha del nombre. Debe ser un SVG embebido directamente en el código (NO usar FontAwesome ni librerías externas). Color del SVG: `#25D366` (verde oficial de WhatsApp). Al hacer hover, debe escalar sutilmente (scale 1.15). El enlace debe apuntar a `https://wa.me/{número}` usando el número del config.json.
- **Referencia adicional (opcional):** Si `showExtraReference` es `true` en el config.json, mostrar:
  - Un separador vertical: ` | ` (con espacios, font-size 1.5rem, opacity 0.5)
  - El texto de la referencia en negrita (font-weight 700)
  - El logo de la referencia (28px de alto), que también cambia según el tema claro/oscuro.
- Si `showExtraReference` es `false`, esa sección no se renderiza en absoluto.

### Estilo general del footer:
- Background del card/componente del tema.
- Border-top de 1px sólido con el color de borde del tema.
- Padding de 2rem.
- Se empuja automáticamente al fondo de la página (margin-top: auto).

---

## 4. TITLETAG - Especificaciones

### Título de la pestaña:
- Al cargar la aplicación, el `document.title` debe establecerse con el valor de `titletag.title` del config.json.

### Favicon dinámico:
- Al cargar la app y cada vez que cambie el tema (claro/oscuro), el favicon debe actualizarse dinámicamente:
  - Buscar el elemento `<link rel="icon">` en el DOM. Si no existe, crearlo.
  - Asignarle la URL correspondiente al tema activo desde el config.json.
- Esto permite que el ícono de la pestaña del navegador cambie según el modo del tema.

---

## 5. REGLAS GENERALES

1. **CERO textos hardcodeados:** Todo texto o URL que aparezca en header, footer o titletag debe venir exclusivamente del config.json.
2. **Modo claro/oscuro:** La app debe tener soporte completo de temas. Todos los logos/imágenes deben tener una versión para cada modo, administrada desde el config.json.
3. **Transiciones suaves:** Todos los cambios visuales (scroll, hover, cambio de tema) deben tener transiciones CSS de 0.2s a 0.3s.
4. **Profesionalismo:** El diseño debe verse premium, corporativo y limpio. Nada de placeholders ni textos de ejemplo visibles.

Ahora, para completar el config.json, necesito que me proporciones:
- Los 3 textos del header (título, subtítulo, tercera línea)
- Las URLs de los logos del header (modo claro y oscuro)
- Tu nombre para el footer y número de WhatsApp
- Si querés una referencia adicional en el footer (texto + URLs de logos)
- El título que querés en la pestaña del navegador y las URLs de los favicons
```
