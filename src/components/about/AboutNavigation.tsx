/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Scrollchor, swing } from '@seinopsys-forks/react-scrollchor';
import { useTranslation } from 'next-i18next';
import { VFC } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { ABOUT_SECTIONS } from 'src/config';

export const AboutNavigation: VFC<{ closeNavbar: VoidFunction }> = ({ closeNavbar }) => {
  const { t } = useTranslation();

  return (
    <Nav className="mx-auto" navbar>
      {ABOUT_SECTIONS.map(([anchor, translationKey]) => (
        <NavItem key={anchor}>
          <Scrollchor
            className="nav-link"
            to={anchor}
            animate={{
              offset: -56,
              easing: swing,
            }}
            beforeAnimate={closeNavbar}
          >
            {t(translationKey)}
          </Scrollchor>
        </NavItem>
      ))}
    </Nav>
  );
};
