export const THEME_OPTIONS = [
  { value: "theme-light", label: "Light Terminal" },
  { value: "theme-dark", label: "Dark Terminal" },
  { value: "theme-blue", label: "Blue Terminal" },
  { value: "theme-green", label: "Green Terminal" },
  { value: "theme-black-red", label: "Red Terminal" },
  { value: "theme-black-teal", label: "Teal Terminal" },
  { value: "theme-black-green", label: "Green Matrix" },
] as const;

export const DEFAULT_THEME = "theme-black-teal";

export type ThemeValue = (typeof THEME_OPTIONS)[number]["value"];
