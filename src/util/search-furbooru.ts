import { PERSONAL_DETAILS } from 'src/config';
import { ImageResponse } from 'src/types/furbooru-api';
import { isImageResponse } from 'src/util/is-image-response';
import urlcat from 'urlcat';

export enum FurbooruGalleryId {
  DISY_COMMISSIONED = 12,
  OWN_ARTWORK = 13,
}

export enum FurbooruFilterId {
  DEFAULT = 1,
  DEFAULT_18_PLUS = 62,
}

export interface SearchFurbooruOptions {
  query: string;
  galleryId?: FurbooruGalleryId;
  perPage?: number;
  filterId?: FurbooruFilterId;
}

export const searchFurbooru = async ({
  query,
  galleryId,
  filterId = FurbooruFilterId.DEFAULT,
  perPage = 14,
}: SearchFurbooruOptions): Promise<ImageResponse[]> => {
  const resp: unknown = await fetch(
    urlcat(`https://furbooru.org/api/v1/json/search/images`, {
      q: `${query},-webm${galleryId ? `,gallery_id:${galleryId}` : ''}`,
      sf: galleryId ? `gallery_id:${galleryId}` : undefined,
      sd: 'desc',
      per_page: perPage,
      filter_id: filterId,
    }),
    {
      headers: {
        'user-agent': PERSONAL_DETAILS.OC_NAME,
      },
    },
  ).then((r) => r.json());
  if (!isImageResponse(resp)) throw new Error('Invalid data received');
  return resp.images;
};
