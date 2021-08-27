import { Scrollchor, swing } from 'react-scrollchor';
import { useTranslation } from 'next-i18next';
import { VFC } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { ABOUT_SECTIONS } from 'src/config';
import { translatableValue } from 'src/util/i18n';

export const AboutNavigation: VFC<{ closeNavbar: VoidFunction }> = ({ closeNavbar }) => {
  const { t } = useTranslation();

  return (
    <Nav className="mx-auto" navbar>
      {ABOUT_SECTIONS.map(([anchor, label]) => (
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
            {translatableValue(t, label)}
          </Scrollchor>
        </NavItem>
      ))}
    </Nav>
  );
};
