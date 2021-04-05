import { AboutSection, ContactSection, OcSection, RecentArtwork, RecentArtworkProps, SummarySection } from 'components/about';
import { AppHeader, Layout } from 'components/common';
import { ImageResponse } from 'src/types/furbooru-api';
import { GetStaticProps } from 'next';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { VFC } from 'react';
import { PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { getGravatarUrl } from 'src/util/common';
import { isImageResponse } from 'src/util/is-image-response';
import urlcat from 'urlcat';

const seoAvatarSize = 365;

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
    const resp: unknown = await fetch(
      urlcat(`https://furbooru.org/api/v1/json/search/images`, {
        q: 'safe,artist:djdavid98,-collaboration,-webm,gallery_id:13',
        sf: 'gallery_id:13',
        sd: 'desc',
        per_page: 14,
      }),
      {
        headers: {
          'user-agent': PERSONAL_DETAILS.OC_NAME,
        },
      },
    ).then((r) => r.json());
    if (isImageResponse(resp)) {
      recentArtwork = resp.images;
    }
  } catch (e) {
    // Ignore
  }

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'about'])),
      recentArtwork,
    },
  };
};
