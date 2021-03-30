/* eslint-disable */
export interface ImageResponse {
  /** The image's width divided by its height. */
  aspect_ratio: number;
  /** The number of comments made on the image. */
  comment_count: number;
  /** The creation time, in UTC, of the image. */
  created_at: string;
  /** The hide reason for the image, or null if none provided. This will only have a value on images which are deleted for a rule violation. */
  deletion_reason: string;
  /** The image's description. */
  description: string;
  /** The number of downvotes the image has. */
  downvotes: number;
  /** The ID of the target image, or null if none provided. This will only have a value on images which are merged into another image. */
  duplicate_of: number;
  /** The number of faves the image has. */
  faves: number;
  /** The time, in UTC, this image was first seen (before any duplicate merging). */
  first_seen_at: string;
  /** The file extension of this image. */
  format: 'gif' | 'jpg' | 'jpeg' | 'png' | 'svg' | 'webm';
  /** The image's height, in pixels. */
  height: number;
  /** Whether this image is hidden. An image is hidden if it is merged or deleted for a rule violation. */
  hidden_from_users: boolean;
  /** The image's ID. */
  id: number;
  /** Optional object of internal image intensity data for deduplication purposes. May be null if intensities have not yet been generated. */
  intensities: null | object;
  /** The MIME type of this image. */
  mime_type: 'image/gif' | 'image/jpeg' | 'image/png' | 'image/svg+xml' | 'video/webm';
  /** The filename that this image was uploaded with. */
  name: string;
  /** The SHA512 hash of this image as it was originally uploaded. */
  orig_sha512_hash: string;
  /** Whether the image has finished optimization. */
  processed: boolean;
  /** A mapping of representation names to their respective URLs. */
  representations: {
    full: string;
    large: string;
    medium: string;
    small: string;
    tall: string;
    thumb: string;
    thumb_small: string;
    thumb_tiny: string;
  };
  /** The image's number of upvotes minus the image's number of downvotes. */
  score: number;
  /** The SHA512 hash of this image after it has been processed. */
  sha512_hash: string;
  /** The current source URL of the image. */
  source_url: string;
  /** Whether this image is hit by the current filter. */
  spoilered: boolean;
  /** The number of tags present on this image. */
  tag_count: number;
  /** A list of tag IDs this image contains. */
  tag_ids: number[];
  /** A list of tag names this image contains. */
  tags: string[];
  /** Whether this image has finished thumbnail generation. Do not attempt to load images from view_url or representations if this is false. */
  thumbnails_generated: Boolean;
  /** The time, in UTC, the image was last updated. */
  updated_at: string;
  /** The image's uploader. */
  uploader: string;
  /** The ID of the image's uploader. */
  uploader_id: number;
  /** The image's number of upvotes. */
  upvotes: number;
  /** The image's view URL, including tags. */
  view_url: string;
  /** The image's width, in pixels. */
  width: number;
  /** The lower bound of the Wilson score interval for the image, based on its upvotes and downvotes, given a z-score corresponding to a confidence of 99.5%. */
  wilson_score: number;
}
