import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useTranslation } from 'next-i18next';
import { TimeHTMLAttributes, useMemo, VFC } from 'react';
import { PERSONAL_DETAILS } from 'src/config';
import { useLocale } from 'src/util/common';

const birthTs = utcToZonedTime(PERSONAL_DETAILS.BIRTH_DATE, PERSONAL_DETAILS.TIMEZONE);

export const Birthday: VFC<TimeHTMLAttributes<unknown>> = (props) => {
  const {
    i18n: { language },
  } = useTranslation();
  const locale = useLocale(language);
  const birthday = format(birthTs, 'MMM do', { locale });
  const dateTime = useMemo(() => PERSONAL_DETAILS.BIRTH_DATE.toISOString(), []);

  return (
    <time dateTime={dateTime} {...props}>
      {birthday}
    </time>
  );
};
