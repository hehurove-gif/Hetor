import { site } from '@/site.config';

export default function Footer({ dict }) {
  const enlaces = [
    { label: 'GitHub', href: `https://github.com/${site.github}`, externo: true },
    site.instagram && { label: 'Instagram', href: site.instagram, externo: true },
    site.x && { label: 'X', href: site.x, externo: true },
    site.email && { label: dict.footer.email, href: `mailto:${site.email}`, externo: false },
  ].filter(Boolean);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
        </p>
        <p className="font-mono text-xs">{dict.footer.made}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {enlaces.map((e) => (
            <li key={e.label}>
              <a
                href={e.href}
                {...(e.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="hover:text-fg"
              >
                {e.label}
                {e.externo ? ' ↗' : ''}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
