import { ImageViewer } from 'components/common/ImageViewer';
import { useCallback, VFC } from 'react';
import { ImageOptions } from 'src/types/gallery';

interface PropTypes {
  images: ImageOptions[];
  setOpenImage: (index: number | null) => void;
  openImage: number;
}

export const GalleryViewer: VFC<PropTypes> = ({ setOpenImage, openImage, images }) => {
  const handleCloseRequest = useCallback(() => setOpenImage(null), [setOpenImage]);

  const nextImageIndex = openImage === images.length - 1 ? 0 : openImage + 1;
  const prevImageIndex = openImage === 0 ? images.length - 1 : openImage - 1;
  const handleMoveNextRequest = useCallback(() => setOpenImage(nextImageIndex), [nextImageIndex, setOpenImage]);
  const handleMovePrevRequest = useCallback(() => setOpenImage(prevImageIndex), [prevImageIndex, setOpenImage]);
  const nextImage = images[nextImageIndex];
  const prevImage = images[prevImageIndex];

  return (
    <ImageViewer
      mainSrc={images[openImage].src}
      onCloseRequest={handleCloseRequest}
      imageCaption={images[openImage].caption}
      imageTitle={images[openImage].title}
      prevSrc={prevImage.src}
      prevSrcThumbnail={prevImage.thumbnail}
      nextSrc={nextImage.src}
      nextSrcThumbnail={nextImage.thumbnail}
      onMoveNextRequest={handleMoveNextRequest}
      onMovePrevRequest={handleMovePrevRequest}
    />
  );
};
