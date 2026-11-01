/* Sitio 100% estático: `npm run build` genera la carpeta "out" lista para subir a cualquier hosting
   (Cloudflare Pages, Netlify, GitHub Pages...). No hace falta servidor de Node. */
const dev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true }, // sin servidor no hay optimizador de imágenes
  trailingSlash: false,
  // Solo en desarrollo: que "/" abra public/index.html (el que detecta el idioma).
  ...(dev ? { rewrites: async () => [{ source: '/', destination: '/index.html' }] } : {}),
};
export default nextConfig;
