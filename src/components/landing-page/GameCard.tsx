interface GameCardProps {
  game: {
    icon: string;
    name: string;
    [key: string]: any;
  };
}

export default function GameCard({ game }: GameCardProps) {
  if (!game || Object.keys(game).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full lg:w-6/12 lg:mr-2 mb-4">
      <div
        style={{ backgroundImage: `url(${game.icon})` }}
        className="games-card flex rounded-sm card w-full mb-3 lg:mb-0"
      ></div>
      <h2 className="text-white text-lg font-bold">{game.name}</h2>
    </div>
  );
} 