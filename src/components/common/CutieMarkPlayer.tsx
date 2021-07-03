import { Player } from '@lottiefiles/react-lottie-player';
import cmLottie from 'public/cm-lottie.json';
import { memo, VFC } from 'react';

interface PropTypes {
  size?: number;
  speed?: number;
}

const CutieMarkPlayerComponent: VFC<PropTypes> = ({ size = 64, speed = 1 }) => {
  const cssSize = `${size}px`;
  return (
    <Player
      autoplay
      loop
      src={cmLottie}
      speed={speed}
      style={{
        width: cssSize,
        height: cssSize,
      }}
    />
  );
};

export const CutieMarkPlayer = memo(CutieMarkPlayerComponent);
