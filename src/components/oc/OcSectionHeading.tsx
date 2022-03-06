import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface ScrollTargetHeadingProps {
  id: string;
  icon?: FontAwesomeIconProps['icon'];
}

export const OcSectionHeading: FC<ScrollTargetHeadingProps> = ({ id, icon, children }) => (
  <h3 id={id}>
    {icon && <FontAwesomeIcon icon={icon} className="mr-2 mr-lg-3" />}
    {children}
  </h3>
);
