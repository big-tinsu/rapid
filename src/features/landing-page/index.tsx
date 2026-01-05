import { Winner } from "@/types/Games";
import CategoryNav from "@/components/landing-page/CategoryNav";
import Games from "@/components/games/Games";
import LatestWinners from "@/components/landing-page/LatestWinners";

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <CategoryNav />
      <Games />
      <LatestWinners />
    </div>
  );
};
