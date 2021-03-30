import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { AboutNavigation } from 'components/about';
import { Fade as Hamburger } from 'hamburger-react';
import toPairs from 'lodash/toPairs';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar as RSNavbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import { AvailableLanguage, LANGUAGES, PERSONAL_DETAILS } from 'src/config';

const NavbarComponent: VFC = () => {
  const router = useRouter();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldWelcome, setShouldWelcome] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const closeNavbar = () => isOpen && toggle();
  const getCurrentProps = useCallback(
    (langCode: string) => (language === langCode ? { 'className': 'current', 'data-current': t('common:current') } : {}),
    [language, t],
  );

  useEffect(() => {
    setShouldWelcome(router.pathname === '/');
  }, [router]);

  const branding = shouldWelcome ? (
    <NavbarBrand tag="span">{t('common:welcome')}</NavbarBrand>
  ) : (
    <Link href="/">
      <a className="navbar-brand">
        <span className="sr-only">{PERSONAL_DETAILS.NAME}</span>
      </a>
    </Link>
  );

  const nativeLangName = useMemo(
    () => (language in LANGUAGES ? LANGUAGES[language as AvailableLanguage].nativeName : t('common:changeLanguage')),
    [language, t],
  );

  return (
    <RSNavbar color="light" light expand="lg" className="shadow" fixed="top">
      <Container>
        {branding}
        <NavbarToggler className="border-0 p-0" onClick={toggle}>
          <Hamburger toggled={isOpen} rounded />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          {shouldWelcome && <AboutNavigation closeNavbar={closeNavbar} />}
          <Nav className={classNames({ 'ml-auto': !shouldWelcome })} navbar>
            <UncontrolledDropdown nav inNavbar className="language-selector">
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon="globe" />
                <span className="ml-2">{nativeLangName}</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>{t('common:changeLanguage')}</DropdownItem>
                {toPairs(LANGUAGES).map(([key, value]) => (
                  <Link key={key} href={router.asPath} locale={key} passHref>
                    <DropdownItem tag="a" {...getCurrentProps(key)}>
                      <img className="language-flag" src={`/flags/${key}.svg`} alt="" />
                      <span>{value.nativeName}</span>
                    </DropdownItem>
                  </Link>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </RSNavbar>
  );
};

export const Navbar = NavbarComponent;
