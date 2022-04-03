import { AboutSection, ContactSection, OcSection, RecentArtwork, RecentArtworkProps, SummarySection } from 'components/about';
import { AppHeader, Layout } from 'components/common';
import { GetStaticProps } from 'next';
import { SSRConfig, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { VFC } from 'react';
import { PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { ImageResponse } from 'src/types/furbooru-api';
import { getGravatarUrl } from 'src/util/common';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import { FurbooruGalleryId, searchFurbooru } from 'src/util/search-furbooru';
import { AVATAR_IMAGE_SIZE } from 'src/util/avatars';

type AboutPageProps = RecentArtworkProps;

const AboutPage: VFC<AboutPageProps> = ({ recentArtwork }) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <NextSeo
        title={`${t('about:title')} - ${SITE_TITLE}`}
        description={t('about:seoDesc')}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'djdavid98,hungary,magyarország,brony,bróni,furry,fox,unicorn,artist',
          },
        ]}
        openGraph={{
          type: 'website',
          images: [
            {
              alt: t('common:avatarImageAlt', { name: PERSONAL_DETAILS.NAME }),
              url: getGravatarUrl(AVATAR_IMAGE_SIZE),
              width: AVATAR_IMAGE_SIZE,
              height: AVATAR_IMAGE_SIZE,
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
        }}
      />
      <AppHeader />
      <div id="content">
        <SummarySection />
        <AboutSection />
        <RecentArtwork recentArtwork={recentArtwork} />
        <OcSection />
        <ContactSection />
      </div>
    </Layout>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps & SSRConfig> = async ({ locale }) => {
  let recentArtwork: ImageResponse[] = [];

  try {
    recentArtwork = await searchFurbooru({
      query: 'safe,-trace,-collaboration',
      galleryId: FurbooruGalleryId.OWN_ARTWORK,
      perPage: 25,
    });
  } catch (e) {
    // Ignore
  }

  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['about'])),
      recentArtwork,
    },
  };
};
