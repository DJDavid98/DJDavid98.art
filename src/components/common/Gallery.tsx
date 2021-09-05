import classNames from 'classnames';
import { CustomIcon } from 'components/common/CustomIcon';
import { GalleryViewer } from 'components/common/GalleryViewer';
import styles from 'modules/Gallery.module.scss';
import Image from 'next/image';
import { useState, VFC } from 'react';
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

      {openImage !== null && <GalleryViewer openImage={openImage} setOpenImage={setOpenImage} images={images} />}
    </>
  );
};
