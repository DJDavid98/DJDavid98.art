import { useEffect, useState } from 'react';
import { AGE_GATE_KEY, getAgeGateValue } from 'src/util/oc';

export const useCurrentAge = () => {
  const [currentAge, setCurrentAge] = useState<Date>(getAgeGateValue);

  useEffect(() => {
    const storageListener = (e: StorageEvent) => {
      if (e.key !== AGE_GATE_KEY) return;

      setCurrentAge(getAgeGateValue());
    };

    window.addEventListener('storage', storageListener);
    return () => window.removeEventListener('storage', storageListener);
  }, []);

  return currentAge;
};
