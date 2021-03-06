import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Image from 'next/image';
import { TFunction } from 'next-i18next';
import toPairs from 'lodash/toPairs';
import styles from 'modules/LanguageSelector.module.scss';
import Link from 'next/link';
import { NextRouter } from 'next/router';
import { useCallback, useMemo, VFC } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from 'reactstrap';
import { AvailableLanguage, LANGUAGES } from 'src/config';

interface PropTypes {
  shouldWelcome: boolean;
  router: NextRouter;
  t: TFunction;
  language: string;
}

export const LanguageSelector: VFC<PropTypes> = ({ shouldWelcome, router, t, language }) => {
  const getCurrentProps = useCallback(
    (langCode: string) => {
      const className = styles.item;
      return language === langCode
        ? {
            'className': `${className} ${styles.current}`,
            'data-current': t('common:current'),
          }
        : { className };
    },
    [language, t],
  );

  const nativeLangName = useMemo(
    () => (language in LANGUAGES ? LANGUAGES[language as AvailableLanguage].nativeName : t('common:changeLanguage')),
    [language, t],
  );

  return (
    <Nav className={classNames({ 'ml-auto': !shouldWelcome })} navbar>
      <UncontrolledDropdown nav inNavbar className={styles.languageSelector}>
        <DropdownToggle nav caret>
          <FontAwesomeIcon icon="globe" />
          <span className="ml-2">{nativeLangName}</span>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header className={styles.item}>
            {t('common:changeLanguage')}
          </DropdownItem>
          {toPairs(LANGUAGES).map(([key, value]) => {
            const pathWithoutHash = router.asPath.replace(/#.*$/, '');
            return (
              <Link key={key} href={pathWithoutHash} locale={key} passHref>
                <DropdownItem tag="a" {...getCurrentProps(key)}>
                  <span className={styles.languageFlag}>
                    <Image src={`/flags/${key}.svg`} alt={t(`common:flagOf.${key}`)} width={640} height={480} layout="responsive" />
                  </span>
                  <span>{value.nativeName}</span>
                </DropdownItem>
              </Link>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );
};
