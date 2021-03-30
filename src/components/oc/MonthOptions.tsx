import { format, setMonth } from 'date-fns';
import { memo, VFC } from 'react';
import { useLocale } from 'src/util/common';

const MonthOptionsComponent: VFC<{ language: string }> = ({ language }) => {
  const locale = useLocale(language);
  const options = [];
  for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
    options.push(
      <option key={monthNumber} value={monthNumber}>
        {format(setMonth(new Date(), monthNumber - 1), 'MMMM', { locale })}
      </option>,
    );
  }
  return <>{options}</>;
};

export const MonthOptions = memo(MonthOptionsComponent);
