import { ReactNode } from 'react';

export interface ImageOptions {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  caption?: ReactNode | string;
  title?: ReactNode | string;
  nsfw?: boolean;
}

export enum BsBreakpoint {
  XS = 375,
  S = 576,
  M = 768,
  L = 992,
  XL = 1200,
}

export type BsBreakpointColumns = Record<BsBreakpoint | 'default', number>;

export interface GalleryProps {
  images: ImageOptions[];
  columns?: BsBreakpointColumns;
}
