import { AboutNavigation } from 'components/about';
import { LanguageSelector } from 'components/common/LanguageSelector';
import { Fade as Hamburger } from 'hamburger-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState, VFC } from 'react';
import { Collapse, Container, Navbar as RSNavbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';

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

  return (
    <RSNavbar color="light" light expand="lg" className="shadow" fixed="top">
      <Container>
        {branding}
        <NavbarToggler className="border-0 p-0" onClick={toggle}>
          <Hamburger toggled={isOpen} rounded />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          {shouldWelcome && <AboutNavigation closeNavbar={closeNavbar} />}
          <LanguageSelector router={router} shouldWelcome={shouldWelcome} t={t} language={language} />
        </Collapse>
      </Container>
    </RSNavbar>
  );
};

export const Navbar = NavbarComponent;
