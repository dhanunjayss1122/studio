
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Bird from "./bird";
import Pipe from "./pipe";
import GameOverScreen from "./game-over-screen";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Game Constants
const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;
const BIRD_SIZE = 40; // Match the new bird size
const BIRD_LEFT = 100;
const GRAVITY = 0.5;
const JUMP_STRENGTH = 9;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;
const INITIAL_PIPE_SPEED = 2.5;
const PIPE_SPAWN_INTERVAL = 120; // in frames

type GameState = "start" | "playing" | "gameOver";
type PipeState = { x: number; topPipeHeight: number; passed?: boolean };

const jungleBg = PlaceHolderImages.find(p => p.id === 'jungle-background-2');

const Game = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState<PipeState[]>([]);
  const [score, setScore] = useState(0);

  const birdVelRef = useRef(0);
  const gameLoopId = useRef<number | null>(null);
  const pipesRef = useRef<PipeState[]>([]);
  const frameCounterRef = useRef(0);
  const scoreRef = useRef(0);

  const jump = useCallback(() => {
    birdVelRef.current = -JUMP_STRENGTH;
  }, []);

  const startGame = useCallback(() => {
    setGameState("playing");
    jump();
  }, [jump]);

  const restartGame = useCallback(() => {
    setGameState("start");
    setBirdPos(GAME_HEIGHT / 2);
    birdVelRef.current = 0;
    setPipes([]);
    pipesRef.current = [];
    setScore(0);
    scoreRef.current = 0;
    frameCounterRef.current = 0;
    setBirdRotation(0);
  }, []);

  const handleTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      
      if (gameState === "start") {
        startGame();
      } else if (gameState === "playing") {
        jump();
      }
    },
    [gameState, startGame, jump]
  );
  
  const gameLoop = useCallback(() => {
    if (gameState === "playing") {
      // Bird physics
      birdVelRef.current += GRAVITY;
      const newBirdPos = birdPos + birdVelRef.current;
      setBirdPos(newBirdPos);
      setBirdRotation(Math.min(90, birdVelRef.current * 6));

      // Pipe movement & generation
      const pipeSpeed = INITIAL_PIPE_SPEED + Math.floor(scoreRef.current / 5) * 0.2;
      frameCounterRef.current++;
      if (frameCounterRef.current > PIPE_SPAWN_INTERVAL / (pipeSpeed / INITIAL_PIPE_SPEED)) {
        const topPipeHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 150) + 75;
        pipesRef.current.push({ x: GAME_WIDTH, topPipeHeight });
        frameCounterRef.current = 0;
      }
      
      const newPipes = pipesRef.current
        .map((pipe) => ({ ...pipe, x: pipe.x - pipeSpeed }))
        .filter((pipe) => pipe.x > -PIPE_WIDTH);
      
      pipesRef.current = newPipes;
      setPipes(newPipes);
      
      // Collision Detection
      const birdRect = { top: newBirdPos, bottom: newBirdPos + BIRD_SIZE, left: BIRD_LEFT, right: BIRD_LEFT + BIRD_SIZE };
      
      if (birdRect.bottom > GAME_HEIGHT || birdRect.top < 0) {
        setGameState("gameOver");
        return;
      }

      for (const pipe of pipesRef.current) {
        const topPipeRect = { left: pipe.x, right: pipe.x + PIPE_WIDTH, top: 0, bottom: pipe.topPipeHeight };
        const bottomPipeRect = { left: pipe.x, right: pipe.x + PIPE_WIDTH, top: pipe.topPipeHeight + PIPE_GAP, bottom: GAME_HEIGHT };

        const collides = birdRect.right > topPipeRect.left && birdRect.left < topPipeRect.right && (birdRect.top < topPipeRect.bottom || birdRect.bottom > bottomPipeRect.top);

        if (collides) {
          setGameState("gameOver");
          return;
        }

        if (pipe.x + PIPE_WIDTH < BIRD_LEFT && !pipe.passed) {
          pipe.passed = true;
          scoreRef.current += 1;
          setScore(scoreRef.current);
        }
      }
    }

    gameLoopId.current = requestAnimationFrame(gameLoop);
  }, [gameState, birdPos]);

  useEffect(() => {
    gameLoopId.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopId.current) cancelAnimationFrame(gameLoopId.current);
    };
  }, [gameLoop]);

  return (
    <div
      className="relative overflow-hidden border-8 shadow-lg cursor-pointer"
      style={{
        width: `${GAME_WIDTH}px`,
        height: `${GAME_HEIGHT}px`,
        borderColor: 'hsl(var(--primary))',
        borderStyle: 'outset',
      }}
      role="application"
      aria-label="FlappyBeginner Game"
      onClick={handleTap}
      onTouchStart={handleTap}
    >
      {jungleBg && (
        <Image
            src={jungleBg.imageUrl}
            alt={jungleBg.description}
            data-ai-hint={jungleBg.imageHint}
            fill
            style={{ objectFit: 'cover', zIndex: -1 }}
            priority
        />
      )}
      <Bird top={birdPos} rotation={birdRotation} />
      {pipes.map((pipe, index) => (
        <Pipe key={index} x={pipe.x} topPipeHeight={pipe.topPipeHeight} />
      ))}
      
      <div className="absolute top-4 right-4 text-4xl font-bold font-headline z-10 text-white" style={{WebkitTextStroke: '2px black'}}>
        {score}
      </div>

      {gameState === 'start' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
            <p className="text-2xl font-bold font-headline mt-10 text-white" style={{WebkitTextStroke: '1px black'}}>Tap to Start</p>
        </div>
      )}

      {gameState === "gameOver" && <GameOverScreen score={score} onRestart={restartGame} />}
    </div>
  );
};

export default Game;
