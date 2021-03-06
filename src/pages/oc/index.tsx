import { AppContainer, Layout, LoadingIndicator } from 'components/common';
import { GetStaticProps, NextPage } from 'next';
import { SSRConfig, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { OcSpecies, VALID_OC_SPECIES } from 'src/types/oc';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import { getOcPageRoute } from 'src/util/oc';

const queryRegex = /^(pony|fox)(?:-(nsfw))?$/;

const OcIndexPage: NextPage<{ nsfwEnabled?: boolean }> = ({ nsfwEnabled = false }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const relevantQuery = Object.keys(router.query).find((k) => queryRegex.test(k));

  useEffect(() => {
    if (relevantQuery) {
      const [, species, nsfw] = queryRegex.exec(relevantQuery)!;
      if (VALID_OC_SPECIES.has(species)) {
        const isNsfw = nsfw === 'nsfw';
        void router.replace(getOcPageRoute(isNsfw, species));
        return;
      }
    }

    void router.replace(getOcPageRoute(nsfwEnabled, OcSpecies.PONY));
  }, [nsfwEnabled, relevantQuery, router]);

  return (
    <Layout>
      <AppContainer fluid>
        <LoadingIndicator navbarSpacing={false} padding={3} />
        <p className="h2 text-center">{t('common:redirecting')}</p>
      </AppContainer>
    </Layout>
  );
};

export default OcIndexPage;

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => ({
  props: {
    ...(await typedServerSideTranslations(locale)),
  },
});
