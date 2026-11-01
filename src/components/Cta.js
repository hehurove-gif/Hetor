/* Botón de llamada a la acción hacia WhatsApp.
   - Con número configurado: enlace real.
   - Sin número: en desarrollo se muestra deshabilitado y compacto (la explicación va en el tooltip);
     en producción no se muestra nada. */
export default function Cta({ href, label, hint, variant = 'primary' }) {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-cyan text-on-accent hover:brightness-110'
      : 'border border-line text-fg hover:border-cyan hover:text-cyan';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
        {label}
      </a>
    );
  }
  if (process.env.NODE_ENV === 'development') {
    return (
      <span
        aria-disabled="true"
        title={hint}
        className={`${base} cursor-not-allowed border border-dashed border-line text-muted`}
      >
        {label}
        <span aria-hidden="true" className="font-mono text-xs text-violet">⚠ dev</span>
      </span>
    );
  }
  return null;
}
