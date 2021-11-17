import { ArtistName } from 'src/config/artists';

export interface AvatarDefinition {
  artist: ArtistName;
  /**
   * Unix timestamp of first use in milliseconds
   */
  firstUsed: number;
}

export const AVATAR_HISTORY: AvatarDefinition[] = [
  // Add new entries to the start
  {
    artist: 'Vensual99',
    firstUsed: 1637178713277,
  },
  {
    artist: 'NightyCloud',
    firstUsed: 1621103258441,
  },
  {
    artist: 'ElisaWind',
    firstUsed: 1617115694000,
  },
  {
    artist: 'Dbleki',
    firstUsed: 1613169284000,
  },
  {
    artist: 'DreamWeaverPony',
    firstUsed: 1603623600000,
  },
  {
    artist: 'Pridark',
    firstUsed: 1601114400000,
  },
  {
    artist: 'AriaMidnighters',
    firstUsed: 1591869600000,
  },
  {
    artist: 'Noxi',
    firstUsed: 1590141600000,
  },
  {
    artist: 'WitchTaunter',
    firstUsed: 1580727600000,
  },
];

export const CURRENT_AVATAR_INDEX = 0;

export const CURRENT_AVATAR: AvatarDefinition = AVATAR_HISTORY[CURRENT_AVATAR_INDEX];
