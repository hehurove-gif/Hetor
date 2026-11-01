import { site } from '@/site.config';

export const dynamic = 'force-static';

export default function sitemap() {
  return site.locales.map((l) => ({
    url: `${site.url}/${l}`,
    alternates: { languages: Object.fromEntries(site.locales.map((x) => [x, `${site.url}/${x}`])) },
  }));
}
