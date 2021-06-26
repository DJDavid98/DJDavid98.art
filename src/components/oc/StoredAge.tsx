import { differenceInYears } from 'date-fns';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState, VFC } from 'react';
import { useCurrentAge } from 'src/hooks/oc';

export const StoredAge: VFC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  const currentAge = useCurrentAge();
  const [now, setNow] = useState(() => new Date());
  const displayedAge = useMemo(() => {
    const calculatedAge = differenceInYears(now, currentAge);
    return calculatedAge < 18 ? calculatedAge : '18+';
  }, [currentAge, now]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60e3);
    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{t('oc:yourAge', { age: displayedAge })}</span>;
};
