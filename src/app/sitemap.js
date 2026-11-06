import { site } from '@/site.config';

export const dynamic = 'force-static';

const PAGINAS = ['', '/tools'];

export default function sitemap() {
  return PAGINAS.flatMap((ruta) =>
    site.locales.map((l) => ({
      url: `${site.url}/${l}${ruta}`,
      alternates: { languages: Object.fromEntries(site.locales.map((x) => [x, `${site.url}/${x}${ruta}`])) },
    })),
  );
}
