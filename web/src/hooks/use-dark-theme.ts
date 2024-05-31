import { useEffect } from "react";

const THEME = "dark";

export function useDarkTheme() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(THEME);
  }, []);
}
