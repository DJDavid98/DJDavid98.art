import React, { FC, memo } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const StatTooltipComponent: FC<{ id: string }> = ({ id, children }) => (
  <UncontrolledTooltip target={id} placement="bottom" fade={false}>
    {children}
  </UncontrolledTooltip>
);

export const StatTooltip = memo(StatTooltipComponent) as typeof StatTooltipComponent;
