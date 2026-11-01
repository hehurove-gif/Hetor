import Image from 'next/image';
import Cta from '@/components/Cta';

export default function Hero({ dict, whatsapp }) {
  const h = dict.hero;
  return (
    <div className="hero-glow border-b border-line">
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="min-w-0 max-w-3xl">
            <p className="font-mono text-sm text-cyan">{h.eyebrow}</p>
            <h1 className="mt-4 break-words text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {h.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">{h.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Cta href={whatsapp} label={dict.cta.whatsapp} hint={dict.cta.missing} />
              <a
                href="#projects"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-violet hover:text-violet"
              >
                {dict.cta.projects}
              </a>
            </div>
          </div>

          <Image
            src="/profile/chingadera.png"
            alt={h.photoAlt}
            width={176}
            height={176}
            priority
            className="order-first h-24 w-24 shrink-0 rounded-3xl border border-line bg-surface object-cover md:order-none md:h-44 md:w-44"
          />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-xs text-muted">{h.stackLabel}</span>
          {h.stack.map((t) => (
            <span key={t} className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs">
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
