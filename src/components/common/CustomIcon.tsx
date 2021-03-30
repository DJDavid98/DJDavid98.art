import classNames from 'classnames';
import { memo, VFC } from 'react';

export interface CustomIconProps {
  src: string;
  alt?: string;
  className?: string;
}

const CustomIconComponent: VFC<CustomIconProps> = ({ src, alt = '', className }) => (
  <img src={src} className={classNames(className, 'svg-inline--fa custom-icon')} alt={alt} />
);

export const CustomIcon = memo(CustomIconComponent);
