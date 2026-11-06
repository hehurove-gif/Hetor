import Image from 'next/image';
import { site } from '@/site.config';
import { whatsappLink } from '@/lib/whatsapp';

const SECCIONES = ['services', 'projects', 'about', 'packages', 'faq'];

function Icono({ src, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface transition-colors hover:border-cyan/60"
    >
      <Image src={src} alt="" width={24} height={24} className="h-6 w-6" />
    </a>
  );
}

export default function Footer({ dict, lang }) {
  const f = dict.footer;
  const wa = whatsappLink(site.whatsapp, dict.whatsappMessage);
  const redes = [
    wa && { src: '/social/whatsapp.png', label: 'WhatsApp', href: wa },
    site.instagram && { src: '/social/instagram.png', label: 'Instagram', href: site.instagram },
    site.x && { src: '/social/x.png', label: 'X', href: site.x },
  ].filter(Boolean);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 text-sm sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="min-w-0">
          <p className="font-mono text-lg font-semibold text-fg">{site.name}</p>
          <p className="mt-3 max-w-xs text-muted">{f.tagline}</p>
          <p className="mt-3 max-w-xs text-muted">{f.blurb}</p>
        </div>

        <nav aria-label={f.nav}>
          <p className="font-mono text-xs text-cyan">{f.nav}</p>
          <ul className="mt-3 space-y-2 text-muted">
            {SECCIONES.map((id) => (
              <li key={id}>
                <a href={`/${lang}#${id}`} className="hover:text-fg">
                  {dict.nav[id]}
                </a>
              </li>
            ))}
            <li>
              <a href={`/${lang}/tools`} className="hover:text-fg">
                {dict.nav.tools}
              </a>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">
          <p className="font-mono text-xs text-cyan">{f.contact}</p>
          {redes.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-3">
              {redes.map((r) => (
                <li key={r.label}>
                  <Icono {...r} />
                </li>
              ))}
            </ul>
          )}
          <ul className="mt-4 space-y-2 text-muted">
            <li>
              <a href={`https://github.com/${site.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                GitHub ↗
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="break-all hover:text-fg">
                  {site.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {f.rights}
          </p>
          <p className="font-mono">{f.made}</p>
        </div>
      </div>
    </footer>
  );
}
