import Section from '@/components/Section';

export default function Faq({ dict }) {
  const f = dict.faq;
  return (
    <Section id="faq" eyebrow={f.eyebrow} title={f.title} className="border-t border-line">
      <div className="max-w-3xl divide-y divide-line rounded-2xl border border-line bg-surface">
        {f.items.map((it) => (
          <details key={it.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
              {it.q}
              <span className="faq-icon font-mono text-xl text-cyan transition-transform" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-muted">{it.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
