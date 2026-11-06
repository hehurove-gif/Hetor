import { notFound } from 'next/navigation';
import { site } from '@/site.config';
import { whatsappLink } from '@/lib/whatsapp';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import GithubDemo from '@/components/GithubDemo';
import Process from '@/components/Process';
import About from '@/components/About';
import Packages from '@/components/Packages';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import RestoreScroll from '@/components/RestoreScroll';
import { getDictionary, hasLocale } from './dictionaries';

export default async function Home({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const whatsapp = whatsappLink(site.whatsapp, dict.whatsappMessage);
  if (!whatsapp && process.env.NODE_ENV === 'development') {
    console.warn('[hetor] Falta NEXT_PUBLIC_WHATSAPP en .env.local: los botones de WhatsApp salen deshabilitados.');
  }

  return (
    <>
      <Header lang={lang} locales={site.locales} dict={dict} brand={site.name} whatsapp={whatsapp} />
      <main id="main">
        <Hero dict={dict} whatsapp={whatsapp} />
        <Services dict={dict} />
        <Projects dict={dict}>
          <GithubDemo dict={dict} lang={lang} />
        </Projects>
        <About dict={dict} />
        <Process dict={dict} />
        <Packages dict={dict} lang={lang} />
        <Faq dict={dict} />
        <Contact dict={dict} whatsapp={whatsapp} />
      </main>
      <Footer dict={dict} lang={lang} />
      <RestoreScroll lang={lang} />
    </>
  );
}
