import { memo, VFC } from 'react';

const PATHS = {
  'top-arrow': 'm0 0 10 20L20 0v20H0V0',
  'top': 'M0 0l20 20H0z',
  'bottom': 'M20 20L0 0h20z',
};

interface PropTypes {
  placement: keyof typeof PATHS;
}

const AboutDividerComponent: VFC<PropTypes> = ({ placement }) => (
  <svg viewBox="0 0 20 20" className={`about-divider about-divider-${placement}`} preserveAspectRatio="none">
    <path d={PATHS[placement]} />
  </svg>
);

export const AboutDivider = memo(AboutDividerComponent);
