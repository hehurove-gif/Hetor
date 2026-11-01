import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import { site } from '@/site.config';
import { getDictionary, hasLocale } from './dictionaries';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = site.name;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return site.locales.map((lang) => ({ lang }));
}

export default async function Image({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const foto = await readFile(join(process.cwd(), 'public/profile/chingadera.png'));
  const fotoSrc = `data:image/png;base64,${foto.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 88px',
          background: 'linear-gradient(135deg, #0a0c10 0%, #0d1a22 55%, #1b1633 100%)',
          color: '#e8eaf0',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
          <div style={{ display: 'flex', fontSize: 34, color: '#22d3ee', fontFamily: 'monospace' }}>
            {'<' + site.name + ' />'}
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
            {dict.og.tagline}
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 30, color: '#98a1b3' }}>
            Next.js · React · Tailwind CSS
          </div>
        </div>
        <img
          src={fotoSrc}
          width={280}
          height={280}
          alt=""
          style={{ borderRadius: 48, border: '3px solid #a78bfa', background: '#fff' }}
        />
      </div>
    ),
    { ...size }
  );
}
