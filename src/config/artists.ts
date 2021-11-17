import { PERSONAL_DETAILS } from 'src/config';
import { ArtistInfo } from 'src/types/oc';

const DJDavid98: ArtistInfo = {
  name: PERSONAL_DETAILS.NAME,
  credits: [],
};

const NightyCloud: ArtistInfo = {
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

const DreamWeaverPony: ArtistInfo = {
  name: 'DreamWeaverPony',
  credits: [
    { url: 'https://twitter.com/DreamWeaverPony', nsfw: true },
    { name: 'dreamweaverpony', url: 'https://www.furaffinity.net/user/dreamweaverpony' },
    { name: 'dreamweaverpony', url: 'https://www.patreon.com/dreamweaverpony', nsfw: true },
    { name: 'Dream-Weaver-pony', url: 'https://www.deviantart.com/dream-weaver-pony' },
  ],
};

const SeafoodDinner: ArtistInfo = {
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

const Vensual99: ArtistInfo = {
  name: 'Vensual99',
  credits: [
    { url: 'https://twitter.com/Vensual99', nsfw: true },
    { url: 'https://www.patreon.com/Vensual99', nsfw: true },
    { url: 'https://www.furaffinity.net/user/vensual99/' },
  ],
};

const ElisaWind: ArtistInfo = {
  name: 'ElisaWind',
  credits: [
    { url: 'https://twitter.com/ElisaWind20', nsfw: true, name: 'ElisaWind20' },
    { url: 'https://www.furaffinity.net/user/elisawind/', name: 'elisawind' },
    { url: 'https://www.deviantart.com/elisawind' },
    { url: 'https://vk.com/art_elisawind_lolamey', name: 'art_elisawind_lolamey' },
  ],
};

const Dbleki: ArtistInfo = {
  name: 'Dbleki',
  credits: [
    { url: 'https://twitter.com/Dbleki' },
    { url: 'https://www.furaffinity.net/user/dbleki/', name: 'dbleki' },
    { url: 'https://www.patreon.com/dbleki' },
  ],
};

export const ARTIST_MAP = {
  DJDavid98,
  Dbleki,
  DreamWeaverPony,
  ElisaWind,
  NightyCloud,
  SeafoodDinner,
  Vensual99,
};

export type ArtistName = keyof typeof ARTIST_MAP;

export const getArtistInfo = (name: ArtistName): ArtistInfo => ARTIST_MAP[name];
