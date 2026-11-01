/* Lógica del checklist de planes. Funciones puras: no dependen de React.

   Reglas:
   - Sitio estático y base de datos se excluyen entre sí (si uno está marcado, el otro no se puede marcar).
   - Marcar base de datos marca también "Uso de APIs", y mientras la base de datos esté marcada,
     APIs queda fija (no se puede desmarcar).
   - Chatbot es independiente.
   El estado es un arreglo de ids en el orden de OPTIONS, así el mensaje siempre sale en el mismo orden. */

export const OPTIONS = ['static', 'api', 'chatbot', 'database'];

const ordenar = (ids) => OPTIONS.filter((id) => ids.includes(id));

/** Motivo por el que una opción no se puede cambiar ahora, o null. */
export function bloqueo(seleccion, id) {
  if (id === 'database' && seleccion.includes('static') && !seleccion.includes('database')) return 'blockedByStatic';
  if (id === 'static' && seleccion.includes('database') && !seleccion.includes('static')) return 'blockedByDatabase';
  if (id === 'api' && seleccion.includes('database')) return 'includedByDatabase';
  return null;
}

/** Marca o desmarca una opción aplicando las reglas. Si está bloqueada, devuelve la selección igual. */
export function alternar(seleccion, id) {
  if (!OPTIONS.includes(id) || bloqueo(seleccion, id)) return seleccion;
  if (seleccion.includes(id)) return ordenar(seleccion.filter((x) => x !== id));
  const siguiente = [...seleccion, id];
  if (id === 'database' && !siguiente.includes('api')) siguiente.push('api');
  return ordenar(siguiente);
}

/** Texto del mensaje. `etiquetas` mapea id → texto corto; `plantilla` lleva {items}. */
export function construirMensaje(seleccion, etiquetas, plantilla, vacio, idioma) {
  if (!seleccion.length) return vacio;
  const textos = ordenar(seleccion).map((id) => etiquetas[id]).filter(Boolean);
  let lista;
  try {
    lista = new Intl.ListFormat(idioma, { style: 'long', type: 'conjunction' }).format(textos);
  } catch {
    lista = textos.join(', ');
  }
  return plantilla.replace('{items}', lista);
}
