"use client";
import { useEffect, useState } from "react";

export function useDarkMode(
  fallback: boolean,
): [boolean, (darkMode: boolean) => void] {
  const [darkMode, setDarkMode] = useState(fallback);
  useEffect(() => {
    console.log(localStorage.getItem("darkMode"));
    if (localStorage.getItem("darkMode"))
      setDarkMode(localStorage.getItem("darkMode") == "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    const html = document.getElementsByTagName("html")[0];
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);
  return [darkMode, (darkMode: boolean) => setDarkMode(darkMode)];
}
