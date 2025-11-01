import Game from '@/components/flappy-beginner/game';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-headline font-bold text-center mb-4 text-primary-foreground/80">
        FlappyBeginner
      </h1>
      <Game />
    </main>
  );
}
