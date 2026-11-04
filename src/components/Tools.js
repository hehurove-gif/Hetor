import Section from '@/components/Section';
import { site } from '@/site.config';

/* Herramientas alojadas en hetor.dev/tools/<id>. Son apps independientes (otro repo y otro Worker),
   por eso se enlaza con <a> normal y no con next/link. */
export default function Tools({ dict }) {
  const t = dict.tools;
  return (
    <Section id="tools" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-5 md:grid-cols-2">
        {site.tools.map(({ id, path }) => {
          const tool = t[id];
          return (
            <article key={id} className="flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-violet/60">
              <p className="font-mono text-xs text-cyan">{tool.tag}</p>
              <h3 className="mt-1 break-words text-2xl font-semibold">{tool.title}</h3>
              <p className="mt-4 text-muted">{tool.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {tool.stack.map((s) => (
                  <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <a href={path} className="mt-6 inline-flex w-fit items-center gap-1 text-sm font-medium text-cyan hover:underline">
                {t.open} <span aria-hidden="true">→</span>
              </a>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
