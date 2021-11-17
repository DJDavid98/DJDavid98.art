import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArtworkCredit } from 'components/oc';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { VFC } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { ABOUT_INDICES, ABOUT_SECTIONS, PERSONAL_DETAILS } from 'src/config';
import { ARTIST_MAP } from 'src/config/artists';
import { OcSpecies } from 'src/types/oc';
import { getOcPageRoute } from 'src/util/oc';
import disyDreamweaver from 'public/disy-dreamweaver.png';

export const OcSection: VFC = () => {
  const { t } = useTranslation();
  return (
    <section className="oc-section py-5 py-md-6" id={ABOUT_SECTIONS[ABOUT_INDICES.MY_OC][0]}>
      <Container>
        <Row className="align-items-lg-center">
          <Col xs={12} md={6} lg={4} className="text-center mb-4 mb-md-0">
            <div className="mx-auto oc-image-wrap">
              <Image src={disyDreamweaver} alt={t('about:myOC.artAlt')} quality={100} />
            </div>
            <small className="d-block text-muted mt-2">
              {`${t('about:myOC.artBy')} `}
              <ArtworkCredit className="ml-1" spacingClass={false} name="DreamWeaverPony" url={ARTIST_MAP.DreamWeaverPony.credits[1].url} />
            </small>
          </Col>
          <Col>
            <div className="text-center text-md-left">
              <h2>{t('about:myOC.heading')}</h2>
            </div>

            <p>{t('about:myOC.p1')}</p>
            <p>
              {t('about:myOC.p2', {
                name: PERSONAL_DETAILS.OC_NAME,
                nick: PERSONAL_DETAILS.OC_NICKNAME,
              })}
            </p>

            <Link href={getOcPageRoute(false, OcSpecies.PONY)} passHref>
              <Button tag="a" className="d-block d-md-inline-block mb-2 mr-md-2">
                <FontAwesomeIcon icon="id-card" className="mr-2" />
                {t('about:myOC.refSheet')}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OcSection;
