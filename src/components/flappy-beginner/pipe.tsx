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
  // Use a unique ID for gradients and filters to avoid conflicts when multiple SVGs are on the page.
  const uniqueId = Math.random().toString(36).substring(2);
  const barkGradientId = `barkGradient-${uniqueId}`;
  const barkTextureId = `barkTexture-${uniqueId}`;

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
        <linearGradient id={barkGradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A0522D" /> 
          <stop offset="20%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#5E2C04" />
          <stop offset="80%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#A0522D" />
        </linearGradient>
        <filter id={barkTextureId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.015" numOctaves="4" seed="10" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#bfa38f" surfaceScale="3" result="light">
                <feDistantLight azimuth="45" elevation="50" />
            </feDiffuseLighting>
            <feComposite in="light" in2="SourceGraphic" operator="in" result="textured"/>
            <feGaussianBlur in="textured" stdDeviation="0.5" result="blurred" />
            <feBlend in="textured" in2="blurred" mode="multiply" />
        </filter>
      </defs>
      {/* Base branch shape */}
      <path
        d={`M10,0 C-5,${height * 0.25} 25,${height * 0.3} 15,${height * 0.6} C5,${height * 0.9} 35,${height * 0.95} 20,${height} H60 C75,${height * 0.95} 45,${height * 0.9} 65,${height * 0.6} C85,${height * 0.3} 55,${height * 0.25} 70,0 Z`}
        fill={`url(#${barkGradientId})`}
        stroke="#4A2511"
        strokeWidth="3"
      />
      {/* Apply texture overlay */}
      <path
        d={`M10,0 C-5,${height * 0.25} 25,${height * 0.3} 15,${height * 0.6} C5,${height * 0.9} 35,${height * 0.95} 20,${height} H60 C75,${height * 0.95} 45,${height * 0.9} 65,${height * 0.6} C85,${height * 0.3} 55,${height * 0.25} 70,0 Z`}
        fill="transparent"
        filter={`url(#${barkTextureId})`}
        style={{mixBlendMode: 'overlay', opacity: 0.6}}
      />
       {/* Highlight and shadow lines to add depth */}
      <path d={`M15,5 C10,${height * 0.3} 22,${height * 0.4} 18,${height * 0.6}`} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
      <path d={`M65,5 C70,${height * 0.3} 58,${height * 0.4} 62,${height * 0.6}`} fill="none" stroke="rgba(0, 0, 0, 0.1)" strokeWidth="2" />
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
