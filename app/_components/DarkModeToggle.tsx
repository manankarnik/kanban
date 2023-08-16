import { FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "../_hooks/useDarkMode";

export default function DarkModeToggle() {
  const [darkMode, toggleDarkMode] = useDarkMode(false);
  return (
    <button onClick={() => toggleDarkMode(!darkMode)}>
      {darkMode ? (
        <FaSun className="w-6 h-6" />
      ) : (
        <FaMoon className="w-6 h-6" />
      )}
    </button>
  );
}
