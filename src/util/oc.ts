import { differenceInYears, getDate, getMonth, getYear, isValid } from 'date-fns';
import { ParsedUrlQuery } from 'querystring';
import { PERSONAL_DETAILS } from 'src/config';
import { ArtistInfo, OcSpecies, VALID_OC_SPECIES } from 'src/types/oc';

export const getOcPageRoute = (nsfwEnabled: boolean, species: string) => `/oc${nsfwEnabled ? `-mature` : ''}/${species}`;

export const getStoragePath = (path: string) => `/storage/${path}`;
export const getOcSfmModelPath = (nsfw: boolean) => getStoragePath(nsfw ? 'disy_nsfw.rar' : 'disy.rar');
export const getOcCutieMarkPath = (ext: 'svg' | 'png', version: number) => getStoragePath(`refs/cm.${ext}?v=${version}`);

export const AGE_GATE_KEY = 'visitor_birthdate';

/**
 * Remove age-gate-related session and local storage keys
 */
export const clearAgeGateValue = (dispatchEvent = true) => {
  try {
    if (localStorage.getItem(AGE_GATE_KEY) === null) return;

    localStorage.removeItem(AGE_GATE_KEY);
    if (dispatchEvent) {
      const storageEvent = new StorageEvent('storage', {
        key: AGE_GATE_KEY,
        storageArea: localStorage,
        newValue: null,
      });
      window.dispatchEvent(storageEvent);
    }
  } catch (e) {
    // Ignore error
  }
};

/**
 * Sets epoch if no argument is passed, which will bypass age gate entirely, except for time travellers
 *
 * Uses session storage by default, but can be changed to localStorage by passing `true` for `permanent`
 */
export const setAgeGateValue = (birthday: Date) => {
  clearAgeGateValue(false);

  const storageArea = localStorage;
  const newValue = birthday.toISOString();
  storageArea.setItem(AGE_GATE_KEY, birthday.toISOString());
  const storageEvent = new StorageEvent('storage', {
    key: AGE_GATE_KEY,
    storageArea,
    newValue,
  });
  window.dispatchEvent(storageEvent);
};

export function getAgeGateValue(): Date;
export function getAgeGateValue<Raw extends boolean>(raw: Raw): Raw extends true ? Date | null : Date;

/**
 * Retrieve the stored birthdate or the current time otherwise
 */
export function getAgeGateValue(raw = false): Date | null {
  let item = null;
  try {
    item = localStorage.getItem(AGE_GATE_KEY);
  } catch (e) {
    // Ignore error
  }

  if (item !== null) {
    let dateCandidate: Date | undefined;
    try {
      dateCandidate = new Date(item);
    } catch (e) {
      // Ignore
    }

    if (dateCandidate && isValid(dateCandidate)) {
      return dateCandidate;
    }
  }

  return raw ? null : new Date();
}

export const isOldEnoughForNsfw = (birthday?: Date) => differenceInYears(new Date(), birthday || getAgeGateValue()) >= 18;

export const constructDate = (year: number, month: number, day: number): Date => {
  const jsMonth = month - 1;
  return new Date(year, jsMonth, day);
};

export const MINIMUM_SENSIBLE_YEAR = 1800;

export const isValidDate = (year: number, month: number, day: number): boolean => {
  const date = constructDate(year, month, day);
  const jsMonth = month - 1;
  const dateYear = getYear(date);
  return isValid(date) && dateYear === year && dateYear > MINIMUM_SENSIBLE_YEAR && getDate(date) === day && getMonth(date) === jsMonth;
};

export const resolveFormParameter = (query?: ParsedUrlQuery): OcSpecies => {
  const formQuery = query?.form;

  if (formQuery && typeof formQuery === 'string') {
    const value = formQuery.split('-').shift();
    if (typeof value === 'string' && VALID_OC_SPECIES.has(value)) {
      return value as OcSpecies;
    }
  }

  return OcSpecies.PONY;
};

export const getOtherSpecies = (species: OcSpecies): OcSpecies => (species === OcSpecies.FOX ? OcSpecies.PONY : OcSpecies.FOX);

export const isArtistMe = (artist?: ArtistInfo | null): boolean => artist?.name === PERSONAL_DETAILS.NAME;
