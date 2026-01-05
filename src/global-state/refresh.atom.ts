import { atom } from "@/libs/recoil";

export const refreshTransactionsAtom = atom<number>({
  key: "refreshTransactionsAtom",
  default: 0,
});
