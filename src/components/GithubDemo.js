import { obtenerRepos } from '@/lib/github';
import { site } from '@/site.config';
import RepoList from '@/components/RepoList';

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

      {repos.length > 0 && <RepoList repos={repos} dict={dict} lang={lang} />}

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
