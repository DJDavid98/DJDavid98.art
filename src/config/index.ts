export const CANONICAL_URL = 'https://djdavid98.art';

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
  NAME: 'DJDavid98',
  BIRTH_DATE: new Date('1998-10-28T00:00+01:00'),
  TIMEZONE: 'Europe/Budapest',
  OC_NAME: 'Double Colon',
  OC_NICKNAME: 'Disy',
  OC_REF_SHEET_URL: 'https://oc.djdavid98.art',
  OC_CUTIE_MARK_URL: 'https://www.deviantart.com/djdavid98/art/Double-Colon-Cutie-Mark-545185280',
  OC_COLOR_GUIDE_URL: 'https://mlpvector.club/cg/v/232-Double-Colon',
  OC_FURBY_GALLERY_URL: (species: string | null) => {
    const query = encodeURI(`oc:paamayim nekudotayim, gallery_id:12${species ? `, ${species}` : ''}`);
    return `https://furbooru.org/search?q=${query}&sf=gallery_id%3A12`;
  },
  ARTIST_TAG_URL: 'https://furbooru.org/search?q=artist%3Adjdavid98%2C+gallery_id%3A13&sf=gallery_id%3A13',
};

export interface AvatarCreditProps {
  url: string;
  name: string;
}

export const AVATAR_CREDIT: AvatarCreditProps = {
  name: 'NightyCloud',
  url: 'https://twitter.com/NightyCloud',
};

export const SITE_TITLE = PERSONAL_DETAILS.NAME;

export enum STATUS {
  INIT,
  LOADING,
  LOADED,
  ERROR,
}

export * from './contact';
