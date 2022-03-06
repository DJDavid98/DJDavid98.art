import { CustomIcon } from 'components/common/CustomIcon';
import { ExternalLink } from 'components/common/ExternalLink';
import { defaultColumns, Gallery } from 'components/common/Gallery';
import { ImageSource } from 'components/common/ImageSource';
import { ImageTags } from 'components/common/ImageTags';
import { OcSectionHeading } from 'components/oc/OcSectionHeading';
import { useTranslation } from 'next-i18next';
import { useMemo, VFC } from 'react';
import { Button } from 'reactstrap';
import { ImageResponse } from 'src/types/furbooru-api';
import { BsBreakpoint, BsBreakpointColumns } from 'src/types/gallery';
import { thumbSize } from 'src/util/thumb-size';

const existingArtworkId = 'exising-artwork';
const existingArtColumns: BsBreakpointColumns = {
  ...defaultColumns,
  [BsBreakpoint.M]: 5,
  [BsBreakpoint.L]: 6,
  [BsBreakpoint.XL]: 7,
  default: 8,
};

export interface RecentArtworkProps {
  existingArtwork?: ImageResponse[];
  furbooruGalleryUrl: string;
  className: string;
}

export const OcExistingArtwork: VFC<RecentArtworkProps> = ({ existingArtwork, furbooruGalleryUrl, className }) => {
  const { t } = useTranslation();
  const nsfwTagsSet = useMemo(() => new Set<string>(['explicit', 'suggestive', 'questionable']), []);
  const artwork = useMemo(
    () =>
      existingArtwork
        ? existingArtwork.map((image: ImageResponse) => ({
            src: image.view_url,
            thumbnail: image.representations.thumb,
            ...thumbSize(image, 'thumb'),
            title: <ImageSource id={image.id} sourceUrl={image.source_url} />,
            caption: <ImageTags tags={image.tags} />,
            nsfw: image.tags.some((tag) => nsfwTagsSet.has(tag)),
          }))
        : [],
    [existingArtwork, nsfwTagsSet],
  );

  if (!artwork.length) return null;

  return (
    <section className={className}>
      <OcSectionHeading id={existingArtworkId} icon="images">
        {t('oc:existingArtwork.heading')}
      </OcSectionHeading>
      <p>{t('oc:existingArtwork.explainer')}</p>
      <Gallery images={artwork} columns={existingArtColumns} />
      <div className="mt-3 text-center">
        <Button size="lg" color="furbooru" tag={ExternalLink} href={furbooruGalleryUrl} className="d-block d-md-inline-block mb-2 mr-md-2">
          <CustomIcon src="/logos/furbooru.svg" className="mr-2" />
          {t('oc:existingArtwork.viewFullGallery')}
        </Button>
      </div>
    </section>
  );
};
