import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomIcon, ExternalLink, ImageViewer } from 'components/common';
import { ArtworkCredit } from 'components/oc/ArtworkCredit';
import { CutieMarkButton } from 'components/oc/CutieMarkButton';
import { OcStats } from 'components/oc/OcStats';
import { SfmModelButton } from 'components/oc/SfmModelButton';
import styles from 'modules/OcFormPage.module.scss';
import { TFunction, Trans } from 'next-i18next';
import Image from 'next/image';
import { useCallback, useState, VFC } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import { OcSpecies } from 'src/types/oc';

const cmButtonId = 'cutie-mark-btn';
const sfmButtonId = 'sfm-model-btn';

export interface FormDescriptionProps {
  isNsfw: boolean;
  species: OcSpecies;
  t: TFunction;
  nsfwEnabled: boolean;
  className: string;
  sheetFilePath: string;
  downloadFileName: string;
  dimensions: number[];
  form: string;
  fileFormat: string;
}

export const OcFormDescription: VFC<FormDescriptionProps> = ({
  isNsfw = false,
  species,
  nsfwEnabled,
  className,
  t,
  sheetFilePath,
  downloadFileName,
  dimensions,
  form,
  fileFormat,
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(() => setIsViewerOpen(true), []);
  const closeImageViewer = useCallback(() => setIsViewerOpen(false), []);

  const imageClass = species === OcSpecies.FOX ? styles.sheetImageFox : undefined;

  const furbooruGalleryUrl = PERSONAL_DETAILS.OC_FURBOORU_GALLERY_URL(species);

  return (
    <Row tag="section" className={className}>
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
        <div className={styles.fewWordsQuote}>
          <h3>{t('oc:detail.fewWords.heading')}</h3>
          <p className="text-justify">
            {`${t('oc:detail.fewWords.selfIntroCommon', { nick: PERSONAL_DETAILS.OC_NICKNAME })} `}
            <Trans t={t} i18nKey={`oc:detail.fewWords.selfIntro.${species}`}>
              0<em>1</em>2
            </Trans>
          </p>
        </div>
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
          {t('oc:detail.p3')}
          {nsfwEnabled && (
            <>
              {` ${t('oc:detail.p3Lewd.select')} `}
              <ExternalLink href="https://furbooru.org/filters/62">Default 18+</ExternalLink>
              {` ${t('oc:detail.p3Lewd.toSee')}`}
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
          <Button color="furbooru" tag={ExternalLink} href={furbooruGalleryUrl} className="d-block d-md-inline-block mb-2 mr-md-2">
            <CustomIcon src="/logos/furbooru.svg" className="mr-2" />
            {t('oc:detail.previousArt')}
          </Button>
          {nsfwEnabled && (
            <Button color="f-list" tag={ExternalLink} href={PERSONAL_DETAILS.F_LIST_URL} className="d-block d-md-inline-block mb-2 mr-md-2">
              <FontAwesomeIcon icon="heart" className="mr-2" />
              {t('oc:detail.acceptableKinks')}
            </Button>
          )}
          {species === OcSpecies.PONY && (
            <>
              <hr />
              <h3>
                <FontAwesomeIcon icon="file-download" className="mr-2 mr-lg-3" />
                {t('oc:detail.additionalResources')}
              </h3>
              <div className="d-flex flex-column flex-md-row justify-content-lg-start flex-wrap">
                <CutieMarkButton buttonId={cmButtonId} />
                <SfmModelButton nsfwEnabled={nsfwEnabled} buttonId={sfmButtonId} />
              </div>
            </>
          )}
          <hr />
          <h3>
            <FontAwesomeIcon icon="paint-brush" className="mr-2 mr-lg-3" />
            {t('oc:detail.artworkBy')}:
          </h3>
          <div>
            <ArtworkCredit className="btn btn-link" url="https://twitter.com/DreamWeaverPony" name="DreamWeaverPony" nsfw />
            <ArtworkCredit className="btn btn-link" url="https://www.furaffinity.net/user/dreamweaverpony" name="DreamWeaverPony" />
            <ArtworkCredit className="btn btn-link" url="https://www.patreon.com/dreamweaverpony" name="DreamWeaverPony" nsfw />
            <ArtworkCredit className="btn btn-link" url="https://www.deviantart.com/dream-weaver-pony" name="Dream-Weaver-pony" />
          </div>
        </div>
      </Col>
    </Row>
  );
};
