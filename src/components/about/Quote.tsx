import classNames from 'classnames';
import { ExternalLink } from 'components/common/ExternalLink';
import { memo } from 'react';

interface PropTypes {
  text: string;
  from: string;
  url: string;
  className?: string;
}

const QuoteComponent: React.FC<PropTypes> = ({ text, from, url, className }) => (
  <blockquote className={classNames('blockquote mt-4 mb-0', className)}>
    <p className="mb-0">{text}</p>
    <footer className="blockquote-footer">
      <ExternalLink href={url}>{from}</ExternalLink>
    </footer>
  </blockquote>
);

export const Quote = memo(QuoteComponent);
