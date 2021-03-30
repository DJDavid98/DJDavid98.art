import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { PERSONAL_DETAILS } from 'src/config';

interface PropTypes {
  children: (hours: string, minutes: string, seconds: number | null) => JSX.Element;
  hoursFormat: string;
  minutesFormat: string;
}

const getDate = () => utcToZonedTime(new Date(), PERSONAL_DETAILS.TIMEZONE);

export const Clock: React.FC<PropTypes> = ({ children, hoursFormat, minutesFormat }) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(getDate());
    const timer = setInterval(() => setTime(getDate()), 1e3);

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

  return <time dateTime={time.toISOString()}>{children(hours, minutes, time.getSeconds())}</time>;
};
