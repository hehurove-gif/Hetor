import { site } from '@/site.config';

/** Normaliza la respuesta de la API de GitHub: sin forks ni archivados, más recientes primero, hasta 100 (la paginación se hace en la interfaz). */
export function normalizarRepos(datos, limite = 100) {
  if (!Array.isArray(datos)) return [];
  return datos
    .filter((r) => r && typeof r.name === 'string' && !r.fork && !r.archived && typeof r.html_url === 'string' && r.html_url.startsWith('https://github.com/'))
    .sort((a, b) => Date.parse(b.pushed_at || 0) - Date.parse(a.pushed_at || 0))
    .slice(0, limite)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: typeof r.description === 'string' ? r.description : '',
      language: typeof r.language === 'string' ? r.language : '',
      stars: Number.isFinite(r.stargazers_count) ? r.stargazers_count : 0,
      pushedAt: r.pushed_at || null,
    }));
}

/** Lee los repos públicos del usuario configurado. Se cachea y se regenera cada githubRevalidateSeconds. */
export async function obtenerRepos() {
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'hetor-web' };
    if (process.env.GITHUB_READ_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_READ_TOKEN}`;

    const base = process.env.GITHUB_API_URL || 'https://api.github.com'; // GITHUB_API_URL solo se usa para pruebas
    const url = `${base}/users/${encodeURIComponent(site.github)}/repos?per_page=100&sort=pushed`;
    const res = await fetch(url, { headers, next: { revalidate: site.githubRevalidateSeconds } });
    if (!res.ok) {
      console.error(`[github] HTTP ${res.status} al leer repos de ${site.github}`);
      return { ok: false, repos: [] };
    }
    return { ok: true, repos: normalizarRepos(await res.json()) };
  } catch (err) {
    console.error('[github] No se pudo contactar con GitHub:', err && err.name);
    return { ok: false, repos: [] };
  }
}
