import { ImageResponse } from 'src/types/furbooru-api';

export function isImageResponse(resp: unknown): resp is { images: ImageResponse[] } {
  return typeof resp === 'object' && resp !== null && 'images' in resp && Array.isArray((resp as { images?: [] }).images);
}
