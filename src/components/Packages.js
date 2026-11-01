import Section from '@/components/Section';
import PlanBuilder from '@/components/PlanBuilder';
import { site } from '@/site.config';

export default function Packages({ dict, lang }) {
  const p = dict.packages;
  return (
    <Section id="packages" eyebrow={p.eyebrow} title={p.title} className="border-t border-line">
      <p className="-mt-6 mb-8 max-w-2xl text-muted">{p.intro}</p>
      <PlanBuilder dict={dict} lang={lang} whatsappNumber={site.whatsapp} />
      <p className="mt-6 text-sm text-muted">{p.note}</p>
    </Section>
  );
}
