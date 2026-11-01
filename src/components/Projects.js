import Image from 'next/image';
import Section from '@/components/Section';
import { site } from '@/site.config';

function Logo({ src, alt, href, initial }) {
  const caja = 'h-14 w-14 shrink-0 rounded-xl border border-line';
  if (src) {
    const img = <Image src={src} alt={alt} width={56} height={56} className={`${caja} object-cover`} />;
    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt} className="shrink-0">
        {img}
      </a>
    ) : (
      img
    );
  }
  return (
    <span aria-hidden="true" className={`${caja} flex items-center justify-center bg-bg-soft font-mono text-xl text-violet`}>
      {initial}
    </span>
  );
}

function Tarjeta({ tag, title, text, stack, href, linkLabel, logo, logoAlt }) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-violet/60">
      <div className="flex items-center gap-4">
        <Logo src={logo} alt={logoAlt} href={href} initial={title.charAt(0)} />
        <div className="min-w-0">
          <p className="font-mono text-xs text-cyan">{tag}</p>
          <h3 className="mt-1 break-words text-2xl font-semibold">{title}</h3>
        </div>
      </div>
      <p className="mt-4 text-muted">{text}</p>
      {stack && stack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {stack.map((t) => (
            <li key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-1 text-sm font-medium text-cyan hover:underline"
        >
          {linkLabel} <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}

export default function Projects({ dict, children }) {
  const p = dict.projects;
  return (
    <Section id="projects" eyebrow={p.eyebrow} title={p.title}>
      <div className="grid gap-5 md:grid-cols-2">
        {site.showKOA && (
          <Tarjeta {...p.koa} href={site.koaUrl} linkLabel={p.visit} logo="/clients/koa-logo.png" logoAlt={p.koa.logoAlt} />
        )}
        <Tarjeta
          {...p.dopta}
          href={site.doptaUrl || undefined}
          linkLabel={p.visit}
          logo={site.doptaLogo || undefined}
          logoAlt={`Logo ${p.dopta.title}`}
        />
      </div>
      {children}
    </Section>
  );
}
