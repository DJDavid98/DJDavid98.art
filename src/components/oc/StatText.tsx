import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, memo } from 'react';

export const StatText: FC<{ icon?: FontAwesomeIconProps['icon']; tooltipId?: string; className?: string; iconClassName?: string }> = memo(
  ({ className, icon, iconClassName, tooltipId, children }) => (
    <span id={tooltipId} className={classNames(className, { 'cursor-help': tooltipId })}>
      {icon && <FontAwesomeIcon icon={icon} className={classNames('mr-1', iconClassName)} />}
      {children}
    </span>
  ),
);
