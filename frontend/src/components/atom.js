import { atom } from "recoil";

export const usernameAtom = atom({
  key: "usernameAtom",
  default: "",
});

export const sourceAtom = atom({
  key: "sourceAtom",
  default: "https://paytm-server.vercel.app",
});
