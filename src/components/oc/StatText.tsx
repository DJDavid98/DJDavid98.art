import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC, memo } from 'react';

interface PropTypes {
  icon?: FontAwesomeIconProps['icon'];
  tooltipId?: string;
  className?: string;
  iconClassName?: string;
}

const StatTextComponent: FC<PropTypes> = ({ className, icon, iconClassName, tooltipId, children }) => (
  <span id={tooltipId} className={classNames(className, { 'cursor-help': tooltipId })}>
    {icon && <FontAwesomeIcon icon={icon} className={classNames('mr-1', iconClassName)} />}
    {children}
  </span>
);

export const StatText = memo(StatTextComponent) as typeof StatTextComponent;
