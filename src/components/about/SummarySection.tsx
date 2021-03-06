import classNames from 'classnames';
import { DetailBlock } from 'components/common/DetailBlock';
import styles from 'modules/SummarySection.module.scss';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRef, VFC } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import { AgeDisplay } from './AgeDisplay';
import { Avatar } from './Avatar';
import { AvatarCredit } from './AvatarCredit';
import { Birthday } from './Birthday';
import { Clock } from './Clock';
import { Quote } from './Quote';

export const SummarySection: VFC = () => {
  const { t } = useTranslation();
  const locationIconRef = useRef<HTMLSpanElement>(null);
  return (
    <div className="summary pb-4">
      <div className="avatar-wrap">
        <div className="avatar-container">
          <Avatar />
        </div>
      </div>
      <h1 className="sr-only">{PERSONAL_DETAILS.NAME}</h1>
      <div className="text-center">
        <aside className="detail">
          <DetailBlock className="age" {...{ [t('about:agePlacement')]: t('about:age') }}>
            <AgeDisplay />
          </DetailBlock>
          <DetailBlock className="gender" {...{ [t('about:genderPlacement')]: t('about:gender') }}>
            {t('about:male')}
          </DetailBlock>
          <DetailBlock className="loc" prepend={t('about:livesIn')}>
            <span className="location-container" ref={locationIconRef}>
              <Image src="/flags/eu.svg" alt={t('about:location')} unoptimized width={35} height={26} priority />
              <span className="sr-only">{t('about:location')}</span>
            </span>
            <UncontrolledTooltip target={locationIconRef} placement="bottom">
              {t('about:location')}
            </UncontrolledTooltip>
          </DetailBlock>
          <br />
          <DetailBlock className="localtime" prepend={t('about:localTime')}>
            <Clock hoursFormat={t('about:hoursFormat')} minutesFormat={t('about:minutesFormat')}>
              {(h, m, s) => (
                <span id="localtime">
                  <span className={classNames('start', { 'text-white': s === null })}>{h}</span>
                  <span className={styles.tick}>:</span>
                  <span className={classNames('end', { 'text-white': s === null })}>{m}</span>
                </span>
              )}
            </Clock>
          </DetailBlock>
          <DetailBlock className="color" prepend={t('about:favoriteColor')}>
            <span className="color-holder">{t('about:favoriteColorName')}</span>
          </DetailBlock>
          <DetailBlock className="bday" prepend={t('about:birthday')}>
            <Birthday />
          </DetailBlock>
        </aside>
      </div>

      <AvatarCredit />

      <Quote
        text={t('about:quote.text')}
        from={t('about:quote.from')}
        url="https://www.goodreads.com/quotes/579281"
        className="text-center"
      />
    </div>
  );
};
