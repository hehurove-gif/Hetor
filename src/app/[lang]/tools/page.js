import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/site.config';
import { whatsappLink } from '@/lib/whatsapp';
import Header from '@/components/Header';
import Section from '@/components/Section';
import Tools from '@/components/Tools';
import Footer from '@/components/Footer';
import { getDictionary, hasLocale } from '../dictionaries';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const t = dict.tools;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${lang}/tools`,
      languages: Object.fromEntries(site.locales.map((l) => [l, `/${l}/tools`])),
    },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: `/${lang}/tools`, siteName: site.name, locale: lang, type: 'website' },
  };
}

export default async function ToolsPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.tools;
  const whatsapp = whatsappLink(site.whatsapp, dict.whatsappMessage);

  return (
    <>
      <Header lang={lang} locales={site.locales} dict={dict} brand={site.name} whatsapp={whatsapp} />
      <main id="main">
        <Section id="tools" eyebrow={t.eyebrow} title={t.title} as="h1">
          <p className="-mt-4 mb-10 max-w-2xl text-muted">{t.intro}</p>
          <Tools dict={dict} />
          <p className="mt-10 text-sm">
            <Link href={`/${lang}`} className="text-muted hover:text-fg">
              {t.back}
            </Link>
          </p>
        </Section>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
