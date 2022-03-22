import { ArtistName } from 'src/config/artists';
import { PERSONAL_DETAILS } from 'src/config/index';

export interface AvatarDefinition {
  artist: ArtistName;
  /**
   * If the artwork is based on another artist's work, indicate the original artist here
   */
  basedOnArtist?: ArtistName;
  /**
   * Unix timestamp of first use in milliseconds
   */
  firstUsed: number;
}

export const AVATAR_HISTORY: AvatarDefinition[] = [
  // Add new entries to the start
  {
    artist: PERSONAL_DETAILS.NAME,
    basedOnArtist: 'Tosca',
    firstUsed: 1647928824646,
  },
  {
    artist: 'Potto',
    firstUsed: 1647028129567,
  },
  {
    artist: PERSONAL_DETAILS.NAME,
    firstUsed: 1642861934152,
  },
  {
    artist: 'creamy_roux',
    firstUsed: 1639762801392,
  },
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
  {
    artist: 'Luximus17',
    firstUsed: 1578325320000,
  },
  {
    artist: 'SugarMorning',
    firstUsed: 1567976580000,
  },
  {
    artist: 'FluffyXai',
    firstUsed: 1563386880000,
  },
  {
    artist: 'Sinrar',
    firstUsed: 1553464980000,
  },
  {
    artist: 'Discorded',
    firstUsed: 1512676800000,
  },
  {
    artist: 'Ayvie',
    firstUsed: 1504789440000,
  },
  {
    artist: 'Dbleki',
    firstUsed: 1491422220000,
  },
  {
    artist: PERSONAL_DETAILS.NAME,
    firstUsed: 1470256740000,
  },
  {
    artist: 'Conrie',
    firstUsed: 1453567560000,
  },
  {
    artist: PERSONAL_DETAILS.NAME,
    basedOnArtist: 'Pirill',
    firstUsed: 1446838980000,
  },
  {
    artist: PERSONAL_DETAILS.NAME,
    firstUsed: 1442732220000,
  },
];

export const CURRENT_AVATAR_INDEX = 0;

export const CURRENT_AVATAR: AvatarDefinition = AVATAR_HISTORY[CURRENT_AVATAR_INDEX];
