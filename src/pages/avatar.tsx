import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { AppContainer, Layout } from 'components/common';
import { ArtworkCredit } from 'components/oc';
import styles from 'modules/AvatarPage.module.scss';
import { GetStaticProps } from 'next';
import { SSRConfig, Trans, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useMemo, VFC } from 'react';
import { Button, Col, Nav, NavItem, Row } from 'reactstrap';
import { AVATAR_CREDIT, PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { getGravatarUrl } from 'src/util/common';
import { typedServerSideTranslations } from 'src/util/i18n-server';

const seoAvatarSize = 365;

const HomeLink: FC = ({ children }) => (
  <Link href="/">
    <a>{children}</a>
  </Link>
);

const AvatarPage: VFC = () => {
  const { t } = useTranslation();
  const pictureByMe = AVATAR_CREDIT.name === null;
  const pictureByAnonymous = AVATAR_CREDIT.name === false;
  const artistMainName: string = useMemo(() => {
    if (pictureByMe) return PERSONAL_DETAILS.NAME;
    if (pictureByAnonymous) return t('avatar:unknownArtist');
    return AVATAR_CREDIT.name as string;
  }, [pictureByAnonymous, pictureByMe, t]);
  return (
    <Layout>
      <NextSeo
        title={`${t('avatar:title')} - ${SITE_TITLE}`}
        description={t('avatar:seoDesc', { name: artistMainName })}
        openGraph={{
          type: 'website',
          images: [
            {
              alt: t('common:avatarImageAlt', { name: PERSONAL_DETAILS.NAME }),
              url: getGravatarUrl(seoAvatarSize),
              width: seoAvatarSize,
              height: seoAvatarSize,
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
        }}
      />
      <AppContainer>
        <h1 className="h2 text-center">{t('avatar:heading')}</h1>
        <Row className="align-items-lg-center">
          <Col xs={12} md={5} lg={6}>
            <div className={styles.avatarContainer}>
              <Image src={getGravatarUrl(seoAvatarSize)} width={seoAvatarSize} height={seoAvatarSize} layout="responsive" />
            </div>
          </Col>
          <Col xs={12} md={7} lg={5} className="text-center text-md-left mt-3 mt-md-0">
            <h2 className={classNames('h3', pictureByMe ? 'mb-0' : 'mb-4')}>
              <small className="d-block mb-2">{t('avatar:createdBy')}</small>
              <FontAwesomeIcon icon="paint-brush" className="mr-2" />
              <strong>{artistMainName}</strong>
            </h2>
            {pictureByMe ? (
              <>
                <small className="d-block text-muted font-italic mb-3">{t('avatar:thatIsMe')}</small>
                <p>
                  <Trans t={t} i18nKey="avatar:noCreditsExplainer">
                    0<HomeLink />2
                  </Trans>
                </p>
              </>
            ) : pictureByAnonymous ? (
              t('avatar:noContactAnonymous')
            ) : 'credits' in AVATAR_CREDIT ? (
              <>
                <p>{t('avatar:contactBelow')}</p>
                <Nav vertical>
                  {AVATAR_CREDIT.credits.map((credit, i) => (
                    <NavItem key={i}>
                      <ArtworkCredit className="nav-link" url={credit.url} name={credit.name || artistMainName} nsfw={credit.nsfw} />
                    </NavItem>
                  ))}
                </Nav>
              </>
            ) : (
              <p>{t('avatar:noContactAvailable')}</p>
            )}
          </Col>
        </Row>
        <div className="mt-3 text-center">
          <Link href="/" passHref>
            <Button tag="a" color="link" size="lg">
              <FontAwesomeIcon icon="home" className="mr-2" />
              {t('common:returnHome')}
            </Button>
          </Link>
        </div>
      </AppContainer>
    </Layout>
  );
};

export default AvatarPage;

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => ({
  props: {
    ...(await typedServerSideTranslations(locale, ['avatar'])),
  },
});
