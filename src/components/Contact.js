import Section from '@/components/Section';
import Cta from '@/components/Cta';

export default function Contact({ dict, whatsapp }) {
  const c = dict.contact;
  return (
    <div className="hero-glow border-t border-line">
      <Section id="contact" eyebrow={c.eyebrow} title={c.title}>
        <p className="max-w-xl text-lg text-muted">{c.text}</p>
        <div className="mt-6">
          <Cta href={whatsapp} label={dict.cta.whatsapp} hint={dict.cta.missing} />
        </div>
      </Section>
    </div>
  );
}
