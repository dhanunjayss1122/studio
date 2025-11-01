import type { FC } from 'react';

// Constants from the game component
const BIRD_SIZE = 40; // Increased size for better visibility of the lion face

interface BirdProps {
  top: number;
  rotation: number;
}

const Bird: FC<BirdProps> = ({ top, rotation }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `100px`, // Corresponds to BIRD_LEFT
        width: `${BIRD_SIZE}px`,
        height: `${BIRD_SIZE}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 150ms ease-out',
      }}
      aria-label="Lion"
    >
      {/* Lion Face SVG */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g>
          {/* Mane */}
          <path
            fill="#FBBF24"
            d="M100 20C70 20 45 45 45 75C45 105 70 180 100 180C130 180 155 105 155 75C155 45 130 20 100 20Z"
          />
          <path
            fill="#F59E0B"
            d="M100,30 A65,70 0,0,1 165,100 A65,70 0,0,1 100,170 A65,70 0,0,1 35,100 A65,70 0,0,1 100,30"
            transform="rotate(15, 100, 100)"
          />
           <path
            fill="#F59E0B"
            d="M100,30 A70,65 0,0,1 170,100 A70,65 0,0,1 100,170 A70,65 0,0,1 30,100 A70,65 0,0,1 100,30"
            transform="rotate(-15, 100, 100)"
          />

          {/* Face */}
          <circle cx="100" cy="100" r="60" fill="#FCD34D" />

          {/* Eyes */}
          <circle cx="80" cy="90" r="8" fill="black" />
          <circle cx="120" cy="90" r="8" fill="black" />

          {/* Nose */}
          <path
            d="M 95 110 L 105 110 L 100 120 Z"
            fill="#854D0E"
          />
          
          {/* Mouth */}
           <path d="M 100 120 C 90 135, 110 135, 100 120" stroke="#854D0E" strokeWidth="2" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default Bird;
