import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExternalLink } from 'components/common/ExternalLink';
import { getYear } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useRef, VFC } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';

const AppFooterComponent: VFC = () => {
  const { t } = useTranslation();

  const viewSourceRef = useRef<HTMLAnchorElement>(null);

  return (
    <footer id="footer">
      <span>
        {t('common:builtWith.t1')}
        <ExternalLink href="https://fontawesome.com/license/free">Font Awesome Free 5.15.1</ExternalLink>
        {t('common:builtWith.t2')}
      </span>
      <span>
        <FontAwesomeIcon icon={['fab', 'osi']} className="mr-2" />
        {t('common:openSource')}
        <ExternalLink ref={viewSourceRef} href="https://github.com/DJDavid98/DJDavid98.art" className="ml-2">
          <FontAwesomeIcon icon={['fab', 'github']} />
        </ExternalLink>
        <UncontrolledTooltip target={viewSourceRef} fade={false}>
          {t('common:viewSource')}
        </UncontrolledTooltip>
      </span>
      <span>
        &copy; {PERSONAL_DETAILS.NAME} 2012-{Math.max(getYear(new Date()), 2021)}
      </span>
    </footer>
  );
};

export const AppFooter = AppFooterComponent;
