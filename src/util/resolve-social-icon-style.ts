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
    }
  | Record<string, never>
);

export const resolveSocialIconStyle = (url: string): LinkStyle => {
  const domain = url.replace(/^https?:\/\/([^/]+)(?:\/.*)?$/, '$1');
  switch (domain) {
    case 'twitter.com':
      return {
        brandIcon: 'twitter',
        colorClass: brandColorClasses.twitterColor,
      };
    case 'www.deviantart.com':
      return {
        brandIcon: 'deviantart',
        colorClass: brandColorClasses.deviantartColor,
      };
    case 'www.patreon.com':
      return {
        brandIcon: 'patreon',
        colorClass: brandColorClasses.patreonColor,
      };
    case 'www.furaffinity.net':
      return {
        brandLogo: '/logos/furaffinity-color.svg',
      };
    case 'furbooru.org':
      return {
        brandLogo: '/logos/furbooru-color.svg',
      };
    case 'www.pillowfort.social':
      return {
        brandLogo: '/logos/pillowfort-black.svg',
      };
    case 'www.subscribestar.com':
    case 'subscribestar.adult':
      return {
        brandLogo: '/logos/subscribestar.svg',
      };
    case 'ko-fi.com':
      return {
        brandLogo: '/logos/kofi.svg',
      };
    case 'vk.com':
      return {
        brandIcon: 'vk',
        colorClass: brandColorClasses.vkColor,
      };
    default:
      return {};
  }
};
