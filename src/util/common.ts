import { url } from 'gravatar';
import { useMemo } from 'react';
import { AvailableLanguage, CANONICAL_URL, CONTACT_EMAIL, IS_CLIENT_SIDE } from 'src/config';
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

export const assembleSeoUrl = (pathname?: string): string => {
  const protocol = IS_CLIENT_SIDE ? location.protocol : 'https:';
  const host = IS_CLIENT_SIDE ? location.host : undefined;
  return `${host ? `${protocol}//${host}` : CANONICAL_URL}${pathname || ''}`;
};
