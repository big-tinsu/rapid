import { atom } from "@/libs/recoil";
import { MostRecentWins } from "@/types/new/bet";

export const latestWinnersAtom = atom<MostRecentWins[]>({
  key: "latestWinnersAtom",
  default: [],
});
