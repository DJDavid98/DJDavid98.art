import { useEffect, useState } from 'react';
import { AGE_GATE_KEY, getAgeGateValue } from 'src/util/oc';

export function useCurrentAge(): Date;
export function useCurrentAge<Raw extends boolean>(raw: Raw): Raw extends true ? Date | null : Date;

export function useCurrentAge(raw = false): Date | null {
  const [currentAge, setCurrentAge] = useState<Date | null>(() => (raw ? null : new Date()));

  useEffect(() => {
    const storageListener = (e: StorageEvent) => {
      if (e.key !== AGE_GATE_KEY) return;

      setCurrentAge(getAgeGateValue(raw));
    };

    window.addEventListener('storage', storageListener);
    return () => window.removeEventListener('storage', storageListener);
  }, [raw]);

  useEffect(() => {
    const loadListener = () => {
      setCurrentAge(getAgeGateValue(raw));
    };
    window.addEventListener('load', loadListener);
    return () => window.removeEventListener('load', loadListener);
  }, [raw]);

  return currentAge;
}
