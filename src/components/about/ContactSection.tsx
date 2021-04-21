import { useTranslation } from 'next-i18next';
import { VFC } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { ABOUT_INDICES, ABOUT_SECTIONS, CONTACT_DETAILS } from 'src/config';
import { ContactCardMapper } from './ContactCardMapper';

export const ContactSection: VFC = () => {
  const { t } = useTranslation();
  return (
    <section className="contact-section py-4 py-md-5 text-center" id={ABOUT_SECTIONS[ABOUT_INDICES.CONTACT][0]}>
      <Container>
        <h2>{t('about:contact.heading')}</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <p>{t('about:contact.p1')}</p>
          </Col>
        </Row>
        <div className="p-2 p-md-0">
          <Row noGutters className="justify-content-center">
            <ContactCardMapper data={CONTACT_DETAILS} />
          </Row>
        </div>
      </Container>
    </section>
  );
};
