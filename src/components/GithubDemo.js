import { obtenerRepos } from '@/lib/github';
import { site } from '@/site.config';

function fecha(iso, lang) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short' }).format(d);
}

/* Componente de servidor: pide los repos a la API de GitHub (con caché) y los pinta. */
export default async function GithubDemo({ dict, lang }) {
  const g = dict.github;
  const { ok, repos } = await obtenerRepos();

  return (
    <div className="mt-16" aria-labelledby="github-title">
      <p className="font-mono text-sm text-cyan">{g.eyebrow}</p>
      <h3 id="github-title" className="mt-2 text-2xl font-semibold tracking-tight">{g.title}</h3>
      <p className="mt-2 max-w-2xl text-muted">{g.text}</p>

      {!ok && <p role="status" className="mt-6 rounded-xl border border-line bg-surface p-4 text-muted">{g.error}</p>}
      {ok && repos.length === 0 && <p className="mt-6 rounded-xl border border-line bg-surface p-4 text-muted">{g.empty}</p>}

      {repos.length > 0 && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-cyan/60"
              >
                <span className="font-mono text-sm font-medium text-cyan">{r.name}</span>
                <span className="mt-2 flex-1 text-sm text-muted">{r.description || g.noDescription}</span>
                <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
                  {r.language && <span>{r.language}</span>}
                  <span aria-label={`${r.stars} stars`}>★ {r.stars}</span>
                  {r.pushedAt && <span>{g.updated} {fecha(r.pushedAt, lang)}</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <a
        href={`https://github.com/${site.github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cyan hover:underline"
      >
        {g.profile} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
