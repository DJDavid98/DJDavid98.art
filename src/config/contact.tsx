import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { CustomIcon, CustomIconProps } from 'components/common/CustomIcon';
import { TFunction } from 'next-i18next';
import { ReactElement, ReactNode, ReactNodeArray } from 'react';
import { Nullable, Translatable } from 'src/types/common';

export const CONTACT_EMAIL = 'inbox@djdavid98.art';

export const ABOUT_SECTIONS: Array<[string, Translatable]> = [
  ['header', ['about:summary']],
  ['about-me', ['about:aboutMe.heading']],
  ['artwork', ['about:artwork.navLabel']],
  ['my-oc', ['about:myOC.navLabel']],
  ['contact', ['about:contact.contact']],
];

export enum ABOUT_INDICES {
  SUMMARY,
  ABOUT_ME,
  ARTWORK,
  MY_OC,
  CONTACT,
}

interface BaseContactCardProps {
  url: string;
  renderIcon?:
    | ((props?: Partial<FontAwesomeIconProps>) => ReactElement<FontAwesomeIconProps, typeof FontAwesomeIcon>)
    | ((props?: Partial<CustomIconProps>) => ReactElement<CustomIconProps, typeof CustomIcon>);
  name: ((t: TFunction) => string) | string;
  // Set to null to hide default visit button
  visitText?: Nullable<Translatable>;
  children?: ReactNode | ReactNodeArray;
}

export type DefaultContactCardProps = BaseContactCardProps & {
  id: string;
};

export interface DiscordContactCardProps extends BaseContactCardProps {
  id: 'discord';
  discordTag: string;
  children?: undefined;
}

export interface EmailContactCardProps extends BaseContactCardProps {
  id: 'email';
  email: string;
  children?: undefined;
}

export type ContactCardSettings = DefaultContactCardProps | DiscordContactCardProps | EmailContactCardProps;

export type ContactCardProps<T extends ContactCardSettings> = T & {
  wrapInLink?: boolean;
};

export const CONTACT_DETAILS: ContactCardSettings[] = [
  {
    id: 'discord',
    name: 'Discord',
    url: 'https://discordapp.com/users/140360880079503362',
    discordTag: 'DJDavid98#6174',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/discord.svg" {...props} />,
    visitText: null,
  },
  {
    id: 'email',
    name: (t) => t('about:contact.sendEmail'),
    url: `mailto:${CONTACT_EMAIL}`,
    email: CONTACT_EMAIL,
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/protonmail.svg" {...props} />,
    visitText: null,
  },
  {
    id: 'furbooru',
    name: 'Furbooru',
    url: 'https://furbooru.org/profiles/DJDavid98',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/furbooru.svg" {...props} />,
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/DJDavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'twitter']} {...props} />,
  },
  {
    id: 'picarto',
    name: 'Picarto',
    url: 'https://picarto.tv/DJDavid98',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/picarto.svg" {...props} />,
    visitText: ['about:contact.visitStream'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/djdavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'youtube']} {...props} />,
    visitText: ['about:contact.visitChannel'],
  },
  {
    id: 'inkbunny',
    name: 'Inkbunny',
    url: 'https://inkbunny.net/DJDavid98',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/inkbunny.png" {...props} />,
  },
  {
    id: 'furaffinity',
    name: 'FurAffinity',
    url: 'https://www.furaffinity.net/user/djdavid98/',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/furaffinity.svg" {...props} />,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    url: 'https://t.me/DJDavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'telegram-plane']} {...props} />,
    visitText: ['about:contact.sendMessage'],
  },
  {
    id: 'steam',
    name: 'Steam',
    url: 'https://steamcommunity.com/id/djdavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'steam-symbol']} {...props} />,
  },
  {
    id: 'xbox',
    name: 'Xbox',
    url: 'http://live.xbox.com/Profile?Gamertag=DJDavidHU',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'xbox']} {...props} />,
  },
  {
    id: 'playstation',
    name: 'PSN',
    url: 'https://psnprofiles.com/DJDavidHU',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'playstation']} {...props} />,
  },
  {
    id: 'deviantart',
    name: 'DeviantArt',
    url: 'https://www.deviantart.com/djdavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'deviantart']} {...props} />,
  },
  {
    id: 'pillowfort',
    name: 'Pillowfort',
    url: 'https://www.pillowfort.social/DJDavid98',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/pillowfort.svg" {...props} />,
  },
  {
    id: 'mastodon',
    name: 'Mastodon',
    url: 'https://meow.social/@djdavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'mastodon']} {...props} />,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://fb.me/DJDavid1998',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'facebook-square']} {...props} />,
    visitText: ['about:contact.visitPage'],
  },
  {
    id: 'vk',
    name: 'VK',
    url: 'https://vk.com/djdavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'vk']} {...props} />,
    visitText: ['about:contact.visitPage'],
  },
  {
    id: 'newgrounds',
    name: 'Newgrounds',
    url: 'https://djdavid98.newgrounds.com/',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/newgrounds.png" {...props} />,
  },
  {
    id: 'guilded',
    name: 'Guilded',
    url: 'https://guilded.gg/djdavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'guilded']} {...props} />,
  },
  {
    id: 'kongregate',
    name: 'Kongregate',
    url: 'https://www.kongregate.com/accounts/DJDavid98',
    renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/kongregate.svg" {...props} />,
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    url: 'https://soundcloud.com/DJDavid98',
    renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'soundcloud']} {...props} />,
  },
];
