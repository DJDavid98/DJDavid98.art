import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContainer, Layout } from 'components/common';
import { AgeGateModal } from 'components/oc';
import { OcColorPalette } from 'components/oc/OcColorPalette';
import { OcExistingArtwork } from 'components/oc/OcExistingArtwork';
import { OcFormDescription } from 'components/oc/OcFormDescription';
import { StoredAge } from 'components/oc/StoredAge';
import styles from 'modules/OcFormPage.module.scss';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next';
import { SSRConfig, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, UncontrolledTooltip } from 'reactstrap';
import { LANGUAGES, PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { useCurrentAge } from 'src/hooks/oc';
import { ImageResponse } from 'src/types/furbooru-api';
import { OcSpecies, VALID_OC_SPECIES } from 'src/types/oc';
import { assembleSeoUrl } from 'src/util/common';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import {
  clearAgeGateValue,
  getOcPageRoute,
  getOtherSpecies,
  getStoragePath,
  isOldEnoughForNsfw,
  resolveFormParameter,
  setAgeGateValue,
} from 'src/util/oc';
import { FurbooruGalleryId, searchFurbooru, SearchFurbooruOptions } from 'src/util/search-furbooru';

const lockNsfwButtonId = 'lock-nsfw-btn';

export const existingArtworkSearchOptions: Required<Pick<SearchFurbooruOptions, 'galleryId' | 'perPage'>> = {
  galleryId: FurbooruGalleryId.DISY_COMMISSIONED,
  perPage: 32,
};

const routeReplaceProps = {
  shallow: false,
  scroll: false,
};

export interface OcFormPageProps {
  isNsfw?: boolean;
  existingArtwork: ImageResponse[];
  species: OcSpecies;
}

const OcFormPage: NextPage<OcFormPageProps> = ({ isNsfw = false, existingArtwork, species }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [nsfwEnabled, setNsfwEnabled] = useState(isNsfw);
  const currentAge = useCurrentAge(true);
  const form = t(`oc:${species}`);

  useEffect(() => {
    if (isNsfw) {
      // Bypass age gate permanently for this visitor
      // No GDPR violation or the like, since the date is just the UNIX epoch
      setAgeGateValue(new Date(0));
    } else {
      setNsfwEnabled(isOldEnoughForNsfw());
    }
  }, [isNsfw]);

  const setIsNsfw = useCallback(
    (enabled: boolean) => {
      const path = getOcPageRoute(enabled, species);
      void router.replace(path, undefined, routeReplaceProps);
    },
    [router, species],
  );

  const handleChangeNsfw = useCallback(
    (newIsNsfw: boolean) => () => {
      if (!isNsfw) {
        if (newIsNsfw && !isOldEnoughForNsfw()) {
          setShowAgeGate(true);
          return;
        }
      }
      setIsNsfw(newIsNsfw);
    },
    [isNsfw, setIsNsfw],
  );
  const handleAgeVerification = useCallback(
    (value: boolean) => {
      setNsfwEnabled(value);
      setIsNsfw(value);
    },
    [setIsNsfw],
  );
  const closeAgeGate = useCallback(() => {
    setShowAgeGate(false);
  }, []);
  const handleLockNsfw = useCallback(() => {
    clearAgeGateValue();
    handleAgeVerification(false);
  }, [handleAgeVerification]);

  const heading = t('oc:heading', { name: PERSONAL_DETAILS.OC_NAME });
  const cacheBust = species === OcSpecies.FOX ? 7 : isNsfw ? 8 : 7;
  const fileFormat = 'png';
  const nsfwSuffix = isNsfw ? '_nsfw' : '';
  const sheetFilePath = getStoragePath(`refs/${species}${nsfwSuffix}.${fileFormat}?v=${cacheBust}`);
  const downloadFileName = `${heading}${form ? ` ${form}` : ''}${isNsfw ? ' NSFW' : ''}`;
  const dimensions = species === OcSpecies.FOX ? [4500, 2532] : [4175, isNsfw ? 3100 : 1843];

  const title = `${form ? `${isNsfw ? 'NSFW ' : ''}${form} - ` : ''}${heading} - ${SITE_TITLE}`;
  const furbooruGalleryUrl = PERSONAL_DETAILS.OC_FURBOORU_GALLERY_URL(species);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <NextSeo
        noindex={isNsfw}
        title={title}
        description={t('oc:seoDesc', { species: form.toLowerCase() })}
        openGraph={{
          type: 'photo',
          images: sheetFilePath
            ? [
                {
                  alt: downloadFileName,
                  url: assembleSeoUrl(sheetFilePath),
                  width: dimensions[0],
                  height: dimensions[0],
                },
              ]
            : [],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <AppContainer fluid>
        <h1 className="h2 text-center">{heading}</h1>
        <ButtonToolbar className="d-flex flex-column flex-lg-row align-items-center justify-content-center mb-3 text-center">
          <span className="d-block d-lg-inline mr-lg-2">{t('oc:speciesSelect')}:</span>

          <ButtonGroup>
            <Link href={getOcPageRoute(isNsfw, OcSpecies.PONY)} passHref replace {...routeReplaceProps}>
              <Button size="sm" teg="a" active={species === OcSpecies.PONY}>
                <FontAwesomeIcon icon="horse-head" className="mr-2" />
                {t(`oc:pony`)}
              </Button>
            </Link>
            <Link href={getOcPageRoute(isNsfw, OcSpecies.FOX)} passHref replace {...routeReplaceProps}>
              <Button size="sm" teg="a" active={species === OcSpecies.FOX}>
                <FontAwesomeIcon icon="paw" className="mr-2" />
                {t(`oc:fox`)}
              </Button>
            </Link>
          </ButtonGroup>

          <ButtonGroup className="ml-lg-2 mt-2 mt-lg-0">
            <Button id="sfw-button" size="sm" active={!isNsfw} onClick={handleChangeNsfw(false)}>
              SFW
            </Button>
            <Button id="nsfw-button" size="sm" active={isNsfw} onClick={handleChangeNsfw(true)}>
              NSFW
              {!nsfwEnabled && <FontAwesomeIcon icon="lock" className="ml-2" size="xs" />}
            </Button>
          </ButtonGroup>

          {(currentAge !== null || nsfwEnabled) && (
            <>
              <Button id={lockNsfwButtonId} color="link" className="ml-lg-2 mt-2 mt-lg-0" onClick={handleLockNsfw}>
                <FontAwesomeIcon icon="trash" size="xs" className="mr-2 text-danger" />
                <StoredAge className="text-dark" currentAge={currentAge} />
              </Button>
              <UncontrolledTooltip target={lockNsfwButtonId} fade={false} placement="bottom">
                {t('oc:clearSavedDate')}
              </UncontrolledTooltip>
            </>
          )}
        </ButtonToolbar>

        <OcFormDescription
          className={styles.pageSection}
          t={t}
          species={species}
          nsfwEnabled={nsfwEnabled}
          isNsfw={isNsfw}
          sheetFilePath={sheetFilePath}
          form={form}
          dimensions={dimensions}
          downloadFileName={downloadFileName}
          fileFormat={fileFormat}
        />
        <OcColorPalette className={styles.pageSection} t={t} form={form} species={species} isNsfw={isNsfw} />
        <OcExistingArtwork className={styles.pageSection} existingArtwork={existingArtwork} furbooruGalleryUrl={furbooruGalleryUrl} />
      </AppContainer>
      <AgeGateModal visible={showAgeGate} close={closeAgeGate} verify={handleAgeVerification} />
    </Layout>
  );
};

export const requestSafeArtwork = (species: OcSpecies, perPage?: number) => {
  const parameters: SearchFurbooruOptions = {
    ...existingArtworkSearchOptions,
    query: `${species},-${getOtherSpecies(species)},-suggestive`,
  };
  if (perPage) parameters.perPage = perPage;
  return searchFurbooru(parameters);
};

export const getStaticProps: GetStaticProps<OcFormPageProps & SSRConfig> = async ({ locale, params }) => {
  const species = resolveFormParameter(params);
  let existingArtwork: ImageResponse[] = [];

  try {
    existingArtwork = await requestSafeArtwork(species);
  } catch (e) {
    // Ignore
  }

  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['oc'])),
      existingArtwork,
      species,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => ({
  paths: Array.from(VALID_OC_SPECIES).reduce((acc, form) => {
    const newParams: typeof acc = [];
    const locales = ctx.locales || Object.keys(LANGUAGES);
    locales.forEach((locale) => {
      newParams.push({
        params: { form },
        locale,
      });
    });
    return [...acc, ...newParams];
  }, [] as GetStaticPathsResult['paths']),
  fallback: false,
});

export default OcFormPage;
