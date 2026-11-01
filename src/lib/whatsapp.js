/** Enlace de WhatsApp con mensaje prellenado. Devuelve null si el número no es válido. */
export function whatsappLink(numero, mensaje) {
  const digitos = String(numero || '').replace(/\D/g, '');
  if (!/^\d{8,15}$/.test(digitos)) return null;
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensaje || '')}`;
}
