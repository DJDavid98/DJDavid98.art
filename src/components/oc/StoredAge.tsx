import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { differenceInYears } from 'date-fns';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState, VFC } from 'react';

export const StoredAge: VFC<{ className?: string; currentAge: Date }> = ({ className, currentAge }) => {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => new Date());
  const [displayedAge, setDisplayedAge] = useState<string | null>(null);

  useEffect(() => {
    const calculatedAge = Math.max(0, differenceInYears(now, currentAge));
    setDisplayedAge(calculatedAge < 18 ? String(calculatedAge) : '18+');
  }, [currentAge, now]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60e3);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {t('oc:yourAge', { age: displayedAge || '' })}
      {displayedAge == null && <FontAwesomeIcon icon="spinner" spin fixedWidth />}
    </span>
  );
};
