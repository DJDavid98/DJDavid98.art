import { OptionalProps } from 'src/types/common';

export interface AvatarCreditProps {
  url: string;
  name: string;
  nsfw?: true;
}

export type GlobalAvatarCredit =
  | {
      name: string;
      credits: OptionalProps<AvatarCreditProps, 'name'>[];
    }
  | { name: null | false };

export const AVATAR_CREDIT: GlobalAvatarCredit = {
  name: 'NightyCloud',
  credits: [
    {
      url: 'https://twitter.com/NightyCloud',
      nsfw: true,
    },
    {
      name: 'Luna',
      url: 'https://furbooru.org/profiles/Luna',
    },
    {
      name: 'Nighty-Cloud',
      url: 'https://www.deviantart.com/nighty-cloud',
    },
    {
      name: 'Princess-Luna',
      url: 'https://www.pillowfort.social/Princess-Luna',
      nsfw: true,
    },
  ],
};
