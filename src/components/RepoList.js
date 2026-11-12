'use client';

import { useState } from 'react';

const POR_PAGINA = 6;

function fecha(iso, lang) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short' }).format(d);
}

function Flecha({ dir, disabled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface font-mono text-lg text-cyan transition-colors hover:border-cyan/60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line"
    >
      <span aria-hidden="true">{dir === 'prev' ? '←' : '→'}</span>
    </button>
  );
}

/* Componente de cliente: recibe todos los repos ya cargados en el servidor y los muestra por páginas con flechas. */
export default function RepoList({ repos, dict, lang }) {
  const g = dict.github;
  const [pagina, setPagina] = useState(0);
  const total = Math.max(1, Math.ceil(repos.length / POR_PAGINA));
  const visibles = repos.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);

  return (
    <>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((r) => (
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

      {total > 1 && (
        <nav aria-label={g.pagination} className="mt-6 flex items-center justify-center gap-4">
          <Flecha dir="prev" label={g.prev} disabled={pagina === 0} onClick={() => setPagina((p) => Math.max(0, p - 1))} />
          <span role="status" aria-live="polite" className="font-mono text-sm text-muted">
            {pagina + 1} / {total}
          </span>
          <Flecha dir="next" label={g.next} disabled={pagina >= total - 1} onClick={() => setPagina((p) => Math.min(total - 1, p + 1))} />
        </nav>
      )}
    </>
  );
}
