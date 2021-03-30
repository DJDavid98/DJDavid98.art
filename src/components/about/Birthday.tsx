import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useTranslation } from 'next-i18next';
import { TimeHTMLAttributes, VFC } from 'react';
import { PERSONAL_DETAILS } from 'src/config';
import { useLocale } from 'src/util/common';

const birthTs = utcToZonedTime(PERSONAL_DETAILS.BIRTH_DATE, PERSONAL_DETAILS.TIMEZONE);

export const Birthday: VFC<TimeHTMLAttributes<unknown>> = (props) => {
  const {
    i18n: { language },
  } = useTranslation();
  const locale = useLocale(language);
  const birthday = format(birthTs, 'MMM do', { locale });

  return (
    <>
      <FontAwesomeIcon icon="birthday-cake" size="sm" className="mr-1" />
      <time dateTime={PERSONAL_DETAILS.BIRTH_DATE.toISOString()} {...props}>
        {birthday}
      </time>
    </>
  );
};
