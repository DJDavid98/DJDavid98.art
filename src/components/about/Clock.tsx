import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FC, useEffect, useState } from 'react';

import { PERSONAL_DETAILS } from 'src/config';

interface PropTypes {
  children: (hours: string, minutes: string, seconds: number | null) => JSX.Element;
  hoursFormat: string;
  minutesFormat: string;
}

const getDate = () => utcToZonedTime(new Date(), PERSONAL_DETAILS.TIMEZONE);

export const Clock: FC<PropTypes> = ({ children, hoursFormat, minutesFormat }) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(getDate());
    const timer = setInterval(() => setTime(getDate()), 2e3);

    return () => clearInterval(timer);
  }, []);

  if (time === null) {
    return children('##', '##', null);
  }

  let hours = '##';
  let minutes = '##';

  try {
    [hours, minutes] = format(time, `${hoursFormat}:${minutesFormat}`).split(':');
  } catch (e) {
    console.error(e);
  }

  return <>{children(hours, minutes, time.getSeconds())}</>;
};
