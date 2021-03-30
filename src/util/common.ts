import { url } from 'gravatar';
import { useMemo } from 'react';
import { AvailableLanguage, CONTACT_EMAIL } from 'src/config';
import { enLocale, huLocale } from 'src/date-fns-locales';

export const isClientSide = typeof window !== 'undefined';

export const getGravatarUrl = (size: string | number) =>
  url(CONTACT_EMAIL, {
    protocol: 'https',
    s: typeof size !== 'string' ? String(size) : size,
    r: 'g',
  });

export const localeMap: Record<AvailableLanguage, Locale> = {
  en: enLocale,
  hu: huLocale,
};

export const useLocale = (language: string) => useMemo<Locale>(() => localeMap[language as AvailableLanguage] || enLocale, [language]);
