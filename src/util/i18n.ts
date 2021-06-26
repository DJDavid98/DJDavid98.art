import { TFunction } from 'next-i18next';
import { Translatable } from 'src/types/common';

export const isTranslatable = (value: unknown): value is Translatable => {
  if (typeof value === 'string' || value === null) return false;

  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'string';
};
export const translatableValue = (t: TFunction, value: Translatable | string): string =>
  isTranslatable(value) ? t(value[0], value[1]) : value || '';
