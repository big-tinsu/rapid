import { atom } from "@/libs/recoil";

export const sidebarAtom = atom<{ showSidebar: boolean; showNavBar: boolean }>({
  key: "sidebarAtom",
  default: {
    showSidebar: false,
    showNavBar: false,
  },
});
