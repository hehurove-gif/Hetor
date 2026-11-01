'use client';

import { useState } from 'react';
import { OPTIONS, alternar, bloqueo, construirMensaje } from '@/lib/plan';
import { whatsappLink } from '@/lib/whatsapp';

export default function PlanBuilder({ dict, lang, whatsappNumber }) {
  const p = dict.packages;
  const [seleccion, setSeleccion] = useState([]);
  const [copiado, setCopiado] = useState(false);

  const etiquetas = Object.fromEntries(OPTIONS.map((id) => [id, p.options[id].label]));
  const mensaje = construirMensaje(seleccion, etiquetas, p.messageTemplate, '', lang);
  const hayNumero = Boolean(whatsappLink(whatsappNumber, 'x'));
  const href = seleccion.length > 0 ? whatsappLink(whatsappNumber, mensaje) : null;
  const mostrarEnviar = hayNumero || process.env.NODE_ENV === 'development';

  async function copiar() {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* Sin permiso de portapapeles: el texto sigue visible para copiarlo a mano. */
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <fieldset className="min-w-0">
        <legend className="mb-4 text-lg font-medium">{p.legend}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {OPTIONS.map((id) => {
            const o = p.options[id];
            const marcado = seleccion.includes(id);
            const motivo = bloqueo(seleccion, id);
            const hintId = `hint-${id}`;
            return (
              <label
                key={id}
                className={`relative flex min-w-0 gap-3 rounded-2xl border p-4 transition-colors ${
                  motivo ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-cyan/60'
                } ${marcado ? 'border-cyan bg-cyan/10' : 'border-line bg-surface'}`}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={marcado}
                  disabled={Boolean(motivo)}
                  aria-describedby={motivo ? hintId : undefined}
                  onChange={() => setSeleccion((s) => alternar(s, id))}
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan ${
                    marcado ? 'border-cyan bg-cyan text-on-accent' : 'border-line'
                  }`}
                >
                  {marcado ? '✓' : ''}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium">{o.title}</span>
                  <span className="mt-1 block break-words text-sm text-muted">{o.text}</span>
                  {motivo && (
                    <span id={hintId} className="mt-2 block font-mono text-xs text-violet">
                      {p.hints[motivo]}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="min-w-0 rounded-2xl border border-line bg-surface p-5">
        <p className="font-mono text-xs text-cyan">{p.previewLabel}</p>
        <p aria-live="polite" className={`mt-3 break-words text-sm leading-relaxed ${seleccion.length ? '' : 'text-muted'}`}>
          {seleccion.length ? mensaje : p.pickOne}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {mostrarEnviar &&
            (href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cyan px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:brightness-110"
              >
                {p.send}
              </a>
            ) : (
              <button
                type="button"
                disabled
                title={seleccion.length ? dict.cta.missing : p.pickOne}
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-dashed border-line px-5 py-2.5 text-sm font-medium text-muted"
              >
                {p.send}
              </button>
            ))}
          <button
            type="button"
            onClick={copiar}
            disabled={seleccion.length === 0}
            className="inline-flex items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors enabled:hover:border-cyan enabled:hover:text-cyan disabled:cursor-not-allowed disabled:text-muted disabled:opacity-60"
          >
            {p.copy}
          </button>
          <span role="status" className="font-mono text-xs text-muted">{copiado ? p.copied : ''}</span>
        </div>
      </div>
    </div>
  );
}
