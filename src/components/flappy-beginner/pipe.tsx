import type { FC } from 'react';

// Constants from the game component
const GAME_HEIGHT = 700;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;

interface PipeProps {
  x: number;
  topPipeHeight: number;
}

const Pipe: FC<PipeProps> = ({ x, topPipeHeight }) => {
  const bottomPipeHeight = GAME_HEIGHT - topPipeHeight - PIPE_GAP;
  const bottomPipeTop = topPipeHeight + PIPE_GAP;

  return (
    <>
      {/* Top Pipe */}
      <div
        className="bg-accent border-2"
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: 0,
          width: `${PIPE_WIDTH}px`,
          height: `${topPipeHeight}px`,
          borderColor: 'hsl(var(--accent-foreground))',
        }}
        aria-hidden="true"
      />
      {/* Bottom Pipe */}
      <div
        className="bg-accent border-2"
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${bottomPipeTop}px`,
          width: `${PIPE_WIDTH}px`,
          height: `${bottomPipeHeight}px`,
          borderColor: 'hsl(var(--accent-foreground))',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default Pipe;
