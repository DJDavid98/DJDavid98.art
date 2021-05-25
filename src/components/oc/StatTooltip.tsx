import React, { FC, memo } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

export const StatTooltip: FC<{ id: string }> = memo(({ id, children }) => (
  <UncontrolledTooltip target={id} placement="bottom" fade={false}>
    {children}
  </UncontrolledTooltip>
));
