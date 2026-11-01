import Section from '@/components/Section';

export default function Process({ dict }) {
  const p = dict.process;
  return (
    <Section id="process" eyebrow={p.eyebrow} title={p.title} className="border-t border-line">
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {p.steps.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl border border-line bg-surface p-6">
            <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
