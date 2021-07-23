import { OptionalProps } from 'src/types/common';

export interface AvatarCreditProps {
  url: string;
  name: string;
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
    },
    {
      name: 'Luna',
      url: 'https://furbooru.org/profiles/Luna',
    },
    {
      name: 'Nighty-Cloud',
      url: 'https://www.deviantart.com/nighty-cloud',
    },
  ],
};
