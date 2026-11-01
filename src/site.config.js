/* Configuración central del sitio. Lo que cambia con frecuencia vive aquí. */
export const site = {
  name: 'Hetor',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Idiomas. Para agregar uno: añade el código aquí y crea src/dictionaries/<codigo>.json
  locales: ['es', 'en'],
  defaultLocale: 'es', // si el navegador no manda idioma
  fallbackLocale: 'en', // si manda un idioma que no soportamos (p. ej. alemán)

  // Tu WhatsApp: solo dígitos con código de país (México: 52 + 10 dígitos). Escríbelo aquí entre comillas.
  // (También se puede definir NEXT_PUBLIC_WHATSAPP en .env.local; si está, tiene prioridad.)
  // Ojo: este archivo se sube a Git, así que el número quedará en el repositorio.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '527204558369', // número personal por ahora; luego se cambiará

  // Redes y contacto del pie de página. Los que estén vacíos NO se muestran.
  instagram: '', // URL completa, ej.: https://www.instagram.com/tu_usuario
  x: 'https://x.com/HectorH30774339', // URL completa
  email: '',     // ej.: hola@hetor.dev

  github: 'hehurove-gif', // usuario cuya lista de repos se muestra en la demo en vivo
  githubRevalidateSeconds: 3600, // (solo aplica si algún día vuelves a un servidor; en sitio estático la lista se actualiza en cada despliegue)

  // Caso KOA: ponlo en false para ocultarlo (por ejemplo mientras KOA confirma el permiso).
  showKOA: true,
  koaUrl: 'https://esports.koa-hub.com/',
  xhockUrl: 'https://koa-hub.com/tickets/', // venta de boletos XHOCK (en refactorización)

  // DOPTA (versión web). Cuando la publiques, pon aquí su URL y aparecerá el enlace "Ver sitio".
  // Para usar su logo: copia el archivo a public/clients/ y escribe la ruta, ej.: '/clients/dopta-logo.png'.
  doptaUrl: '',
  doptaLogo: '/clients/dopta-logo.svg',
};
