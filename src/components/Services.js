import Section from '@/components/Section';

export default function Services({ dict }) {
  const s = dict.services;
  return (
    <Section id="services" eyebrow={s.eyebrow} title={s.title}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((it) => (
          <li key={it.n} className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-cyan/60">
            <p className="font-mono text-sm text-violet">{it.n}</p>
            <h3 className="mt-3 text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-muted">{it.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
