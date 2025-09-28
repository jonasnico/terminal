import { useState, useEffect, useRef } from "react";
import { THEME_OPTIONS, DEFAULT_THEME } from "../constants/themes";

const themeOptions = THEME_OPTIONS;

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;

    if (savedTheme && themeOptions.find((t) => t.value === savedTheme)) {
      themeOptions.forEach((theme) => {
        body.classList.remove(theme.value);
      });
      body.classList.add(savedTheme);
      setCurrentTheme(savedTheme);
    } else {
      const currentThemeClass = themeOptions.find((theme) =>
        body.classList.contains(theme.value)
      );
      const initialTheme = currentThemeClass?.value || DEFAULT_THEME;
      setCurrentTheme(initialTheme);
      localStorage.setItem("theme", initialTheme);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectTheme = (theme: string) => {
    themeOptions.forEach((option) => {
      document.body.classList.remove(option.value);
    });

    document.body.classList.add(theme);
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    setIsOpen(false);
  };

  const currentThemeLabel =
    themeOptions.find((t) => t.value === currentTheme)?.label || "Unknown";

  return (
    <div className="theme-switcher-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-switcher-button"
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        {currentThemeLabel} ▼
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          {themeOptions.map((theme) => (
            <button
              key={theme.value}
              onClick={() => selectTheme(theme.value)}
              className={`theme-option ${
                currentTheme === theme.value ? "active" : ""
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
