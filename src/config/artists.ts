import { PERSONAL_DETAILS } from 'src/config';
import { ArtistInfo } from 'src/types/oc';

export const DJDavid98: ArtistInfo = {
  name: PERSONAL_DETAILS.NAME,
  credits: [],
};
export const NightyCloud: ArtistInfo = {
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

export const DreamWeaverPony: ArtistInfo = {
  name: 'DreamWeaverPony',
  credits: [
    { url: 'https://twitter.com/DreamWeaverPony', nsfw: true },
    { name: 'dreamweaverpony', url: 'https://www.furaffinity.net/user/dreamweaverpony' },
    { name: 'dreamweaverpony', url: 'https://www.patreon.com/dreamweaverpony', nsfw: true },
    { name: 'Dream-Weaver-pony', url: 'https://www.deviantart.com/dream-weaver-pony' },
  ],
};

export const SeafoodDinner: ArtistInfo = {
  name: 'SeafoodDinner',
  credits: [
    { url: 'https://www.deviantart.com/seafooddinner' },
    { url: 'https://twitter.com/CfudDinner', name: 'CfudDinner' },
    { url: 'https://twitter.com/CDinner18', name: 'CDinner18', nsfw: true },
    { url: 'https://www.pillowfort.social/SeafoodDinner', nsfw: true },
    { url: 'https://www.subscribestar.com/seafood-dinner', name: 'seafood-dinner' },
    { url: 'https://ko-fi.com/seafooddinner' },
  ],
};
