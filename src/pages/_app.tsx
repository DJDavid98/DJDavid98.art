import { appWithTranslation, useTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { AppComponent } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import 'src/app.scss';
import { PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { AVATAR_HISTORY } from 'src/config/avatars';
import 'src/fontawesome';
import { AVATAR_IMAGE_SIZE, getAvatarImagePath } from 'src/util/avatars';
import { assembleSeoUrl } from 'src/util/common';

const App: AppComponent = ({ Component, pageProps }) => {
  const { asPath, defaultLocale, locale, locales } = useRouter();
  const { t } = useTranslation();

  const languageAlternates = useMemo(
    () =>
      locales?.map((hrefLang) => ({
        hrefLang,
        href: (hrefLang !== defaultLocale ? `/${hrefLang}` : '') + asPath,
      })),
    [asPath, defaultLocale, locales],
  );

  const canonicalUrl = useMemo(() => assembleSeoUrl(asPath), [asPath]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#6688BB" />
        <meta name="wot-verification" content="dbc545e7120b5f44d66b" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{SITE_TITLE}</title>
      </Head>
      <DefaultSeo
        title={SITE_TITLE}
        description={t('common:seo.description', { name: PERSONAL_DETAILS.NAME })}
        openGraph={{
          type: 'website',
          locale,
          site_name: 'DJDavid98',
          url: canonicalUrl,
          images: [
            {
              alt: t('common:seo.avatarImageAlt', { name: PERSONAL_DETAILS.NAME }),
              url: assembleSeoUrl(getAvatarImagePath(AVATAR_HISTORY[0].firstUsed)),
              width: AVATAR_IMAGE_SIZE,
              height: AVATAR_IMAGE_SIZE,
            },
          ],
        }}
        canonical={canonicalUrl}
        twitter={{
          cardType: 'summary',
          handle: '@DJDavid98',
          site: '@DJDavid98',
        }}
        languageAlternates={languageAlternates}
      />
      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(App);
