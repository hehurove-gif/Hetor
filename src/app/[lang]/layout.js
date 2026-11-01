import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '../globals.css';
import { notFound } from 'next/navigation';
import { site } from '@/site.config';
import { getDictionary, hasLocale } from './dictionaries';

export const dynamicParams = false;

export function generateStaticParams() {
  return site.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(site.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: site.name,
      locale: lang,
      type: 'website',
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="min-h-screen antialiased">
        {/* Recuerda el idioma elegido (lo lee public/index.html al entrar a "/"). */}
        <script dangerouslySetInnerHTML={{ __html: `try{localStorage.setItem('lang','${lang}')}catch(e){}` }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-on-accent"
        >
          {dict.a11y.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
