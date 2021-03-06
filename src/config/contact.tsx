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

export interface MatrixContactCardProps extends BaseContactCardProps {
  id: 'matrix';
  matrixUsername: string;
  children?: undefined;
}

export interface EmailContactCardProps extends BaseContactCardProps {
  id: 'email';
  email: string;
  children?: undefined;
}

export type ContactCardSettings = DefaultContactCardProps | DiscordContactCardProps | MatrixContactCardProps | EmailContactCardProps;

export type ContactCardProps<T extends ContactCardSettings> = T & {
  wrapInLink?: boolean;
};

const discord: ContactCardSettings = {
  id: 'discord',
  name: 'Discord',
  url: '',
  discordTag: 'DJDavid98#1028',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'discord']} {...props} />,
  visitText: null,
};
const email: ContactCardSettings = {
  id: 'email',
  name: (t) => t('about:contact.sendEmail'),
  url: `mailto:${CONTACT_EMAIL}`,
  email: CONTACT_EMAIL,
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/protonmail.svg" {...props} />,
  visitText: null,
};
const furbooru: ContactCardSettings = {
  id: 'furbooru',
  name: 'Furbooru',
  url: 'https://furbooru.org/profiles/DJDavid98',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/furbooru.svg" {...props} />,
};
const twitter: ContactCardSettings = {
  id: 'twitter',
  name: 'Twitter',
  url: 'https://twitter.com/DJDavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'twitter']} {...props} />,
};
const picarto: ContactCardSettings = {
  id: 'picarto',
  name: 'Picarto',
  url: 'https://picarto.tv/DJDavid98',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/picarto.svg" {...props} />,
  visitText: ['about:contact.visitStream'],
};
const youtube: ContactCardSettings = {
  id: 'youtube',
  name: 'YouTube',
  url: 'https://youtube.com/djdavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'youtube']} {...props} />,
  visitText: ['about:contact.visitChannel'],
};
const inkbunny: ContactCardSettings = {
  id: 'inkbunny',
  name: 'Inkbunny',
  url: 'https://inkbunny.net/DJDavid98',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/inkbunny.png" {...props} />,
};
const furaffinity: ContactCardSettings = {
  id: 'furaffinity',
  name: 'FurAffinity',
  url: 'https://www.furaffinity.net/user/djdavid98/',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/furaffinity.svg" {...props} />,
};
const telegram: ContactCardSettings = {
  id: 'telegram',
  name: 'Telegram',
  url: 'https://t.me/DJDavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'telegram-plane']} {...props} />,
  visitText: ['about:contact.sendMessage'],
};
const steam: ContactCardSettings = {
  id: 'steam',
  name: 'Steam',
  url: 'https://steamcommunity.com/id/djdavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'steam-symbol']} {...props} />,
};
const xbox: ContactCardSettings = {
  id: 'xbox',
  name: 'Xbox',
  url: 'http://live.xbox.com/Profile?Gamertag=DJDavidHU',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'xbox']} {...props} />,
};
const playstation: ContactCardSettings = {
  id: 'playstation',
  name: 'PSN',
  url: 'https://psnprofiles.com/DJDavidHU',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'playstation']} {...props} />,
};
const deviantart: ContactCardSettings = {
  id: 'deviantart',
  name: 'DeviantArt',
  url: 'https://www.deviantart.com/djdavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'deviantart']} {...props} />,
};
const pillowfort: ContactCardSettings = {
  id: 'pillowfort',
  name: 'Pillowfort',
  url: 'https://www.pillowfort.social/DJDavid98',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/pillowfort.svg" {...props} />,
};
const matrix: ContactCardSettings = {
  id: 'matrix',
  name: 'Matrix',
  url: 'https://matrix.to/#/@disy:djdavid98.art',
  matrixUsername: '@disy:djdavid98.art',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/matrix.svg" {...props} />,
  visitText: null,
};
const mastodon: ContactCardSettings = {
  id: 'mastodon',
  name: 'Mastodon',
  url: 'https://meow.social/@djdavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'mastodon']} {...props} />,
};
const facebook: ContactCardSettings = {
  id: 'facebook',
  name: 'Facebook',
  url: 'https://fb.me/DJDavid1998',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'facebook-square']} {...props} />,
  visitText: ['about:contact.visitPage'],
};
const newgrounds: ContactCardSettings = {
  id: 'newgrounds',
  name: 'Newgrounds',
  url: 'https://djdavid98.newgrounds.com/',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/newgrounds.png" {...props} />,
};
const guilded: ContactCardSettings = {
  id: 'guilded',
  name: 'Guilded',
  url: 'https://guilded.gg/djdavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'guilded']} {...props} />,
};
const kongregate: ContactCardSettings = {
  id: 'kongregate',
  name: 'Kongregate',
  url: 'https://www.kongregate.com/accounts/DJDavid98',
  renderIcon: (props?: Partial<CustomIconProps>) => <CustomIcon src="/logos/kongregate.svg" {...props} />,
};
const soundcloud: ContactCardSettings = {
  id: 'soundcloud',
  name: 'SoundCloud',
  url: 'https://soundcloud.com/DJDavid98',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'soundcloud']} {...props} />,
};
const spotify: ContactCardSettings = {
  id: 'spotify',
  name: 'Spotify',
  url: 'https://open.spotify.com/playlist/4A0PhLrsC5BtKYHIV5kk26?si=5a178f5e614c4548',
  renderIcon: (props?: Partial<FontAwesomeIconProps>) => <FontAwesomeIcon icon={['fab', 'spotify']} {...props} />,
  visitText: ['about:contact.playlist'],
};

export const CONTACT_DETAILS: ContactCardSettings[] = [
  discord,
  telegram,
  email,
  matrix,
  twitter,
  furbooru,
  picarto,
  youtube,
  inkbunny,
  steam,
  xbox,
  playstation,
  furaffinity,
  deviantart,
  pillowfort,
  mastodon,
  facebook,
  newgrounds,
  guilded,
  kongregate,
  soundcloud,
  spotify,
];
