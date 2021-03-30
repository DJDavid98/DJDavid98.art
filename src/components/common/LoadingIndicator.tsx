import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { memo, VFC } from 'react';

interface PropTypes {
  color?: string;
  navbarSpacing?: boolean;
  size?: SizeProp;
  padding?: 1 | 2 | 3 | 4 | 5 | 6;
}

const LoadingIndicatorComponent: VFC<PropTypes> = ({ color, navbarSpacing = true, size = '3x', padding = 6 }) => (
  <div
    className={classNames(`text-center p-${padding}`, {
      [`text-${color || ''}`]: color,
      'force-navbar-spacing': navbarSpacing,
    })}
  >
    <FontAwesomeIcon icon="compact-disc" size={size} spin />
  </div>
);

export const LoadingIndicator = memo(LoadingIndicatorComponent);
