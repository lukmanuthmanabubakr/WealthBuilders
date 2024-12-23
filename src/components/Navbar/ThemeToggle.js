// src/components/ThemeToggle.js
import React, { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { LuMoon } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  // Initialize theme based on local storage or default to 'light'
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // Apply the theme to the body element
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button onClick={switchTheme} className="theme-toggle-button">
      {theme === "light" ? <LuMoon /> : <MdOutlineWbSunny />}
    </button>
  );
};

export default ThemeToggle;
