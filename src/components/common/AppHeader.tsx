import { memo, VFC } from 'react';

export const AppHeaderComponent: VFC = () => (
  <div id="header">
    <div className="logo" />
  </div>
);

export const AppHeader = memo(AppHeaderComponent);
