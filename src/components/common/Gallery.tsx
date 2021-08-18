import classNames from 'classnames';
import { CustomIcon } from 'components/common/CustomIcon';
import { ImageViewer } from 'components/common/ImageViewer';
import styles from 'modules/Gallery.module.scss';
import Image from 'next/image';
import { ReactNode, useState, VFC } from 'react';
import Masonry from 'react-masonry-css';
import { BsBreakpoint, BsBreakpointColumns, GalleryProps } from 'src/types/gallery';

export const defaultColumns: BsBreakpointColumns = {
  [BsBreakpoint.XS]: 2,
  [BsBreakpoint.S]: 3,
  [BsBreakpoint.M]: 4,
  [BsBreakpoint.L]: 5,
  [BsBreakpoint.XL]: 6,
  default: 7,
};

export const Gallery: VFC<GalleryProps> = ({ images, columns = defaultColumns }) => {
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
      <Masonry breakpointCols={columns} className={styles.masonryWrapper} columnClassName={styles.masonryColumn}>
        {images.map((image, index) => (
          <div key={index} className={classNames('cursor-pointer mb-2 rounded', styles.galleryImage, { [styles.nsfwImage]: image.nsfw })}>
            {image.nsfw && (
              <div className={styles.nsfwTag}>
                <CustomIcon src="/logos/18.svg" />
              </div>
            )}
            <Image
              key={image.thumbnail}
              src={image.thumbnail}
              width={image.thumbnailWidth}
              height={image.thumbnailHeight}
              unoptimized
              className="d-block"
              onClick={() => setOpenImage(index)}
              layout="responsive"
              alt="Artwork"
            />
          </div>
        ))}
      </Masonry>

      {viewer}
    </>
  );
};
