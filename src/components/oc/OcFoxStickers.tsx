import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExternalLink } from 'components/common/ExternalLink';
import { TelegramStickerIcon } from 'components/common/TelegramStickerIcon';
import { MultiArtistCreditList } from 'components/oc/MultiArtistCreditList';
import styles from 'modules/OcStickers.module.scss';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useMemo, VFC } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import { ArtistName } from 'src/config/artists';
import stickersDreamweaver from '../../../public/stickers-dreamweaver.jpg';
import { OcSectionHeading } from './OcSectionHeading';

const stickerPackId = 'sticker-pack';

export interface RecentArtworkProps {
  className: string;
  isNsfw: boolean;
}

export const OcFoxStickers: VFC<RecentArtworkProps> = ({ className, isNsfw }) => {
  const { t } = useTranslation();
  const stickersArtistCredits = useMemo(() => {
    const artists: ArtistName[] = ['DreamWeaverPony'];
    if (isNsfw) artists.push('KPVT');
    return artists;
  }, [isNsfw]);
  const stickersUrl = useMemo(() => PERSONAL_DETAILS.OC_STICKERS_BASE_URL + (isNsfw ? '/mature' : ''), [isNsfw]);

  return (
    <section className={className}>
      <Row className="align-items-lg-center">
        <Col xs={12} md="auto" className="text-center mb-4 mb-md-0">
          <div className={`${styles.stickersImageWrap} mx-auto rounded shadow`}>
            <Image src={stickersDreamweaver} alt={t('oc:stickerPack.packAlt')} quality={90} />
          </div>
        </Col>
        <Col>
          <div className="text-center text-md-left">
            <OcSectionHeading id={stickerPackId}>
              <TelegramStickerIcon className="mr-2 mr-lg-3" />
              {t('oc:stickerPack.heading')}
            </OcSectionHeading>
          </div>

          <p>
            {t('oc:stickerPack.explainer1')}
            <br />
            {t('oc:stickerPack.explainer2')}
            <br />
            {t('oc:stickerPack.explainer3')}
          </p>

          <Button tag={ExternalLink} href={stickersUrl} className="d-block d-md-inline-block mb-2 mr-md-2">
            {t('oc:detail.stickers')}
            <FontAwesomeIcon icon="external-link" className="ml-2" />
          </Button>
          <MultiArtistCreditList artists={stickersArtistCredits} nsfwEnabled={isNsfw} t={t} />
        </Col>
      </Row>
    </section>
  );
};
