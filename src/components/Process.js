import Section from '@/components/Section';

export default function Process({ dict }) {
  const p = dict.process;
  return (
    <Section id="process" eyebrow={p.eyebrow} title={p.title} className="border-t border-line">
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {p.steps.map((s, i) => {
          // Cada tarjeta lleva una franja arriba; el degradado continúa de una a la siguiente (cian → violeta).
          const n = p.steps.length;
          const mezcla = (t) => `color-mix(in oklab, var(--violet) ${Math.round(t * 100)}%, var(--cyan))`;
          const franja = `linear-gradient(90deg, ${mezcla(i / n)}, ${mezcla((i + 1) / n)})`;
          return (
          <li key={s.title} className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 pt-7">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: franja }} />
            <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.text}</p>
          </li>
          );
        })}
      </ol>
    </Section>
  );
}
