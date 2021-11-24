import { differenceInYears } from 'date-fns';
import { useEffect, useMemo, useState, VFC } from 'react';
import { PERSONAL_DETAILS } from 'src/config';

export const AgeDisplay: VFC = () => {
  const [now, setNow] = useState(new Date());
  const age = useMemo(() => String(differenceInYears(now, PERSONAL_DETAILS.BIRTH_DATE)), [now]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 5e3);

    return () => clearInterval(timer);
  }, []);

  return <span>{age}</span>;
};
