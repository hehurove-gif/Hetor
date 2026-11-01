import Image from 'next/image';
import Section from '@/components/Section';

export default function About({ dict }) {
  const a = dict.about;
  return (
    <Section id="about" eyebrow={a.eyebrow} title={a.title} className="border-t border-line">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Image
          src="/profile/chingadera.png"
          alt={a.avatarAlt}
          width={144}
          height={144}
          className="h-36 w-36 shrink-0 rounded-3xl border border-line bg-surface object-cover"
        />
        <div className="min-w-0 max-w-2xl space-y-4 text-lg text-muted">
          {a.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
