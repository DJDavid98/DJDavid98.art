import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContainer, CustomIcon, ExternalLink, ImageViewer, Layout } from 'components/common';
import { AgeGateModal, ArtworkCredit, CutieMarkButton, OcStats, SfmModelButton } from 'components/oc';
import styles from 'modules/OcFormPage.module.scss';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next';
import { SSRConfig, Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from 'reactstrap';
import { CANONICAL_URL, LANGUAGES, PERSONAL_DETAILS, SITE_TITLE } from 'src/config';
import { OcSpecies, ValidOcSpecies } from 'src/types/oc';
import { getOcPageRoute, getStoragePath, isOldEnoughForNsfw, setAgeGateValue } from 'src/util/oc';

const sfmButtonId = 'sfm-model-btn';
const cmButtonId = 'cutie-mark-btn';

export interface OcFormPageProps {
  nsfwConfirmBypass?: boolean;
}

const OcFormPage: NextPage<OcFormPageProps> = ({ nsfwConfirmBypass = false }) => {
  const router = useRouter();
  const formQuery = useMemo(() => {
    const value = router.query?.form;
    return typeof value !== 'string' ? undefined : value;
  }, [router.query]);
  const { t } = useTranslation();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isNsfw, setIsNsfw] = useState(nsfwConfirmBypass);
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [nsfwEnabled, setNsfwEnabled] = useState(nsfwConfirmBypass);
  const species: OcSpecies | null = useMemo(() => {
    if (formQuery) {
      const value = formQuery.split('-').shift();
      if (typeof value === 'string' && ValidOcSpecies.has(value)) {
        return value as OcSpecies;
      }
    }

    return null;
  }, [formQuery]);

  useEffect(() => {
    if (nsfwConfirmBypass) {
      // Bypass age gate permanently for this visitor
      // No GDPR violation or the like, since the date is just the UNIX epoch
      setAgeGateValue(new Date(0), true);
    } else {
      setNsfwEnabled(isOldEnoughForNsfw());
    }
  }, [nsfwConfirmBypass]);

  const handleChangeNsfw = useCallback(
    (newIsNsfw: boolean) => () => {
      if (!nsfwConfirmBypass) {
        if (newIsNsfw && !isOldEnoughForNsfw()) {
          setShowAgeGate(true);
          return;
        }
      }
      setIsNsfw(newIsNsfw);
    },
    [nsfwConfirmBypass],
  );
  const handleAgeVerification = useCallback((value: boolean) => {
    setNsfwEnabled(value);
    setIsNsfw(value);
    setShowAgeGate(false);
  }, []);
  const closeAgeGate = useCallback(() => {
    setShowAgeGate(false);
  }, []);
  const openImageViewer = useCallback(() => setIsViewerOpen(true), []);
  const closeImageViewer = useCallback(() => setIsViewerOpen(false), []);

  const form = species ? t(`oc:${species}`) : '';
  const heading = t('oc:heading', { name: PERSONAL_DETAILS.OC_NAME });
  // const cacheBust = species === OcSpecies.FOX ? 2 : 2;
  const cacheBust = 2;
  const fileFormat = 'png';
  const nsfwSuffix = isNsfw && species === OcSpecies.FOX ? '_nsfw' : '';
  const sheetFilePath = species ? getStoragePath(`refs/${species}${nsfwSuffix}.${fileFormat}?v=${cacheBust}`) : null;
  const downloadFileName = `${heading}${form ? ` ${form}` : ''}${isNsfw ? ' NSFW' : ''}`;
  const dimensions = species === OcSpecies.FOX ? [4500, 2532] : [3844, 3016];
  const imageClass = species === OcSpecies.FOX ? styles.sheetImageFox : undefined;

  const title = `${form ? `${isNsfw ? 'NSFW ' : ''}${form} - ` : ''}${heading} - ${SITE_TITLE}`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <NextSeo
        title={title}
        description={t('oc:seoDesc', { species: form.toLowerCase() })}
        openGraph={{
          type: 'photo',
          images: sheetFilePath
            ? [
                {
                  alt: downloadFileName,
                  url: CANONICAL_URL + sheetFilePath,
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
            <Link href={getOcPageRoute(nsfwConfirmBypass, OcSpecies.PONY)} passHref shallow replace>
              <Button size="sm" teg="a" active={species === OcSpecies.PONY}>
                {t(`oc:pony`)}
              </Button>
            </Link>
            <Link href={getOcPageRoute(nsfwConfirmBypass, OcSpecies.FOX)} passHref shallow replace>
              <Button size="sm" teg="a" active={species === OcSpecies.FOX}>
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
        </ButtonToolbar>

        <Row>
          <Col xs={12} lg={6} xl={8}>
            <div className={`${styles.refSheetWrapper} mb-3 mb-lg-0`}>
              {sheetFilePath && (
                <Image
                  key={sheetFilePath}
                  src={sheetFilePath}
                  alt={downloadFileName}
                  onClick={openImageViewer}
                  unoptimized
                  width={dimensions[0]}
                  height={dimensions[1]}
                  className={imageClass}
                />
              )}
            </div>
            {sheetFilePath && isViewerOpen && <ImageViewer onCloseRequest={closeImageViewer} mainSrc={sheetFilePath} />}
          </Col>
          <Col xs={12} lg={6} xl={4}>
            <div className="text-center text-lg-left">
              <h2 className="mb-0">{t('oc:detail.heading', { form })}</h2>
              <OcStats species={species} nsfwShown={isNsfw} />
            </div>
            {species === OcSpecies.FOX && (
              <div className={styles.foxQuote}>
                <h3>{t('oc:detail.foxFewWords.heading')}</h3>
                <p className="text-justify">
                  <Trans t={t} i18nKey="oc:detail.foxFewWords.selfIntro" values={{ nick: PERSONAL_DETAILS.OC_NICKNAME }}>
                    0<code>1</code>2<em>3</em>4
                  </Trans>
                </p>
              </div>
            )}
            <p>
              <Trans
                i18nKey="oc:detail.p1"
                components={[
                  <ExternalLink key={0} href="https://www.php.net/download-logos.php" />,
                  <code key={1} />,
                  <ExternalLink key={2} href={t('oc:detail.moreInfoUrl')} />,
                ]}
              />
            </p>
            <p>
              {t('oc:detail.p2')}
              {species === OcSpecies.PONY && ` ${t('oc:detail.p3')}`} {t('oc:detail.p4')}
              {nsfwEnabled && (
                <>
                  {` ${t('oc:detail.p4Lewd.select')} `}
                  <ExternalLink href="https://furbooru.org/filters/62">Default 18+</ExternalLink>
                  {` ${t('oc:detail.p4Lewd.toSee')}`}
                </>
              )}
            </p>
            <div>
              <Button
                tag="a"
                color="primary"
                download={`${downloadFileName}.${fileFormat}`}
                href={sheetFilePath}
                className="d-block d-md-inline-block mb-2 mr-md-2"
              >
                <FontAwesomeIcon icon="download" className="mr-2" />
                {t('oc:detail.downloadRefSheet', { format: fileFormat.toUpperCase() })}
              </Button>
              {species === OcSpecies.PONY && (
                <>
                  <Button tag={ExternalLink} href={PERSONAL_DETAILS.OC_COLOR_GUIDE_URL} className="d-block d-md-inline-block mb-2 mr-md-2">
                    <FontAwesomeIcon icon="palette" className="mr-2" />
                    {t('oc:detail.colorGuide')}
                  </Button>
                </>
              )}
              <Button
                color="furbooru"
                tag={ExternalLink}
                href={PERSONAL_DETAILS.OC_FURBY_GALLERY_URL(species)}
                className="d-block d-md-inline-block mb-2 mr-md-2"
              >
                <CustomIcon src="/logos/furbooru.svg" className="mr-2" />
                {t('oc:detail.previousArt')}
              </Button>
              {species === OcSpecies.PONY && (
                <>
                  <hr />
                  <h3>{t('oc:detail.additionalResources')}</h3>
                  <div className="d-flex flex-column flex-md-row justify-content-lg-start flex-wrap">
                    <CutieMarkButton buttonId={cmButtonId} />
                    <SfmModelButton nsfwEnabled={nsfwEnabled} buttonId={sfmButtonId} />
                  </div>
                </>
              )}
              {species === OcSpecies.FOX && (
                <>
                  <hr />
                  <h3>{t('oc:detail.artworkBy')}:</h3>
                  <div>
                    <ArtworkCredit className="btn btn-link" url="https://twitter.com/DreamWeaverPony" name="DreamWeaverPony" />
                    <ArtworkCredit className="btn btn-link" url="https://www.furaffinity.net/user/dreamweaverpony" name="DreamWeaverPony" />
                    <ArtworkCredit className="btn btn-link" url="https://www.patreon.com/dreamweaverpony" name="DreamWeaverPony" />
                    <ArtworkCredit className="btn btn-link" url="https://www.deviantart.com/dream-weaver-pony" name="Dream-Weaver-pony" />
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </AppContainer>
      <AgeGateModal visible={showAgeGate} close={closeAgeGate} verify={handleAgeVerification} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<OcFormPageProps & SSRConfig> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'oc'])),
  },
});

export const getStaticPaths: GetStaticPaths = async (ctx) => ({
  paths: Array.from(ValidOcSpecies).reduce((acc, form) => {
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
