export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-10 max-w-2xl">
          {eyebrow && <p className="font-mono text-sm tracking-wide text-cyan">{eyebrow}</p>}
          {title && <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>}
        </header>
      )}
      {children}
    </section>
  );
}
