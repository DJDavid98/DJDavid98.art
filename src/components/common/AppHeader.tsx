import { memo } from 'react';

export const AppHeaderComponent: React.FC = () => (
  <div id="header">
    <div className="logo" />
  </div>
);

export const AppHeader = memo(AppHeaderComponent);
