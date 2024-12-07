"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <button type="submit" onClick={() => setTheme(theme == "dark" ? "light" : "dark")}>
      {theme == "dark" ? (
        <FaSun className="w-8 h-8" />
      ) : (
        <FaMoon className="w-8 h-8" />
      )}
    </button>
  );
}

export default DarkModeToggle;

