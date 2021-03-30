import { differenceInYears } from 'date-fns';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { PERSONAL_DETAILS } from 'src/config';

export const AgeDisplay: React.FC = (props) => {
  const { t } = useTranslation();
  const [now, setNow] = useState(new Date());
  const age = useMemo(() => String(differenceInYears(now, PERSONAL_DETAILS.BIRTH_DATE)), [now]);

  const dateTime = useMemo(() => PERSONAL_DETAILS.BIRTH_DATE.toISOString(), []);

  const yearsOld = t('about:yearsOld');
  const years = t('about:years');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 5e3);

    return () => clearInterval(timer);
  }, []);

  return (
    <span>
      <time dateTime={dateTime} {...props}>
        {age}
      </time>{' '}
      {yearsOld.trim() ? <abbr title={yearsOld}>{years}</abbr> : years}
    </span>
  );
};
