import { memo, VFC } from 'react';
import Lightbox, { ILightBoxProps } from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageViewerComponent: VFC<ILightBoxProps> = (props) => (
  <Lightbox {...props} reactModalStyle={{ overlay: { zIndex: 1031 } }} clickOutsideToClose={false} imagePadding={50} />
);

export const ImageViewer = memo(ImageViewerComponent) as typeof ImageViewerComponent;
