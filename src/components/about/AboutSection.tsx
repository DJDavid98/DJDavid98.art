import { ExternalLink } from 'components/common/ExternalLink';
import { useTranslation } from 'next-i18next';
import { VFC } from 'react';
import { Container } from 'reactstrap';
import { ABOUT_INDICES, ABOUT_SECTIONS } from 'src/config';
import { AboutDivider } from './AboutDivider';

export const AboutSection: VFC = () => {
  const { t } = useTranslation();
  return (
    <div id={ABOUT_SECTIONS[ABOUT_INDICES.ABOUT_ME][0]}>
      <AboutDivider placement="top" />
      <section className="about-section py-4">
        <Container>
          <h2>{t('about:aboutMe.heading')}</h2>
          <p>
            {t('about:aboutMe.p1.t1')}
            <ExternalLink href={t('about:aboutMe.mlpWikipediaUrl')} className="font-italic">
              {t('about:aboutMe.p1.t2')}
            </ExternalLink>
            {t('about:aboutMe.p1.t3')}
          </p>
          <p>{t('about:aboutMe.p2')}</p>
          <p>{t('about:aboutMe.p3')}</p>
        </Container>
      </section>
      <AboutDivider placement="bottom" />
    </div>
  );
};
