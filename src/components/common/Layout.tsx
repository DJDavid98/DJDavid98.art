import { AppFooter } from 'components/common/AppFooter';
import { Navbar } from 'components/common/Navbar';
import { ProgressIndicator } from 'components/common/ProgressIndicator';
import { FC, memo } from 'react';

const LayoutComponent: FC = ({ children }) => (
  <>
    <ProgressIndicator />
    <div id="wrap">
      <Navbar />
      {children}
    </div>
    <AppFooter />
  </>
);

export const Layout = memo(LayoutComponent) as typeof LayoutComponent;
