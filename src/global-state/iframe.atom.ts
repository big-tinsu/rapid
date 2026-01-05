import { atom } from "@/libs/recoil";

export const iframeAtom = atom<string | null>({
  key: "iframeAtom",
  default: null,
});
