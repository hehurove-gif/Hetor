import 'server-only';

const dictionaries = {
  es: () => import('@/dictionaries/es.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
};

export const hasLocale = (locale) => Object.hasOwn(dictionaries, locale);
export const getDictionary = async (locale) => dictionaries[locale]();
