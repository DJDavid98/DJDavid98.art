import { differenceInYears, getDate, getMonth, getYear, isValid } from 'date-fns';

export const getOcPageRoute = (nsfwEnabled: boolean, species: string) => `/oc${nsfwEnabled ? `-mature` : ''}/${species}`;

export const getStoragePath = (path: string) => `/storage/${path}`;
export const getOcSfmModelPath = (nsfw: boolean) => getStoragePath(nsfw ? 'paamayim_nsfw.rar' : 'paamayim.rar');
export const getOcCutieMarkPath = (ext: 'svg' | 'png', version: number) => getStoragePath(`refs/cm.${ext}?v=${version}`);

const AGE_GATE_KEY = 'visitor_birthdate';

/**
 * Sets epoch if no argument is passed, which will bypass age gate entirely, except for time travellers
 *
 * Uses session storage by default, but can be changed to localStorage by passing `true` for `permanent`
 */
export const setAgeGateValue = (birthday: Date, permanent?: boolean) => {
  // If temporary, clear permanent key
  if (permanent === false) localStorage.removeItem(AGE_GATE_KEY);
  // If permanent, clear temporary key
  else if (permanent === true) sessionStorage.removeItem(AGE_GATE_KEY);

  const selectedStore = permanent === true ? localStorage : sessionStorage;
  selectedStore.setItem(AGE_GATE_KEY, birthday.toISOString());
};

/**
 * Retrieve the stored birthdate or the current time otherwise
 */
export const getAgeGateValue = (): Date => {
  const item = localStorage.getItem(AGE_GATE_KEY) || sessionStorage.getItem(AGE_GATE_KEY);

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

  return new Date();
};

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
