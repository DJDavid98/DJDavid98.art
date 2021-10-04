import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { AvatarBy, AvatarCredits, AvatarCreditsProps } from 'components/avatar/AvatarCredits';
import { AppContainer, Layout } from 'components/common';
import styles from 'modules/AvatarPage.module.scss';
import { GetStaticProps } from 'next';
import { SSRConfig, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, VFC } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { AVATAR_ARTIST } from 'src/config/avatar-artist';
import { getGravatarUrl } from 'src/util/common';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import { isArtistMe, isOldEnoughForNsfw } from 'src/util/oc';

const seoAvatarSize = 365;

type AvatarPageProps = Pick<AvatarCreditsProps, 'artist'>;

const AvatarPage: VFC<AvatarPageProps> = ({ artist }) => {
  const { t } = useTranslation();
  const pictureBy = useMemo<AvatarBy | undefined>(() => {
    if (!artist) return AvatarBy.ANONYMOUS;

    if (isArtistMe(artist)) return AvatarBy.ME;
  }, [artist]);
  const artistMainName: string = useMemo(() => (artist ? artist.name : t('avatar:unknownArtist')), [artist, t]);

  const [nsfwEnabled, setNsfwEnabled] = useState(false);

  useEffect(() => {
    setNsfwEnabled(isOldEnoughForNsfw());
  }, []);

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
            <h2 className={classNames('h3', pictureBy === AvatarBy.ME ? 'mb-0' : 'mb-4')}>
              <small className="d-block mb-2">{t('avatar:createdBy')}</small>
              <FontAwesomeIcon icon="paint-brush" className="mr-2" />
              <strong>{artistMainName}</strong>
            </h2>
            <AvatarCredits t={t} hideNsfw={!nsfwEnabled} artist={artist} by={pictureBy} />
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

export const getStaticProps: GetStaticProps<AvatarPageProps & SSRConfig> = async ({ locale }) => ({
  props: {
    artist: AVATAR_ARTIST,
    ...(await typedServerSideTranslations(locale, ['avatar'])),
  },
});
