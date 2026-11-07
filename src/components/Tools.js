import { site } from '@/site.config';

/* Tarjetas de las herramientas públicas. Son apps independientes (otro repo y otro Worker),
   por eso se enlaza con <a> normal y no con next/link. Mientras no esté activo hetor.dev/tools
   (site.toolsEnabled) se abre la URL actual de cada una; después, su ruta bajo el dominio. */
export default function Tools({ dict }) {
  const t = dict.tools;
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {site.tools.map(({ id, path, url, repo, live = true }) => {
        const tool = t[id];
        const href = site.toolsEnabled ? path : url;
        return (
          <article key={id} className="flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-violet/60">
            <p className="font-mono text-xs text-cyan">
              {tool.tag} · {t.openSource}
            </p>
            <h2 className="mt-1 break-words text-2xl font-semibold">{tool.title}</h2>
            <p className="mt-4 text-muted">{tool.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {tool.stack.map((s) => (
                <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-medium">
              {live ? (
                <a href={href} className="inline-flex items-center gap-1 text-cyan hover:underline">
                  {t.open} <span aria-hidden="true">→</span>
                </a>
              ) : (
                <span className="inline-flex items-center rounded-full border border-line px-3 py-0.5 font-mono text-xs text-muted">{t.soon}</span>
              )}
              <a
                href={`https://github.com/${site.github}/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted hover:text-fg"
              >
                {t.code} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
