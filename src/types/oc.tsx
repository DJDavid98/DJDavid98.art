import { OptionalProps } from 'src/types/common';

export enum OcSpecies {
  FOX = 'fox',
  PONY = 'pony',
  REX = 'rex',
}

export const VALID_OC_SPECIES = new Set<string>(Object.values(OcSpecies));

export const OC_PALETTES = {
  [OcSpecies.PONY]: {
    coat: ['#2F4B7A', '#6281B8'],
    mane: ['#B7D3F8', '#7CA6F0'],
    magic: ['#87E8E0'],
    eyes: ['#000', '#1F5450', '#87E8E0', '#B2EDE8', '#F6FFFE', '#FFF'],
    collar: ['#20365D', '#424E76', '#D5D7D8'],
    genitals: ['#314A7C'],
  },
  [OcSpecies.FOX]: {
    ears: ['#30466E', '#7BA6EF', '#BDD2F8'],
    eyes: ['#000', '#275B51', '#B1F4E9', '#BDD2F8', '#FFF'],
    muzzle: ['#30466E', '#9D6096', '#CA7BAC', '#F3EBE8', '#E6E6E6'],
    paws: ['#30466E', '#6181B5', '#BB98D2'],
  },
  [OcSpecies.REX]: {
    ears: ['#30466E', '#7BA6EF', '#E2FFFF'],
    eyes: ['#000', '#275B51', '#B1F4E9', '#E2FFFF', '#FFF'],
    muzzle: ['#101010', '#9D6096', '#CA7BAC', '#FFF', '#E2FFFF'],
    paws: ['#30466E', '#6181B5', '#BB98D2', '#E2FFFF'],
    collar: ['#1D203D', '#D5D7D8'],
  },
};

export const NSFW_PALETTE_KEYS: { [k in OcSpecies]?: Array<keyof typeof OC_PALETTES[k]> } = {
  [OcSpecies.PONY]: ['genitals', 'collar'],
};

export interface ArtistContactDetails {
  url: string;
  name: string;
  nsfw?: true;
  label?: string;
}

export interface ArtistInfo {
  name: string;
  credits: OptionalProps<ArtistContactDetails, 'name'>[];
}
