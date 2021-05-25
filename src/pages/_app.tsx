import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import 'src/app.scss';
import { SITE_TITLE } from 'src/config';
import 'src/fontawesome';
import { assembleSeoUrl, getGravatarUrl } from 'src/util/common';

const avatarSize = 512;

const App: AppComponent = ({ Component, pageProps }) => {
  const { asPath, defaultLocale, locale, locales } = useRouter();

  const languageAlternates = useMemo(
    () =>
      locales?.map((hrefLang) => ({
        hrefLang,
        href: (hrefLang !== defaultLocale ? `/${hrefLang}` : '') + asPath,
      })),
    [asPath, defaultLocale, locales],
  );

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
        description="Personal website of DJDavid98"
        openGraph={{
          type: 'website',
          locale,
          site_name: 'DJDavid98',
          url: assembleSeoUrl(asPath),
          images: [
            {
              alt: 'Avatar of DJDavid98',
              url: getGravatarUrl(avatarSize),
              width: avatarSize,
              height: avatarSize,
            },
          ],
        }}
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
