import { IconName } from '@fortawesome/fontawesome-common-types';

import brandColorClasses from 'modules/brand-colors.module.scss';

type LinkStyle = {
  colorClass?: string;
} & (
  | {
      brandIcon: IconName;
    }
  | {
      brandLogo: string;
      logoWidth: number;
      logoHeight: number;
    }
  | Record<string, never>
);

export const resolveSocialIconStyle = (url: string): LinkStyle => {
  if (/twitter\.com/.test(url)) {
    return {
      brandIcon: 'twitter',
      colorClass: brandColorClasses.twitterColor,
    };
  }
  if (/deviantart\.com/.test(url)) {
    return {
      brandIcon: 'deviantart',
      colorClass: brandColorClasses.deviantartColor,
    };
  }
  if (/patreon\.com/.test(url)) {
    return {
      brandIcon: 'patreon',
      colorClass: brandColorClasses.patreonColor,
    };
  }
  if (/furaffinity\.net/.test(url)) {
    return {
      brandLogo: '/logos/furaffinity-color.svg',
      logoWidth: 32,
      logoHeight: 32,
    };
  }
  if (/furbooru\.org/.test(url)) {
    return {
      brandLogo: '/logos/furbooru-color.svg',
      logoWidth: 32,
      logoHeight: 32,
    };
  }
  if (/pillowfort\.social/.test(url)) {
    return {
      brandLogo: '/logos/pillowfort-black.svg',
      logoWidth: 32,
      logoHeight: 32,
    };
  }

  return {};
};
