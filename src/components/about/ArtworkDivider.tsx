import { memo } from 'react';

export const ArtworkDividerComponent: React.FC = () => (
  <svg viewBox="0 0 20 20" className="artwork-divider" preserveAspectRatio="none">
    <path d="M0 20L20 0 0 0v20z" />
  </svg>
);

export const ArtworkDivider = memo(ArtworkDividerComponent);
