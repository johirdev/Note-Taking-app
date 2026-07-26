import { create } from "zustand";

const applyTheme = (theme) => {
  if (typeof window === "undefined") return;

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";

  const saved = localStorage.getItem("theme");
  if (saved) return saved;

  // First-time visitors default to dark mode
  return "dark";
};

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: newTheme });
    applyTheme(newTheme);
  },

  setTheme: (theme) => {
    set({ theme });
    applyTheme(theme);
  },
}));
