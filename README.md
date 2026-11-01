# Hetor · hetor.dev (prototipo)

Next.js 16 + Tailwind CSS 4, en JavaScript. Bilingüe (/es y /en), tema que sigue al dispositivo, y una sección que lee tus repos de GitHub con su API.

## Qué necesitas instalar

- **Node.js 20 o más nuevo** (revisa con `node -v`). Descárgalo en https://nodejs.org (versión LTS). `npm` viene incluido.
- Un editor, por ejemplo VS Code.

No hay que instalar Next.js ni Tailwind por separado: `npm install` los trae.

## Primer arranque

```bash
npm install
cp .env.example .env.local     # en Windows PowerShell: copy .env.example .env.local
# edita .env.local y pon tu WhatsApp (código de país + número, solo dígitos)
npm run dev
```

Abre http://localhost:3000. Te redirige a /es o /en según el idioma de tu navegador.

- Mientras no pongas tu número de WhatsApp, los botones salen con borde punteado y la pista "Falta configurar…" (solo en desarrollo). En producción esos botones no se muestran.
- Después de cambiar `.env.local`, reinicia `npm run dev`.

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Nombre, idiomas, usuario de GitHub, interruptor del caso KOA | `src/site.config.js` |
| Todos los textos (español e inglés) | `src/dictionaries/es.json` y `en.json` |
| Colores (oscuro/claro, cian y violeta) | `src/app/globals.css` (variables al inicio) |
| Foto de perfil y logos de clientes | `public/profile/` y `public/clients/` (los archivos de `public/` se sirven tal cual) |
| Orden de las secciones | `src/app/[lang]/page.js` |
| Detección de idioma | `public/index.html` |

Para agregar un idioma: añade el código en `locales` de `site.config.js`, crea `src/dictionaries/<codigo>.json` con las mismas claves y regístralo en `src/app/[lang]/dictionaries.js`.

## Caso KOA

La tarjeta de KOA eSports se controla con `showKOA` en `src/site.config.js`. Ponla en `false` si todavía no tienes la confirmación de KOA para mostrarlo.

## Demo de GitHub

`src/lib/github.js` consulta la API pública de GitHub y guarda el resultado una hora. Sin token hay un límite de peticiones; si lo alcanzas, la sección muestra un aviso en lugar de romperse. Opcional: pon `GITHUB_READ_TOKEN` en `.env.local` (solo en servidor, nunca en el navegador).

## Producción (sitio estático)

```bash
npm run build
```

Genera la carpeta `out/`: HTML, CSS y JS listos para subir a cualquier hosting (no necesita Node en el servidor).

- **Idioma:** `public/index.html` decide a dónde mandar a quien entra a `/` (idioma guardado → idioma del navegador → español; si no hay coincidencia, inglés). El selector de idioma guarda la elección en el navegador.
- **GitHub demo:** la lista se genera al compilar, así que se actualiza en cada despliegue.
- **Variables:** define `NEXT_PUBLIC_SITE_URL` (p. ej. `https://hetor.dev`) en el panel del hosting; sin ella, las imágenes de vista previa apuntan a localhost.
- **Cloudflare Pages:** conecta el repositorio de GitHub; Build command `npm run build`, Build output directory `out`. Cada `git push` publica solo. `public/_headers` declara el tipo de la imagen de vista previa.
