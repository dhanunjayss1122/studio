import type { FC } from 'react';

// Constants from the game component
const BIRD_SIZE = 30;

interface BirdProps {
  top: number;
  rotation: number;
}

const Bird: FC<BirdProps> = ({ top, rotation }) => {
  return (
    <div
      className="bg-primary border-2 border-primary-foreground/50 transition-transform duration-100 ease-linear"
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `100px`, // Corresponds to BIRD_LEFT
        width: `${BIRD_SIZE}px`,
        height: `${BIRD_SIZE}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      aria-label="Bird"
    />
  );
};

export default Bird;
