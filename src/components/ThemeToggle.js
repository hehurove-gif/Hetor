'use client';

import { useSyncExternalStore } from 'react';

const CONSULTA_CLARO = '(prefers-color-scheme: light)';

function suscribir(avisar) {
  const mq = window.matchMedia(CONSULTA_CLARO);
  mq.addEventListener('change', avisar);
  window.addEventListener('themechange', avisar);
  return () => {
    mq.removeEventListener('change', avisar);
    window.removeEventListener('themechange', avisar);
  };
}

/* Tema que se muestra: el elegido (data-theme en <html>) o, si no hay, el del dispositivo. */
function tomarTema() {
  const elegido = document.documentElement.getAttribute('data-theme');
  if (elegido === 'light' || elegido === 'dark') return elegido;
  return window.matchMedia(CONSULTA_CLARO).matches ? 'light' : 'dark';
}

/* En el servidor no se sabe el tema: null evita diferencias al hidratar. */
const temaEnServidor = () => null;

export default function ThemeToggle({ dict }) {
  const tema = useSyncExternalStore(suscribir, tomarTema, temaEnServidor);

  const cambiar = () => {
    const siguiente = tema === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', siguiente);
    try {
      localStorage.setItem('theme', siguiente);
    } catch {}
    window.dispatchEvent(new Event('themechange'));
  };

  const etiqueta = tema === 'dark' ? dict.a11y.themeToLight : tema === 'light' ? dict.a11y.themeToDark : dict.a11y.theme;

  return (
    <button
      type="button"
      onClick={cambiar}
      aria-label={etiqueta}
      title={etiqueta}
      className="rounded-md border border-line p-2 text-fg transition-colors hover:border-cyan/60 hover:text-cyan"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        {tema === 'dark' ? (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
        ) : tema === 'light' ? (
          <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        ) : (
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        )}
      </svg>
    </button>
  );
}
