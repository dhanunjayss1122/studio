import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
      <Card className="w-80 text-center" style={{backgroundColor: 'hsl(var(--card))'}}>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Game Over</CardTitle>
          <CardDescription>Better luck next time!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Your Score:</p>
          <p className="text-6xl font-bold font-headline text-accent-foreground">{score}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onRestart} size="lg">
            Restart Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameOverScreen;
