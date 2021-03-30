import { ReactNode } from 'react';

export interface ImageOptions {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  caption?: ReactNode | string;
  title?: ReactNode | string;
}

export interface GalleryProps {
  images: ImageOptions[];
}
