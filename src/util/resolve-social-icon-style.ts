import { IconName } from '@fortawesome/fontawesome-common-types';

import brandColorClasses from 'modules/brand-colors.module.scss';

interface LinkStyle {
  colorClass?: string;
  brandIcon?: IconName;
  brandLogo?: string;
}

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
    };
  }

  return {};
};
