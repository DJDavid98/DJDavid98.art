import type { AppI18nNamespaces } from 'react-i18next';
import { getFurbooruSpeciesTag } from 'src/util/search-furbooru';

export const CANONICAL_URL = 'https://djdavid98.art';
export const IS_CLIENT_SIDE = typeof window !== 'undefined';

export type AvailableLanguage = 'hu' | 'en';

type LanguagesConfig = Record<
  AvailableLanguage,
  {
    nativeName: string;
  }
>;

export const LANGUAGES: LanguagesConfig = {
  en: {
    nativeName: 'English',
  },
  hu: {
    nativeName: 'Magyar',
  },
};

export const PERSONAL_DETAILS = {
  NAME: 'DJDavid98' as const,
  BIRTH_DATE: new Date('1998-10-28T12:00:00Z'),
  TIMEZONE: 'Europe/Budapest',
  OC_NAME: 'Double Colon',
  OC_NICKNAME: 'Disy',
  OC_REF_SHEET_URL: 'https://oc.djdavid98.art',
  OC_CUTIE_MARK_URL: 'https://www.deviantart.com/djdavid98/art/Double-Colon-Cutie-Mark-545185280',
  OC_FURBOORU_GALLERY_URL: (species: string | null) => {
    const speciesTag = species && getFurbooruSpeciesTag(species);
    const query = encodeURI(`oc:double colon, gallery_id:12${speciesTag ? `, ${speciesTag}` : ''}`);
    return `https://furbooru.org/search?q=${query}&sf=gallery_id%3A12`;
  },
  ARTIST_TAG_URL: `https://furbooru.org/search?q=${encodeURIComponent('artist:djdavid98,gallery_id:13,-trace')}&sf=${encodeURIComponent(
    'gallery_id:13',
  )}`,
  F_LIST_URL: 'https://www.f-list.net/c/double%20colon/',
  OC_STICKERS_BASE_URL: 'https://disy.cyou',
};

export const SITE_TITLE = PERSONAL_DETAILS.NAME;

export enum STATUS {
  INIT,
  LOADING,
  LOADED,
  ERROR,
}

export * from './contact';

export const DEFAULT_I18N_NAMESPACES: AppI18nNamespaces[] = ['common'];
