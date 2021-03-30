import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExternalLink } from 'components/common/ExternalLink';
import { useTranslation } from 'next-i18next';
import { VFC } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ContactCardProps, DefaultContactCardProps, EmailContactCardProps } from 'src/config';

export const ContactCard: VFC<ContactCardProps<DefaultContactCardProps | EmailContactCardProps>> = (props) => {
  const { t } = useTranslation();
  const { url, renderIcon, id, name, visitKey, children, wrapInLink = true } = props;

  const classAttr = `contact-card contact-card-${id}`;
  const row = (
    <>
      {typeof renderIcon === 'function' && (
        <Col xs="auto" className="d-flex flex-column align-items-center justify-content-center">
          {renderIcon({ className: 'contact-card-icon' })}
        </Col>
      )}
      <Col className="text-left text-md-center">
        <h3 className="contact-card-title">{typeof name === 'string' ? name : name(t)}</h3>
        {visitKey !== null && (
          <Button color="link">
            {t(`about:contact.${visitKey || 'visitProfile'}`)}
            <FontAwesomeIcon icon="arrow-right" className="ml-2" />
          </Button>
        )}
        {children}
      </Col>
    </>
  );

  return wrapInLink ? (
    <Row tag={ExternalLink} href={url} className={classAttr} rel="me">
      {row}
    </Row>
  ) : (
    <Row className={classAttr}>{row}</Row>
  );
};
