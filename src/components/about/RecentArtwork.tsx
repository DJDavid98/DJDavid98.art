import { ImageSource } from 'components/common/ImageSource';
import { ImageTags } from 'components/common/ImageTags';
import { CustomIcon } from 'components/common/CustomIcon';
import { ExternalLink } from 'components/common/ExternalLink';
import { Gallery } from 'components/common/Gallery';
import { ImageResponse } from 'src/types/furbooru-api';
import { useTranslation } from 'next-i18next';
import { useMemo, VFC } from 'react';
import { Button, Container } from 'reactstrap';
import { ABOUT_INDICES, ABOUT_SECTIONS, PERSONAL_DETAILS } from 'src/config';
import { ImageOptions } from 'src/types/gallery';
import { thumbSize } from 'src/util/thumb-size';
import { ArtworkDivider } from './ArtworkDivider';

export interface RecentArtworkProps {
  recentArtwork?: ImageResponse[];
}

export const RecentArtwork: VFC<RecentArtworkProps> = ({ recentArtwork }) => {
  const { t } = useTranslation();
  const artwork = useMemo(() => {
    if (!recentArtwork) return [];

    return recentArtwork.map(
      (image: ImageResponse): ImageOptions => ({
        src: image.view_url,
        thumbnail: image.representations.thumb,
        ...thumbSize(image, 'thumb'),
        title: <ImageSource id={image.id} sourceUrl={image.source_url} />,
        caption: <ImageTags tags={image.tags} />,
      }),
    );
  }, [recentArtwork]);
  return (
    <>
      <section className="artwork-section py-5" id={ABOUT_SECTIONS[ABOUT_INDICES.ARTWORK][0]}>
        <Container>
          <h1>{t('about:artwork.heading')}</h1>
          {artwork.length > 0 ? (
            <Gallery images={artwork} />
          ) : (
            <>
              <p>{t('about:artwork.p1')}</p>
              <p>{t('about:artwork.p2')}</p>
              <p>{t('about:artwork.p3')}</p>
            </>
          )}
          <div className="mt-3 text-center">
            <Button
              size="lg"
              color="furbooru"
              tag={ExternalLink}
              href={PERSONAL_DETAILS.ARTIST_TAG_URL}
              className="d-block d-md-inline-block mb-2 mr-md-2"
            >
              <CustomIcon src="/logos/furbooru.svg" className="mr-2" />
              {t('about:artwork.viewFullGallery')}
            </Button>
          </div>
        </Container>
      </section>
      <ArtworkDivider />
    </>
  );
};
