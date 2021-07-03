import classNames from 'classnames';
import { CutieMarkPlayer } from 'components/common/CutieMarkPlayer';
import { memo, VFC } from 'react';

interface PropTypes {
  navbarSpacing?: boolean;
  size?: number;
  padding?: 1 | 2 | 3 | 4 | 5 | 6;
}

const LoadingIndicatorComponent: VFC<PropTypes> = ({ navbarSpacing = true, size, padding = 6 }) => (
  <div
    className={classNames(`text-center p-${padding}`, {
      'force-navbar-spacing': navbarSpacing,
    })}
  >
    <CutieMarkPlayer size={size} speed={2} />
  </div>
);

export const LoadingIndicator = memo(LoadingIndicatorComponent);
