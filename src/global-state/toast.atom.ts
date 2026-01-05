import { atom } from "@/libs/recoil";

export const toastAtom = atom<{
  showToast: boolean;
  toastObj: {
    type: "success" | "warning" | "info" | "error" | "";
    description: string;
  };
}>({
  key: "toastAtom",
  default: {
    showToast: false,
    toastObj: {
      type: "",
      description: "",
    },
  },
});
