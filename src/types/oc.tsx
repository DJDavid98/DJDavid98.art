export enum OcSpecies {
  FOX = 'fox',
  PONY = 'pony',
}

export const VALID_OC_SPECIES = new Set<string>(Object.values(OcSpecies));

export const OC_PALETTES = {
  [OcSpecies.PONY]: {
    coat: ['#2F4B7A', '#6281B8'],
    mane: ['#B7D3F8', '#7CA6F0'],
    eyes: ['#1F5450', '#87E8E0', '#B2EDE8', '#F6FFFE'],
    magic: ['#87E8E0'],
  },
  [OcSpecies.FOX]: {
    ears: ['#30466E', '#7BA6EF', '#BDD2F8'],
    eyes: ['#275B51', '#B1F4E9', '#BDD2F8'],
    muzzle: ['#30466E', '#9D6096', '#CA7BAC', '#F3EBE8', '#E6E6E6'],
    paws: ['#30466E', '#6181B5', '#BB98D2'],
  },
};
