import classNames from 'classnames';
import { memo, VFC } from 'react';

const Icon: VFC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={classNames('svg-inline--fa', className)}>
    <path
      clipRule="evenodd"
      d="M43.985 24.779c.01-.259.015-.518.015-.779 0-4-3.963-8.393-7.5-12C32.87 8.297 28 4 24 4a20.175 20.175 0 0 0-2.985.221C11.385 5.662 4 13.97 4 24c0 11.046 8.954 20 20 20 10.785 0 19.576-8.537 19.985-19.221zm-4.014.195C39.468 33.357 32.51 40 24 40c-8.837 0-16-7.163-16-16 0-7.902 5.729-14.467 13.26-15.766 1.492 9.178 9.23 16.26 18.71 16.74z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const TelegramStickerIcon = memo(Icon);
