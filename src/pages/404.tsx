import { AppContainer, Layout } from 'components/common';
import { GetStaticProps } from 'next';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { VFC } from 'react';

const NotFoundPage: VFC = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <AppContainer bg="warning" heading={t('common:notFound.heading')}>
        {t('common:notFound.content')}
      </AppContainer>
    </Layout>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});
