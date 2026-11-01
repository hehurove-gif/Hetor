import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center gap-4 px-6">
      <p className="font-mono text-sm text-cyan">404</p>
      <h1 className="text-3xl font-semibold">Página no encontrada · Page not found</h1>
      <div className="flex gap-4 text-cyan">
        <Link href="/es" className="hover:underline">Español</Link>
        <Link href="/en" className="hover:underline">English</Link>
      </div>
    </main>
  );
}
