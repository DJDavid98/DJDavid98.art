import { differenceInYears } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import styles from 'modules/AgeDisplay.module.scss';

export const AgeDisplay: React.FC = (props) => {
  const { t } = useTranslation();
  const [now, setNow] = useState(new Date());
  const age = useMemo(() => String(differenceInYears(now, PERSONAL_DETAILS.BIRTH_DATE)), [now]);
  const dateTime = useMemo(() => PERSONAL_DETAILS.BIRTH_DATE.toISOString(), []);
  const yearsOldRef = useRef<HTMLSpanElement>(null);

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
      {yearsOld.trim() ? (
        <>
          <span ref={yearsOldRef} className={styles.yearsOld}>
            {years}
          </span>
          <UncontrolledTooltip target={yearsOldRef}>{yearsOld}</UncontrolledTooltip>
        </>
      ) : (
        years
      )}
    </span>
  );
};
