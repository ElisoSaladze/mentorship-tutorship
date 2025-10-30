import { en } from "./en";
import { ka } from "./ka";

export const translations = {
  en,
  ka,
};

export type Language = keyof typeof translations;
export type { Translations } from "./en";
