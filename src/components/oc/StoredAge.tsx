import { differenceInYears } from 'date-fns';
import React, { useEffect, useState, VFC } from 'react';
import { TFunction } from 'react-i18next';
import { useCurrentAge } from 'src/hooks/oc';

export const StoredAge: VFC<{ t: TFunction; className?: string }> = ({ t, className }) => {
  const currentAge = useCurrentAge();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60e3);
    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{t('oc:yourAge', { age: differenceInYears(now, currentAge) })}</span>;
};
