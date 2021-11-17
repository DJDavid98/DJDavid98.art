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
];

export const CURRENT_AVATAR_INDEX = 0;

export const CURRENT_AVATAR: AvatarDefinition = AVATAR_HISTORY[CURRENT_AVATAR_INDEX];
