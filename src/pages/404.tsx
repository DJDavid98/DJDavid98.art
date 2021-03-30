import { AppContainer, Layout } from 'components/common';
import { useTranslation } from 'next-i18next';
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
