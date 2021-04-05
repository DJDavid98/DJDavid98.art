import { ImageResponse } from 'src/types/furbooru-api';
import { ImageOptions } from 'src/types/gallery';

export const RepresentationSizes = {
  thumb_tiny: 50,
  thumb_small: 150,
  thumb: 250,
};

export const thumbSize = (
  image: ImageResponse,
  represent: keyof typeof RepresentationSizes,
): Pick<ImageOptions, 'thumbnailWidth' | 'thumbnailHeight'> => {
  const tall = image.width < image.height;
  const representationSize = RepresentationSizes[represent];
  const thumbnailWidth = tall ? representationSize * (image.width / image.height) : representationSize;
  const thumbnailHeight = tall ? representationSize : representationSize * (image.height / image.width);

  return {
    thumbnailWidth,
    thumbnailHeight,
  };
};
