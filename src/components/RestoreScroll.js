'use client';

import { useEffect } from 'react';

/* Al cambiar de idioma el texto cambia de largo, así que no basta con conservar los píxeles:
   Header guarda la sección que se estaba viendo (y cuánto estaba desplazada) y aquí se vuelve a ella. */
export default function RestoreScroll({ lang }) {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('anchor');
      if (!raw) return;
      sessionStorage.removeItem('anchor');
      const { id, offset } = JSON.parse(raw);
      if (!id) return;
      const ir = () => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'instant' });
      };
      ir();
      // El diseño todavía se acomoda un instante después (fuentes, imágenes): se reajusta un par de veces.
      requestAnimationFrame(ir);
      setTimeout(ir, 150);
    } catch {}
  }, [lang]);
  return null;
}
