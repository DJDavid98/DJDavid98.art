import classNames from 'classnames';
import React, { memo, ReactNode } from 'react';

interface PropTypes {
  append?: ReactNode;
  prepend?: ReactNode;
  className?: string;
}

const DetailBlockComponent: React.FC<PropTypes> = ({ append, prepend, children, className }) => (
  <span className={classNames('detail-block', className)}>
    {prepend && <span className="detail-block-label detail-block-prepend mb-1">{prepend}</span>}
    <span className="detail-block-content">{children}</span>
    {append && <span className="detail-block-label detail-block-append mt-1">{append}</span>}
  </span>
);

export const DetailBlock = memo(DetailBlockComponent) as typeof DetailBlockComponent;
