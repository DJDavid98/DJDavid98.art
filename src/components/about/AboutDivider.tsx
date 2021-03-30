import React, { memo } from 'react';

interface PropTypes {
  placement: 'top' | 'bottom';
}

const PATHS = {
  top: 'M0 0l20 20H0z',
  bottom: 'M20 20L0 0h20z',
};

const AboutDividerComponent: React.FC<PropTypes> = ({ placement }) => (
  <svg viewBox="0 0 20 20" className={`about-divider about-divider-${placement}`} preserveAspectRatio="none">
    <path d={PATHS[placement]} />
  </svg>
);

export const AboutDivider = memo(AboutDividerComponent);
