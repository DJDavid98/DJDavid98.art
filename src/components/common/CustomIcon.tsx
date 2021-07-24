import classNames from 'classnames';
import { memo, Ref, VFC } from 'react';

export interface CustomIconProps {
  src: string;
  alt?: string;
  className?: string;
  innerRef?: Ref<HTMLImageElement>;
}

const CustomIconComponent: VFC<CustomIconProps> = ({ src, alt = '', className, innerRef }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} className={classNames(className, 'svg-inline--fa')} alt={alt} loading="lazy" ref={innerRef} />
);

export const CustomIcon = memo(CustomIconComponent);
