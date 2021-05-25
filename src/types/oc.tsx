export enum OcSpecies {
  FOX = 'fox',
  PONY = 'pony',
}

export const VALID_OC_SPECIES = new Set<string>(Object.values(OcSpecies));
