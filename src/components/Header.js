'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cta from '@/components/Cta';

const SECCIONES = ['services', 'projects', 'about', 'packages', 'faq'];
const SECCIONES_CON_TOOLS = ['services', 'projects', 'tools', 'about', 'packages', 'faq'];

/* Guarda qué sección se está viendo antes de cambiar de idioma (la lee RestoreScroll). */
function guardarPosicion() {
  try {
    const secciones = [...document.querySelectorAll('main section[id]')];
    const actual = secciones.filter((x) => x.getBoundingClientRect().top <= 120).pop();
    if (actual) sessionStorage.setItem('anchor', JSON.stringify({ id: actual.id, offset: -actual.getBoundingClientRect().top }));
  } catch {}
}

export default function Header({ lang, locales, dict, brand, whatsapp, showTools = false }) {
  const secciones = showTools ? SECCIONES_CON_TOOLS : SECCIONES;
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname() || `/${lang}`;
  const resto = pathname.replace(/^\/[^/]+/, '');

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={`/${lang}`} aria-label={dict.a11y.home} className="shrink-0 whitespace-nowrap font-mono text-lg font-semibold">
          <span className="text-cyan">&lt;</span>
          {brand}
          <span className="text-violet"> /&gt;</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {secciones.map((id) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap text-sm text-muted transition-colors hover:text-fg">
              {dict.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div role="group" aria-label={dict.a11y.language} className="flex rounded-full border border-line p-0.5 font-mono text-xs">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${resto}`}
                hrefLang={l}
                scroll={false}
                onClick={guardarPosicion}
                aria-current={l === lang ? 'true' : undefined}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  l === lang ? 'bg-violet text-on-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 sm:block">
            <Cta href={whatsapp} label={dict.cta.whatsappShort} hint={dict.cta.missing} />
          </div>

          <button
            type="button"
            className="rounded-md border border-line p-2 lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={dict.a11y.menu}
            onClick={() => setAbierto((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-line bg-bg lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {secciones.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setAbierto(false)} className="block py-2.5 text-muted hover:text-fg">
                  {dict.nav[id]}
                </a>
              </li>
            ))}
            <li className="py-2.5 sm:hidden">
              <Cta href={whatsapp} label={dict.cta.whatsappShort} hint={dict.cta.missing} />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
