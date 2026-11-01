/* Lógica del checklist de planes. Funciones puras: no dependen de React.

   Ninguna opción bloquea a otra: al elegir una, la que choca con ella se reemplaza.
   - Sitio estático y base de datos se excluyen: marcar una desmarca la otra.
   - Marcar base de datos marca también "Uso de APIs"; desmarcar APIs desmarca la base de datos
     (porque depende de ella).
   - "No sé qué necesito" (unsure) es exclusiva: al marcarla se limpian las demás, y marcar
     cualquier otra la desmarca.
   - Chatbot es independiente.
   El estado es un arreglo de ids en el orden de OPTIONS, así el mensaje siempre sale en el mismo orden. */

export const OPTIONS = ['static', 'api', 'chatbot', 'database', 'unsure'];

const ordenar = (ids) => OPTIONS.filter((id) => ids.includes(id));

/** Marca o desmarca una opción aplicando las reglas (siempre cambia; nada queda bloqueado). */
export function alternar(seleccion, id) {
  if (!OPTIONS.includes(id)) return seleccion;
  if (seleccion.includes(id)) {
    const quitar = id === 'api' ? ['api', 'database'] : [id];
    return ordenar(seleccion.filter((x) => !quitar.includes(x)));
  }
  if (id === 'unsure') return ['unsure'];
  let sig = seleccion.filter((x) => x !== 'unsure');
  if (id === 'static') sig = sig.filter((x) => x !== 'database');
  if (id === 'database') sig = [...sig.filter((x) => x !== 'static'), 'api'];
  return ordenar([...new Set([...sig, id])]);
}

/** Texto del mensaje. `etiquetas` mapea id → texto corto; `plantilla` lleva {items}. */
export function construirMensaje(seleccion, etiquetas, plantilla, vacio, idioma, plantillaDuda) {
  if (!seleccion.length) return vacio;
  if (seleccion.includes('unsure') && plantillaDuda) return plantillaDuda;
  const textos = ordenar(seleccion).map((id) => etiquetas[id]).filter(Boolean);
  let lista;
  try {
    lista = new Intl.ListFormat(idioma, { style: 'long', type: 'conjunction' }).format(textos);
  } catch {
    lista = textos.join(', ');
  }
  return plantilla.replace('{items}', lista);
}
