import { ImageViewer } from 'components/common/ImageViewer';
import Image from 'next/image';
import { ReactNode, useState, VFC } from 'react';
import Masonry from 'react-masonry-css';
import styles from 'modules/Gallery.module.scss';
import { GalleryProps } from 'src/types/gallery';

const breakpointCols = {
  375: 2,
  576: 3,
  768: 4,
  992: 5,
  1200: 6,
  default: 7,
};

export const Gallery: VFC<GalleryProps> = ({ images }) => {
  const [openImage, setOpenImage] = useState<number | null>(null);

  let viewer: ReactNode = false;
  if (openImage !== null) {
    const nextImageIndex = openImage === images.length - 1 ? 0 : openImage + 1;
    const nextImage = images[nextImageIndex];
    const prevImageIndex = openImage === 0 ? images.length - 1 : openImage - 1;
    const prevImage = images[prevImageIndex];
    viewer = (
      <ImageViewer
        mainSrc={images[openImage].src}
        onCloseRequest={() => setOpenImage(null)}
        imageCaption={images[openImage].caption}
        imageTitle={images[openImage].title}
        prevSrc={prevImage.src}
        prevSrcThumbnail={prevImage.thumbnail}
        nextSrc={nextImage.src}
        nextSrcThumbnail={nextImage.thumbnail}
        onMoveNextRequest={() => setOpenImage(nextImageIndex)}
        onMovePrevRequest={() => setOpenImage(prevImageIndex)}
      />
    );
  }

  return (
    <>
      <Masonry breakpointCols={breakpointCols} className={styles.masonryWrapper} columnClassName={styles.masonryColumn}>
        {images.map((image, index) => (
          <div key={index} className="cursor-pointer mb-2">
            <Image
              key={image.thumbnail}
              src={image.thumbnail}
              width={image.thumbnailWidth}
              height={image.thumbnailHeight}
              unoptimized
              className="d-block rounded"
              onClick={() => setOpenImage(index)}
              layout="responsive"
            />
          </div>
        ))}
      </Masonry>

      {viewer}
    </>
  );
};
