import type { FC } from 'react';

// Constants from the game component
const GAME_HEIGHT = 700;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;

interface PipeProps {
  x: number;
  topPipeHeight: number;
}

const Branch: FC<{ height: number, className?: string }> = ({ height, className }) => {
  return (
    <svg 
      width={PIPE_WIDTH} 
      height={height} 
      viewBox={`0 0 80 ${height}`} 
      preserveAspectRatio="none" 
      className={className}
      style={{
        width: `${PIPE_WIDTH}px`,
        height: `${height}px`,
      }}
    >
      <defs>
        <linearGradient id="barkGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5E3C" />
          <stop offset="50%" stopColor="#69452b" />
          <stop offset="100%" stopColor="#8B5E3C" />
        </linearGradient>
        <filter id="barkTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.1 0.02" numOctaves="3" result="noise" />
          <feDiffuseLighting in="noise" lightingColor="#a37e58" surfaceScale="2" result="light">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite in="light" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <path
        d={`M10,0 C0,${height * 0.2} 20,${height * 0.4} 15,${height * 0.6} C10,${height * 0.8} 30,${height * 0.9} 20,${height} H60 C70,${height * 0.9} 50,${height * 0.8} 65,${height * 0.6} C80,${height * 0.4} 60,${height * 0.2} 70,0 Z`}
        fill="url(#barkGradient)"
        stroke="#5D3A1F"
        strokeWidth="4"
      />
      <path
        d={`M10,0 C0,${height * 0.2} 20,${height * 0.4} 15,${height * 0.6} C10,${height * 0.8} 30,${height * 0.9} 20,${height} H60 C70,${height * 0.9} 50,${height * 0.8} 65,${height * 0.6} C80,${height * 0.4} 60,${height * 0.2} 70,0 Z`}
        fill="transparent"
        filter="url(#barkTexture)"
        style={{mixBlendMode: 'overlay', opacity: 0.3}}
      />
    </svg>
  )
}

const Pipe: FC<PipeProps> = ({ x, topPipeHeight }) => {
  const bottomPipeHeight = GAME_HEIGHT - topPipeHeight - PIPE_GAP;
  const bottomPipeTop = topPipeHeight + PIPE_GAP;

  return (
    <>
      {/* Top Branch */}
      <div
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: 0,
          width: `${PIPE_WIDTH}px`,
          height: `${topPipeHeight}px`,
          transform: 'scaleY(-1)', // Flip the branch to hang from top
        }}
        aria-hidden="true"
      >
        <Branch height={topPipeHeight} />
      </div>
      
      {/* Bottom Branch */}
      <div
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${bottomPipeTop}px`,
          width: `${PIPE_WIDTH}px`,
          height: `${bottomPipeHeight}px`,
        }}
        aria-hidden="true"
      >
        <Branch height={bottomPipeHeight} />
      </div>
    </>
  );
};

export default Pipe;
