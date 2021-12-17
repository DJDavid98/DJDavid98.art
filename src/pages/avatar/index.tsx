import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { AvatarBy, AvatarCredits } from 'components/avatar/AvatarCredits';
import { AppContainer, Layout } from 'components/common';
import { formatRelative } from 'date-fns';
import styles from 'modules/AvatarPage.module.scss';
import { GetStaticProps } from 'next';
import { SSRConfig, Trans, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, VFC } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { ARTIST_MAP } from 'src/config/artists';
import { AVATAR_HISTORY, CURRENT_AVATAR_INDEX } from 'src/config/avatars';
import { Translatable } from 'src/types/common';
import { AVATAR_IMAGE_SIZE, getAvatarImageUrl } from 'src/util/avatars';
import { assembleSeoUrl, useLocale } from 'src/util/common';
import { translatableValue } from 'src/util/i18n';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import { isArtistMe, isOldEnoughForNsfw } from 'src/util/oc';

const AVATAR_PREVIEW_SIZE = AVATAR_IMAGE_SIZE / 2;

export type AvatarPageProps = { avatarIndex?: number };

export const AvatarPage: VFC<AvatarPageProps> = ({ avatarIndex }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const locale = useLocale(language);
  const avatarIndexValid = typeof avatarIndex === 'number' && avatarIndex in AVATAR_HISTORY;
  const displayCurrentAvatar = !avatarIndexValid || avatarIndex === CURRENT_AVATAR_INDEX;
  const effectiveAvatarIndex = displayCurrentAvatar ? CURRENT_AVATAR_INDEX : avatarIndex;
  const displayedAvatar = AVATAR_HISTORY[effectiveAvatarIndex];
  const { artist: artistKey, firstUsed } = displayedAvatar;
  const artist = useMemo(() => ARTIST_MAP[artistKey], [artistKey]);
  const firstUsedDate = useMemo(() => new Date(firstUsed), [firstUsed]);
  const firstUsedDateString = useMemo(() => formatRelative(firstUsedDate, new Date(), { locale }), [firstUsedDate, locale]);
  const avatarUrl = getAvatarImageUrl(firstUsed);
  const pictureBy = useMemo<AvatarBy | undefined>(() => {
    if (!artist) return AvatarBy.ANONYMOUS;

    if (isArtistMe(artist)) return AvatarBy.ME;
  }, [artist]);
  const artistMainName: string = useMemo(() => (artist ? artist.name : t('avatar:unknownArtist')), [artist, t]);

  const [nsfwEnabled, setNsfwEnabled] = useState(false);

  useEffect(() => {
    setNsfwEnabled(isOldEnoughForNsfw());
  }, []);

  const titleI18nKey: Translatable = displayCurrentAvatar ? ['avatar:title'] : ['avatar:titlePrevious'];
  const headingI18nKey: Translatable = displayCurrentAvatar ? ['avatar:heading'] : ['avatar:headingPrevious'];

  return (
    <Layout>
      <NextSeo
        title={`${translatableValue(t, titleI18nKey)} - ${SITE_TITLE}`}
        description={t('avatar:seoDesc', { name: artistMainName })}
        openGraph={{
          type: 'website',
          images: [
            {
              alt: t('common:avatarImageAlt', { name: PERSONAL_DETAILS.NAME }),
              url: assembleSeoUrl(avatarUrl),
              width: AVATAR_IMAGE_SIZE,
              height: AVATAR_IMAGE_SIZE,
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
        }}
      />
      <AppContainer>
        <h1 className="h2 text-center">{translatableValue(t, headingI18nKey)}</h1>
        <p className="text-center">
          <Trans t={t} i18nKey={displayCurrentAvatar ? 'avatar:inUseSince' : 'avatar:firstUseDate'}>
            0<time dateTime={firstUsedDate.toISOString()}>{{ date: firstUsedDateString }}</time>1
          </Trans>
        </p>
        <Row className="align-items-lg-center">
          <Col xs={12} sm={6}>
            <div className={styles.avatarContainer}>
              <Image key={avatarUrl} src={avatarUrl} width={AVATAR_IMAGE_SIZE} height={AVATAR_IMAGE_SIZE} unoptimized layout="responsive" />
            </div>
          </Col>
          <Col xs={12} sm={6} className="text-center text-sm-left mt-3 mt-md-0">
            <h2 className={classNames('h3', pictureBy === AvatarBy.ME ? 'mb-0' : 'mb-4')}>
              <small className="d-block mb-2">{t('avatar:createdBy')}</small>
              <FontAwesomeIcon icon="paint-brush" className="mr-2" />
              <strong>{artistMainName}</strong>
            </h2>
            <AvatarCredits t={t} hideNsfw={!nsfwEnabled} artist={artist} by={pictureBy} />
          </Col>
        </Row>
        <div className="mt-3 text-center">
          <Link href="/avatar" passHref>
            <Button tag="a" color="link" size="lg" disabled={!avatarIndexValid}>
              <FontAwesomeIcon icon="clock" className="mr-2" />
              {t('avatar:viewCurrent')}
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button tag="a" color="link" size="lg">
              <FontAwesomeIcon icon="home" className="mr-2" />
              {t('common:returnHome')}
            </Button>
          </Link>
        </div>
        <h2>{t('avatar:history')}</h2>
        <div className={styles.avatarHistory}>
          {AVATAR_HISTORY.map((def) => (
            <div key={def.firstUsed} className={styles.avatarHistoryItem}>
              <Link href={`/avatar/${def.firstUsed}`} shallow={false}>
                <a className={classNames(styles.historicAvatarLink, { [styles.current]: def.firstUsed === firstUsed })}>
                  <Image
                    src={getAvatarImageUrl(def.firstUsed)}
                    width={AVATAR_PREVIEW_SIZE}
                    height={AVATAR_PREVIEW_SIZE}
                    alt={t('avatar:previousProfilePicture')}
                    className={styles.historicAvatarImage}
                  />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </AppContainer>
    </Layout>
  );
};

export default AvatarPage;

export const getStaticProps: GetStaticProps<AvatarPageProps & SSRConfig> = async ({ locale }) => ({
  props: {
    ...(await typedServerSideTranslations(locale, ['avatar'])),
  },
});
